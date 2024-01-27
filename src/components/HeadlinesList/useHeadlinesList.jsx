import { useState, useEffect, useCallback } from "react";
import { getArticleId } from "@shared/helpers/articleIdMapping.helper";
import { fetchHeadlines } from "@api/articlesAPI";

const useHeadlinesList = () => {
  const [headlines, setHeadlines] = useState([]);
  const [headlinesLoading, setHeadlinesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [preparingForLiveUpdate, setPreparingForLiveUpdate] = useState(false);
  const pageSize = 15;

  const processHeadlines = (data, isNewPage = false) => {
    const headlinesWithId = data.articles.map((article) => ({
      ...article,
      id: getArticleId(article),
    }));
    // const filteredHeadlines = headlinesWithId.filter(
    //   (headline) => headline.content && headline.description
    // );
    const filteredHeadlines = headlinesWithId.filter(
      (headline) => headline.content
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
      if (pageNum > 1) setPage(pageNum);
    } catch (err) {
      setError(err);
    } finally {
      setHeadlinesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeadlinesByPage(1); // Initial fetch

    // Schedule fetch operations
    const interval = setInterval(() => {
      setPreparingForLiveUpdate(true); // Indicate upcoming fetch
      // Delay actual fetching to give users a heads-up
      setTimeout(async () => {
        await fetchHeadlinesByPage(1);
        setPreparingForLiveUpdate(false); // Reset indicator after fetch starts
      }, 3000); // Wait 5 seconds before fetching
    }, 300000); // Repeat every 5 minutes

    return () => clearInterval(interval);
  }, [fetchHeadlinesByPage]);

  // Function to be called when more headlines are needed
  const fetchMoreHeadlines = () => fetchHeadlinesByPage(page + 1);

  return {
    headlines,
    headlinesLoading,
    error,
    fetchMoreHeadlines,
    preparingForLiveUpdate,
  };
};

export default useHeadlinesList;
