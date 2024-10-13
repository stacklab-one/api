import { Hono } from "hono";
import { jwt, sign } from "hono/jwt";
import { getJwtSecret } from "./util";
import {
    getCookie,
    getSignedCookie,
    setCookie,
    setSignedCookie,
    deleteCookie,
} from "hono/cookie";

export const authModule = new Hono();

authModule.get(
    "/verify",
    jwt({
        secret: getJwtSecret(),
        alg: "HS256",
        cookie: "jwt",
    }),
    async (c) => {
        return c.json({ message: "Hello, Auth World!" });
    },
);

authModule.get("/login", async (c) => {
    const token = await sign(
        {
            message: "Hello workd",
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            iat: Math.floor(Date.now() / 1000),
            nbf: Math.floor(Date.now() / 1000),
        },
        getJwtSecret(),
        "HS256",
    );
    setCookie(c, "jwt", token, {
        maxAge: 60 * 60,
        secure: true,
        httpOnly: true,
    });
    return c.json({ message: "Logged in!" });
});
