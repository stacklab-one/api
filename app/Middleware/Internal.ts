import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { AuthLevel } from "App/Enums/AuthLevel";

export default class Internal {
    public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
        const user = await auth.use("jwt").user;
        if (!user) {
            return response.forbidden({ message: "You must be logged in to access this resource." });
        }
        if (user.authLevel < AuthLevel.SUPER_ADMIN) {
            return response.forbidden({ message: "You do not have permission to access this resource." });
        }
        // code for middleware goes here. ABOVE THE NEXT CALL
        await next();
    }
}
