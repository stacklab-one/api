import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { IncidentType } from "App/Enums/IncidentType";

export default class Incident extends BaseModel {
    @column({ isPrimary: true })
    public id: string;

    @column()
    public type: IncidentType;

    @column()
    public title: string;

    @column()
    public description: string;

    @column()
    public data: object;

    @column()
    public isResolved: boolean;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;
}
