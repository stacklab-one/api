import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { MediaContext } from "App/Enums/MediaContext";

export default class extends BaseSchema {
    protected tableName = "medias";

    public async up() {
        this.schema.table(this.tableName, (table) => {
            table.integer("context").notNullable().defaultTo(MediaContext.OTHER);
        });
    }

    public async down() {
        this.schema.table(this.tableName, (table) => {
            table.dropColumn("context");
        });
    }
}
