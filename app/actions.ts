"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { dbClient, connectToDB } from "@/app/lib/database";

export async function navigateAction(route: string) {
  redirect(route);
}

export async function createUserAction(username: any, password: any) {
  try {
    console.log(`Creating user with username ${username}`);

    if (!username || !password) {
      console.log(`User data not provided properly`);

      return "Please provide username and password";
    }

    await connectToDB();

    const existentUser = await dbClient.query(
      `select * from admin.users where username = '${username}'`
    );

    if (existentUser.rows.length) {
      console.log(`User with username ${username} already exists`);

      return "User with this username already exists";
    }

    const salt: string = await bcrypt.genSalt(10);

    const hashPass: string = await bcrypt.hash(password, salt);

    await dbClient.query(
      `insert into admin.users (username, password) values ('${username}', '${hashPass}')`
    );

    console.log(`User with username ${username} has been created successfully`);

    return "Successful signup";
  } catch (error: any) {
    console.error(
      `Error while creating user with username ${username}: ${error.message}`
    );

    return error.message;
  }
}

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
