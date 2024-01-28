// Adjustments to FavoritesList component
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DialogComponent from "@components/DialogComponent";
import { getFavorites, toggleFavorite } from "@shared/helpers/favorites.helper";
import FavoriteArticle from "@components/FavoriteArticle";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Add a key to trigger refresh

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

  const closeDialog = () => setDialogOpen(false);

  const confirmDelete = () => {
    if (articleToDelete) {
      toggleFavorite(articleToDelete);
      setFavorites(getFavorites());
      closeDialog();
    }
  };

  const refreshFavorites = () => {
    setFavorites(getFavorites());
  };

  const handleScoreChange = () => {
    // Triggering re-fetch of favorites
    setRefreshKey((prevKey) => prevKey + 1);
    refreshFavorites();
  };

  useEffect(() => {
    refreshFavorites();
  }, [refreshKey]); // Depend on refreshKey to re-trigger the effect

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="favoritesDroppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {favorites.map((article, index) => (
                <Draggable
                  key={article.id}
                  draggableId={article.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FavoriteArticle
                        article={article}
                        onRemove={openDeleteDialog}
                        onScoreChange={handleScoreChange} // Pass this prop to each FavoriteArticle
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
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
