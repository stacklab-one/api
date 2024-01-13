import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import CategoryTagFactory from "Database/factories/CategoryTagFactory";
import Logger from "@ioc:Adonis/Core/Logger";

export default class CategoryTagSeeder extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        Logger.info("Running CategoryTagSeeder...");
        await CategoryTagFactory.createMany(1000);
    }
}
