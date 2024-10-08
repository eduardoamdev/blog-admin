"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import { navigateAction } from "@/app/actions/navigation/navigateAction";
import { loginAction } from "@/app/actions/login/loginAction";
import { LoginActionResponse } from "../interfaces";

export default function Login(): JSX.Element {
  const [message, setMessage] = useState<string>("");

  async function submitUserAction(formData: FormData): Promise<void> {
    const username: FormDataEntryValue | null = formData.get("username");

    const password: FormDataEntryValue | null = formData.get("password");

    const response: LoginActionResponse = await loginAction(username, password);

    if (!response.success) {
      setMessage(response.message);

      return;
    }

    navigateAction("/admin/home");
  }

  return (
    <main>
      <Navbar authenticated="false" />
      <div>
        <h2 className="text-center text-white non-italic font-bold pt-20 text-2xl md:text-4xl lg:text-5xl">
          Login
        </h2>
        <form action={submitUserAction}>
          <div className="flex flex-col items-center text-1xl md:text-1xl lg:text-2xl">
            <label className="non-italic text-white mt-10">Username</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              className="mt-5 p-2"
            />
            <label className="non-italic text-white mt-10">Password</label>
            <input
              type="password"
              name="password"
              placeholder="pass123"
              className="mt-5 p-2"
            />
            <button type="submit" value="Submit" className="mt-10 p-2 bg-white">
              Submit
            </button>
          </div>
        </form>
        <div className="text-center text-red-600 text-1xl md:text-1xl lg:text-2xl mt-10">
          {message}
        </div>
      </div>
    </main>
  );
}
