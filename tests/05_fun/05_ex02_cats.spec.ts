import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

const img = "https://cataas.com/cat";

const userData = {
  email: faker.internet.email(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  password: faker.internet.password(),
  avatar: img,
};

test("register user cats api", async ({ request }) => {
  const responseUser = await request.post("/api/users", {
    data: userData,
  });

  expect(responseUser.ok()).toBeTruthy();
});
