"use server";

import bcrypt from "bcryptjs";
import { connectToDB, dbClient } from "@/app/lib/database";
import { User } from "@/app/interfaces";

export async function loginAction(
  username: FormDataEntryValue | null,
  password: FormDataEntryValue | null
) {
  try {
    console.log(`Logging user ${username}`);

    if (!username || !password) {
      console.log(`Login data not provided for user ${username}`);

      return {
        success: false,
        message: "Provide username and password",
      };
    }

    await connectToDB();

    const existentUser: User = (
      await dbClient.query(
        `select * from admin.users where username = '${username}'`
      )
    ).rows[0];

    const invalidCredentialsMessage = "Invalid credentials";

    if (!existentUser) {
      console.log(`User ${username} does not exist in the database`);

      return {
        success: false,
        message: invalidCredentialsMessage,
      };
    }

    const passwordIsCorrect: boolean = await bcrypt.compare(
      password.toString(),
      existentUser.password
    );

    if (!passwordIsCorrect) {
      console.log(`Password provided for user ${username} is not correct`);

      return {
        success: false,
        message: invalidCredentialsMessage,
      };
    }

    console.log(`User with username ${username} has logged in successfully`);

    return {
      success: true,
      message: "Successful login",
    };
  } catch (error: Error | any) {
    console.log(
      `Error while logging in user with username ${username}: ${error.message}`
    );

    return {
      success: false,
      message: error.message,
    };
  }
}
