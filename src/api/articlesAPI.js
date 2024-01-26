import { ARTICLES_API_BASE_URL } from "../shared/constants";

export const fetchArticles = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const response = await fetch(`${ARTICLES_API_BASE_URL}/texts?_quantity=10`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};
