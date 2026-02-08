import htmlResponse from "../helper-functions/html-response.js";
import { dbDeletePost, dbIsUsersPost } from "../data-base/posts.js";

const deletePost = (ctx) => {
  const postId = ctx.params.id;

  // Post maker only able to delete
  if (!dbIsUsersPost(postId, ctx.req)) {
    const html = /*html*/ `<div>Not your post</div>`;
    return htmlResponse(html, { status: 404 });
  }

  // Deletes the post from the database
  dbDeletePost(postId);
  const html = /*html*/ ``;
  return htmlResponse(html, { status: 200 });
};
export default deletePost;
