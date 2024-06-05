import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Home page test", () => {
  it("Renders with title and navigation links", () => {
    render(<Page />);

    const loginLinkText = screen.getByText("Login").textContent;

    const signupLinkText = screen.getByText("Signup").textContent;

    const titleText = screen.getByText("Blog Admin").textContent;

    expect(loginLinkText).toBe("Login");
    expect(signupLinkText).toBe("Signup");
    expect(titleText).toBe("Blog Admin");
  });
});
