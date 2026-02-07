import htmlResponse from "../helper-functions/html-response.js";
import { dbGetPosts } from "../data-base/posts.js";

// Gets all the posts from data base
const getPosts = (_ctx) => {
  const posts = dbGetPosts();
  console.log("All the posts:", posts);
  const html = /*html*/ `<div>We have all the posts</div>`;
  return htmlResponse(html, { status: 200 });
};
export default getPosts;
