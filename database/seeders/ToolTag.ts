import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import ToolTagFactory from "Database/factories/ToolTagFactory";
import Logger from "@ioc:Adonis/Core/Logger";

export default class ToolTagSeeder extends BaseSeeder {
    public static toolIds: string[] = [];

    public async run() {
        // Write your database queries inside the run method
        Logger.info("Running ToolTagSeeder...");
        await ToolTagFactory.createMany(1000);
    }
}
