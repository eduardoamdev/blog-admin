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
