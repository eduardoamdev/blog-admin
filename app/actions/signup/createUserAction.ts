"use server";

import bcrypt from "bcryptjs";
import { connectToDB, dbClient } from "@/app/lib/database";

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
    console.log(
      `Error while creating user with username ${username}: ${error.message}`
    );

    return error.message;
  }
}
