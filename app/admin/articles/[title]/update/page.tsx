"use client";

import { useState, useEffect } from "react";
import { getArticleAction } from "@/app/actions/articles/getArticleAction";
import { updateArticleAction } from "@/app/actions/articles/updateArticleAction";
import Navbar from "../../../../components/Navbar";
import ArticleActions from "@/app/components/ArticleActions";
import { navigateAction } from "@/app/actions/navigation/navigateAction";
import {
  ArticleProps,
  ArticlesActionResponse,
  UpdateArticlesState,
} from "@/app/interfaces";

export default function UpdateArticle({ params }: ArticleProps): JSX.Element {
  const [state, setState] = useState<UpdateArticlesState>({
    title: "",
    content: "",
    loading: true,
    error: false,
    message: "",
  });

  async function getArticle(): Promise<void> {
    const response: ArticlesActionResponse = await getArticleAction(
      params.title
    );

    if (!response.error) {
      setState({
        ...state,
        title: response.articles[0].title,
        content: response.articles[0].content,
        loading: false,
      });
    } else {
      setState({
        ...state,
        loading: false,
        error: true,
        message: response.message,
      });
    }
  }

  async function submitArticleAction(formData: FormData): Promise<void> {
    const title: FormDataEntryValue | null = formData.get("title");

    const content: FormDataEntryValue | null = formData.get("content");

    const response: ArticlesActionResponse = await updateArticleAction(
      title,
      content
    );

    if (response.error) {
      setState({
        ...state,
        message: response.message,
        error: response.error,
      });

      return;
    }

    navigateAction(`/admin/articles/${title}`);
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
        <div className="pt-20">
          <h3 className="text-center pt-20 text-white pt-20 font-bold text-1xl md:text-3xl lg:text-4xl">
            Loading...
          </h3>
        </div>
      ) : (
        <div>
          <h2 className="text-center text-white non-italic font-bold pt-20 text-2xl md:text-4xl lg:text-5xl">
            Update article
          </h2>
          <form action={submitArticleAction}>
            <div className="flex flex-col items-center text-1xl md:text-1xl lg:text-2xl">
              <label className="non-italic text-white mt-10">Title</label>
              <input
                type="text"
                name="title"
                value={state.title}
                placeholder="title"
                className="mt-5 p-2"
                readOnly
              />
              <label className="non-italic text-white mt-10">Content</label>
              <textarea
                name="content"
                placeholder="content"
                className="mt-5 p-2"
              >
                {state.content}
              </textarea>
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
