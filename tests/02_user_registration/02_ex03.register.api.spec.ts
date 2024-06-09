import { expect, test } from "@playwright/test";

test("register user api ", async ({ request }) => {
  const responseUser = await request.post("/api/users", {
    data: {
      // email: `jn${new Date().valueOf()}@test.cnn`,

      firstname: "Adam",
      lastname: "Smith",
      email: `jn@test.cnn`,
      password: "test1",
      birthdate: "",
      avatar: ".\\data\\users\\7a1bf608-915b-4ad2-8972-468d605db110.jpg",
    },
  });

  // console.log(responseUser.ok());

  expect(responseUser.ok()).toBeTruthy();
});
