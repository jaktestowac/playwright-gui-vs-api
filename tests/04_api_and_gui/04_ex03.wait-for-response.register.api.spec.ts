import { expect, test } from "@playwright/test";

test("register user", async ({ page }) => {
  // Arrange
  const userData = {
    email: `asmith${new Date().valueOf()}@gad.test`,
    firstname: "adam",
    lastname: "smith",
    password: "test1",
  };

  // Act
  await page.goto("/register.html");

  await page.getByTestId("firstname-input").fill(userData.firstname);
  await page.getByTestId("lastname-input").fill(userData.lastname);
  await page.getByTestId("email-input").fill(userData.email);
  await page.getByTestId("password-input").fill(userData.password);

  // 🌟 Check response instead of GUI
  const responsePromise = page.waitForResponse("**/api/users");
  await page.getByTestId("register-button").click();

  const response = await responsePromise;

  // Assert
  expect(response.ok()).toBeTruthy();

  const user = await response.json();
  expect(user.firstname).toBe(userData.firstname);
  expect(user.lastname).toBe(userData.lastname);
  expect(user.email).toBe(userData.email);
  expect(user).toHaveProperty("id");
});
