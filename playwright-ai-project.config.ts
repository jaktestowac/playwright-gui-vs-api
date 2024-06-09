import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config({ override: true });
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default defineConfig({
  testDir: "./tests/05_fun",
  testMatch: "**/*.ai.seeding.spec.ts",
  timeout: 17000,
  reporter: [["html"], ["list"]],
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
