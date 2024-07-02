import { connectToDB, dbClient } from "@/app/lib/database";
import Navbar from "../../components/Navbar";

export default async function Articles() {
  let info = {
    success: false,
    articles: [],
    message: "",
  };

  try {
    console.log("Getting articles");

    connectToDB();

    const articles = await dbClient.query(
      "select a.title from admin.articles a"
    );

    console.log("Articles have been fetched successfully");

    info = { ...info, success: true, articles: articles.rows };
  } catch (error: any) {
    console.log(`Error while getting articles: ${error.message}`);

    info = { ...info, success: false, message: error.message };
  }

  return (
    <main>
      <Navbar authenticated="true" />
      <div className="flex flex-col items-center">
        <h2 className="text-white pt-20 font-bold text-2xl md:text-4xl lg:text-5xl">
          Articles
        </h2>
        {info.success ? (
          <div className="mt-10">
            {info.articles.map((article: any) => (
              <div key={article.title} className="mt-5">
                <a href={`/admin/articles/${article.title}`}>
                  <span className="text-white text-1xl md:text-1xl lg:text-2xl">
                    {article.title}
                  </span>
                </a>
              </div>
            ))}
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
