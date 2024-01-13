import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { MediaContext } from "App/Enums/MediaContext";
import Media from "App/Models/Media";
import Tool from "App/Models/Tool";
import { FileService } from "App/Services/FileService";
import { RepositoryResult } from "App/Services/RepositoryService";

export default class TestController {
    public async index({ response }: HttpContextContract) {
        const tools = await Tool.query().andWhereNotNull("repository_url").limit(10).exec();
        const repositoryDatas: RepositoryResult[] = [];
        for (const tool of tools) {
            const repoData = await tool.getRepositoryData();
            if (repoData) {
                repositoryDatas.push(repoData);
            }
        }
        response.json({
            toolCount: tools.length,
            dataCount: repositoryDatas.length,
            data: repositoryDatas,
        });
    }

    public async upload({ request, response }: HttpContextContract) {
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
}
