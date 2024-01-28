import { useState, useEffect, useCallback } from "react";
import { getArticleId } from "@shared/helpers/articleIdMapping.helper";
import { fetchArticles } from "@api/articlesAPI";

const useArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [preparingForLiveUpdate, setPreparingForLiveUpdate] = useState(false);
  const pageSize = 15;

  const processArticles = (data, isNewPage = false) => {
    const articlesWithId = data.articles.map((article) => ({
      ...article,
      id: getArticleId(article),
    }));
    const filteredArticles = articlesWithId.filter(
      (article) => article.content && article.description
    );
    // const filteredArticles = articlesWithId.filter(
    //   (article) => article.content
    // );

    if (isNewPage) {
      setArticles((prev) => [...prev, ...filteredArticles]);
    } else {
      setArticles(filteredArticles);
    }
  };

  const fetchArticlesByPage = useCallback(async (pageNum) => {
    setArticlesLoading(true);
    try {
      const data = await fetchArticles(pageNum, pageSize);
      processArticles(data, pageNum > 1);
      if (pageNum > 1) setPage(pageNum);
    } catch (err) {
      setError(err);
    } finally {
      setArticlesLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchArticlesByPage(1);

    const interval = setInterval(() => {
      setPreparingForLiveUpdate(true);
      setTimeout(async () => {
        await fetchArticlesByPage(1);
        setPreparingForLiveUpdate(false);
      }, 3000);
    }, 300000);

    return () => clearInterval(interval);
  }, [fetchArticlesByPage]);

  const fetchMoreArticles = () => fetchArticlesByPage(page + 1);

  return {
    articles,
    articlesLoading,
    error,
    fetchMoreArticles,
    preparingForLiveUpdate,
  };
};

export default useArticlesList;
