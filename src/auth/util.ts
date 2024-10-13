export function getJwtSecret(): string {
    return Bun.env.JWT_SECRET!;
}
