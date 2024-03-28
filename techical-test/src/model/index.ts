export interface Article {
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  source?: { name?: string; id?: string | number };
  author?: string;
  publishedAt?: string;
}

export interface NewsApiResponse {
  articles: Article[];
}
