"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import { signupAction } from "@/app/actions/signup/signupAction";
import { FormEvent } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleInput = (event: any) => {
    const fieldName = event.target.name;

    const fieldValue = event.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message: string = await signupAction(
      formData.username,
      formData.password
    );

    setMessage(message);
  }

  return (
    <main>
      <Navbar />
      <div>
        <h2>Signup</h2>
        <form onSubmit={submit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={handleInput}
            placeholder="username"
          />
          <label>Password</label>
          <input
            type="text"
            name="password"
            onChange={handleInput}
            placeholder="password"
          />
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
        <span>{message}</span>
      </div>
    </main>
  );
}
