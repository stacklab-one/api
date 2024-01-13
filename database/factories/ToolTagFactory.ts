import ToolTag from "App/Models/ToolTag";
import Factory from "@ioc:Adonis/Lucid/Factory";
import ToolSeeder from "Database/seeders/Tool";
import TagSeeder from "Database/seeders/Tag";

export default Factory.define(ToolTag, ({ faker }) => {
    return {
        //
        toolId: faker.helpers.arrayElement(ToolSeeder.toolIds),
        tagId: faker.helpers.arrayElement(TagSeeder.tagIds),
    };
}).build();
