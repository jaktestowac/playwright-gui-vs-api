import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 6000,
  reporter: [["html"], ["list"]],
  fullyParallel: true,
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
