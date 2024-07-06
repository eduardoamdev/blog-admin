"use client";

import { useState } from "react";
import Navbar from "../../../../components/Navbar";
import ArticleActions from "@/app/components/ArticleActions";
import { NextPageContext } from "next";
import { deleteArticleAction } from "@/app/actions/articles/deleteArticleAction";
import { navigateAction } from "@/app/actions/navigation/navigateAction";

interface ArticleProps {
  params: NextPageContext["query"];
}

export default function DeleteArticle({ params }: ArticleProps) {
  const [message, setMessage] = useState("");

  async function deleteArticle() {
    const message = await deleteArticleAction(params.title);

    if (message) {
      setMessage(message);
    } else {
      navigateAction("/admin/articles");
    }
  }

  return (
    <main>
      <Navbar authenticated="true" />
      <ArticleActions title={params.title} />
      <div className="text-white mt-20 pl-20 pr-20 flex flex-col items-center">
        <div className="text-1xl md:text-1xl lg:text-2xl">Are you sure?</div>
        <div className="mt-20 w-[60vw] md:w-[40vw] lg:w-[30vw] flex justify-between">
          <button
            className="bg-red-600 w-20 p-2 text-1xl md:text-1xl lg:text-2xl"
            onClick={deleteArticle}
          >
            Yes
          </button>
          <button
            className="bg-gray-400 w-20 p-2 text-1xl md:text-1xl lg:text-2xl"
            onClick={function () {
              navigateAction(`/admin/articles/${params.title}`);
            }}
          >
            No
          </button>
        </div>
        <span className="text-red-600 pt-20 font-bold text-1xl md:text-1xl lg:text-2xl">
          {message}
        </span>
      </div>
    </main>
  );
}
