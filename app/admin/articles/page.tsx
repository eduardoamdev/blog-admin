import { connectToDB, dbClient } from "@/app/lib/database";
import styles from "@/app/ui/home.module.css";
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
    <main className={styles.reset}>
      <Navbar authenticated="true" />
      <div>
        <h2>Articles</h2>
        {info.success ? (
          <div>
            {info.articles.map((article: any) => (
              <div key={article.title}>
                <a href={`/admin/articles/${article.title}`}>
                  <span>{article.title}</span>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <span>{info.message}</span>
        )}
      </div>
    </main>
  );
}
