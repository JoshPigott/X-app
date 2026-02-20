// Updates like in database adding or removing
import { DB } from "sqliteModule";

export function dbCreateLikeTable(postId) {
  const db = new DB("src/data/database.db");
  db.execute(`CREATE TABLE IF NOT EXISTS "likes-${postId}" (userId)`);
  db.close();
}

export function dbDeleteLikeTable(postId) {
  const db = new DB("src/data/database.db");
  db.execute(`DROP TABLE IF EXISTS "likes-${postId}"`);
  db.close();
}

export function dbGetLikeNumber(postId) {
  const db = new DB("src/data/database.db");
  const [[likes]] = db.query("SELECT likes FROM posts WHERE id=?", [postId]);
  db.close();
  return likes;
}

export function dbAddLike(postId, userId) {
  const db = new DB("src/data/database.db");
  // Tracks that user like post
  db.query(`INSERT into "likes-${postId}" (userId) VALUES(?)`, [userId]);
  db.query("UPDATE posts set likes = likes + 1 WHERE id=?", [postId]);
  db.close();
}

export function dbRemoveLike(postId) {
  const db = new DB("src/data/database.db");
  // Tracks that user like post
  db.query(`DELETE FROM "likes-${postId}" WHERE userId=?`, [userId]);
  db.query("UPDATE posts set likes = likes - 1 WHERE id=?", [postId]);
  db.close();
}

export function getHasLiked(postId, userId) {
  const db = new DB("src/data/database.db");
  const [user] = db.query(
    `SELECT userId FROM "likes-${postId}" WHERE userId=?`,
    [userId],
  );
  // The user has not liked the post
  if (user == undefined) {
    return false;
  }
  return true;
}
