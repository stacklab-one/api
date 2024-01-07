import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Category from "App/Models/Category";
import Tool from "App/Models/Tool";
import CategoryToolFactory from "Database/factories/CategoryToolFactory";
import Logger from "@ioc:Adonis/Core/Logger";

export default class CategoryToolSeeder extends BaseSeeder {
    public static categoryIds: string[] = [];
    public static toolIds: string[] = [];

    public async run() {
        // Write your database queries inside the run method
        Logger.info("Running CategoryToolSeeder...");
        const tools = await Tool.query().select(["id"]).exec();
        const categories = await Category.query().select(["id"]).exec();
        CategoryToolSeeder.categoryIds = categories.map((category) => category.id);
        CategoryToolSeeder.toolIds = tools.map((tool) => tool.id);
        await CategoryToolFactory.createMany(250);
    }
}
