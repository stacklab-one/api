import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import CategoryToolFactory from "Database/factories/CategoryToolFactory";
import Logger from "@ioc:Adonis/Core/Logger";

export default class CategoryToolSeeder extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        Logger.info("Running CategoryToolSeeder...");
        await CategoryToolFactory.createMany(250);
    }
}
