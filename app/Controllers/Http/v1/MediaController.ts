import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { MediaContext } from "App/Enums/MediaContext";
import Media from "App/Models/Media";
import { FileService } from "App/Services/FileService";
import Drive from "@ioc:Adonis/Core/Drive";
import Logger from "@ioc:Adonis/Core/Logger";

export default class MediaController {
    public async index({ request, response }: HttpContextContract) {
        const file = request.file("file");
        const context = request.input("context");
        if (!context) {
            return response.badRequest("No context provided");
        }
        const validContexts = Object.keys(MediaContext).filter((key) => !isNaN(Number(key)));
        if (!validContexts.includes(context)) {
            return response.badRequest("Invalid context");
        }
        if (!file) {
            return response.badRequest("No file provided");
        }
        return await FileService.uploadFile(file, context as MediaContext);
    }

    public async view({ params, response }: HttpContextContract) {
        try {
            const media = await Media.find(params.mediaId);
            if (!media) {
                return response.notFound();
            }
            return response.json(media);
        } catch (err) {
            Logger.error(err);
            return response.notFound();
        }
    }

    public async show({ params, response }: HttpContextContract) {
        try {
            const media = await Media.find(params.mediaId);
            if (!media) {
                return response.notFound();
            }
            return response.stream(await Drive.use("s3").getStream(media.location));
        } catch (err) {
            Logger.error(err);
            return response.notFound();
        }
    }
}
