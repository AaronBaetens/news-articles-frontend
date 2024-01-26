import { v4 as uuidv4 } from "uuid";

export const getArticleId = (article) => {
  const key = `${article.title}-${article.author}`;
  const mapping = JSON.parse(localStorage.getItem("articleIdMapping")) || {};

  if (!mapping[key]) {
    mapping[key] = uuidv4();
    localStorage.setItem("articleIdMapping", JSON.stringify(mapping));
  }

  return mapping[key];
};
