import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Stack from "./Stack";
import Tool from "./Tool";

export default class StackTool extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public stackId: string;

    @column()
    public toolId: string;

    @belongsTo(() => Stack)
    public stack: BelongsTo<typeof Stack>;

    @belongsTo(() => Tool)
    public tool: BelongsTo<typeof Tool>;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;
}
