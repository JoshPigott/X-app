import db from "./connection.js";
import { getId } from "../services/session.js";

// Adds a new post to the data base
export function dbNewPost(postId, userId, username, content, time) {
  db.query(
    "INSERT INTO posts (id, userId, username, content, likes, time) VALUES(?, ?, ?, ?, 0, ?)",
    [postId, userId, username, content, time],
  );
}

// Checks if a post is the users post with ids
export function dbIsUsersPost(postId, req) {
  //let postUserId;
  const [[postUserId]] = db.query("SELECT userId FROM posts WHERE id=?", [
    postId,
  ]);

  const currentUserId = getId(req);
  // Return if it their post or not
  return postUserId === currentUserId;
}

// Deletes the post from the data base
export function dbDeletePost(postId) {
  db.query("DELETE FROM posts WHERE id=?", [postId]);
}

// Gets all the posts in the database
export function dbGetPosts(cursor) {
  // Okay I need to add pagination
  const posts = [];
  const rows = db.query(
    `SELECT id, username, content, likes,
     time FROM posts WHERE time < ? ORDER BY time DESC LIMIT 3`,
    [cursor],
  );

  if (rows.length === 0) {
    return {};
  }
  cursor = rows[rows.length - 1][4];

  rows.forEach((row) => {
    const id = row[0];
    const username = row[1];
    const content = row[2];
    const likes = row[3];
    const time = row[4];

    const post = {
      id,
      username,
      content,
      likes,
      time,
    };
    posts.push(post);
  });

  return { posts, cursor };
}
