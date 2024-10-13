import { Hono } from "hono";
import { db } from "./db";

const app = new Hono();

app.get("/", async (c) => {
    return c.json(await db.query.users.findMany());
});

export default app;
