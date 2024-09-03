"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import { navigateAction } from "@/app/actions/navigation/navigateAction";
import { postArticleAction } from "@/app/actions/articles/postArticleAction";
import { ArticlesActionResponse } from "@/app/interfaces";

export default function NewArticle(): JSX.Element {
  const [message, setMessage] = useState<string>("");

  async function submitArticleAction(formData: FormData): Promise<void> {
    const title: FormDataEntryValue | null = formData.get("title");

    const content: FormDataEntryValue | null = formData.get("content");

    const response: ArticlesActionResponse = await postArticleAction(
      title,
      content
    );

    if (response.error) {
      setMessage(response.message);

      return;
    }

    navigateAction("/admin/articles");
  }

  return (
    <main>
      <Navbar authenticated="true" />
      <div>
        <h2 className="text-center text-white non-italic font-bold pt-20 text-2xl md:text-4xl lg:text-5xl">
          New article
        </h2>
        <form action={submitArticleAction}>
          <div className="flex flex-col items-center text-1xl md:text-1xl lg:text-2xl">
            <label className="non-italic text-white mt-10">Title</label>
            <input
              type="text"
              name="title"
              placeholder="title"
              className="mt-5 p-2"
            />
            <label className="non-italic text-white mt-10">Content</label>
            <textarea name="content" className="mt-5 p-2" />
            <button type="submit" value="Submit" className="mt-10 p-2 bg-white">
              Submit
            </button>
          </div>
        </form>
        <div
          className={
            !message.includes("Error")
              ? "text-white text-center text-1xl md:text-1xl lg:text-2xl mt-10"
              : "text-red-600 text-center text-1xl md:text-1xl lg:text-2xl mt-10"
          }
        >
          {message}
        </div>
      </div>
    </main>
  );
}
