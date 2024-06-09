import { expect, test } from "@playwright/test";

// test("article contain title", async ({ page }) => {
test("article contain title api ", async ({ request }) => {
  const expectedTitle = "How to write effective test cases";

  // await page.goto("/article.html?id=1");
  const responseArticle = await request.get("/api/articles/1");
  const articleJSON = await responseArticle.json();

  // const observedTitle = page.getByTestId("article-title");
  const observedTitle = articleJSON.title;

  expect(observedTitle).toMatch(expectedTitle);
});
