import {
  dbAddLike,
  dbGetHasLiked,
  dbGetLikeNumber,
  dbRemoveLike,
} from "../database/likes.js";
import { getId } from "../services/session.js";
import { likeTemplate, unlikeTemplate } from "../views/likes.js";
import htmlResponse from "../utils/html-response.js";

// Increases the number of likes on the post by one
export function like(ctx) {
  const postId = ctx.params.id;
  const userId = getId(ctx.req);
  const hasLiked = dbGetHasLiked(postId, userId);

  // Makes sure the user can't like the post multiple times
  if (hasLiked === false) {
    dbAddLike(postId, userId);
  }
  const likeNum = dbGetLikeNumber(postId);

  const html = unlikeTemplate({ id: postId, likes: likeNum });
  return htmlResponse(html, { status: 200 });
}

// Decreases the number of likes on the post by one
export function unlike(ctx) {
  const postId = ctx.params.id;
  const userId = getId(ctx.req);
  const hasLiked = dbGetHasLiked(postId, userId);

  // Makes sure the user can't unlike the post multiple times
  if (hasLiked === true) {
    dbRemoveLike(postId, userId);
  }
  const likeNum = dbGetLikeNumber(postId);

  const html = likeTemplate({ id: postId, likes: likeNum });
  return htmlResponse(html, { status: 200 });
}
