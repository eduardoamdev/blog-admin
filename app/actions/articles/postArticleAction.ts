"use server";

import { connectToDB, dbClient } from "@/app/lib/database";

export async function postArticleAction(title: any, content: any) {
  try {
    console.log(`Posting article with title ${title}`);

    await connectToDB();

    const existingArticle = await dbClient.query(
      `select * from admin.articles where title = '${title}'`
    );

    if (existingArticle.rows.length > 0) {
      console.log(`An a rticle with title ${title} already exists`);

      return "An article with this title already exists";
    }

    await dbClient.query(
      `insert into admin.articles (title, content) values ('${title}', '${content}')`
    );

    console.log(`Article with title ${title} has been posted successfully`);

    return "Article has been posted successfully";
  } catch (error: any) {
    console.log(
      `Error while posting article with title ${title}: ${error.message}`
    );

    return error.message;
  }
}
