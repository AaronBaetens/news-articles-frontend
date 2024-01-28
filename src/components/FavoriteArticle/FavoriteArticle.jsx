// FavoriteArticle.js
import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateFavorite } from "@shared/helpers/favorites.helper";

const FavoriteArticle = ({ article, onRemove, onScoreChange }) => {
  const changeRating = (newRating) => {
    const updatedArticle = { ...article, rank: newRating };
    updateFavorite(updatedArticle);
    onScoreChange(updatedArticle); // Notify the parent component about the change
  };

  return (
    <ListItem>
      <ListItemText primary={article.title} secondary={article.description} />
      <StarRatings
        rating={article.rank || 0}
        starRatedColor="blue"
        changeRating={changeRating}
        numberOfStars={5}
        name="rating"
      />
      <IconButton edge="end" onClick={() => onRemove(article)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

FavoriteArticle.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rank: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FavoriteArticle;
