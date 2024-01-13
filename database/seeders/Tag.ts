import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Tag from "App/Models/Tag";
import TagFactory from "Database/factories/TagFactory";
import Logger from "@ioc:Adonis/Core/Logger";
import { tagNames } from "./data/TagSamples";

export default class TagSeeder extends BaseSeeder {
    public static tagIds: string[] = [];

    public async run() {
        // Write your database queries inside the run method
        Logger.info("Running TagSeeder...");
        for (let tagName of tagNames) {
            await TagFactory.merge({ tag: tagName }).create();
        }
        const tagQuery = await Tag.query().select("id").exec();
        TagSeeder.tagIds = tagQuery.map((tag) => tag.id);
    }
}
