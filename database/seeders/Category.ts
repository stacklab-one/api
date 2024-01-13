import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import CategoryFactory from "Database/factories/CategoryFactory";
import Logger from "@ioc:Adonis/Core/Logger";
import Category from "App/Models/Category";

export default class CategorySeeder extends BaseSeeder {
    public static categoryIds: string[] = [];

    public async run() {
        // Write your database queries inside the run method
        Logger.info("Running CategorySeeder...");
        await CategoryFactory.createMany(30);
        const categoryQuery = await Category.query().select("id").exec();
        CategorySeeder.categoryIds = categoryQuery.map((category) => category.id);
    }
}
