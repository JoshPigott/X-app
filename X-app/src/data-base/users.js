import { DB } from "sqliteModule";

export function dbAddUser(id, username) {
  const db = new DB("data/database.db");
  db.query("INSERT INTO users (id, username) VALUES(?, ?)", [id, username]);
  db.close();
}

// checks to if nobody else has that username
export function dbGetId(username) {
  const db = new DB("data/database.db");
  let [id] = db.query("SELECT id FROM users WHERE username=?", [
    username,
  ]);

  if (id !== undefined) { // I don't really understand why this happening
    [id] = id;
  }
  db.close();

  // Return the users account
  return id;
}

export function dbGetUsername(id) {
  const db = new DB("data/database.db");

  const [[username]] = db.query("SELECT username FROM users WHERE id=?", [id]);

  db.close();
  return username;
}
