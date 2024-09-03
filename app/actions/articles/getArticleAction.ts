"use server";

import { connectToDB, dbClient } from "@/app/lib/database";
import { Article, ActionResponse } from "@/app/interfaces";

export async function getArticleAction(
  title: string | string[] | undefined
): Promise<ActionResponse> {
  try {
    console.log(`Getting article`);

    connectToDB();

    const articles: Article[] = (
      await dbClient.query(
        `select * from admin.articles a where a.title = '${title}'`
      )
    ).rows;

    if (!articles.length) throw new Error("Article not found");

    console.log("Article has been fetched successfully");

    return {
      articles,
      error: false,
      message: "Article has been fetched successfully",
    };
  } catch (error: Error | any) {
    console.log(
      `Error while getting article with title ${title}: ${error.message}`
    );

    return { articles: [], error: true, message: error.message };
  }
}
