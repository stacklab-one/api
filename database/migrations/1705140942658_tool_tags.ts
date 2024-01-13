import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { TagConnectionCreationType } from "App/Enums/TagConnectionCreationType";

export default class extends BaseSchema {
    protected tableName = "tool_tags";

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid("id").primary().defaultTo(this.raw("uuid_generate_v4()"));
            table.uuid("tool_id").notNullable().references("id").inTable("tools").onDelete("CASCADE");
            table.uuid("tag_id").notNullable().references("id").inTable("tags").onDelete("CASCADE");
            table.integer("creation_type").notNullable().defaultTo(TagConnectionCreationType.HYDRATION);

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp("created_at", { useTz: true });
            table.timestamp("updated_at", { useTz: true });
        });
    }

    public async down() {
        this.schema.dropTable(this.tableName);
    }
}
