import { authConfig, type AuthCookiePayload } from "@/config/auth.config";
import { AuthLevel } from "@/enums/AuthLevel";
import { logger } from "@/setup/logger";
import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { decode } from "hono/jwt";

export function minAuthLevel(
    authLevel: AuthLevel,
): (c: Context, next: Next) => Promise<void | Response> {
    return async (c: Context, next: Next) => {
        const cookie = getCookie(c, authConfig.cookieName);
        if (!cookie) {
            return c.json(
                {
                    message: "Unauthorized.",
                },
                401,
            );
        }
        const payload = decode(cookie).payload as AuthCookiePayload;
        if ((payload.s1.authLevel ?? AuthLevel.PUBLC) < authLevel) {
            return c.json(
                {
                    message: "Unauthorized.",
                },
                401,
            );
        }
        return await next();
    };
}
