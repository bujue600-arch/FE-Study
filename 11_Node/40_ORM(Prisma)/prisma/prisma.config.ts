import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "prisma/config";

const configDir = dirname(fileURLToPath(import.meta.url));

function readEnvValue(filePath: string, key: string) {
  if (!existsSync(filePath)) return undefined;

  const line = readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .find((item) => item.trim().startsWith(`${key}=`));

  return line?.split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "");
}

export default defineConfig({
  schema: "schema.prisma",
  migrations: {
    path: "migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"] ?? readEnvValue(resolve(configDir, "../.env"), "DATABASE_URL"),
  },
});
