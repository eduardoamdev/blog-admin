jest.mock("../../../../../app/actions/articles/deleteArticleAction", () => ({
  deleteArticleAction: jest
    .fn()
    .mockImplementationOnce(() => {})
    .mockImplementationOnce(() => "Test error"),
}));

jest.mock("../../../../../app/components/Navbar", () => {
  const Navbar = () => <div />;

  return Navbar;
});

jest.mock("../../../../../app/components/ArticleActions", () => {
  const ArticleActions = () => <div />;

  return ArticleActions;
});

jest.mock("../../../../../app/actions/navigation/navigateAction", () => ({
  navigateAction: jest.fn(),
}));

import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import Page from "../../../../../app/admin/articles/[title]/delete/page";
import { navigateAction } from "@/app/actions/navigation/navigateAction";

describe("Update article page test", () => {
  it("Renders the complete conponent", async () => {
    render(<Page params={{ title: "Article 1" }} />);

    const questionText = screen.getByText("Are you sure?").textContent;

    const optionYesText = screen.getByText("Yes").textContent;

    const optionNoText = screen.getByText("No").textContent;

    expect(questionText).toBeDefined();
    expect(optionYesText).toBeDefined();
    expect(optionNoText).toBeDefined();
  });

  it("Delete button clicked and successfully deleted", async () => {
    render(<Page params={{ title: "Article 1" }} />);

    const yesButton = screen.getByText("Yes");

    await act(async () => {
      fireEvent.click(yesButton);
    });

    const questionText = screen.getByText("Are you sure?").textContent;

    const optionYesText = screen.getByText("Yes").textContent;

    const optionNoText = screen.getByText("No").textContent;

    expect(questionText).toBeDefined();
    expect(optionYesText).toBeDefined();
    expect(optionNoText).toBeDefined();
  });

  it("Delete button clicked and not successfully deleted", async () => {
    render(<Page params={{ title: "Article 1" }} />);

    const yesButton = screen.getByText("Yes");

    await act(async () => {
      fireEvent.click(yesButton);
    });

    const errorMessageElement = screen.getByText("Test error");

    expect(errorMessageElement).toBeDefined();
  });

  it("Not delete button clicked", async () => {
    render(<Page params={{ title: "Article 1" }} />);

    const yesButton = screen.getByText("No");

    await act(async () => {
      fireEvent.click(yesButton);
    });

    const questionText = screen.getByText("Are you sure?").textContent;

    const optionYesText = screen.getByText("Yes").textContent;

    const optionNoText = screen.getByText("No").textContent;

    expect(questionText).toBeDefined();
    expect(optionYesText).toBeDefined();
    expect(optionNoText).toBeDefined();
  });
});
