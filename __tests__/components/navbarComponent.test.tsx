import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "../../app/components/Navbar";

describe("Navbar component test", () => {
  it("Renders the corresponding Navbar if not props.authenticated", () => {
    render(<Navbar />);

    const signupLinkText = screen.getByText("Signup").textContent;

    const loginLinkText = screen.getByText("Login").textContent;

    expect(signupLinkText).toBeDefined();
    expect(loginLinkText).toBeDefined();
  });

  it("Renders the corresponding Navbar if props.authenticated", () => {
    render(<Navbar authenticated="true" />);

    const articlesLinkText = screen.getByText("Articles").textContent;

    const newArticleLinkText = screen.getByText("New article").textContent;

    const logoutLinkText = screen.getByText("Logout").textContent;

    expect(articlesLinkText).toBeDefined();
    expect(newArticleLinkText).toBeDefined();
    expect(logoutLinkText).toBeDefined();
  });
});
