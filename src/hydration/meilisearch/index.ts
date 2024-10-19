import { prepareMeiliConfig } from "@/config/meilisearch.config";
import { db } from "@/db";
import { logger } from "@/setup/logger";
import MeiliSearch, { Meilisearch } from "meilisearch";

export const meiliSearchInstance = new MeiliSearch({
    host: process.env.MEILI_HOST!,
    apiKey: process.env.MEILI_MASTER_KEY,
});

export async function hydrateAll() {
    await hydrateUsers();
    await hydrateTools();
    await hydrateCategories();
}

export async function hydrateUsers() {
    await prepareMeiliConfig();
    const tempIndexName = `users_${Date.now()}`;
    await meiliSearchInstance.createIndex(tempIndexName);
    await prepareMeiliConfig();
    logger.info("Hydrating users...");
    const users = await db.query.user.findMany();
    const usersToIndex = users.map((user) => ({
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: `${user.firstName} ${user.lastName}`,
        authLevel: user.authLevel,
    }));
    await meiliSearchInstance.index(tempIndexName).addDocuments(usersToIndex);
    await meiliSearchInstance.swapIndexes([
        { indexes: [tempIndexName, "users"] },
    ]);
    await meiliSearchInstance.deleteIndex(tempIndexName);
    logger.info("Hydrated users.");
}

export async function hydrateTools() {
    await prepareMeiliConfig();
    logger.info("Hydrating tools...");
    const tools = await db.query.tool.findMany();
    const toolsToIndex = tools.map((tool) => ({
        id: tool.id,
        name: tool.name,
        description: tool.description,
        tags: tool.tags,
    }));
    await meiliSearchInstance.index("tools").addDocuments(toolsToIndex);
    logger.info("Hydrated tools.");
}

export async function hydrateCategories() {}

export async function rebuildIndexes() {
    await prepareMeiliConfig();
    logger.info("Rebuilding MeiliSearch indexes...");
    const indexes = await meiliSearchInstance.getIndexes();
    indexes.results.forEach(async (index) => {
        await meiliSearchInstance.deleteIndex(index.uid);
    });
    const indexesToCreate = ["users", "tools", "categories"];
    indexesToCreate.forEach(async (index) => {
        await meiliSearchInstance.createIndex(index);
    });
    logger.info("Rebuilt MeiliSearch indexes.");
}
