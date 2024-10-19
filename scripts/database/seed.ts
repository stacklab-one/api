import { seed as userSeed } from "@/db/seeder/user";
import { seed as toolSeed } from "@/db/seeder/tool";
import { seed as categorySeed } from "@/db/seeder/category";
import { logger } from "../../src/setup/logger";

if (
    Bun.env.NODE_ENV !== "development" &&
    Bun.env.NODE_ENV?.toString() !== "test"
) {
    throw new Error(
        "This script must be run in development or test environment.",
    );
}
logger.info("Seeding the database....");
await userSeed();
await toolSeed();
await categorySeed();
logger.info("Seeded the database.");
