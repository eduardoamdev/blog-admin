import { connectToDB } from "@/app/lib/database";
import Navbar from "../../../components/Navbar";
import ArticleActions from "@/app/components/ArticleActions";
import { getArticleAction } from "@/app/actions/articles/getArticleAction";
import { ArticleProps, ActionResponse, ArticleInfo } from "@/app/interfaces";

export default async function Article({
  params,
}: ArticleProps): Promise<JSX.Element> {
  let info: ArticleInfo = {
    success: false,
    article: {
      title: "",
      content: "",
    },
    message: "",
  };

  console.log(`Getting article with title ${params.title}`);

  connectToDB();

  const response: ActionResponse = await getArticleAction(params.title);

  if (!response.error) {
    console.log("Article has been fetched successfully");

    info = { ...info, success: true, article: response.articles[0] };
  } else {
    console.log(`Error while getting article: ${response.message}`);

    info = { ...info, success: false, message: response.message };
  }

  return (
    <main>
      <Navbar authenticated="true" />
      <ArticleActions title={params.title} />
      <div className="flex flex-col items-center">
        {info.success ? (
          <div>
            <h3 className="text-white pt-20 font-bold text-2xl md:text-4xl lg:text-5xl">
              {info.article.title}
            </h3>
            <textarea
              value={info.article.content}
              className="mt-5 p-2  text-1xl md:text-1xl lg:text-2xl"
              readOnly
            />
          </div>
        ) : (
          <span className="text-white pt-20 font-bold text-2xl md:text-4xl lg:text-5xl">
            {info.message}
          </span>
        )}
      </div>
    </main>
  );
}
