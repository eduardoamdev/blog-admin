"use server";

import { revalidateTag } from "next/cache";
import { connectToDB, dbClient } from "@/app/lib/database";

export async function updateArticleAction(title: any, content: any) {
  try {
    console.log(`Posting article with title ${title}`);

    await connectToDB();

    await dbClient.query(
      `update admin.articles set content = '${content}' where title = '${title}'`
    );

    revalidateTag("/admin/articles");

    console.log(`Article with title ${title} has been updated successfully`);

    return "Article has been updated successfully";
  } catch (error: any) {
    console.log(
      `Error while posting article with title ${title}: ${error.message}`
    );

    return error.message;
  }
}
