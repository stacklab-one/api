import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import CategoryFactory from "Database/factories/CategoryFactory";
import Logger from "@ioc:Adonis/Core/Logger";

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        Logger.info("Running CategorySeeder...");
        await CategoryFactory.createMany(30);
    }
}
