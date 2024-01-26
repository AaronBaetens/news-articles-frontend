import { CircularProgress, List, Typography } from "@mui/material";
import useHeadlinesList from "./useHeadlinesList";
import Article from "@components/Headline";
import Navbar from "@components/Navbar/Navbar";
import { useAuth } from "@shared/authentication/useAuth";

const HeadlinesList = () => {
  const { headlines, headlinesLoading, error } = useHeadlinesList();
  const { handleLogout, loadingAuth } = useAuth();

  if (headlinesLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <>
      <Navbar onLogout={handleLogout} loadingAuth={loadingAuth} />
      <List>
        {headlines.map((headline) => (
          <Article key={headline.id} headline={headline} />
        ))}
      </List>
    </>
  );
};

export default HeadlinesList;
