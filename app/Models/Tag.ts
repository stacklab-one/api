import { DateTime } from "luxon";
import { BaseModel, column, computed } from "@ioc:Adonis/Lucid/Orm";

export default class Tag extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public tag: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @computed()
    public get sanitizedTagName() {
        return this.tag.toLowerCase().replace(" ", "").replace("-", "");
    }
}
