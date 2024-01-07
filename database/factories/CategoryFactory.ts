import Category from "App/Models/Category";
import Factory from "@ioc:Adonis/Lucid/Factory";
import { categoryNames } from "Database/seeder/data/CategorySamples";

export default Factory.define(Category, ({ faker }) => {
    return {
        name: faker.helpers.arrayElement(categoryNames),
        description: faker.lorem.paragraph(),
        tags: JSON.stringify(faker.lorem.words(3).split(" ")) as any as string[],
    };
}).build();
