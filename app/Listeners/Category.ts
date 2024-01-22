import type { EventsList } from "@ioc:Adonis/Core/Event";
import Logger from "@ioc:Adonis/Core/Logger";
import { HydrationService } from "App/Services/HydrationService";

export default class Category {
    public async onHydrateSearchIndex() {
        Logger.info(`Hydrate Categories search index`);
        HydrationService.hydrateCategorySearchIndex();
    }
}
