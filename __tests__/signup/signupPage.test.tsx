jest.mock("../../app/actions/signup/signupAction", () => ({
  signupAction: jest.fn(() => "Successful signup"),
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

    const signupTitle = screen.getByRole("heading", { name: "Signup" });

    const signupTitleText = screen.getByText("Signup").textContent;

    const usernameInputText = screen.getByText("Username").textContent;

    const passwordInputText = screen.getByText("Password").textContent;

    const submitInputText = screen.getByText("Submit").textContent;

    expect(signupTitle).toBeInTheDocument();
    expect(signupTitleText).toBe("Signup");
    expect(usernameInputText).toBe("Username");
    expect(passwordInputText).toBe("Password");
    expect(submitInputText).toBe("Submit");
  });

  it("Handles input change", () => {
    render(<Page />);

    const input: any = screen.getAllByPlaceholderText("username")[0];

    fireEvent.change(input, { target: { value: "user" } });

    expect(input.value).toBe("user");
  });

  it("Handles form submit", async () => {
    render(<Page />);

    const submitButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.submit(submitButton);
    });

    const successMessageElement = screen.getByText("Successful signup");

    expect(successMessageElement).toBeDefined();
  });
});
