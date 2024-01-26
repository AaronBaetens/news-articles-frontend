import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { toggleFavorite, isFavorite } from "@shared/helpers/favorites.helper";

const Headline = ({ headline }) => {
  const [favorite, setFavorite] = useState(false);
  const { id, title, description } = headline;

  const handleToggleFavorite = () => {
    toggleFavorite(id);
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

Headline.propTypes = {
  headline: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Headline;
