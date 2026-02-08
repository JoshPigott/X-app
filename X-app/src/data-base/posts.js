import { DB } from "sqliteModule";
import { getId } from "../webauthn/sessions/session.js";

export function dbNewPost(postId, userId, username, context, time) {
  const db = new DB("data/database.db");
  db.query(
    "INSERT INTO posts (id, userId, username, content, likes, time) values(?, ?, ?, ?, 0, ?)",
    [postId, userId, username, context, time],
  );
  db.close();
}

export function dbIsUsersPost(postId, req) {
  let postUserId;
  44;
  const db = new DB("data/database.db");
  const [row] = db.query("SELECT userId FROM posts WHERE id=?", [
    postId,
  ]);
  console.log();
  db.close();

  if (row == undefined) {
    console.log("111");
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
  const db = new DB("data/database.db");
  db.query("DELETE FROM posts WHERE id=?", [postId]);
  db.close();
}

export function dbGetPosts() {
  const db = new DB("data/database.db");
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

// Make handler for get and delete post and then test
