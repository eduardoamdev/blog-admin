"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { dbClient, connectToDB } from "@/app/lib/database";

export async function navigateAction(route: string) {
  redirect(route);
}

export async function createUserAction(username: any, password: any) {
  try {
    if (!username || !password)
      return "Please provide an username and password";

    await connectToDB();

    const existentUser = await dbClient.query(
      `select * from admin.users where username = '${username}'`
    );

    if (existentUser.rows.length)
      return "User with this username already exists";

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
