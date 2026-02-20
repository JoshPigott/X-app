import {
  dbAddLike,
  dbGetLikeNumber,
  dbRemoveLike,
  getHasLiked,
} from "../data-base/likes.js";
import { getId } from "../webauthn/sessions/session.js";
import { likeTemplate, unlikeTemplate } from "../view/likes.js";
import htmlResponse from "../helper-functions/html-response.js";

// Increases the number of likes on the post by one
export function like(ctx) {
  const postId = ctx.params.id;
  const userId = getId(ctx.req);
  const hasLiked = getHasLiked(postId, userId);

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
  const hasLiked = getHasLiked(postId, userId);

  // Makes sure the user can't unlike the post multiple times
  if (hasLiked === false) {
    dbRemoveLike(postId, userId);
  }
  const likeNum = dbGetLikeNumber(postId);

  const html = likeTemplate({ id: postId, likes: likeNum });
  return htmlResponse(html, { status: 200 });
}
