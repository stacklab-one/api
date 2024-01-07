import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
    protected tableName = "users";

    public async up() {
        this.schema.table(this.tableName, (table) => {
            table.uuid("profile_picture_id").references("id").inTable("medias").onDelete("SET NULL");
        });
    }

    public async down() {
        this.schema.table(this.tableName, (table) => {
            table.dropColumn("profile_picture_id");
        });
    }
}
