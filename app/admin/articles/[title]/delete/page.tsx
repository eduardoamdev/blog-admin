import Navbar from "../../../../components/Navbar";
import ArticleActions from "@/app/components/ArticleActions";
import { NextPageContext } from "next";

interface ArticleProps {
  params: NextPageContext["query"];
}

export default function DeleteArticle({ params }: ArticleProps) {
  return (
    <main>
      <Navbar authenticated="true" />
      <ArticleActions title={params.title} />
      <div className="text-white mt-20 flex flex-col items-center">
        <div className="text-1xl md:text-1xl lg:text-2xl">Are you sure?</div>
        <div className="mt-20 w-[60vw] md:w-[40vw] lg:w-[30vw] flex justify-between">
          <button className="bg-red-600 w-20 p-2 text-1xl md:text-1xl lg:text-2xl">
            Yes
          </button>
          <button className="bg-gray-400 w-20 p-2 text-1xl md:text-1xl lg:text-2xl">
            No
          </button>
        </div>
      </div>
    </main>
  );
}
