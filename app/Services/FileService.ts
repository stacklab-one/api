import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import { IncidentType } from "App/Enums/IncidentType";
import { MediaContext } from "App/Enums/MediaContext";
import Incident from "App/Models/Incident";
import Media from "App/Models/Media";
import Logger from "@ioc:Adonis/Core/Logger";

export class FileService {
    public static async uploadFile(file: MultipartFileContract, context: MediaContext): Promise<Media> {
        let media = new Media();
        media.fileName = file?.clientName ?? "unknown";
        media.fileType = `${file.type}/${file.subtype}`;
        media.fileSize = file.size;
        media.context = context;
        media = await media.save();
        media.fileNameDisk = `${media.id}.${file.extname}`;
        media.filePath = `${media.createdAt.year}/${media.createdAt.month}/${media.createdAt.day}`;
        await media.save();
        file.moveToDisk(
            media.filePath,
            {
                name: media.fileNameDisk,
            },
            "s3"
        ).catch((err) => {
            Logger.error("Failed to upload file %s to context %s", media.fileName, media.context);
            Logger.error(err);
            const incident = new Incident();
            incident.type = IncidentType.FILE_UPLOAD_FAILED;
            incident.title = "File upload failed";
            incident.description = `Failed to upload file ${media.fileName} to context ${media.context}`;
            incident.data = {
                file: media,
                error: err,
            };
            incident.save();
        });
        return media;
    }
}
