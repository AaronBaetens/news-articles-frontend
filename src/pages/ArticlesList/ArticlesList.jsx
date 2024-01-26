import { CircularProgress, List, Typography } from "@mui/material";
import useArticlesList from "./useArticlesList";
import Article from "@components/Article";
import Navbar from "@components/Navbar/Navbar";
import { useAuth } from "@shared/authentication/useAuth";

const ArticlesList = () => {
  const { articles, articlesLoading, error } = useArticlesList();
  const { handleLogout, loadingAuth } = useAuth();

  if (articlesLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <>
      <Navbar onLogout={handleLogout} loadingAuth={loadingAuth} />
      <List>
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </List>
    </>
  );
};

export default ArticlesList;
