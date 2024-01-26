import { ARTICLES_API_BASE_URL } from "../shared/constants";

export const fetchArticles = async (quantity = 10) => {
  const response = await fetch(
    `${ARTICLES_API_BASE_URL}/texts?_quantity=${quantity}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};
