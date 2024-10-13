import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const databaseUrl = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@localhost:5438/${process.env.PG_DATABASE}`;
export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl!,
    ssl: false,
  },
});