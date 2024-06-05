"use server";

import bcrypt from "bcryptjs";
import { connectToDB, dbClient } from "@/app/lib/database";

export async function loginAction(username: any, password: any) {
  try {
    console.log(`Logging in user ${username}`);

    if (!username || !password) {
      console.log(`Login data not provided for user ${username}`);

      return {
        success: false,
        message: "Please provide username and password",
      };
    }

    await connectToDB();

    const existentUser = await dbClient.query(
      `select * from admin.users where username = '${username}'`
    );

    const invalidCredentialsMessage = "Invalid credentials";

    if (!existentUser.rows.length) {
      console.log(`User ${username} does not exist in the database`);

      return {
        success: false,
        message: invalidCredentialsMessage,
      };
    }

    const userInfo = existentUser.rows[0];

    const passwordIsCorrect: boolean = await bcrypt.compare(
      password,
      userInfo.password
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
    };
  } catch (error: any) {
    console.error(
      `Error while logging in user with username ${username}: ${error.message}`
    );

    return {
      success: false,
      message: error.message,
    };
  }
}
