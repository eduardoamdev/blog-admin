"use server";

import { revalidateTag } from "next/cache";
import { connectToDB, dbClient } from "@/app/lib/database";
import { ActionResponse } from "@/app/interfaces";

export async function updateArticleAction(
  title: FormDataEntryValue | null,
  content: FormDataEntryValue | null
): Promise<ActionResponse> {
  try {
    if (!content) throw new Error("Content is required");

    console.log(`Updating article with title ${title}`);

    await connectToDB();

    await dbClient.query(
      `update admin.articles set content = '${content}' where title = '${title}'`
    );

    revalidateTag("/admin/articles");

    console.log(`Article with title ${title} has been updated successfully`);

    return {
      articles: [],
      error: false,
      message: "Article has been updated successfully",
    };
  } catch (error: Error | any) {
    console.log(
      `Error while updating article with title ${title}: ${error.message}`
    );

    return { articles: [], error: true, message: error.message };
  }
}
