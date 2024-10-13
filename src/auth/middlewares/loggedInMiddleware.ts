import type { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { getJwtSecret } from "../util";

export async function loggedInMiddleware(c: Context, next: Next) {
    const authorizationHeader = c.req.header("Authorization");
    if (!authorizationHeader) {
        return c.json({ message: "Unauthorized" }, 401);
    }
    if (!authorizationHeader.startsWith("Bearer ")) {
        return c.json({ message: "Unauthorized" }, 401);
    }
    const token = authorizationHeader.split(" ")[1];
    try {
        const payload = await verify(token, getJwtSecret(), "HS256");
        c.set("jwtPayload", payload);
        await next();
    } catch (e) {
        return c.json({ message: "Unauthorized" }, 401);
    }
}
