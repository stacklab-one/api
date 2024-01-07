import { DateTime } from "luxon";
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from "@ioc:Adonis/Lucid/Orm";
import { AuthLevel } from "App/Enums/AuthLevel";
import Tool from "./Tool";
import Media from "./Media";
import Stack from "./Stack";

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public username: string;

    @column()
    public email: string;

    @column()
    public password: string;

    @column()
    public authLevel: AuthLevel;

    @column()
    public rememberMeToken: string;

    @column()
    public profilePictureId: string;

    @hasOne(() => Media)
    public profilePicture: HasOne<typeof Media>;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @hasMany(() => Tool, {
        foreignKey: "createdBy",
    })
    public tools: HasMany<typeof Tool>;

    @hasMany(() => Stack, {
        foreignKey: "authorId",
    })
    public stacks: HasMany<typeof Stack>;
}
