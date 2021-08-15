import dotenv from "dotenv";

// Load env variables
dotenv.config();

/**
 * Returns value stored in environment variable with the given `name`.
 * Throws Error if no such variable or if variable undefined; thus ensuring type-safety.
 * @param name - name of variable to fetch from this process's environment.
 */
export function env(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing: process.env['${name}'].`);
  }

  return value;
}

const config = {
  ENV: process.env.NODE_ENV,
  PORT: env("PORT"),
  HOST: env("HOST"),
  CLIENT_URL: env("CLIENT_URL"),
  NOTION_TOKEN: env("NOTION_TOKEN"),
  DATABASE_ID: env("DATABASE_ID"),
};

export default config;
