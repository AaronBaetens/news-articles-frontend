import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { toggleFavorite, isFavorite } from "@shared/helpers/favorites.helper";

const Article = ({ article }) => {
  const [favorite, setFavorite] = useState(false);
  const { id, title, description, urlToImage, url } = article;

  const handleToggleFavorite = (event) => {
    event.stopPropagation(); // Prevent the card click event
    toggleFavorite(article);
    setFavorite(isFavorite(id));
  };

  const onCardClick = () => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    setFavorite(isFavorite(id));
  }, [id]);

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardActionArea onClick={onCardClick}>
        {urlToImage && (
          <CardMedia
            component="img"
            height="140"
            image={urlToImage}
            alt={title}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-end", mt: "auto" }}>
        <Tooltip
          title={favorite ? "Remove from Favorites" : "Add to Favorites"}
          arrow
        >
          <IconButton onClick={handleToggleFavorite}>
            {favorite ? <StarIcon color="warning" /> : <StarBorderIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

Article.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    urlToImage: PropTypes.string,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
