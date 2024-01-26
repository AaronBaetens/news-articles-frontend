import { useState, useEffect, useCallback } from "react";
import { getArticleId } from "@shared/helpers/articleIdMapping.helper";
import { fetchHeadlines } from "@api/articlesAPI";

const useHeadlinesList = () => {
  const [headlines, setHeadlines] = useState([]);
  const [headlinesLoading, setHeadlinesLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAndProcessHeadlines = useCallback(async () => {
    setHeadlinesLoading(true);
    try {
      const data = await fetchHeadlines();
      const headlinesWithId = data.articles.map((article) => ({
        ...article,
        id: getArticleId(article),
      }));
      const filteredHeadlines = headlinesWithId.filter(
        (headline) => headline.content && headline.description
      );
      setHeadlines(filteredHeadlines);
    } catch (err) {
      setError(err);
    } finally {
      setHeadlinesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndProcessHeadlines();
  }, [fetchAndProcessHeadlines]);

  return { headlines, headlinesLoading, error };
};

export default useHeadlinesList;
