import CategoryTag from "App/Models/CategoryTag";
import Factory from "@ioc:Adonis/Lucid/Factory";
import CategorySeeder from "Database/seeders/Category";
import TagSeeder from "Database/seeders/Tag";

export default Factory.define(CategoryTag, ({ faker }) => {
    return {
        //
        categoryId: faker.helpers.arrayElement(CategorySeeder.categoryIds),
        tagId: faker.helpers.arrayElement(TagSeeder.tagIds),
    };
}).build();
