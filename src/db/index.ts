import "dotenv/config";
import { drizzle } from "drizzle-orm/connect";
import * as schema from "./schema";

export function getDatabaseURL() {
    return `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
}
const db = await drizzle("node-postgres", {
    connection: getDatabaseURL(),
    schema,
    casing: "camelCase",
});

export { db, schema };
