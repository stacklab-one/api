import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Logger from "@ioc:Adonis/Core/Logger";
import { AuthLevel } from "App/Enums/AuthLevel";

export default class GithubController {
    public async redirect({ ally }: HttpContextContract) {
        return await ally.use("github").redirect();
    }

    public async callback({ ally, response, auth }: HttpContextContract) {
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

            const foundUser = await User.findBy("external_id", githubUser.id);
            if (foundUser) {
                const token = await auth.use("jwt").login(foundUser);
                response.plainCookie("token", token.accessToken, {
                    domain: "localhost",
                    httpOnly: false,
                });
                return response.redirect("http://localhost:3000/account");
            }
            let user = new User();
            if (githubUser.email) {
                user.email = githubUser.email;
                user.externalId = githubUser.id;
                user.authLevel = AuthLevel.USER;

                if (githubUser.name) {
                    user.firstName = githubUser.name.split(" ").slice(0, -1).join(" ");
                    user.lastName = githubUser.name.split(" ").at(-1) ?? "";
                } else {
                    user.firstName = githubUser.original.login;
                }
                user.username = githubUser.original.login;

                if (githubUser.avatarUrl) {
                    user.profilePictureUrl = githubUser.avatarUrl;
                }

                user = await user.save();
                const token = await auth.use("jwt").login(user);
                console.log(token.accessToken);
                response.plainCookie("token", token.accessToken, {
                    domain: "localhost",
                    httpOnly: false,
                });
                return response.redirect("http://localhost:3000/account");
            }
            return response.badRequest("No email provided!");
        } catch (e) {
            Logger.error(e);
            return response.badRequest("Unable to authenticate. Try again later");
        }
    }
}
