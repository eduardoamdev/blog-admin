jest.mock("../../../app/lib/database", () => ({
  connectToDB: jest.fn(),
  dbClient: {
    query: jest.fn(),
  },
}));

jest.mock("next/cache");

import { updateArticleAction } from "../../../app/actions/articles/updateArticleAction";

describe("updateArticleAction test", () => {
  it("Article correctly update", async () => {
    const response = await updateArticleAction("x", "xx");

    expect(response.message).toEqual("Article has been updated successfully");
  });

  it("Article not correctly update", async () => {
    const response = await updateArticleAction("x", undefined);

    expect(response.message).toEqual("Content is required");
  });
});
