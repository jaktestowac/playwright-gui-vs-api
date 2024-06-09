import { expect, test } from "@playwright/test";

test("register user", async ({ page }) => {
  // Arrange

  // Act
  await page.goto("/register.html");

  await page.getByTestId("firstname-input").fill("Adam");
  await page.getByTestId("lastname-input").fill("Smith");

  // await page.getByTestId("email-input").fill("asmith@gad.test");
  await page
    .getByTestId("email-input")
    .fill(`asmith${new Date().valueOf()}@gad.test`);
  await page.getByTestId("password-input").fill("test1");
  await page.getByTestId("register-button").click();

  // Assert
  await expect(page.getByTestId("alert-popup")).toContainText("User created");
});
