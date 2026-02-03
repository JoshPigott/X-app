import { dbGetLikeNumber, dbUpdateLikes } from "../data-base/likes.js";
import htmlResponse from "../helper-functions/htmlReponse.js";

export async function like(req, _url, _params) {
  const data = await req.json(); // may change with htmx
  const postId = data.postId;

  let likeNum = dbGetLikeNumber(postId);
  likeNum += 1;
  dbUpdateLikes(postId, likeNum);

  const html = /*html*/ `<div>Post liked! ${likeNum} total likes</div>`;
  return htmlResponse(html, { status: 200 });
}

export async function unlike(req, _url, _params) {
  const data = await req.json(); // may change with htmx
  const postId = data.postId;

  let likeNum = dbGetLikeNumber(postId);
  likeNum -= 1;
  dbUpdateLikes(postId, likeNum);

  const html = /*html*/ `<div>Post unliked! ${likeNum} total likes</div>`;
  return htmlResponse(html, { status: 200 });
}
