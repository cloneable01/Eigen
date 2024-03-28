// newsApiHelper.ts

import axios, { AxiosResponse } from "axios";
import { Article, NewsApiResponse } from "../model";

const API_KEY = "de71b5eb847d4f108682638fe9e1a494";
const BASE_URL = "https://newsapi.org/v2";

export const getTopHeadlines = async (
  country: string = "us",
  category: string = "general",
  searchQuery: string = ""
): Promise<Article[]> => {
  try {
    const response: AxiosResponse<NewsApiResponse> = await axios.get(
      `${BASE_URL}/top-headlines`,
      {
        params: {
          country: country,
          category: category,
          q: searchQuery,
          apiKey: API_KEY,
        },
      }
    );

    // Extract relevant article information from the response
    const articles: Article[] = response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      source: article.source,
      author: article.author,
      publishedAt: article.publishedAt,
    }));

    return articles;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw error; // Re-throw the error for handling in components
  }
};
