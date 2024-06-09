import { expect, test } from "@playwright/test";

// Check wait for response in createArticleGUI() function

const articleData = {
  title: "How to write effective test cases",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  date: "2024-04-30T15:44:31Z",
  image: "",
};

test.beforeEach(async ({ page }) => {
  await logInGUI(page);
});

test("article with custom title is available via API", async ({
  page,
  request,
}) => {
  // Arrange
  const expectedTitle = articleData.title;
  const articleId = await createArticleGUI(page, articleData);

  // Act
  // Check if article is available via API
  const responseArticle = await request.get(`/api/articles/${articleId}`);
  const articleJSON = await responseArticle.json();

  const observedTitle = articleJSON.title;

  // Assert
  expect(observedTitle).toMatch(expectedTitle);
});

async function logInGUI(page) {
  // Go to login
  await page.goto("/login/");

  // Enter user data and hit login button
  await page
    .getByPlaceholder("Enter User Email")
    .fill("Moses.Armstrong@Feest.ca");
  await page.getByPlaceholder("Enter Password").fill("test1");
  await page.getByRole("button", { name: "LogIn" }).click();
}

async function createArticleGUI(page, articleData) {
  await page.getByTestId("open-articles").click();
  await page.getByRole("button", { name: "Add Article" }).click();

  // Create article with expected data
  await page.getByTestId("title-input").fill(articleData.title);
  await page.getByTestId("body-text").fill("Test text");

  // 🌟 Wait for response
  const responsePromise = page.waitForResponse("**/api/articles/**");
  await page.getByTestId("save").click();

  // Check response
  const response = await responsePromise;
  const article = await response.json();
  const articleId = article.id;

  return articleId;
}
