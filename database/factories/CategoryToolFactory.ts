import Factory from "@ioc:Adonis/Lucid/Factory";
import CategoryTool from "App/Models/CategoryTool";
import CategorySeeder from "Database/seeders/Category";
import ToolSeeder from "Database/seeders/Tool";

export default Factory.define(CategoryTool, ({ faker }) => {
    return {
        toolId: faker.helpers.arrayElement(ToolSeeder.toolIds),
        categoryId: faker.helpers.arrayElement(CategorySeeder.categoryIds),
    };
}).build();
