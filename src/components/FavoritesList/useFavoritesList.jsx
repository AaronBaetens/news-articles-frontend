import { useState, useEffect, useCallback } from "react";
import { getFavorites, toggleFavorite } from "@shared/helpers/favorites.helper";

const useFavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState(
    localStorage.getItem("sortOrder") || "desc"
  );

  const toggleSort = () => {
    const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newSortOrder);
    localStorage.setItem("sortOrder", newSortOrder);
    refreshFavorites();
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(favorites);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFavorites(items);
    localStorage.setItem("favorites", JSON.stringify(items));
  };

  const removeFavorite = (article) => {
    toggleFavorite(article);
    refreshFavorites();
  };

  const refreshFavorites = useCallback(() => {
    const sortedFavorites = getFavorites().sort((a, b) => {
      return sortOrder === "desc" ? b.rank - a.rank : a.rank - b.rank;
    });
    setFavorites(sortedFavorites);
  }, [sortOrder]);

  useEffect(() => {
    refreshFavorites();
  }, [sortOrder, refreshFavorites]);

  return {
    favorites,
    toggleSort,
    sortOrder,
    handleDragEnd,
    removeFavorite,
    refreshFavorites,
  };
};

export default useFavoritesList;
