"use client";

import { useState, FormEvent } from "react";
import Navbar from "@/app/components/Navbar";
import { postArticleAction } from "@/app/actions/articles/postArticleAction";

export default function NewArticle() {
  const [state, setState] = useState({
    title: "",
    content: "",
    error: false,
    message: "",
  });

  function handleInput(event: any) {
    const fieldName = event.target.name;

    const fieldValue = event.target.value;

    setState((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response: any = await postArticleAction(state.title, state.content);

    setState({ ...state, error: response.error, message: response.message });
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
        <div
          className={
            !state.error
              ? "text-white text-center text-1xl md:text-1xl lg:text-2xl mt-10"
              : "text-red-600 text-center text-1xl md:text-1xl lg:text-2xl mt-10"
          }
        >
          {state.message}
        </div>
      </div>
    </main>
  );
}
