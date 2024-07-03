"use server";

import { connectToDB, dbClient } from "@/app/lib/database";

export async function getArticleAction(title: any) {
  try {
    console.log(`Getting article`);

    connectToDB();

    const articles = await dbClient.query(
      `select * from admin.articles a where a.title = '${title}'`
    );

    if (!articles.rows.length) throw new Error("Article not found");

    console.log("Article has been fetched successfully");

    return articles.rows[0];
  } catch (error: any) {
    console.log(
      `Error while getting article with title ${title}: ${error.message}`
    );

    return error.message;
  }
}
