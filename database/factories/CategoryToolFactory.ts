import Factory from "@ioc:Adonis/Lucid/Factory";
import CategoryTool from "App/Models/CategoryTool";
import CategoryToolSeeder from "Database/seeders/CategoryTool";

export default Factory.define(CategoryTool, ({ faker }) => {
    return {
        toolId: faker.helpers.arrayElement(CategoryToolSeeder.toolIds),
        categoryId: faker.helpers.arrayElement(CategoryToolSeeder.categoryIds),
    };
}).build();
