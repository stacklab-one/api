import Tool from "App/Models/Tool";
import ToolData from "App/Models/ToolData";
import Logger from "@ioc:Adonis/Core/Logger";
import { MeiliService } from "./MeiliService";
import Category from "App/Models/Category";

export type ToolIndexShape = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    repositoryUrl: string;

    // relations
    tags: string[];
    categoryNames: string[];
    stars: number;
    forks: number;
    openIssues: number;
    score: number;
};

export type CategoryIndexShape = {
    id: string;
    name: string;
    description: string;

    // relations
    tags: string[];
    tools: string[];
    score: number;
};

const indices: string[] = ["tools", "categories", "tags", "stacks"] as const;

export class HydrationService {
    public static async hydrateToolSearchIndex() {
        const tools = await Tool.all();
        const toolIndex: ToolIndexShape[] = [];
        for (const tool of tools) {
            toolIndex.push(await this.getToolIndexShape(tool));
        }
        const meiliSearch = MeiliService.getInstance().meilisearch;

        await meiliSearch.createIndex("tools_swap");
        await meiliSearch.index("tools_swap").addDocuments(toolIndex);
        await meiliSearch.swapIndexes([
            {
                indexes: ["tools", "tools_swap"],
            },
        ]);
        await meiliSearch.deleteIndex("tools_swap");
    }

    public static async hydrateCategorySearchIndex() {
        const categories = await Category.all();
        const categoryIndex: CategoryIndexShape[] = [];
        for (const category of categories) {
            categoryIndex.push(await this.getCategoryIndexShape(category));
        }
        const meiliSearch = MeiliService.getInstance().meilisearch;

        await meiliSearch.createIndex("categories_swap");
        await meiliSearch.index("categories_swap").addDocuments(categoryIndex);
        await meiliSearch.swapIndexes([
            {
                indexes: ["categories", "categories_swap"],
            },
        ]);
        await meiliSearch.deleteIndex("categories_swap");
    }

    public static async bootstrapSearchEngine() {
        indices.forEach((index) => {
            this.createIndexIfNotExists(index);
        });
    }

    private static async createIndexIfNotExists(indexName: string) {
        try {
            await MeiliService.getInstance().meilisearch.getIndex(indexName);
        } catch (e) {
            if (e.code && e.code === "index_not_found") {
                await MeiliService.getInstance().meilisearch.createIndex(indexName);
            }
        }
    }

    private static async getToolIndexShape(tool: Tool): Promise<ToolIndexShape> {
        await tool.load("toolTags", (query) => {
            query.preload("tag");
        });
        await tool.load("categoryTools", (query) => {
            query.preload("category");
        });
        const latestTooData = (await ToolData.query().where("tool_id", tool.id).orderBy("created_at", "desc").limit(1).exec())[0];
        return {
            id: tool.id,
            name: tool.name,
            description: tool.description,
            websiteUrl: tool.websiteUrl,
            repositoryUrl: tool.repositoryUrl,
            tags: tool.toolTags.map((toolTag) => toolTag.tag.tag),
            categoryNames: tool.categoryTools.map((categoryTool) => categoryTool.category.name),
            stars: latestTooData?.stars ?? 0,
            forks: latestTooData?.forks ?? 0,
            openIssues: latestTooData?.openIssues ?? 0,
            score: await this.calculateToolScore(tool),
        };
    }

    private static async getCategoryIndexShape(category: Category): Promise<CategoryIndexShape> {
        await category.load("categoryTags", (query) => {
            query.preload("tag");
        });
        await category.load("categoryTools", (query) => {
            query.preload("tool");
        });

        let score = 0;
        for (const categoryTool of category.categoryTools) {
            score += await this.calculateToolScore(categoryTool.tool);
        }
        return {
            id: category.id,
            name: category.name,
            description: category.description,

            tags: Array.from(new Set(category.categoryTags.map((categoryTag) => categoryTag.tag.tag))),
            tools: category.categoryTools.map((categoryTool) => categoryTool.tool.name),
            score,
        };
    }

    public static async calculateToolScore(tool: Tool): Promise<number> {
        let score = 0;

        await tool.load("toolData", (query) => {
            query.orderBy("created_at", "desc");
        });

        const latestHydration = tool.toolData.at(0);
        if (!latestHydration) {
            return score;
        }
        const hydrationLastMonth = (
            await ToolData.query()
                .andWhere("tool_id", tool.id)
                .andWhere("created_at", "<", latestHydration.createdAt.minus({ month: 1 }).toISO())
                .orderBy("created_at", "desc")
                .limit(1)
                .exec()
        ).at(0);
        if (!hydrationLastMonth) {
            score += latestHydration.stars;
            if (latestHydration.openIssues !== null && latestHydration.openIssues > 0) {
                score += Math.log2(latestHydration.openIssues ?? 0) * (latestHydration.openIssues ?? 1) * 0.05;
            }

            return score;
        }

        const starsPitch = (latestHydration.stars ?? 0) / (hydrationLastMonth.stars ?? 1);
        score += latestHydration.stars * starsPitch;

        const openIssuesPitch = (latestHydration.openIssues ?? 0) / (hydrationLastMonth.openIssues ?? 1);
        score += Math.log2(latestHydration.openIssues ?? 0) * (latestHydration.stars ?? 1) * 0.05 * openIssuesPitch;

        return score;
    }
}
