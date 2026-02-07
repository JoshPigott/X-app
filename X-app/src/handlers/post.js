import { dbNewPost } from "../data-base/posts.js";
import htmlResponse from "../helper-functions/html-response.js";
import { dbGetUsername, getId } from "../webauthn/sessions/session.js";

// Creates a new post with content the user has entered in
const post = async (ctx) => {
  const form = await ctx.req.formData();
  const content = form.get("content");

  const postId = crypto.randomUUID();
  console.log("post id", postId);

  // From session data
  const username = dbGetUsername(ctx.req);
  const userId = getId(ctx.req);

  dbNewPost(postId, userId, username, content);
  const html = /*html*/ `<div>Post created</div>`;
  return htmlResponse(html, { status: 201 });
};

export default post;
