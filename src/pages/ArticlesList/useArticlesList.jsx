import { useState, useEffect, useCallback } from "react";
import { getArticleId } from "@shared/helpers/articleIdMapping.helper";
import { fetchArticles } from "@api/articlesAPI";

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAndProcessArticles = useCallback(async () => {
    setArticlesLoading(true);
    try {
      const data = await fetchArticles();
      const articlesWithId = data.data.map((article) => ({
        ...article,
        id: getArticleId(article),
      }));
      setArticles(articlesWithId);
    } catch (err) {
      setError(err);
    } finally {
      setArticlesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndProcessArticles();
  }, [fetchAndProcessArticles]);

  return { articles, articlesLoading, error };
};

export default useArticles;
