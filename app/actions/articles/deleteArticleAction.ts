"use server";

import { revalidateTag } from "next/cache";
import { connectToDB, dbClient } from "@/app/lib/database";
import { ActionResponse } from "@/app/interfaces";

export async function deleteArticleAction(
  title: string | string[] | undefined
): Promise<ActionResponse> {
  try {
    console.log(`Deleting article`);

    connectToDB();

    await dbClient.query(
      `delete from admin.articles a where a.title = '${title}'`
    );

    revalidateTag("/admin/articles");

    const message = "Article has been fetched successfully";

    console.log(message);

    return { error: false, message };
  } catch (error: Error | any) {
    console.log(
      `Error while getting article with title ${title}: ${error.message}`
    );

    return { error: true, message: error.message };
  }
}
