import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class UserController {
    public async getUserById({ request, response }: HttpContextContract): Promise<User | null> {
        const requestSchema = schema.create({
            id: schema.string([rules.uuid()]),
        });
        const payload = await request.validate({ schema: requestSchema });
        try {
            return await User.findOrFail(payload.id);
        } catch (e) {
            response.notFound({ message: "User not found" });
            return null;
        }
    }
}
