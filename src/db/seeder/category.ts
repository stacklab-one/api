import { faker } from "@faker-js/faker";
import { db } from "@/db";
import schema from "@/db/schema";
import { logger } from "@/setup/logger";

if (
    Bun.env.NODE_ENV !== "development" &&
    Bun.env.NODE_ENV?.toString() !== "test"
) {
    throw new Error(
        "This script must be run in development or test environment.",
    );
}

export async function seed() {
    logger.info("Seeding categories...");
    const categories: (typeof schema.category.$inferInsert)[] = [];
    categoryNames.forEach((name) => {
        categories.push({
            name,
        });
    });
    await db.insert(schema.category).values(categories);
    logger.info("Seeded categories.");
}

export const categoryNames: string[] = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Mobile",
    "Programming Languages",
    "Webdev Libraries",
    "Backend Technologies",
    "Frontend Technologies",
    "CMS",
    "ORM",
    "Search Engines",
    "Testing",
    "Issue Tracking",
    "Code Quality",
    "Code Review",
    "Payment Provider",
    "Live chats",
    "WYSIWYG Editors",
    "Cloud Storage",
    "Cloud Hosting",
    "Cloud Functions",
    "Cloud Databases",
    "Cloud Messaging",
    "Email Delivery",
    "Analytic Tools",
    "SEO Tools",
    "Authentication Providers",
    "CDNs",
    "UI Libraries",
    "Static Site Generators",
    "CSS Frameworks",
    "CSS Preprocessors",
    "Font Provider",
    "Useful Websites",
    "Localization",
    "Development Tools",
    "Project Management Tools",
    "Productivity Tools",
    "Web Component Libraries",
];
