import { NextPageContext } from "next";

export interface ActionResponse {
  articles: Article[];
  error: boolean;
  message: string;
}

export interface Article {
  title: string;
  content: string;
}

export interface ArticleProps {
  params: NextPageContext["query"];
}

export interface ArticleInfo {
  success: boolean;
  article: Article;
  message: string;
}

export interface UpdateArticlesState {
  title: string;
  content: string;
  loading: boolean;
  error: boolean;
  message: string;
}
