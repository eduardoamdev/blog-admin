"use server";

import { connectToDB, dbClient } from "@/app/lib/database";
import { Article, ActionResponse } from "@/app/interfaces";

export async function getArticlesAction(): Promise<ActionResponse> {
  try {
    console.log(`Getting articles`);

    connectToDB();

    const articles: Article[] = (
      await dbClient.query("select a.title from admin.articles a")
    ).rows;

    if (!articles.length) throw new Error("Articles not found");

    const message: string = "Article has been fetched successfully";

    console.log(message);

    return {
      articles,
      error: false,
      message,
    };
  } catch (error: Error | any) {
    console.log(`Error while getting article from database: ${error.message}`);

    return { articles: [], error: true, message: error.message };
  }
}
