import htmlResponse from "../helper-functions/htmlReponse.js";
import { dbGetPosts } from "../data-base/posts.js";

const getPosts = (_req, _url, _params) => {
  const posts = dbGetPosts();
  console.log("All the posts:", posts);
  const html = /*html*/ `<div>We have all the posts</div>`;
  return htmlResponse(html, { status: 200 });
};
export default getPosts;
