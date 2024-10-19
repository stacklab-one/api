import { minAuthLevel } from "@/auth/middlewares/minAuthLevel";
import { db, schema } from "@/db";
import { AuthLevel } from "@/enums/AuthLevel";
import { count } from "drizzle-orm";
import { Hono } from "hono";

export const adminModule = new Hono();

adminModule.use("*", minAuthLevel(AuthLevel.ADMIN));

adminModule.get("/s1-stats", async (c) => {
    const userCountResult = await db
        .select({
            count: count(),
        })
        .from(schema.user)
        .execute();
    const toolCountResult = await db
        .select({
            count: count(),
        })
        .from(schema.tool)
        .execute();
    const categoryCount = await db
        .select({
            count: count(),
        })
        .from(schema.category)
        .execute();
    return c.json({
        userCount: userCountResult[0].count,
        toolCount: toolCountResult[0].count,
        categoryCount: categoryCount[0].count,
    });
});
