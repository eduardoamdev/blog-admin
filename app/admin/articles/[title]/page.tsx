import { connectToDB, dbClient } from "@/app/lib/database";
import styles from "@/app/ui/home.module.css";
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
    <main className={styles.reset}>
      <Navbar authenticated="true" />
      <div>
        <h2>Article</h2>
        {info.success ? (
          <div>
            <div>
              <span>{info.article.title}</span>
              <span>{info.article.content}</span>
            </div>
          </div>
        ) : (
          <span>{info.message}</span>
        )}
      </div>
    </main>
  );
}
