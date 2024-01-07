import { DateTime } from "luxon";
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import ToolData from "./ToolData";
import User from "./User";
import Category from "./Category";
import CategoryTool from "./CategoryTool";
import { RepositoryResult, RepositoryService } from "App/Services/RepositoryService";

export default class Tool extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public name: string;

    @column()
    public websiteUrl: string;

    @column()
    public repositoryUrl: string;

    @column()
    public documentationUrl: string;

    @column()
    public description: string;

    @column()
    public tags: string[];

    @column()
    public hasFreeVersion: boolean;

    @column()
    public isSelfHostable: boolean;

    @column()
    public ogData: object;

    @column()
    public isArchived: boolean;

    @column()
    public hydratedAt: DateTime;

    @column()
    public createdBy: string;

    @column()
    public updatedBy: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @hasMany(() => ToolData)
    public toolData: HasMany<typeof ToolData>;

    @belongsTo(() => User)
    public creator: BelongsTo<typeof User>;

    @belongsTo(() => User)
    public updater: BelongsTo<typeof User>;

    @column()
    public categoryId: string;

    @hasMany(() => CategoryTool)
    public categoryTools: HasMany<typeof CategoryTool>;

    public async getRepositoryData(): Promise<RepositoryResult | null> {
        if (this.repositoryUrl === null) {
            return null;
        }
        return RepositoryService.getRepositoryData(this.repositoryUrl);
    }
}
