import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { getDatabaseURL } from "./src/db/util";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: getDatabaseURL(),
        ssl: false,
    },
});
