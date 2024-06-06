"use client";

import { useState } from "react";
import { FormEvent } from "react";
import Navbar from "@/app/components/Navbar";
import { navigateAction } from "@/app/actions/navigation/navigateAction";
import { loginAction } from "@/app/actions/login/loginAction";

export default function Login() {
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

    const response = await loginAction(formData.username, formData.password);

    if (!response.success) {
      setMessage(response.message);

      return;
    }

    navigateAction("/admin/home");
  }

  return (
    <main>
      <Navbar />
      <div>
        <h2>Login</h2>
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
            placeholder="pass123"
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
