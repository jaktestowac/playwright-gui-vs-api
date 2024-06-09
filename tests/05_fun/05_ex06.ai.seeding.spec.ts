import { expect, test } from "@playwright/test";
import {
  aiTask,
  createArticle,
  createUser,
  logIn,
} from "./05_ex04_external_functions";
import { promptBody, promptTitle } from "./prompt";

// To use this test you need to have specified API key to OPENAI service in .env file
// npx playwright test --config=playwright-ai-project.config.ts
test("GAD responding with OK", async ({ request }) => {
  // Act
  const serviceResponse = await request.get("/api/health");

  // Assert
  expect(serviceResponse.ok()).toBeTruthy();
});

test("GAD restore database", async ({ request }) => {
  // Act
  const serviceResponse = await request.get("/api/restoreEmptyDB");

  // Assert
  expect(serviceResponse.ok()).toBeTruthy();
});

test.describe("GAD seeding", () => {
  let token;

  test.beforeAll(async ({ request }) => {
    const user = await createUser(request);
    token = await logIn(request, user);
  });

  for (let i = 0; i < 6; i++) {
    test(`GAD seeding article ${i}`, async ({ request }) => {
      const title = await aiTask(request, promptTitle);
      const body = await aiTask(request, `${promptBody}${title}`);

      // Act
      const articleResponse = await createArticle(
        request,
        token,
        false,
        title,
        body,
      );

      // Assert
      expect(articleResponse.ok()).toBeTruthy();
    });
  }
});
