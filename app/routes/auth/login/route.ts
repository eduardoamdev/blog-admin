import bcrypt from "bcryptjs";
import { dbClient, connectToDB } from "@/app/lib/database";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    await connectToDB();

    const response: any = await dbClient.query(
      `select * from admin.users where username = '${username}'`
    );

    if (response.rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "User does not exist" })
      );
    }

    const userInfo = response.rows[0];

    const passwordIsCorrect: boolean = await bcrypt.compare(
      password,
      userInfo.password
    );

    if (!passwordIsCorrect) {
      return new Response(
        JSON.stringify({ success: false, message: "Incorrect password" })
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Successful login" })
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message })
    );
  }
}
