"use server";

import bcrypt from "bcryptjs";
import { connectToDB, dbClient } from "@/app/lib/database";
import { User } from "@/app/interfaces";

export async function signupAction(
  username: FormDataEntryValue | null,
  password: FormDataEntryValue | null
): Promise<string> {
  try {
    console.log(`Creating user with username ${username}`);

    if (!username || !password) {
      console.log(`User data not provided properly`);

      return "Please provide username and password";
    }

    await connectToDB();

    const existentUsers: User[] = (
      await dbClient.query(
        `select * from admin.users where username = '${username}'`
      )
    ).rows;

    if (existentUsers.length) {
      console.log(`User with username ${username} already exists`);

      return "User with this username already exists";
    }

    const salt: string = await bcrypt.genSalt(10);

    const hashPass: string = await bcrypt.hash(password.toString(), salt);

    await dbClient.query(
      `insert into admin.users (username, password) values ('${username}', '${hashPass}')`
    );

    console.log(`User with username ${username} has been created successfully`);

    return "Successful signup";
  } catch (error: Error | any) {
    console.log(
      `Error while creating user with username ${username}: ${error.message}`
    );

    return error.message;
  }
}
