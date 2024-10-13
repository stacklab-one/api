import { Hono } from "hono";
import { db } from "./db";
import { authModule } from "./auth/routing";
import packageJson from "../package.json";

const app = new Hono();

app.get("/", async (c) => {
    console.log(packageJson);
    return c.json({
        version: packageJson.version,
    });
});

// register modules
app.route("/auth", authModule);

export default app;
