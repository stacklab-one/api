import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Tool from "./Tool";
import Tag from "./Tag";
import { TagConnectionCreationType } from "App/Enums/TagConnectionCreationType";

export default class ToolTag extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public toolId: string;

    @belongsTo(() => Tool)
    public tool: BelongsTo<typeof Tool>;

    @column()
    public tagId: string;

    @belongsTo(() => Tag)
    public tag: BelongsTo<typeof Tag>;

    @column()
    public creationType: TagConnectionCreationType;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;
}
