// table schema generated by introspection
import {
    pgTable,
    unique,
    integer,
    varchar,
    uuid,
    boolean,
    timestamp,
    text,
    json,
    bigint,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { AuthLevel } from "@/enums/AuthLevel";

export const user = pgTable(
    "user",
    {
        id: uuid().primaryKey().default(sql`uuid_generate_v4()`),
        firstName: varchar({ length: 255 }),
        lastName: varchar({ length: 255 }),
        username: varchar({ length: 255 }).notNull(),
        email: varchar({ length: 255 }).notNull(),
        password: varchar({ length: 255 }),
        authLevel: integer().notNull().default(AuthLevel.USER),
        isActive: boolean().notNull().default(true),
        externalId: varchar({ length: 255 }),
        profilePictureUrl: varchar({ length: 255 }),
        portraitId: uuid().references(() => media.id),

        createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
        updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
        deletedAt: timestamp({ withTimezone: true }).default(sql`NULL`),
    },
    (table) => {
        return {
            usersEmailUnique: unique("users_email_unique").on(table.email),
        };
    },
);

export const tool = pgTable(
    "tool",
    {
        id: uuid().primaryKey().default(sql`uuid_generate_v4()`),
        name: varchar({ length: 255 }).notNull(),
        descriptionShort: varchar({ length: 255 }).notNull(),
        description: text().notNull(),
        url: varchar({ length: 255 }).notNull(),
        repositoryUrl: varchar({ length: 255 }),
        registryUrl: varchar({ length: 255 }),
        tags: json().notNull().default([]),
        iconText: varchar({ length: 255 }),
        icon: uuid().references(() => media.id),
        backgroundImage: uuid(),
        hasFreeVersion: boolean().notNull().default(false),
        hasPaidVersion: boolean().notNull().default(false),
        isOpenSource: boolean().notNull().default(false),
        hydratedAt: timestamp({ withTimezone: true }).default(sql`NULL`),
        createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
        updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
        deletedAt: timestamp({ withTimezone: true }).default(sql`NULL`),
        languages: json().notNull().default([]),
        license: varchar({ length: 255 }),
        licenseUrl: varchar({ length: 255 }),
    },
    (table) => {
        return {};
    },
);

export const toolSnapshot = pgTable(
    "tool_snapshots",
    {
        id: uuid().primaryKey().default(sql`uuid_generate_v4()`),
        toolId: uuid()
            .notNull()
            .references(() => tool.id),
        createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
        stars: integer().notNull().default(0),
        openIssues: integer().notNull().default(0),
        forks: integer().notNull().default(0),
        numberOfReleases: integer().notNull().default(0),
        latestRelease: varchar({ length: 255 }),
        latestReleaseUrl: varchar({ length: 255 }),
        repositoryData: json().notNull().default({}),
    },
    (table) => {
        return {};
    },
);

export const toolRelations = relations(tool, ({ many }) => {
    return {
        snapshots: many(toolSnapshot),
        categoryToolConnections: many(categoryToolConnections),
    };
});

export const toolSnapshotRelations = relations(toolSnapshot, ({ one }) => {
    return {
        tool: one(tool),
    };
});

export const category = pgTable(
    "category",
    {
        id: uuid().primaryKey().default(sql`uuid_generate_v4()`),
        name: varchar({ length: 255 }).notNull(),
        tags: json().notNull().default([]),
        icon: uuid().references(() => media.id),
    },
    (table) => {
        return {};
    },
);

export const media = pgTable("media", {
    id: uuid().primaryKey().default(sql`uuid_generate_v4()`),
    fileName: varchar({ length: 255 }).notNull(),
    fileType: varchar({ length: 8 }).notNull(),
    fileSize: bigint({ mode: "bigint" }),
    fileHash: varchar({ length: 255 }).notNull(),
    location: varchar({ length: 255 }).notNull(),
});

export const categoryToolConnections = pgTable("category_tool_connection", {
    id: uuid().primaryKey().default(sql`uuid_generate_v4()`),
    categoryId: uuid()
        .notNull()
        .references(() => category.id),
    toolId: uuid()
        .notNull()
        .references(() => tool.id),
});

export const categoryRelations = relations(category, ({ many }) => {
    return {
        toolConnections: many(categoryToolConnections),
    };
});

export const categoryToolConnectionsRelations = relations(
    categoryToolConnections,
    ({ one }) => {
        return {
            category: one(category),
            tool: one(tool),
        };
    },
);

export default {
    user,
    tool,
    toolSnapshot,
    category,
    media,
    categoryToolConnections,
};
