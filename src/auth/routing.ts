import { Hono } from "hono";
import { jwt, sign } from "hono/jwt";
import { getJwtSecret } from "./util";
import { setCookie } from "hono/cookie";
import { db } from "../db";
import { DateTime } from "luxon";
import { authConfig, type AuthCookiePayload } from "../config/auth.config";

export const authModule = new Hono();

authModule.get(
    "/verify",
    jwt({
        secret: getJwtSecret(),
        alg: "HS256",
        cookie: authConfig.cookieName,
    }),
    async (c) => {
        return c.json({ message: "Hello, Auth World!" });
    },
);

authModule.post("/login", async (c) => {
    let username: string;
    let password: string;
    try {
        const body = await c.req.json();
        if (!body.username || !body.password) {
            return c.json(
                { message: "Username and password are required" },
                400,
            );
        }
        username = body.username;
        password = body.password;
    } catch (e) {
        return c.json({ message: "Invalid request" }, 400);
    }
    const user = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.username, username),
    });
    if (!user) {
        return c.json({ message: "User not found" }, 404);
    }
    if (
        !user.password ||
        !(await Bun.password.verify(password, user.password))
    ) {
        return c.json({ message: "Invalid password" }, 401);
    }
    const token = await sign(
        {
            s1: {
                userId: user.id,
                authLevel: user.authLevel,
            },
            exp: DateTime.now().plus({ hours: 1 }).toSeconds(),
            iat: DateTime.now().toSeconds(),
            nbf: DateTime.now().toSeconds(),
        } as AuthCookiePayload,
        getJwtSecret(),
        "HS256",
    );
    setCookie(c, authConfig.cookieName, token, {
        maxAge: 60 * 60,
        secure: true,
        httpOnly: true,
    });
    return c.json({ message: "Logged in!" });
});
