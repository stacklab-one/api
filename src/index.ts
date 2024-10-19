import { Hono } from "hono";
import { db } from "@/db";
import packageJson from "../package.json";
import { logger as loggerMiddleware } from "hono/logger";
import { logger } from "@/setup/logger";
import { authModule } from "@/auth/routing";
import { adminModule } from "@/admin/routing";
import {
    meiliSearchConfig,
    prepareMeiliConfig,
} from "./config/meilisearch.config";

logger.info("Starting the server...");
await prepareMeiliConfig();
const app = new Hono();
if (Bun.env.NODE_ENV === "development") {
    app.use("*", loggerMiddleware());
}
app.get("/", async (c) => {
    return c.json({
        version: packageJson.version,
        users: await db.query.user.findMany(),
    });
});

// register modules
app.route("/auth", authModule);
app.route("/admin", adminModule);

export default app;
