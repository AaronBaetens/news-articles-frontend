// Adjusting to store and retrieve detailed article objects.
export const toggleFavorite = (article) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const index = favorites.findIndex((fav) => fav.id === article.id);

  if (index !== -1) {
    favorites.splice(index, 1); // Remove if already a favorite
  } else {
    favorites.push(article); // Add to favorites
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const isFavorite = (articleId) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.some((article) => article.id === articleId);
};

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

// Optional: Function to update a favorite's details
export const updateFavorite = (updatedArticle) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const index = favorites.findIndex((fav) => fav.id === updatedArticle.id);

  if (index !== -1) {
    favorites[index] = updatedArticle; // Update the article details
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};
