"use client";

import Navbar from "@/app/components/Navbar";
import { signupAction } from "@/app/actions/signup/signupAction";
import { useState } from "react";

export default function Signup() {
  let [message, setMessage] = useState("");

  async function submitUserAction(formData: FormData) {
    const username = formData.get("username");

    const password = formData.get("password");

    const responseMessage = await signupAction(username, password);

    setMessage(responseMessage);
  }

  return (
    <main>
      <Navbar />
      <div>
        <h2 className="text-center text-white non-italic font-bold pt-20 text-2xl md:text-4xl lg:text-5xl">
          Signup
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
              type="text"
              name="password"
              placeholder="password"
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
