jest.mock("next/navigation");

import { navigateAction } from "../../../app/actions/navigation/navigateAction";

describe("navigateAction test", () => {
  it("Check that navigateAction is defined", () => {
    navigateAction("/");

    expect(navigateAction).toBeDefined();
  });
});
