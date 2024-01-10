import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
    protected tableName = "tools";

    public async up() {
        this.schema.table(this.tableName, (table) => {
            table.string("license").nullable();
            table.string("icon_identifier").nullable();
        });
    }

    public async down() {
        this.schema.table(this.tableName, (table) => {
            table.dropColumn("license");
            table.dropColumn("icon_identifier");
        });
    }
}
