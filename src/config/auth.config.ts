import type { AuthLevel } from "@/enums/AuthLevel";

export const authConfig = {
    cookieName: "s1-jwt",
};

export type AuthCookiePayload = {
    s1: {
        userId: string;
        authLevel: AuthLevel;
    };
    exp: number;
    iat: number;
    nbf: number;
};
