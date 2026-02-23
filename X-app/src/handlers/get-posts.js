import htmlResponse from "../helper-functions/html-response.js";
import { dbGetPosts } from "../data-base/posts.js";
import createListTemplate from "../view/list.js";

// Gets all the posts from data base
const getPosts = (ctx) => {
  const urlParams = new URLSearchParams(ctx.url.search);
  const cursor = urlParams.get("cursor");
  const data = dbGetPosts(cursor);
  // No more posts
  if (data?.posts === undefined) {
    const html = "";
    return htmlResponse(html, { status: 200 });
  }

  const html = createListTemplate(data.posts, data.cursor, ctx.req);
  return htmlResponse(html, { status: 200 });
};
export default getPosts;
