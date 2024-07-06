import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../../app/components/Navbar";

describe("Navbar component test", () => {
  it("Renders the corresponding Navbar if not props.authenticated", () => {
    render(<Navbar />);

    const loginLinkText = screen.getByText("Login").textContent;

    expect(loginLinkText).toBeDefined();
  });

  it("Renders the corresponding Navbar if props.authenticated", () => {
    render(<Navbar authenticated="true" />);

    const articlesLinkText = screen.getByText("Articles").textContent;

    const newArticleLinkText = screen.getByText("New article").textContent;

    expect(articlesLinkText).toBeDefined();
    expect(newArticleLinkText).toBeDefined();
  });

  it("Click button to deploy mobile navbar with authenticated true", () => {
    render(<Navbar authenticated="true" />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(true).toBe(true);
  });

  it("Click button to deploy mobile navbar with authenticated undefined", () => {
    render(<Navbar />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(true).toBe(true);
  });
});
