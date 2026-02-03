import htmlResponse from "../helper-functions/htmlReponse.js";
import { dbDeletePost, dbIsUsersPost } from "../data-base/posts.js";

const deletePost = async (req, _url, _params) => {
  const data = await req.json(); // may change with htmx
  const postId = data.postId;

  if (!dbIsUsersPost(postId, req)) {
    const html = /*html*/ `<div>Not your post</div>`;
    return htmlResponse(html, { status: 404 });
  }

  dbDeletePost(postId);
  const html = /*html*/ `<div>Post deleted</div>`;
  return htmlResponse(html, { status: 200 });
};
export default deletePost;
