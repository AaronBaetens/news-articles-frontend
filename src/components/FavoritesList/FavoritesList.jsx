import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DialogComponent from "@components/DialogComponent";
import FavoriteArticle from "@components/FavoriteArticle";
import { Box, Button, ButtonGroup } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useFavoritesList from "./useFavoritesList";

const FavoritesList = () => {
  const {
    favorites,
    toggleSort,
    sortOrder,
    handleDragEnd,
    removeFavorite,
    refreshFavorites,
  } = useFavoritesList();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const openDeleteDialog = (article) => {
    setArticleToDelete(article);
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  const confirmDelete = () => {
    if (articleToDelete) {
      removeFavorite(articleToDelete);
      closeDialog();
    }
  };

  const handleScoreChange = () => {
    refreshFavorites();
  };

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
                        onScoreChange={handleScoreChange}
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
