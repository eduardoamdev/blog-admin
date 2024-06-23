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
        <h2 className="text-center text-white non-italic font-bold pt-20 text-2xl md:text-4xl lg:text-5xl">
          New article
        </h2>
        <form onSubmit={submit}>
          <div className="flex flex-col items-center text-1xl md:text-1xl lg:text-2xl">
            <label className="non-italic text-white mt-10">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleInput}
              placeholder="title"
              className="mt-5 p-2"
            />
            <label className="non-italic text-white mt-10">Content</label>
            <textarea
              name="content"
              onChange={handleInput}
              className="mt-5 p-2"
            />
            <button type="submit" value="Submit" className="mt-10 p-2 bg-white">
              Submit
            </button>
          </div>
        </form>
        <div className="text-center text-center text-white text-1xl md:text-1xl lg:text-2xl mt-10">
          {message}
        </div>
      </div>
    </main>
  );
}
