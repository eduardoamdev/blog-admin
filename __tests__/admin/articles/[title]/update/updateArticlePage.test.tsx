jest.mock("../../../../../app/actions/articles/getArticleAction", () => ({
  getArticleAction: jest
    .fn()
    .mockImplementationOnce(() => ({
      title: "x",
      content: "xx",
    }))
    .mockImplementationOnce(() => "Test error")
    .mockImplementationOnce(() => ({
      title: "x",
      content: "xx",
    }))
    .mockImplementationOnce(() => ({
      title: "x",
      content: "xx",
    }))
    .mockImplementationOnce(() => ({
      title: "x",
      content: "xx",
    })),
}));

jest.mock("../../../../../app/actions/articles/updateArticleAction", () => ({
  updateArticleAction: jest
    .fn()
    .mockImplementationOnce(() => ({
      error: false,
      message: "Article successfully updated",
    }))
    .mockImplementationOnce(() => ({
      error: true,
      message: "Test error",
    })),
}));

jest.mock("../../../../../app/components/Navbar", () => {
  const Navbar = () => <div />;

  return Navbar;
});

jest.mock("../../../../../app/components/ArticleActions", () => {
  const ArticleActions = () => <div />;

  return ArticleActions;
});

import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import Page from "../../../../../app/admin/articles/[title]/update/page";

describe("Update article page test", () => {
  it("Renders the complete form after getting an article correctly", async () => {
    render(<Page params={{ title: "Article 1" }} />);

    await waitFor(() => {
      const newArticleTitle = screen.getByRole("heading", {
        name: "Update article",
      });

      const newArticleTitleText =
        screen.getByText("Update article").textContent;

      const titleInputText = screen.getByText("Title").textContent;

      const contentInputText = screen.getByText("Content").textContent;

      const submitInputText = screen.getByText("Submit").textContent;

      expect(newArticleTitle).toBeInTheDocument();
      expect(newArticleTitleText).toBe("Update article");
      expect(titleInputText).toBe("Title");
      expect(contentInputText).toBe("Content");
      expect(submitInputText).toBe("Submit");
    });
  });

  it("Renders the complete form after not been able of getting an article", async () => {
    render(<Page params={{ title: "Article 1" }} />);

    await waitFor(() => {
      const newArticleTitle = screen.getByRole("heading", {
        name: "Update article",
      });

      const newArticleTitleText =
        screen.getByText("Update article").textContent;

      const titleInputText = screen.getByText("Title").textContent;

      const contentInputText = screen.getByText("Content").textContent;

      const submitInputText = screen.getByText("Submit").textContent;

      const errorMessage = screen.getByText("Test error").textContent;

      expect(newArticleTitle).toBeInTheDocument();
      expect(newArticleTitleText).toBe("Update article");
      expect(titleInputText).toBe("Title");
      expect(contentInputText).toBe("Content");
      expect(submitInputText).toBe("Submit");
      expect(errorMessage).toBe("Test error");
    });
  });

  it("Handles input change", async () => {
    render(<Page params={{ title: "Article 1" }} />);

    await waitFor(() => {
      const input: any = screen.getByPlaceholderText("content");

      fireEvent.change(input, { target: { value: "xxx" } });

      expect(input.value).toBe("xxx");
    });
  });

  it("Handles form submit with successful response", async () => {
    render(<Page params={{ title: "Article 1" }} />);

    await waitFor(async () => {
      const submitButton = screen.getByRole("button");

      await act(async () => {
        fireEvent.submit(submitButton);
      });

      const successMessageElement = screen.getByText(
        "Article successfully updated"
      );

      expect(successMessageElement).toBeDefined();
    });
  });

  it("Handles form submit with not successful response", async () => {
    render(<Page params={{ title: "Article 1" }} />);

    await waitFor(async () => {
      const submitButton = screen.getByRole("button");

      await act(async () => {
        fireEvent.submit(submitButton);
      });

      const successMessageElement = screen.getByText("Test error");

      expect(successMessageElement).toBeDefined();
    });
  });
});
