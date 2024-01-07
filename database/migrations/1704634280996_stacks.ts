import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
    protected tableName = "stacks";

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid("id").primary().defaultTo(this.raw("uuid_generate_v4()"));
            table.string("name").notNullable();
            table.string("description").notNullable();
            table.jsonb("tags").notNullable().defaultTo("[]");
            table.boolean("is_private").nullable();
            table.string("website_url").nullable();
            table.string("repository_url").nullable();
            table.uuid("author_id").references("id").inTable("users").onDelete("SET NULL");

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
