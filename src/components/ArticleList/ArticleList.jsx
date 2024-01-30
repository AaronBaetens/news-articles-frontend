import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import useArticlesList from "./useArticlesList";
import { useEffect } from "react";
import Article from "@components/Article";
import { throttle } from "lodash";

const ArticleList = () => {
  const {
    articles,
    articlesLoading,
    error,
    fetchMoreArticles,
    preparingForLiveUpdate,
  } = useArticlesList();

  useEffect(() => {
    const handleScroll = throttle(() => {
      const threshold = 300;
      const currentPosition = window.innerHeight + window.scrollY;
      const nearBottom =
        document.body.offsetHeight - currentPosition < threshold;

      if (nearBottom && !articlesLoading) {
        fetchMoreArticles();
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [fetchMoreArticles, articlesLoading]);

  return (
    <Container
      maxWidth="lg"
      sx={{ my: 4, backgroundColor: "rgba(247, 247, 247, 0.5)", padding: 2 }}
    >
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
        <Grid container spacing={4}>
          {Array.from(new Array(8)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Article loading />
            </Grid>
          ))}
        </Grid>
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
