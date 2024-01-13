import { DateTime } from "luxon";
import { BaseModel, column, computed } from "@ioc:Adonis/Lucid/Orm";
import { MediaContext } from "App/Enums/MediaContext";

export default class Media extends BaseModel {
    public static table = "medias";

    @column({ isPrimary: true })
    public id: string;

    @column()
    public fileName: string;

    @column()
    public filePath: string;

    @column()
    public fileType: string;

    @column()
    public fileSize: number;

    @column()
    public fileNameDisk: string;

    @column()
    public width: number;

    @column()
    public height: number;

    @column()
    public context: MediaContext;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @computed()
    public get location() {
        return `${this.filePath}/${this.fileNameDisk}`;
    }
}
