import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import ToolFactory from "Database/factories/ToolFactory";
import Logger from "@ioc:Adonis/Core/Logger";

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method
        Logger.info("Running ToolSeeder...");
        await ToolFactory.createMany(200);
    }
}
