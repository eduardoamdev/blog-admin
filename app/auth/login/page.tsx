"use client";

import { navigateAction } from "@/app/actions";
import Navbar from "@/app/components/Navbar";
import { FormEvent } from "react";
import { useState } from "react";

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

    try {
      const response = await fetch("/routes/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) throw new Error(data.message);

      navigateAction("/admin/home");
    } catch (error: any) {
      setMessage(error.message);
    }
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
            placeholder="example@gmail.com"
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
