import { Box, CircularProgress, List, Typography } from "@mui/material";
import useHeadlinesList from "./useHeadlinesList";
import { useEffect } from "react";
import Headline from "@components/Headline";

const HeadlinesList = () => {
  const {
    headlines,
    headlinesLoading,
    error,
    fetchMoreHeadlines,
    preparingForLiveUpdate,
  } = useHeadlinesList();

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 300; // Distance from the bottom to start fetching more headlines
      const currentPosition = window.innerHeight + window.scrollY; // Current scroll position
      const nearBottom =
        document.body.offsetHeight - currentPosition < threshold;

      if (nearBottom && !headlinesLoading) {
        fetchMoreHeadlines();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMoreHeadlines, headlinesLoading]);

  return (
    <>
      {preparingForLiveUpdate && (
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography variant="subtitle1" sx={{ color: "success.main" }}>
            Live Update...
          </Typography>
        </Box>
      )}
      {headlinesLoading && headlines.length === 0 ? (
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
      )}
    </>
  );
};

export default HeadlinesList;
