import { Box, CircularProgress, List, Typography } from "@mui/material";
import useArticlesList from "./useArticlesList";
import { useEffect } from "react";
import Article from "@components/Article";

const ArticleList = () => {
  const {
    articles,
    articlesLoading,
    error,
    fetchMoreArticles,
    preparingForLiveUpdate,
  } = useArticlesList();

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 300; // Distance from the bottom to start fetching more articles
      const currentPosition = window.innerHeight + window.scrollY; // Current scroll position
      const nearBottom =
        document.body.offsetHeight - currentPosition < threshold;

      if (nearBottom && !articlesLoading) {
        fetchMoreArticles();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMoreArticles, articlesLoading]);

  return (
    <>
      {preparingForLiveUpdate && (
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography variant="subtitle1" sx={{ color: "success.main" }}>
            Live Update...
          </Typography>
        </Box>
      )}
      {articlesLoading && articles.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error.message}</Typography>
      ) : (
        <List>
          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </List>
      )}
    </>
  );
};

export default ArticleList;
