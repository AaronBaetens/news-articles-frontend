import { useState, useEffect } from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getFavorites, toggleFavorite } from "@shared/helpers/favorites.helper";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);

  const handleRemoveFavorite = (article) => {
    toggleFavorite(article);
    setFavorites(getFavorites());
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(favorites);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFavorites(items);
    localStorage.setItem("favorites", JSON.stringify(items));
  };

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="ROOT" type="group">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <List>
              {favorites.map((article, index) => (
                <Draggable
                  draggableId={article.id.toString()}
                  key={article.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                    >
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() => handleRemoveFavorite(article)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={article.title}
                          secondary={article.description}
                        />
                      </ListItem>
                    </div>
                  )}
                </Draggable>
              ))}
            </List>
            {provided.placeholder}{" "}
            {/* This line is necessary to avoid the warning */}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FavoritesList;
