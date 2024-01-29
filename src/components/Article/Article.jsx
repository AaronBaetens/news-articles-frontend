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

  const handleToggleFavorite = (event) => {
    event.stopPropagation(); // Prevent the card click event
    toggleFavorite(article);
    setFavorite(isFavorite(id));
  };

  const onCardClick = () => {
    window.open(url, "_blank");
  };

  return loading ? (
    <Card sx={{ display: "flex", flexDirection: "column", height: 380 }}>
      {" "}
      {/* Adjust the height to match your card's height */}
      <Skeleton variant="rectangular" width="100%" height={140} />
      <Skeleton variant="text" sx={{ flexGrow: 1, m: 1 }} />
      <Skeleton variant="text" sx={{ m: 1 }} />
      <Skeleton variant="text" sx={{ m: 1 }} width="60%" />
    </Card>
  ) : (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "background-color 0.3s",
        "&:hover": {
          boxShadow: 6,
          backgroundColor: "rgba(245, 245, 245, 0.85)",
        },
      }}
    >
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
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    urlToImage: PropTypes.string,
    url: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

Article.defaultProps = {
  article: {},
  loading: false,
};

export default Article;
