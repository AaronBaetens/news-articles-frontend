import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Paper,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"; // Changed for a more distinct icon
import StarIcon from "@mui/icons-material/Star";
import { grey, amber, blueGrey } from "@mui/material/colors";
import { updateFavorite } from "@shared/helpers/favorites.helper";
import OpenInNewIcon from "@mui/icons-material/OpenInNew"; // Icon to indicate opening an article

const StyledRating = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginRight: "8px", // Added for spacing
}));

const FavoriteArticle = ({ article, onRemove, onScoreChange }) => {
  const changeRating = (newRating) => {
    const updatedArticle = { ...article, rank: newRating };
    updateFavorite(updatedArticle);
    onScoreChange(); // Notify the parent component about the change
  };

  // Generate stars based on the rating
  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <StarIcon
        key={index}
        style={{
          color: article.rank > index ? amber[500] : grey[400],
          cursor: "pointer",
        }}
        onClick={() => changeRating(index + 1)}
      />
    ));

  const openArticle = (url, event) => {
    event.stopPropagation(); // This prevents the drag and drop from triggering
    window.open(url, "_blank");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        mb: 2, // Increased for more spacing between items
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Adjusted for spacing and alignment
        backgroundColor: blueGrey[50], // Subtle background for each item
        borderRadius: "10px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <ListItemAvatar>
          <Avatar src={article.urlToImage} variant="square" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle1" color="primary.main">
              {article.title}
            </Typography>
          }
          secondary={article.description}
          sx={{ margin: "0 16px", cursor: "pointer" }}
          onClick={(event) => openArticle(article.url, event)} // Clickable title
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <StyledRating>{stars}</StyledRating>
        <Tooltip title="Open Article" arrow>
          <IconButton
            edge="end"
            onClick={(event) => openArticle(article.url, event)}
            sx={{
              color: grey[800],
              "&:hover": {
                color: grey[600],
              },
              marginRight: "8px", // Added margin to separate the open and delete actions
            }}
          >
            <OpenInNewIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete from Favorites" arrow>
          <IconButton
            edge="end"
            onClick={() => onRemove(article)}
            sx={{
              color: grey[800],
              "&:hover": {
                color: grey[600],
              },
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

FavoriteArticle.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    urlToImage: PropTypes.string,
    rank: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onScoreChange: PropTypes.func.isRequired,
};

export default FavoriteArticle;
