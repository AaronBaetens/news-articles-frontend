// Adjustments to FavoritesList component
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DialogComponent from "@components/DialogComponent";
import { getFavorites, toggleFavorite } from "@shared/helpers/favorites.helper";
import FavoriteArticle from "@components/FavoriteArticle";
import { Box, Button, ButtonGroup } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Add a key to trigger refresh
  const [sortOrder, setSortOrder] = useState(
    localStorage.getItem("sortOrder") || "desc"
  );

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    const sortedFavorites = getFavorites().sort((a, b) => {
      return sortOrder === "desc" ? b.rank - a.rank : a.rank - b.rank;
    });
    setFavorites(sortedFavorites);
  }, [sortOrder]);

  const toggleSort = () => {
    const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newSortOrder);
    localStorage.setItem("sortOrder", newSortOrder);
  };

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
      <Box display="flex" justifyContent="flex-end" p={2}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={toggleSort}
            endIcon={
              sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
            }
          >
            Sort by Score: {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </ButtonGroup>
      </Box>
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
