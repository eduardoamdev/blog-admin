jest.mock("../../app/actions/navigation/navigateAction", () => ({
  navigateAction: jest.fn(),
}));

jest.mock("../../app/actions/login/loginAction", () => ({
  loginAction: jest
    .fn()
    .mockImplementationOnce(() => ({ success: true }))
    .mockImplementationOnce(() => ({ success: false, message: "Test error" })),
}));

jest.mock("../../app/components/Navbar", () => {
  const Navbar = () => <div />;

  return Navbar;
});

import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Page from "../../app/login/page";

describe("Login page test", () => {
  it("Renders the complete form", () => {
    render(<Page />);

    const loginTitle = screen.getByRole("heading", { name: "Login" });

    const loginTitleText = screen.getByText("Login").textContent;

    const usernameInputText = screen.getByText("Username").textContent;

    const passwordInputText = screen.getByText("Password").textContent;

    const submitInputText = screen.getByText("Submit").textContent;

    expect(loginTitle).toBeInTheDocument();
    expect(loginTitleText).toBe("Login");
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

  it("Handles successful form submission", async () => {
    render(<Page />);

    const submitButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.submit(submitButton);
    });

    const input: any = screen.getAllByPlaceholderText("username")[0];

    expect(input.value).toBe("");
  });

  it("Handles non successful form submission", async () => {
    render(<Page />);

    const submitButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.submit(submitButton);
    });

    const errorText = screen.getByText("Test error").textContent;

    expect(errorText).toBeTruthy();
  });
});
