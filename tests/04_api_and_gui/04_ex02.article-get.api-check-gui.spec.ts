import { expect, test } from "@playwright/test";

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
  await page.getByTestId("save").click();
  await page.waitForURL("**/article.html?id=**&msg=Article%20was%20created");

  // Get article id from url
  const url = page.url();
  const articleId = getIdFromUrlAPI(url);
  return articleId;
}

function getIdFromUrlAPI(urlString: string): string | null {
  const url = new URL(urlString);
  const params = new URLSearchParams(url.search);
  return params.get("id");
}
