import { expect, test } from "@playwright/test";
import { createArticle, createUser, logIn } from "./05_ex04_external_functions";

// To use that tests use command with dedicated config playwright-seed-project.config.ts:
// npx playwright test --config=playwright-seed-project.config.ts tests/05_fun/05_ex05.seeding.seed.ts
test("GAD responding with OK", async ({ request }) => {
  // Act
  const serviceResponse = await request.get("/api/health");

  // Assert
  expect(serviceResponse.ok()).toBeTruthy();
});

test("GAD reset empty database", async ({ request }) => {
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

  for (let i = 0; i < 10; i++) {
    test(`GAD seeding article ${i}`, async ({ request }) => {
      // Act
      const articleResponse = await createArticle(request, token);

      // Assert
      expect(articleResponse.ok()).toBeTruthy();
    });
  }
});
