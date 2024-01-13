import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import ToolFactory from "Database/factories/ToolFactory";
import Logger from "@ioc:Adonis/Core/Logger";
import Tool from "App/Models/Tool";

export default class ToolSeeder extends BaseSeeder {
    public static toolIds: string[] = [];

    public async run() {
        // Write your database queries inside the run method
        Logger.info("Running ToolSeeder...");
        await ToolFactory.createMany(200);
        const toolQuery = await Tool.query().select("id").exec();
        ToolSeeder.toolIds = toolQuery.map((tool) => tool.id);
    }
}
