import { expect, test } from "@playwright/test";

test("article contain title recorded", async ({ page }) => {
  // before recording get article url
  await page.goto("http://localhost:3000/article.html?id=1");
  await expect(page.getByTestId("article-title")).toContainText(
    "How to write effective test cases",
  );
});
