import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import CategoryTool from "./CategoryTool";
import CategoryTag from "./CategoryTag";

export default class Category extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public name: string;

    @column()
    public description: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @hasMany(() => CategoryTool)
    public categoryTools: HasMany<typeof CategoryTool>;

    @hasMany(() => CategoryTag)
    public categoryTags: HasMany<typeof CategoryTag>;
}
