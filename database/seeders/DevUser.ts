import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Logger from "@ioc:Adonis/Core/Logger";
import UserSeeder from "./User";
import UserFactory from "Database/factories/UserFactory";
import { AuthLevel } from "App/Enums/AuthLevel";

export default class DevUserSeeder extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        Logger.info("Running DevUserSeeder...");
        UserSeeder.users.push(
            await UserFactory.merge([
                {
                    username: "simon",
                    email: "simon@stacklab.one",
                    authLevel: AuthLevel.SUPER_ADMIN,
                },
            ]).create()
        );
        UserSeeder.users.push(
            await UserFactory.merge([
                {
                    username: "Stacklab Bot",
                    authLevel: AuthLevel.SUPER_ADMIN,
                },
            ]).create()
        );
    }
}
