import { DB } from "sqliteModule";

export function dbNewPost(postId, userId, username, context) {
  const db = new DB("data/database.db");
  const time = Date.now();
  db.query(
    "INSERT INTO posts (id, userId, username, content, likes, time) values(?, ?, ?, ?, 0, ?)",
    [postId, userId, username, context, time],
  );
  db.close();
}

export function dbIsUsersPost(postId, req) {
  const db = new DB("data/database.db");
  const rows = db.query("SELECT * FROM posts WHERE id=?", [postId]);
  const postUserId = rows[0][1];
  const currentUserId = getId(req);
  db.close();
  // return if it their post or not
  return postUserId === currentUserId;
}

// deletes the post from the data base
export function dbDeletePost(postId) {
  const db = new DB("data/database.db");
  db.query("DELETE FROM posts WHERE id=?", [postId]);
  db.close();
}

export function dbGetPosts() {
  const db = new DB("data/database.db");
  const rows = db.query("SELECT * FROM posts");
  db.close();
  return rows; // I don't know if this the right-best format
}

// Make handler for get and delete post and then test
