import { Hono } from "hono";
import { db } from "./db";
import { authModule } from "./auth/routing";
import packageJson from "../package.json";

console.log(new Date().toISOString(), "Starting the server...");

const app = new Hono();

app.get("/", async (c) => {
    return c.json({
        version: packageJson.version,
        users: await db.query.user.findMany(),
    });
});

// register modules
app.route("/auth", authModule);

export default app;
