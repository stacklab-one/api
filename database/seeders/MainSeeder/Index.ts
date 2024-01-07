import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Application from "@ioc:Adonis/Core/Application";

export default class extends BaseSeeder {
    private async runSeeder(seeder: { default: typeof BaseSeeder }) {
        if (!Application.inDev && !Application.inTest) {
            return;
        }

        await new seeder.default(this.client).run();
    }

    public async run() {
        // Write your database queries inside the run method
        await this.runSeeder(await import("../DevUser"));
        await this.runSeeder(await import("../User"));
        await this.runSeeder(await import("../Tool"));
        await this.runSeeder(await import("../Category"));
        await this.runSeeder(await import("../CategoryTool"));
    }
}
