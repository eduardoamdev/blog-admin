jest.mock("../../../../app/actions/articles/postArticleAction", () => ({
  postArticleAction: jest
    .fn()
    .mockImplementationOnce(() => ({
      error: false,
      message: "Article successfully created",
    }))
    .mockImplementationOnce(() => ({
      error: true,
      message: "Test error",
    })),
}));

jest.mock("../../../../app/components/Navbar", () => {
  const Navbar = () => <div />;

  return Navbar;
});

import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Page from "../../../../app/admin/articles/new/page";

describe("New article page test", () => {
  it("Renders the complete form", () => {
    render(<Page />);

    const newArticleTitle = screen.getByRole("heading", {
      name: "New article",
    });

    const newArticleTitleText = screen.getByText("New article").textContent;

    const titleInputText = screen.getByText("Title").textContent;

    const contentInputText = screen.getByText("Content").textContent;

    const submitInputText = screen.getByText("Submit").textContent;

    expect(newArticleTitle).toBeInTheDocument();
    expect(newArticleTitleText).toBe("New article");
    expect(titleInputText).toBe("Title");
    expect(contentInputText).toBe("Content");
    expect(submitInputText).toBe("Submit");
  });

  it("Handles input change", () => {
    render(<Page />);

    const input: any = screen.getAllByPlaceholderText("title")[0];

    fireEvent.change(input, { target: { value: "x" } });

    expect(input.value).toBe("x");
  });

  it("Handles form submit with successful response", async () => {
    render(<Page />);

    const submitButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.submit(submitButton);
    });

    const successMessageElement = screen.getByText(
      "Article successfully created"
    );

    expect(successMessageElement).toBeDefined();
  });

  it("Handles form submit with unsuccessful response", async () => {
    render(<Page />);

    const submitButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.submit(submitButton);
    });

    const successMessageElement = screen.getByText("Test error");

    expect(successMessageElement).toBeDefined();
  });
});
