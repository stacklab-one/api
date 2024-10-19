import { faker } from "@faker-js/faker";
import { db, schema } from "@/db";
import { logger } from "@/setup/logger";
import { AuthLevel } from "@/enums/AuthLevel";

if (
    Bun.env.NODE_ENV !== "development" &&
    Bun.env.NODE_ENV?.toString() !== "test"
) {
    throw new Error(
        "This script must be run in development or test environment.",
    );
}

export async function seed() {
    logger.info("Seeding users...");
    logger.info("Seeding admin users...");
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
    logger.info("Seeded admin users.");
    logger.info("Seeding generated users...");
    const users: (typeof schema.user.$inferInsert)[] = [];
    for (let i = 0; i < 50; i++) {
        const username = faker.internet.userName();
        const email = `${username}@${faker.internet.domainName()}`;
        users.push({
            username,
            email,
            password: await Bun.password.hash("changeme", "bcrypt"),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            authLevel: AuthLevel.USER,
            externalId: null,
            isActive: true,
        });
    }
    await db.insert(schema.user).values(users);
    logger.info("Seeded generated users.");
}
