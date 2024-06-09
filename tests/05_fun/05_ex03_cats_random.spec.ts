// json = https://cataas.com/cat?json=true
// https://cataas.com/cat/${json._id}

import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

const userData = {
  email: faker.internet.email(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  password: faker.internet.password(),
};

test.beforeEach(async ({ request }) => {
  const catResponse = await request.get("https://cataas.com/cat?json=true");
  const catJson = await catResponse.json();
  userData["avatar"] = `https://cataas.com/cat/${catJson._id}`;
});

test("register user random cat api", async ({ request }) => {
  const responseUser = await request.post("/api/users", {
    data: userData,
  });

  expect(responseUser.ok()).toBeTruthy();
});
