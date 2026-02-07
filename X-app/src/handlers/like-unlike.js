import { dbGetLikeNumber, dbUpdateLikes } from "../data-base/likes.js";
import htmlResponse from "../helper-functions/html-response.js";

// Increases the number of likes on the post by one
export async function like(ctx) {
  const data = await ctx.req.json(); // may change with htmx
  const postId = data.postId;

  let likeNum = dbGetLikeNumber(postId);
  likeNum += 1;
  dbUpdateLikes(postId, likeNum);

  const html = /*html*/ `<div>Post liked! ${likeNum} total likes</div>`;
  return htmlResponse(html, { status: 200 });
}

// Decreases the number of likes on the post by one
export async function unlike(ctx) {
  const data = await ctx.req.json(); // may change with htmx
  const postId = data.postId;

  let likeNum = dbGetLikeNumber(postId);
  likeNum -= 1;
  dbUpdateLikes(postId, likeNum);

  const html = /*html*/ `<div>Post unliked! ${likeNum} total likes</div>`;
  return htmlResponse(html, { status: 200 });
}
