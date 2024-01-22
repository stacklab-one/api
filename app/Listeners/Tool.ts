import type { EventsList } from "@ioc:Adonis/Core/Event";
import Logger from "@ioc:Adonis/Core/Logger";
import ToolEntity from "App/Models/Tool";
import Event from "@ioc:Adonis/Core/Event";
import ToolData from "App/Models/ToolData";
import { DateTime } from "luxon";
import { HydrationService } from "App/Services/HydrationService";
export default class Tool {
    public async onHydrateTool(options: EventsList["hydrate:tool"]) {
        const tool = await ToolEntity.find(options.toolId);
        if (!tool) {
            Logger.error(`Tool ${options.toolId} not found`);
            return;
        }
        const repositoryData = await tool.getRepositoryData();
        if (!repositoryData) {
            return;
        }

        const toolData = new ToolData();
        toolData.toolId = tool.id;
        toolData.stars = repositoryData.stars;
        toolData.forks = repositoryData.forks;
        toolData.openIssues = repositoryData.openIssues;

        await toolData.save();
        tool.hydratedAt = DateTime.now();
        await tool.save();
        Logger.info(`Hydrated Tool ${tool.name} - ${tool.id}`);
    }

    public async onHydrateTools(options: EventsList["hydrate:tools"]) {
        Logger.info(`Hydrate Tools`);
        const tools = await ToolEntity.query().select("id").exec();
        for (const tool of tools) {
            await Event.emit("hydrate:tool", { user: options.user, toolId: tool.id });
            await setTimeout(() => {}, 500);
        }
        Logger.info("Hydrated all tools");
    }

    public async onCalculateScore(options: EventsList["calculate:score"]) {
        const tool = await ToolEntity.find(options.toolId);
        if (!tool) {
            return;
        }
        const score = await HydrationService.calculateToolScore(tool);
        Logger.info(`Score for ${tool.name}: ${score} -- (${tool.id})`);
    }

    public async onCalculateScores(options: EventsList["calculate:scores"]) {
        Logger.info(`Calculate Scores`);
        const tools = await ToolEntity.query().select("id").exec();
        for (const tool of tools) {
            await Event.emit("calculate:score", { user: options.user, toolId: tool.id });
        }
    }

    public async onHydrateSearchIndex() {
        Logger.info("Hydrate Tool Search Index");
        HydrationService.hydrateToolSearchIndex();
    }
}
