jest.mock("../../../app/components/Navbar", () => {
  const Navbar = () => <div />;

  return Navbar;
});

jest.mock("../../../app/lib/database", () => {
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
              },
              {
                title: "Article 2",
              },
            ],
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
import Page from "../../../app/admin/articles/page";

describe("Articles page test", () => {
  it("Renders articles", async () => {
    render(await Page());

    const article1Title = screen.getByText("Article 1").textContent;

    expect(article1Title).toBeDefined();
  });

  it("Renders error message", async () => {
    render(await Page());

    const errorMessage = screen.getByText("Test error").textContent;

    expect(errorMessage).toBeDefined();
  });
});
