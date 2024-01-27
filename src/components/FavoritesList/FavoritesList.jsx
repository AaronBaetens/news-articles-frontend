import { useState, useEffect } from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getFavorites, toggleFavorite } from "@shared/helpers/favorites.helper";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DialogComponent from "@components/DialogComponent";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(favorites);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFavorites(items);
    localStorage.setItem("favorites", JSON.stringify(items));
  };

  const openDeleteDialog = (article) => {
    setArticleToDelete(article);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (articleToDelete) {
      toggleFavorite(articleToDelete);
      setFavorites(getFavorites());
    }
    closeDialog();
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="favoritesDroppable" type="FAVORITES">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {favorites.map((article, index) => (
                <Draggable
                  key={article.id}
                  draggableId={article.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => openDeleteDialog(article)}
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <DialogComponent
        open={dialogOpen}
        handleClose={closeDialog}
        title="Confirm Deletion"
        content="Are you sure you want to remove this article from your favorites?"
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default FavoritesList;
