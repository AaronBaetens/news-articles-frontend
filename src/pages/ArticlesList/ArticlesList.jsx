import { CircularProgress, List, Typography } from "@mui/material";
import useArticlesList from "./useArticlesList";
import Article from "@components/Article";

const ArticlesList = () => {
  const { articles, loading, error } = useArticlesList();

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <List>
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </List>
  );
};

export default ArticlesList;
