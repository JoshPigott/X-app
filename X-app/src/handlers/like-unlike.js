import { dbGetLikeNumber, dbUpdateLikes } from "../data-base/likes.js";
import { likeTemplate, unlikeTemplate } from "../view/likes.js";
import htmlResponse from "../helper-functions/html-response.js";

// Increases the number of likes on the post by one
export function like(ctx) {
  const postId = ctx.params.id;

  let likeNum = dbGetLikeNumber(postId);
  likeNum += 1;
  dbUpdateLikes(postId, likeNum);

  const html = unlikeTemplate({ id: postId, likes: likeNum });
  return htmlResponse(html, { status: 200 });
}

// Decreases the number of likes on the post by one
export function unlike(ctx) {
  const postId = ctx.params.id;

  let likeNum = dbGetLikeNumber(postId);
  likeNum -= 1;
  dbUpdateLikes(postId, likeNum);

  const html = likeTemplate({ id: postId, likes: likeNum });
  return htmlResponse(html, { status: 200 });
}
