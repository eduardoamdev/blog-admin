jest.mock("../../../app/lib/database", () => ({
  connectToDB: jest.fn(),
  dbClient: {
    query: jest
      .fn()
      .mockImplementationOnce(jest.fn(() => ({ rows: [] })))
      .mockImplementationOnce(
        jest.fn(() => ({ rows: [{ username: "x", password: "x" }] }))
      )
      .mockImplementationOnce(
        jest.fn(() => ({ rows: [{ username: "x", password: "x" }] }))
      )
      .mockImplementationOnce(
        jest.fn(() => {
          throw new Error("Test error");
        })
      ),
  },
}));

jest.mock("bcryptjs", () => ({
  compare: jest
    .fn()
    .mockImplementationOnce(jest.fn(() => false))
    .mockImplementationOnce(jest.fn(() => true)),
}));

import { loginAction } from "../../../app/actions/login/loginAction";

describe("loginAction test", () => {
  it("May return an object with a message property that contains the string 'Provide username and password' in case of not receiving username", async () => {
    const response = await loginAction("", "x");

    expect(response.message).toEqual("Provide username and password");
  });

  it("May return an object with a message property that contains the string 'Provide username and password' in case of not receiving password", async () => {
    const response = await loginAction("x", "");

    expect(response.message).toEqual("Provide username and password");
  });

  it("May return an object with a message property that contains the string 'Provide username and password' in case of receiving no username and no password", async () => {
    const response = await loginAction("", "");

    expect(response.message).toEqual("Provide username and password");
  });

  it("May return an object with a message property that contains the string 'Invalid credentials' in case of finding an existing user with that name in the database", async () => {
    const response = await loginAction("x", "x");

    expect(response.message).toEqual("Invalid credentials");
  });

  it("May return an object with a message property that contains the string 'Invalid credentials' in case of finding an existing user with that name in the database", async () => {
    const response = await loginAction("x", "x");

    expect(response.message).toEqual("Invalid credentials");
  });

  it("May return an object with a success property equals true", async () => {
    const response = await loginAction("x", "x");

    expect(response.success).toEqual(true);
  });

  it("May return a string 'Test error' in case of an error thrown in the try", async () => {
    const response = await loginAction("x", "x");

    expect(response.message).toEqual("Test error");
  });
});
