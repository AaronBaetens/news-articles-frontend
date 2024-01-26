import { CircularProgress, List, Typography } from "@mui/material";
import useHeadlinesList from "./useHeadlinesList";
import Article from "@components/Headline";

const HeadlinesList = () => {
  const { headlines, headlinesLoading, error } = useHeadlinesList();

  if (headlinesLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <>
      <List>
        {headlines.map((headline) => (
          <Article key={headline.id} headline={headline} />
        ))}
      </List>
    </>
  );
};

export default HeadlinesList;
