import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getFavorites, toggleFavorite } from "@shared/helpers/favorites.helper";

const FavoritesList = () => {
  // State to hold the list of favorite articles
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from localStorage on component mount and whenever the list changes
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemoveFavorite = (article) => {
    toggleFavorite(article); // Removes the article from favorites
    setFavorites(getFavorites()); // Re-fetch favorites to update the state and UI
  };

  // Placeholder for the edit functionality
  const handleEditFavorite = (article) => {
    // Open edit modal or inline form
  };

  return (
    <List>
      {favorites.map((article) => (
        <ListItem
          key={article.id}
          secondaryAction={
            <>
              <IconButton
                edge="end"
                onClick={() => handleEditFavorite(article)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => handleRemoveFavorite(article)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          }
        >
          <ListItemText
            primary={article.title}
            secondary={article.description}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default FavoritesList;
