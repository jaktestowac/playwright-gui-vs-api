import { expect, test } from "@playwright/test";

// To get this working use playwright-setup-project.config.ts
// npx playwright test --config=playwright-setup-project.config.ts tests/04_api_and_gui/04_ex05.article-get.gui.spec.ts

test("GAD responding with OK", async ({ request }) => {
  // Act
  const serviceResponse = await request.get("/api/health");

  // Assert
  expect(serviceResponse.ok()).toBeTruthy();
});

test("GAD restore database with sample data", async ({ request }) => {
  // Act
  const serviceResponse = await request.get("/api/restoreDB");

  // Assert
  expect(serviceResponse.ok()).toBeTruthy();
});

test.describe("Execute action with login", () => {
  let headers = {};

  test.beforeEach("login to service", async ({ request }) => {
    const loginUrl = "/api/login";
    const userData = {
      email: "Moses.Armstrong@Feest.ca",
      password: "test1",
    };

    const responseLogin = await request.post(loginUrl, {
      data: userData,
    });
    const responseLoginJson = await responseLogin.json();

    headers = {
      Authorization: `Bearer ${responseLoginJson.access_token}`,
    };
  });

  test("create article with custom title - with access token", async ({
    request,
  }) => {
    // Arrange
    const expectedTitle = "So custom title";
    const articlesUrl = "/api/articles";

    const articleData = {
      title: expectedTitle,
      body: "Test text",
      date: "2024-05-30T10:25:31Z",
      image: "",
    };

    // Act
    const response = await request.post(articlesUrl, {
      headers: headers,
      data: articleData,
    });
    const responseJson = await response.json();

    // Assert
    const observedTitle = responseJson.title;
    expect(observedTitle).toMatch(expectedTitle);
  });
});
