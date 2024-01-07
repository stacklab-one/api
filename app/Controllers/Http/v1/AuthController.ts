import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

export default class AuthController {
    public async login({ request, auth, response }: HttpContextContract) {
        const [email, password] = atob(request.header("Authorization")!.split(" ")[1]).split(":");
        try {
            const user = await User.query().andWhereRaw("LOWER(email) = ?", [email.toLowerCase()]).firstOrFail();
            const isPasswordMatching = Hash.verify(user.password, password);
            if (!isPasswordMatching) {
                throw new Error("Invalid credentials");
            }
            const token = await auth.use("jwt").login(user);
            return response.ok(token.toJSON());
        } catch (error) {
            Logger.error(error);
            return response.badRequest({ message: "Invalid credentials" });
        }
    }
}
