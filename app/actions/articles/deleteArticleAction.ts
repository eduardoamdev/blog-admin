"use server";

import { revalidateTag } from "next/cache";
import { connectToDB, dbClient } from "@/app/lib/database";

export async function deleteArticleAction(
  title: string | string[] | undefined
): Promise<string> {
  try {
    console.log(`Deleting article`);

    connectToDB();

    await dbClient.query(
      `delete from admin.articles a where a.title = '${title}'`
    );

    revalidateTag("/admin/articles");

    const message = "Article has been fetched successfully";

    console.log(message);

    return message;
  } catch (error: Error | any) {
    console.log(
      `Error while getting article with title ${title}: ${error.message}`
    );

    return error.message;
  }
}
