import User from "App/Models/User";
import Factory from "@ioc:Adonis/Lucid/Factory";
import Hash from "@ioc:Adonis/Core/Hash";
import { AuthLevel } from "App/Enumts/AuthLevel";

export default Factory.define(User, async ({ faker }) => {
    const authLevels = [AuthLevel.USER, AuthLevel.EDITOR, AuthLevel.ADMIN, AuthLevel.SUPER_ADMIN];
    const username = faker.internet.userName();

    return {
        //
        username,
        email: `simon+${username}@stacklab.one`,
        password: await Hash.make("1234"),
        authLevel: faker.helpers.arrayElement(authLevels),
    };
}).build();
