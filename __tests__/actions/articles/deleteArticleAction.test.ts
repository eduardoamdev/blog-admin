jest.mock("../../../app/lib/database", () => ({
  connectToDB: jest.fn(),
  dbClient: {
    query: jest
      .fn()
      .mockImplementationOnce(jest.fn())
      .mockImplementationOnce(
        jest.fn(() => {
          throw new Error("Test error");
        })
      ),
  },
}));

jest.mock("next/cache");

import { deleteArticleAction } from "../../../app/actions/articles/deleteArticleAction";

describe("Delete article action test", () => {
  it("Article correctly delete", async () => {
    const response = await deleteArticleAction("x");

    expect(response).toBeUndefined();
  });

  it("Article not correctly delete", async () => {
    const response = await deleteArticleAction("x");

    expect(response).toEqual("Test error");
  });
});
