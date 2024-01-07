import { DateTime } from "luxon";
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Tool from "./Tool";
import Category from "./Category";

export default class CategoryTool extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public categoryId: string;

    @column()
    public toolId: string;

    @belongsTo(() => Category)
    public category: BelongsTo<typeof Category>;

    @belongsTo(() => Tool)
    public tool: BelongsTo<typeof Tool>;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;
}
