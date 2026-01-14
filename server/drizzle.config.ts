import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env.ts";

export default defineConfig({
  out: "./drizzle",
  schema: "./dist/db/**/*schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
