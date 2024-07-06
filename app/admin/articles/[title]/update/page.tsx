"use client";

import { useState, useEffect, FormEvent } from "react";
import { getArticleAction } from "@/app/actions/articles/getArticleAction";
import { updateArticleAction } from "@/app/actions/articles/updateArticleAction";
import Navbar from "../../../../components/Navbar";
import ArticleActions from "@/app/components/ArticleActions";
import { NextPageContext } from "next";

interface ArticleProps {
  params: NextPageContext["query"];
}

export default function UpdateArticle({ params }: ArticleProps) {
  const [state, setState] = useState({
    title: "",
    content: "",
    loading: true,
    error: false,
    message: "",
  });

  async function getArticle() {
    const response = await getArticleAction(params.title);

    if (response.title) {
      setState({
        ...state,
        title: response.title,
        content: response.content,
        loading: false,
      });
    } else {
      setState({
        ...state,
        loading: false,
        error: true,
        message: response,
      });
    }
  }

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

    const response = await updateArticleAction(state.title, state.content);

    setState({
      ...state,
      message: response.message,
      error: response.error,
    });
  }

  useEffect(() => {
    getArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Navbar authenticated="true" />
      <ArticleActions title={params.title} />
      {state.loading ? (
        <div>
          <span className="text-white pt-20 font-bold text-1xl md:text-3xl lg:text-4xl">
            Loading...
          </span>
        </div>
      ) : (
        <div>
          <h2 className="text-center text-white non-italic font-bold pt-20 text-2xl md:text-4xl lg:text-5xl">
            Update article
          </h2>
          <form onSubmit={submit}>
            <div className="flex flex-col items-center text-1xl md:text-1xl lg:text-2xl">
              <label className="non-italic text-white mt-10">Title</label>
              <input
                type="text"
                name="title"
                value={state.title}
                onChange={handleInput}
                placeholder="title"
                className="mt-5 p-2"
                readOnly
              />
              <label className="non-italic text-white mt-10">Content</label>
              <textarea
                name="content"
                value={state.content}
                onChange={handleInput}
                placeholder="content"
                className="mt-5 p-2"
              />
              <button
                type="submit"
                value="Submit"
                className="mt-10 p-2 bg-white"
              >
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
      )}
    </main>
  );
}
