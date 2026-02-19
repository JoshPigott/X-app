import { dbNewPost } from "../data-base/posts.js";
import htmlResponse from "../helper-functions/html-response.js";
import { dbGetUsername, getId } from "../webauthn/sessions/session.js";
import getPostTemplate from "../view/post-template.js";

// Creates a new post with content the user has entered in
const post = async (ctx) => {
  const form = await ctx.req.formData();
  const content = form.get("content");

  const randomString = crypto.randomUUID();
  // Allows the post id to used as css selctor as it starts with a letter and not a number
  const postId = `post-${randomString}`;
  console.log("post id:", postId);

  // From session data
  const username = dbGetUsername(ctx.req);
  const userId = getId(ctx.req);

  const time = Date.now();
  await dbNewPost(postId, userId, username, content, time);
  const postdata = { id: postId, username, content, likes: 0, time };
  // Adds the post
  const html = await getPostTemplate(postdata, ctx.req);
  return htmlResponse(html, { status: 201 });
};

export default post;
