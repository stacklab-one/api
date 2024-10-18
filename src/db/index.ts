import "dotenv/config";
import { drizzle } from "drizzle-orm/connect";
import * as schema from "./schema";
import { getDatabaseURL } from "./util";

const db = await drizzle("node-postgres", {
    connection: getDatabaseURL(),
    schema,
    casing: "snake_case",
});

export { db, schema };
