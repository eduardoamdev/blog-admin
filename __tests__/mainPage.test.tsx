jest.mock("../app/components/Navbar", () => {
  const Navbar = () => <div />;

  return Navbar;
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Home page test", () => {
  it("Renders with title and navigation links", () => {
    render(<Page />);

    const titleText = screen.getByText("Blog Admin").textContent;

    expect(titleText).toBe("Blog Admin");
  });
});
