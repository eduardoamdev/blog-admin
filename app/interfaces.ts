import { NextPageContext } from "next";

export interface User {
  username: string;
  password: string;
}

export interface LoginActionResponse {
  success: boolean;
  message: string;
}

export interface ArticlesActionResponse {
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

export interface ArticlesInfo {
  success: boolean;
  message: string;
  articles: Article[];
}

export interface ArticleInfo {
  success: boolean;
  message: string;
  article: Article;
}

export interface UpdateArticlesState {
  title: string;
  content: string;
  loading: boolean;
  error: boolean;
  message: string;
}
