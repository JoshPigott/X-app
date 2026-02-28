import db from "./connection.js";

export function dbAddUser(id, username) {
  db.query("INSERT INTO users (id, username) VALUES(?, ?)", [id, username]);
}

// checks to if nobody else has that username
export function dbGetId(username) {
  let [id] = db.query("SELECT id FROM users WHERE username=?", [
    username,
  ]);

  // Makes sure you don't unpack nothing
  if (id !== undefined) {
    [id] = id;
  }

  // Return the users account
  return id;
}

export function dbGetUsername(id) {
  const [[username]] = db.query("SELECT username FROM users WHERE id=?", [id]);

  return username;
}
