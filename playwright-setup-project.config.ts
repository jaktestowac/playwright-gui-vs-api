import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/04_api_and_gui",
  timeout: 6000,
  reporter: [["html"], ["list"]],
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on",
  },
  projects: [
    {
      name: "setup",
      testMatch: "**/*.setup.ts",
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
    },
  ],
});
