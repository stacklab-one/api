import { hash } from "bun";
import { db, schema } from "../../src/db";
import { AuthLevel } from "../../src/enums/AuthLevel";

import "./_wipe";
console.log("Seeding the database....");

console.log("Creating admin users...");
await db.insert(schema.user).values({
    email: "simon@stacklab.one",
    firstName: "Simon",
    lastName: "Schwedes",
    username: "simon",
    authLevel: AuthLevel.ADMIN,
    isActive: true,
    password: await Bun.password.hash("changeme", "bcrypt"),
});

await db.insert(schema.user).values({
    email: "pascal@stacklab.one",
    firstName: "Pascal",
    lastName: "Haupt",
    username: "pascal",
    authLevel: AuthLevel.ADMIN,
    isActive: true,
    password: await Bun.password.hash("changeme", "bcrypt"),
});
console.log("Created admin users.");
