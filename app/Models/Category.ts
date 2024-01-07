import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Tool from "./Tool";
import CategoryTool from "./CategoryTool";

export default class Category extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public name: string;

    @column()
    public description: string;

    @column()
    public tags: string[];

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @hasMany(() => CategoryTool)
    public categoryTool: HasMany<typeof CategoryTool>;
}
