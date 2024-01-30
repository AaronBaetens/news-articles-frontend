export const toggleFavorite = (article) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const index = favorites.findIndex((fav) => fav.id === article.id);

  if (index !== -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(article);
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

export const updateFavorite = (updatedArticle) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const index = favorites.findIndex((fav) => fav.id === updatedArticle.id);

  if (index !== -1) {
    favorites[index] = updatedArticle;
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};
