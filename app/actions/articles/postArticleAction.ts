"use server";

import { revalidateTag } from "next/cache";
import { connectToDB, dbClient } from "@/app/lib/database";
import { ActionResponse, Articles } from "@/app/interfaces";

export async function postArticleAction(
  title: FormDataEntryValue | null,
  content: FormDataEntryValue | null
): Promise<ActionResponse> {
  try {
    if (!title || !content) throw new Error("Title and content are required");

    console.log(`Posting article with title ${title}`);

    await connectToDB();

    const existingArticle: Articles = await dbClient.query(
      `select * from admin.articles where title = '${title}'`
    );

    if (existingArticle.rows.length > 0) {
      const message: string = `An article with title ${title} already exists`;

      throw new Error(message);
    }

    await dbClient.query(
      `insert into admin.articles (title, content) values ('${title}', '${content}')`
    );

    revalidateTag("/admin/articles");

    const message: string = `Article with title ${title} has been posted successfully`;

    console.log(message);

    return { error: false, message };
  } catch (error: Error | any) {
    console.log(
      `Error while posting article with title ${title}: ${error.message}`
    );

    return { error: true, message: error.message };
  }
}
