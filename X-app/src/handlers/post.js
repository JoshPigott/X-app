import {
  dbDeletePost,
  dbGetPosts,
  dbIsUsersPost,
  dbNewPost,
} from "../database/posts.js";
import { dbCreateLikeTable, dbDeleteLikeTable } from "../database/likes.js";
import { getId, getUsername } from "../services/session.js";
import getPostTemplate from "../views/post-template.js";
import createListTemplate from "../views/list.js";
import htmlResponse from "../utils/html-response.js";

// Creates a new post with content the user has entered in
export async function addPost(ctx) {
  const form = await ctx.req.formData();
  const content = form.get("content");

  const randomString = crypto.randomUUID();
  // Allows the post id to used as css selctor as it starts with a letter and not a number
  const postId = `post-${randomString}`;
  console.log("post id:", postId);

  // From session data
  const username = getUsername(ctx.req);
  const userId = getId(ctx.req);

  const time = Date.now();
  await dbNewPost(postId, userId, username, content, time);
  // Start tracking like on posts
  dbCreateLikeTable(postId);
  const postdata = { id: postId, username, content, likes: 0, time };
  // Adds the post
  const html = await getPostTemplate(postdata, ctx.req);
  return htmlResponse(html, { status: 201 });
}

// Gets all the posts from data base
export function getPosts(ctx) {
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
}

// Delete post by update html and database
export function deletePost(ctx) {
  const postId = ctx.params.id;

  // Post maker only able to delete
  if (!dbIsUsersPost(postId, ctx.req)) {
    const html = /*html*/ `<div>Not your post</div>`;
    return htmlResponse(html, { status: 403 });
  }

  // Deletes the post from the database
  dbDeletePost(postId);
  dbDeleteLikeTable(postId);
  const html = /*html*/ ``;
  return htmlResponse(html, { status: 200 });
}
