import meilisearch, { MeiliSearch } from "meilisearch";
import Env from "@ioc:Adonis/Core/Env";

export class MeiliService {
    public static instance: MeiliService;

    public static getInstance(): MeiliService {
        if (!MeiliService.instance) {
            MeiliService.instance = new MeiliService();
        }
        return MeiliService.instance;
    }

    public meilisearch: MeiliSearch;

    private constructor() {
        this.meilisearch = new MeiliSearch({
            host: Env.get("MEILI_HOST"),
            apiKey: Env.get("MEILI_MASTER_KEY"),
        });
    }
}
