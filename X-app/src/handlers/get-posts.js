import htmlResponse from "../helper-functions/html-response.js";
import { dbGetPosts } from "../data-base/posts.js";
import createListTemplate from "../view/list.js";

// Gets all the posts from data base
const getPosts = (ctx) => {
  const posts = dbGetPosts();

  const html = createListTemplate(posts, ctx.req);
  return htmlResponse(html, { status: 200 });
};
export default getPosts;
