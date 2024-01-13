import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
    protected tableName = "tools";

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid("id").primary().defaultTo(this.raw("uuid_generate_v4()"));
            table.string("name").notNullable();
            table.string("website_url").nullable();
            table.string("repository_url").nullable();
            table.string("documentation_url").nullable();
            table.string("description").nullable();
            table.boolean("has_free_version").nullable();
            table.boolean("is_self_hostable").nullable();
            table.jsonb("og_data").nullable();
            table.boolean("is_archived").nullable();
            table.timestamp("hydrated_at").nullable();

            table.uuid("created_by").references("id").inTable("users").onDelete("SET NULL");
            table.uuid("updated_by").references("id").inTable("users").onDelete("SET NULL");
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
