import { expect, test } from "@playwright/test";

test("create article with custom title - without access token", async ({
  request,
}) => {
  // Arrange
  const expectedTitle = "So custom title";
  const articlesUrl = "/api/articles";

  const articleData = {
    title: expectedTitle,
    body: "Test text",
    date: "2024-04-30T15:44:31Z",
    image: "",
  };

  // Act
  const response = await request.post(articlesUrl, {
    data: articleData,
  });
  const responseJson = await response.json();

  // Assert
  const observedTitle = responseJson.title;
  expect(observedTitle).toMatch(expectedTitle);
});

test("create article with custom title - with access token", async ({
  request,
}) => {
  // Arrange
  const expectedTitle = "So custom title";
  const articlesUrl = "/api/articles";

  const articleData = {
    title: expectedTitle,
    body: "Test text",
    date: "2024-04-30T15:44:31Z",
    image: "",
  };

  // Act
  const response = await request.post(articlesUrl, {
    // headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik1vc2VzLkFybXN0cm9uZ0BGZWVzdC5jYSIsImRhdGEiOiJUQkQiLCJpYXQiOjE3MTU5NTA2MDksImV4cCI6MTcxNTk1NDIwOX0.IjVf6fcTPaW6aaG0-R8JUJ1-ELcWC38Ct6ldduIK6R4 `},
    headers: { Authorization: `Bearer ` },
    data: articleData,
  });
  const responseJson = await response.json();

  // Assert
  const observedTitle = responseJson.title;
  expect(observedTitle).toMatch(expectedTitle);
});
