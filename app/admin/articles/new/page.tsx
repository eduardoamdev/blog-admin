"use client";

import { useState } from "react";
import { FormEvent } from "react";
import Navbar from "@/app/components/Navbar";
import { postArticleAction } from "@/app/actions/articles/postArticleAction";

export default function NewArticle() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
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

    const message = await postArticleAction(formData.title, formData.content);

    setMessage(message);
  }

  return (
    <main>
      <Navbar authenticated="true" />
      <div>
        <h2>New article</h2>
        <form onSubmit={submit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={handleInput}
            placeholder="title"
          />
          <label>Content</label>
          <textarea name="content" onChange={handleInput} />
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
        <span>{message}</span>
      </div>
    </main>
  );
}
