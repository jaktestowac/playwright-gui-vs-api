import { expect, test } from "@playwright/test";

test("article contain title", async ({ page }) => {
  await page.goto("http://localhost:3000/article.html?id=1");
  await expect(page.getByTestId("article-title")).toContainText(
    "How to write effective test cases",
  );
});
