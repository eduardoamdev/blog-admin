import { NextPageContext } from "next";

export interface ActionResponse {
  error: boolean;
  message: string;
}

export interface Article {
  title: string;
  content: string;
}

export interface Articles {
  rows: Article[];
}

export interface ArticleProps {
  params: NextPageContext["query"];
}
