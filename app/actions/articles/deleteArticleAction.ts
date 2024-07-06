"use server";

import { connectToDB, dbClient } from "@/app/lib/database";

export async function deleteArticleAction(title: any) {
  try {
    console.log(`Deleting article`);

    connectToDB();

    await dbClient.query(
      `delete from admin.articles a where a.title = '${title}'`
    );

    console.log("Article has been fetched successfully");
  } catch (error: any) {
    console.log(
      `Error while getting article with title ${title}: ${error.message}`
    );

    return error.message;
  }
}
