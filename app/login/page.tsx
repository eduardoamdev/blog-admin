"use client";

import { navigateAction } from "@/app/actions";
import Navbar from "@/app/components/Navbar";
import { useState } from "react";
import { loginAction } from "@/app/actions";

export default function Login() {
  const [message, setMessage] = useState("");

  async function submitUserAction(formData: FormData) {
    const username = formData.get("username");

    const password = formData.get("password");

    const response = await loginAction(username, password);

    if (response.success) navigateAction("/admin/home");

    setMessage(response.message);
  }

  return (
    <main>
      <Navbar />
      <div>
        <h2>Login</h2>
        <form action={submitUserAction}>
          <label>Username</label>
          <input type="text" name="username" placeholder="usuario" />
          <label>Password</label>
          <input type="text" name="password" placeholder="pass123" />
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
        <span>{message}</span>
      </div>
    </main>
  );
}
