jest.mock("../../app/actions/signup/signupAction", () => ({
  signupAction: jest.fn().mockImplementationOnce(() => "Successful signup"),
}));

jest.mock("../../app/components/Navbar", () => {
  const Navbar = () => <div />;

  return Navbar;
});

import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Page from "../../app/signup/page";

describe("Signup page test", () => {
  it("Renders the complete form", () => {
    render(<Page />);

    const title = screen.getByRole("heading", { name: "Signup" });

    const signupTitleText = screen.getByText("Signup").textContent;

    const usernameInputText = screen.getByText("Username").textContent;

    expect(title).toBeInTheDocument();
    expect(signupTitleText).toBe("Signup");
    expect(usernameInputText).toBe("Username");
  });
});
