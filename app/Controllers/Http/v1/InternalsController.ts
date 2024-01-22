import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Event from "@ioc:Adonis/Core/Event";

export default class InternalsController {
    public async hydrateTools({ response, auth }: HttpContextContract) {
        const user = (await auth.use("jwt").user)!;
        Event.emit("hydrate:tools", { user });
        return response.ok({ message: "Hydrate Tools" });
    }

    public async hydrateTool({ request, response, auth }: HttpContextContract) {
        const user = (await auth.use("jwt").user)!;
        const toolId = request.param("toolId");
        Event.emit("hydrate:tool", { user, toolId });
        return response.ok({ message: `Hydrate Tool for ${toolId}` });
    }

    public async calculateScores({ response, auth }: HttpContextContract) {
        const user = (await auth.use("jwt").user)!;
        Event.emit("calculate:scores", { user });
        return response.ok({ message: "Calculate Scores" });
    }

    public async calculateScore({ request, response, auth }: HttpContextContract) {
        const user = (await auth.use("jwt").user)!;
        const toolId = request.param("toolId");
        Event.emit("calculate:score", { user, toolId });
        return response.ok({ message: `Calculate Score for ${toolId}` });
    }

    public async hydrateToolSearchIndex({ response }: HttpContextContract) {
        Event.emit("hydrate:tools:searchIndex", {});
        return response.ok({ message: `Hydrate Tools search index` });
    }

    public async hydrateCategorySearchIndex({ response }: HttpContextContract) {
        Event.emit("hydrate:categories:searchIndex", {});
        return response.ok({ message: `Hydrate Categories search index` });
    }
}
