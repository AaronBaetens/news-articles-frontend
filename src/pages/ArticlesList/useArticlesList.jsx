import { useState, useEffect } from "react";
import { getArticleId } from "@shared/helpers/articleIdMapping.helper";
import { ARTICLES_API_BASE_URL } from "@shared/constants";

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${ARTICLES_API_BASE_URL}/texts`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const articlesWithId = data.data.map((article) => ({
          ...article,
          id: getArticleId(article),
        }));
        setArticles(articlesWithId);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
};

export default useArticles;
