import bcrypt from "bcryptjs";
import { dbClient, connectToDB } from "@/app/lib/database";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Please provide an username and password",
        })
      );
    }

    await connectToDB();

    const existentUser = await dbClient.query(
      `select * from admin.users where username = '${username}'`
    );

    if (existentUser.rows.length) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User with this username already exists",
        })
      );
    }

    const salt: string = await bcrypt.genSalt(10);

    const hashPass: string = await bcrypt.hash(password, salt);

    await dbClient.query(
      `insert into admin.users (username, password) values ('${username}', '${hashPass}')`
    );

    return new Response(
      JSON.stringify({ success: true, message: "Successful signup" })
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message })
    );
  }
}
