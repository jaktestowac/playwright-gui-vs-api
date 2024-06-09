import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 6000,
  reporter: "html",
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on",
  },
  projects: [
    {
      name: "seed",
      testMatch: "**/*.seed.ts",
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["seed"],
    },
  ],
});
