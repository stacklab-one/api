import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Logger from "@ioc:Adonis/Core/Logger";
import User from "App/Models/User";
import UserFactory from "Database/factories/UserFactory";

export default class UserSeeder extends BaseSeeder {
    public static users: User[] = [];

    public async run() {
        // Write your database queries inside the run method
        Logger.info("Running Userseeder...");
        UserSeeder.users = UserSeeder.users.concat(await UserFactory.createMany(50));
    }
}
