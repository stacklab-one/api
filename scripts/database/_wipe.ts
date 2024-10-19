import { db, schema } from "@/db";
import { logger } from "@/setup/logger";

if (
    Bun.env.NODE_ENV !== "development" &&
    Bun.env.NODE_ENV?.toString() !== "test"
) {
    throw new Error(
        "This script must be run in development or test environment.",
    );
}

logger.info("Wiping the database....");
try {
    await db.delete(schema.user);
    await db.delete(schema.toolSnapshot);
    await db.delete(schema.tool);
    await db.delete(schema.category);
    await db.delete(schema.categoryToolConnections);
} catch (e) {
    logger.error("Error wiping the database. Skipping...", e);
}
