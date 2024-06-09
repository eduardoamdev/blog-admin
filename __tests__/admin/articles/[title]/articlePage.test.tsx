jest.mock("../../../../app/components/Navbar", () => {
  const Navbar = () => <div />;

  return Navbar;
});

jest.mock("../../../../app/lib/database", () => {
  const connectToDB = jest.fn();

  const dbClient = {
    query: jest
      .fn()
      .mockImplementationOnce(
        jest.fn(() => {
          return {
            rows: [
              {
                title: "Article 1",
                content: "Article 1 content",
              },
            ],
          };
        })
      )
      .mockImplementationOnce(
        jest.fn(() => {
          return {
            rows: [],
          };
        })
      )
      .mockImplementationOnce(
        jest.fn(() => {
          throw new Error("Test error");
        })
      ),
  };

  return { connectToDB, dbClient };
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../../../../app/admin/articles/[title]/page";

describe("Article page test", () => {
  it("Renders article", async () => {
    render(await Page({ params: { title: "Article 1" } }));

    const article1Title = screen.getByText("Article 1").textContent;

    expect(article1Title).toBeDefined();
  });

  it("Renders error message when dbClient.query does not return any row", async () => {
    render(await Page({ params: { title: "Article 1" } }));

    const errorMessage = screen.getByText("Article not found").textContent;

    expect(errorMessage).toBeDefined();
  });

  it("Renders error message when dbClient.query throws an error", async () => {
    render(await Page({ params: { title: "Article 1" } }));

    const errorMessage = screen.getByText("Test error").textContent;

    expect(errorMessage).toBeDefined();
  });
});
