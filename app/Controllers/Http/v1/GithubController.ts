import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Logger from "@ioc:Adonis/Core/Logger";

export default class GithubController {
    public async redirect({ ally }: HttpContextContract) {
        return await ally.use("github").redirect();
    }

    public async callback({ ally, response }: HttpContextContract) {
        try {
            const gh = ally.use("github");
            if (gh.accessDenied()) {
                return response.forbidden("Access was denied");
            }

            if (gh.stateMisMatch()) {
                return response.badRequest("Request expired. Retry again");
            }

            if (gh.hasError()) {
                return response.badRequest(gh.getError());
            }

            const githubUser = await gh.user();
            const user = new User();
            return githubUser;
        } catch (e) {
            Logger.error(e);
            return response.badRequest("Unable to authenticate. Try again later");
        }
    }
}
