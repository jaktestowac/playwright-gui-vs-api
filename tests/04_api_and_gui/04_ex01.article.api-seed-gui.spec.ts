import { expect, test } from "@playwright/test";

let articleJson;
const articleData = {
  title: "How to write effective test cases",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  date: "2024-04-30T15:44:31Z",
  image: "",
};

test.describe("Check article title", () => {
  test.beforeEach("create article", async ({ request }) => {
    const headers = await logInAPI(request);
    articleJson = await createArticleAPI(request, articleData, headers);
  });

  test("article contain title", async ({ page }) => {
    // Arrange
    const expectedTitle = articleData.title;

    // Act
    // Check how we get ID from articleJson
    await page.goto(`/article.html?id=${articleJson.id}`);
    const observedTitle = page.getByTestId("article-title");

    // Assert
    await expect(observedTitle).toHaveText(expectedTitle);
  });
});

async function createArticleAPI(request, articleData, headers) {
  const response = await request.post("/api/articles", {
    headers,
    data: articleData,
  });

  return await response.json();
}

async function logInAPI(request) {
  const loginUrl = "/api/login";
  const userData = {
    email: "Moses.Armstrong@Feest.ca",
    password: "test1",
  };

  const responseLogin = await request.post(loginUrl, {
    data: userData,
  });
  const responseLoginJson = await responseLogin.json();

  return {
    Authorization: `Bearer ${responseLoginJson.access_token}`,
  };
}
