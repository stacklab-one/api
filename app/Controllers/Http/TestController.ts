import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Tool from "App/Models/Tool";
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
}
