import { connectToDB, dbClient } from "@/app/lib/database";
import Navbar from "../../../components/Navbar";

import { NextPageContext } from "next";

interface ArticleProps {
  params: NextPageContext["query"];
}

export default async function Article({ params }: ArticleProps) {
  let info = {
    success: false,
    article: {
      title: "",
      content: "",
    },
    message: "",
  };

  console.log(`Article title: ${params.title}`);

  try {
    console.log(`Getting article`);

    connectToDB();

    const articles = await dbClient.query(
      `select * from admin.articles a where a.title = '${params.title}'`
    );

    if (!articles.rows.length) throw new Error("Article not found");

    console.log("Article has been fetched successfully");

    info = { ...info, success: true, article: articles.rows[0] };
  } catch (error: any) {
    console.log(`Error while getting article: ${error.message}`);

    info = { ...info, success: false, message: error.message };
  }

  return (
    <main>
      <Navbar authenticated="true" />
      <div className="flex flex-col items-center">
        {info.success ? (
          <div>
            <h3 className="text-white pt-20 font-bold text-2xl md:text-4xl lg:text-5xl">
              {info.article.title}
            </h3>
            <textarea
              value={info.article.content}
              className="mt-5 p-2  text-1xl md:text-1xl lg:text-2xl"
            />
          </div>
        ) : (
          <span className="text-white pt-20 font-bold text-2xl md:text-4xl lg:text-5xl">
            {info.message}
          </span>
        )}
      </div>
    </main>
  );
}
