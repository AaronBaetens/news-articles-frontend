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
  Skeleton,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { toggleFavorite, isFavorite } from "@shared/helpers/favorites.helper";

const Article = ({ article, loading }) => {
  const [favorite, setFavorite] = useState(false);
  const { id, title, description, urlToImage, url } = article ?? {};

  useEffect(() => {
    if (id) {
      setFavorite(isFavorite(id));
    }
  }, [id]);

  if (loading) {
    return (
      <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Skeleton variant="rectangular" width="100%" height={140} />
        <CardContent sx={{ flexGrow: 1, height: "350px" }}>
          <Skeleton width="80%" />
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", mt: "auto" }}>
          <Skeleton width="20%" height={34} />
        </CardActions>
      </Card>
    );
  }

  const handleToggleFavorite = (event) => {
    event.stopPropagation();
    toggleFavorite(article);
    setFavorite(isFavorite(id));
  };

  const onCardClick = () => {
    window.open(url, "_blank");
  };

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
        <CardContent sx={{ flexGrow: 1, height: "350px" }}>
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
  loading: PropTypes.bool,
};

export default Article;
