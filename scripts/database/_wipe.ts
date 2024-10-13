import { db, schema } from "../../src/db";

console.log("Wiping the database....");
await db.delete(schema.user);
await db.delete(schema.toolSnapshot);
await db.delete(schema.tool);
await db.delete(schema.category);
