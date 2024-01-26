import { Box, CircularProgress, List, Typography } from "@mui/material";
import useHeadlinesList from "./useHeadlinesList";
import { useEffect } from "react";
import Headline from "@components/Headline";

const HeadlinesList = () => {
  const { headlines, headlinesLoading, error, fetchMoreHeadlines } =
    useHeadlinesList();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      fetchMoreHeadlines();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMoreHeadlines]);

  return headlinesLoading && headlines.length === 0 ? (
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
      {headlines.map((headline) => (
        <Headline key={headline.id} headline={headline} />
      ))}
    </List>
  );
};

export default HeadlinesList;
