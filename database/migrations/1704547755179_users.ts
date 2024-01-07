import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { AuthLevel } from "App/Enumts/AuthLevel";

export default class extends BaseSchema {
    protected tableName = "users";

    public async up() {
        await this.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

        this.schema.createTable(this.tableName, (table) => {
            table.uuid("id").primary().defaultTo(this.raw("uuid_generate_v4()"));
            table.string("username").notNullable().unique();
            table.string("email").notNullable().unique();
            table.string("password").notNullable();
            table.integer("auth_level").notNullable().defaultTo(AuthLevel.USER);

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp("created_at", { useTz: true });
            table.timestamp("updated_at", { useTz: true });
        });
    }

    public async down() {
        await this.schema.dropTableIfExists(this.tableName);
        await this.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
    }
}
