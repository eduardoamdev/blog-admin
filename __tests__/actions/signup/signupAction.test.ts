jest.mock("../../../app/lib/database", () => ({
  connectToDB: jest.fn(),
  dbClient: {
    query: jest
      .fn()
      .mockImplementationOnce(
        jest.fn(() => ({ rows: [{ username: "x", password: "x" }] }))
      )
      .mockImplementationOnce(jest.fn(() => ({ rows: [] })))
      .mockImplementationOnce(jest.fn())
      .mockImplementationOnce(
        jest.fn(() => {
          throw new Error("Test error");
        })
      ),
  },
}));

import { signupAction } from "../../../app/actions/signup/signupAction";

describe("signupAction test", () => {
  it("May return a string 'Please provide username and password' in case of not receiving username", async () => {
    const response = await signupAction("", "x");

    expect(response).toEqual("Please provide username and password");
  });

  it("May return a string 'Please provide username and password' in case of not receiving password", async () => {
    const response = await signupAction("x", "");

    expect(response).toEqual("Please provide username and password");
  });

  it("May return a string 'Please provide username and password' in case of receiving no username and no password", async () => {
    const response = await signupAction("", "");

    expect(response).toEqual("Please provide username and password");
  });

  it("May return a string 'User with this username already exists' in case of finding an existing user with that name in the database", async () => {
    const response = await signupAction("x", "x");

    expect(response).toEqual("User with this username already exists");
  });

  it("May return a string 'Successful signup' in case of finding an existing user with that name in the database", async () => {
    const response = await signupAction("x", "x");

    expect(response).toEqual("Successful signup");
  });

  it("May return a string 'Successful signup' in case of finding an existing user with that name in the database", async () => {
    const response = await signupAction("x", "x");

    expect(response).toEqual("Test error");
  });
});
