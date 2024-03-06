import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import { IncidentType } from "App/Enums/IncidentType";
import { MediaContext } from "App/Enums/MediaContext";
import Incident from "App/Models/Incident";
import Media from "App/Models/Media";
import Logger from "@ioc:Adonis/Core/Logger";
import fs from "fs";
import mime from "mime";

export class FileService {
    public static async uploadFile(file: MultipartFileContract, context: MediaContext): Promise<Media> {
        let media = new Media();
        media.fileName = file?.clientName ?? "unknown";
        media.fileType = `${file.type}/${file.subtype}`;
        media.fileSize = file.size;
        media.context = context;
        media = await media.save();
        media.fileNameDisk = `${media.id}.${file.extname}`;
        media.filePath = `${media.createdAt.year}/${media.createdAt.month}/${media.createdAt.day}/${media.createdAt.hour}/${media.createdAt.minute}`;
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

    public static async uploadFileByPath(filePath: string, context: MediaContext): Promise<Media> {
        let media = new Media();
        const fileExt = filePath.split(".").pop() ?? "";
        media.fileName = filePath.split("/").pop() ?? "unknown";
        media.context = context;
        media.fileType = mime.getType(filePath) ?? "text/plain";
        const fileStats = fs.statSync(filePath);
        media.fileSize = fileStats.size;
        media = await media.save();
        media.filePath = `${media.createdAt.year}/${media.createdAt.month}/${media.createdAt.day}/${media.createdAt.hour}/${media.createdAt.minute}`;
        media.fileNameDisk = `${media.id}.${fileExt}`;
        await media.save();
    }
}
