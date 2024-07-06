jest.mock("../../../app/components/Navbar", () => {
  const Navbar = () => <div />;

  return Navbar;
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../../../app/admin/home/page";

describe("Home page test", () => {
  it("Renders with title and navigation links", () => {
    render(<Page />);

    const homeText = screen.getByText("Welcome Admin").textContent;

    expect(homeText).toBe("Welcome Admin");
  });
});
