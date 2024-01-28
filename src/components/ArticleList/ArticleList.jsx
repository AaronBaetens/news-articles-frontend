import {
  Box,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
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
      const threshold = 300;
      const currentPosition = window.innerHeight + window.scrollY;
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
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {preparingForLiveUpdate && (
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          <Box width="100%">
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, textAlign: "center", color: "primary.main" }}
            >
              Preparing Live Updates...
            </Typography>
            <LinearProgress color="primary" />
          </Box>
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
        <Box mt={2}>
          <Grid container spacing={4}>
            {articles.map((article) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={article.id}>
                <Article article={article} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ArticleList;
