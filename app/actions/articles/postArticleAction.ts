"use server";

import { revalidateTag } from "next/cache";
import { connectToDB, dbClient } from "@/app/lib/database";

export async function postArticleAction(title: any, content: any) {
  try {
    if (!title || !content) throw new Error("Title and content are required");

    console.log(`Posting article with title ${title}`);

    await connectToDB();

    const existingArticle = await dbClient.query(
      `select * from admin.articles where title = '${title}'`
    );

    if (existingArticle.rows.length > 0) {
      console.log(`An a rticle with title ${title} already exists`);

      throw new Error("An article with this title already exists");
    }

    await dbClient.query(
      `insert into admin.articles (title, content) values ('${title}', '${content}')`
    );

    revalidateTag("/admin/articles");

    console.log(`Article with title ${title} has been posted successfully`);

    return { error: false, message: "Article has been posted successfully" };
  } catch (error: any) {
    console.log(
      `Error while posting article with title ${title}: ${error.message}`
    );

    return { error: true, message: error.message };
  }
}
