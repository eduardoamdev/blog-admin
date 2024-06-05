"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import { createUserAction } from "@/app/actions/signup/createUserAction";

export default function Signup() {
  const [message, setMessage] = useState("");

  async function submitUserAction(formData: FormData) {
    const username = formData.get("username");

    const password = formData.get("password");

    const message: string = await createUserAction(username, password);

    setMessage(message);
  }

  return (
    <main>
      <Navbar />
      <div>
        <h2>Signup</h2>
        <form action={submitUserAction}>
          <label>Username</label>
          <input type="text" name="username" placeholder="usuario" />
          <label>Password</label>
          <input type="text" name="password" placeholder="password" />
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
        <span>{message}</span>
      </div>
    </main>
  );
}
