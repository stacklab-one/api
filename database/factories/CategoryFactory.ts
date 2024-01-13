import Category from "App/Models/Category";
import Factory from "@ioc:Adonis/Lucid/Factory";
import { categoryNames } from "Database/seeders/data/CategorySamples";

export default Factory.define(Category, ({ faker }) => {
    return {
        name: faker.helpers.arrayElement(categoryNames),
        description: faker.lorem.paragraph(),
    };
}).build();
