import { meiliSearchInstance } from "@/hydration/meilisearch";
import { logger } from "@/setup/logger";

export const meiliSearchConfig = {
    adminApiKey: "unset",
    searchApiKey: "unset",
    isPrepared: false,
};

export async function prepareMeiliConfig(force = false) {
    if (meiliSearchConfig.isPrepared && !force) {
        return;
    }
    logger.info("Setup Meilisearch...");
    const keys = await meiliSearchInstance.getKeys();
    const adminApiKey = keys.results.find(
        (key) => key.name === "Default Admin API Key",
    );
    const searchApiKey = keys.results.find(
        (key) => key.name === "Default Search API Key",
    );
    if (!adminApiKey || !searchApiKey) {
        throw new Error("MeiliSearch keys not found.");
    }
    meiliSearchConfig.adminApiKey = adminApiKey.key;
    meiliSearchConfig.searchApiKey = searchApiKey.key;
    meiliSearchConfig.isPrepared = true;
    logger.info("Meilisearch setup complete.");
}
