import htmlResponse from "../helper-functions/html-response.js";
import { dbDeletePost, dbIsUsersPost } from "../data-base/posts.js";

const deletePost = async (ctx) => {
  const data = await ctx.req.json(); // may change with htmx
  const postId = data.postId;

  // Post maker only able to delete
  if (!dbIsUsersPost(postId, ctx.req)) {
    const html = /*html*/ `<div>Not your post</div>`;
    return htmlResponse(html, { status: 404 });
  }

  // Deletes the post from the database
  dbDeletePost(postId);
  const html = /*html*/ `<div>Post deleted</div>`;
  return htmlResponse(html, { status: 200 });
};
export default deletePost;
