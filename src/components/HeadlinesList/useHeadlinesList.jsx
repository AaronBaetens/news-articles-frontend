import { useState, useEffect, useCallback } from "react";
import { getArticleId } from "@shared/helpers/articleIdMapping.helper";
import { fetchHeadlines } from "@api/articlesAPI";

const useHeadlinesList = () => {
  const [headlines, setHeadlines] = useState([]);
  const [headlinesLoading, setHeadlinesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const processHeadlines = (data, isNewPage = false) => {
    const headlinesWithId = data.articles.map((article) => ({
      ...article,
      id: getArticleId(article),
    }));
    const filteredHeadlines = headlinesWithId.filter(
      (headline) => headline.content && headline.description
    );

    if (isNewPage) {
      setHeadlines((prev) => [...prev, ...filteredHeadlines]);
    } else {
      setHeadlines(filteredHeadlines);
    }
  };

  const fetchHeadlinesByPage = useCallback(async (pageNum) => {
    setHeadlinesLoading(true);
    try {
      const data = await fetchHeadlines(pageNum, pageSize);
      processHeadlines(data, pageNum > 1);
      if (pageNum > 1) setPage(pageNum); // Only update page if fetching a new page
    } catch (err) {
      setError(err);
    } finally {
      setHeadlinesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeadlinesByPage(1); // Initial fetch
  }, [fetchHeadlinesByPage]);

  // Function to be called when more headlines are needed
  const fetchMoreHeadlines = () => fetchHeadlinesByPage(page + 1);

  return { headlines, headlinesLoading, error, fetchMoreHeadlines };
};

export default useHeadlinesList;
