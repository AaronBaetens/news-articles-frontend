import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { toggleFavorite, isFavorite } from "@shared/helpers/favorites.helper";

const Article = ({ article }) => {
  const [favorite, setFavorite] = useState(false);
  const { id, title, description } = article;

  const handleToggleFavorite = () => {
    toggleFavorite(article);
    setFavorite(isFavorite(id));
  };

  useEffect(() => {
    setFavorite(isFavorite(id));
  }, [id]);

  return (
    <ListItem>
      <ListItemText primary={title} secondary={description} />
      <IconButton onClick={handleToggleFavorite}>
        {favorite ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    </ListItem>
  );
};

Article.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
