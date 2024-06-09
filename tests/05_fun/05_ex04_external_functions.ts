import { faker } from "@faker-js/faker";
import { OPENAI_API_KEY } from "../../playwright-ai-project.config";

const userData = {
  email: faker.internet.email(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  password: faker.internet.password(),
  avatar: faker.image.avatar(),
};

export async function createUser(request) {
  const responseUser = await request.post("/api/users", {
    data: userData,
  });

  const userJson = await responseUser.json();
  return userJson;
}

export async function createArticle(
  request,
  headers,
  image = false,
  title = false,
  body = false,
) {
  const articleData = {
    title: title || faker.lorem.sentence(),
    body: body || faker.lorem.paragraphs(3),
    date: `${faker.date.recent().toISOString().slice(0, -5)}Z`,
    image: image || faker.image.url(),
  };

  const response = await request.post("/api/articles", {
    headers,
    data: articleData,
  });

  return response;
}

export async function logIn(request, user) {
  const loginUrl = "/api/login";
  const userData = {
    email: user.email,
    password: user.password,
  };
  const responseLogin = await request.post(loginUrl, {
    data: userData,
  });
  const responseLoginJson = await responseLogin.json();

  return {
    Authorization: `Bearer ${responseLoginJson.access_token}`,
  };
}

export async function aiTask(request, prompt) {
  const response = await request.post(
    "https://api.openai.com/v1/chat/completions",
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      },
    },
  );

  const body = await response.json();
  console.log(prompt);
  console.log(body);
  console.log(body.choices[0].message.content);

  return body.choices[0].message.content;
}
