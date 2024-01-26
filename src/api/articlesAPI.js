import {
  ARTICLES_API_BASE_URL,
  NEWS_ARTICLES_API_KEY,
} from "@shared/constants";

export const fetchHeadlines = async (page, pageSize) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const response = await fetch(
    `${ARTICLES_API_BASE_URL}/top-headlines?country=nl&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_ARTICLES_API_KEY}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};
