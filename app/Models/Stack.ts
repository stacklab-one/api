import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class Stack extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public name: string;

    @column()
    public description: string;

    @column()
    public tags: string[];

    @column()
    public isPrivate: boolean;

    @column()
    public websiteUrl: string;

    @column()
    public repositoryUrl: string;

    @column()
    public authorId: string;

    @belongsTo(() => User)
    public author: BelongsTo<typeof User>;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;
}
