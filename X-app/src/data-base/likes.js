// Updates like in database adding or removing
import { DB } from "sqliteModule";

export function dbGetLikeNumber(postId) {
  const db = new DB("src/data/database.db");
  const [[likes]] = db.query("SELECT likes FROM posts WHERE id=?", [postId]);
  db.close();
  return likes;
}

export function dbUpdateLikes(postId, likes) {
  const db = new DB("src/data/database.db");
  db.query("UPDATE posts set likes=? WHERE id=?", [likes, postId]);
  db.close();
}
