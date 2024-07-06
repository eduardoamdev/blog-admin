import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ArticleActions from "../../app/components/ArticleActions";

describe("Navbar component test", () => {
  it("Renders the corresponding article actions component", () => {
    render(<ArticleActions />);

    expect(true).toBe(true);
  });
});
