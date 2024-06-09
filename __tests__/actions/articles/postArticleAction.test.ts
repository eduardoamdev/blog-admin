jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
}));

jest.mock("../../../app/lib/database", () => ({
  connectToDB: jest.fn(),
  dbClient: {
    query: jest
      .fn()
      .mockImplementationOnce(
        jest.fn(() => ({ rows: [{ title: "x", content: "x" }] }))
      )
      .mockImplementationOnce(jest.fn(() => ({ rows: [] })))
      .mockImplementationOnce(jest.fn())
      .mockImplementationOnce(
        jest.fn(() => {
          throw new Error("Test error");
        })
      ),
  },
}));

import { postArticleAction } from "../../../app/actions/articles/postArticleAction";

describe("postArticleAction test", () => {
  it("May return a string 'An article with this title already exists' in case of finding an existing user with that name in the database", async () => {
    const response = await postArticleAction("x", "x");

    expect(response).toEqual("An article with this title already exists");
  });

  it("May return a string 'Article has been posted successfully' in case of finding an existing user with that name in the database", async () => {
    const response = await postArticleAction("x", "x");

    expect(response).toEqual("Article has been posted successfully");
  });

  it("May return a string 'Test error' in case of an error thrown in the try", async () => {
    const response = await postArticleAction("x", "x");

    expect(response).toEqual("Test error");
  });
});
