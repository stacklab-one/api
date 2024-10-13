import { Hono } from "hono";

export const authModule = new Hono();

authModule.get("/test", async (c) => {
    return c.json({ message: "Hello, Auth World!" });
});
