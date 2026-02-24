import db from "./set-up.js";

// Creates a "likes" table for a specific post
export function dbCreateLikeTable(postId) {
  db.execute(`CREATE TABLE IF NOT EXISTS "likes-${postId}" (userId)`);
}

// Removes "likes" table
export function dbDeleteLikeTable(postId) {
  db.execute(`DROP TABLE IF EXISTS "likes-${postId}"`);
}

// Get number of likes on a post
export function dbGetLikeNumber(postId) {
  const [[likes]] = db.query("SELECT likes FROM posts WHERE id=?", [postId]);
  return likes;
}

// Adds a like to the post and tracks the users like
export function dbAddLike(postId, userId) {
  db.query(`INSERT into "likes-${postId}" (userId) VALUES(?)`, [userId]);
  db.query("UPDATE posts set likes = likes + 1 WHERE id=?", [postId]);
}

// Remove user's like from post and like tracking
export function dbRemoveLike(postId, userId) {
  db.query(`DELETE FROM "likes-${postId}" WHERE userId=?`, [userId]);
  db.query("UPDATE posts set likes = likes - 1 WHERE id=?", [postId]);
}

// Checks to if the user has like a specific post
export function dbGetHasLiked(postId, userId) {
  const [user] = db.query(
    `SELECT userId FROM "likes-${postId}" WHERE userId=?`,
    [userId],
  );
  // The user has not liked the post
  if (user === undefined || user === false) {
    return false;
  }
  return true;
}
