import { dbNewPost } from "../data-base/posts.js";
import htmlResponse from "../helper-functions/htmlReponse.js";
import { dbGetUsername, getId } from "../authentication/session.js";

const post = async (req, _url, _params) => {
  const form = await req.formData();
  const content = form.get("content");

  const postId = crypto.randomUUID();
  console.log("post id", postId);

  // From session data
  const username = dbGetUsername(req);
  const userId = getId(req);

  dbNewPost(postId, userId, username, content);
  const html = /*html*/ `<div>Post created</div>`;
  return htmlResponse(html, { staus: 201 });
};

export default post;
