import { expect, test } from "@playwright/test";

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
