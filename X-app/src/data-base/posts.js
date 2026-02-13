import { DB } from "sqliteModule";
import { getId } from "../webauthn/sessions/session.js";

// Adds a new post to the data base
export function dbNewPost(postId, userId, username, context, time) {
  const db = new DB("src/data/database.db");
  db.query(
    "INSERT INTO posts (id, userId, username, content, likes, time) values(?, ?, ?, ?, 0, ?)",
    [postId, userId, username, context, time],
  );
  db.close();
}

// Checks if a post is the users post with ids
export function dbIsUsersPost(postId, req) {
  let postUserId;
  const db = new DB("src/data/database.db");
  const [row] = db.query("SELECT userId FROM posts WHERE id=?", [
    postId,
  ]);
  db.close();

  if (row == undefined) {
    return false;
  } else {
    [postUserId] = row;
  }

  console.log("postId:", postId);

  const currentUserId = getId(req);

  // return if it their post or not
  return postUserId === currentUserId;
}

// deletes the post from the data base
export function dbDeletePost(postId) {
  const db = new DB("src/data/database.db");
  db.query("DELETE FROM posts WHERE id=?", [postId]);
  db.close();
}

// Gets all the posts in the database
export function dbGetPosts() {
  const db = new DB("src/data/database.db");
  const posts = [];
  const rows = db.query("SELECT id, username, content, likes, time FROM posts");
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
  db.close();
  return posts; // I don't know if this the right-best format
}
