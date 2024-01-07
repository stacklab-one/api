import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Tool from "./Tool";

export default class ToolData extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public toolId: string;

    @belongsTo(() => Tool)
    public tool: BelongsTo<typeof Tool>;

    @column()
    public stars: number;

    @column()
    public forks: number;

    @column()
    public downloads: number;

    @column()
    public openIssues: number;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;
}
