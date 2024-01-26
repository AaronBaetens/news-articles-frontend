export const toggleFavorite = (articleId) => {
  if (!articleId) return;

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.includes(articleId)) {
    favorites = favorites.filter((id) => id !== articleId);
  } else {
    favorites.push(articleId);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const isFavorite = (articleId) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.includes(articleId);
};
