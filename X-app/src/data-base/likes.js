import { DB } from "sqliteModule";

export function dbGetLikeNumber(postId) {
  const db = new DB("data/database.db");
  const rows = db.query("SELECT * FROM posts WHERE id=?", [postId]);
  db.close();
  return rows[0][4]; // This could break easily
}

export function dbUpdateLikes(postId, likes) {
  const db = new DB("data/database.db");
  db.query("UPDATE posts set likes=? WHERE id=?", [likes, postId]);
  db.close();
}
