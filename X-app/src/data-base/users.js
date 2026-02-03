import { DB } from "sqliteModule";

export function dbAddUser(id, username) {
  const db = new DB("data/database.db");
  db.query("INSERT INTO users (id, username) VALUES(?, ?)", [id, username]);
  db.close();
}

// checks to if nobody else has that username
export function dbAccount(username) {
  const db = new DB("data/database.db");
  const [account] = db.query("SELECT * FROM users WHERE username=?", [
    username,
  ]);
  db.close();

  if (account == undefined) {
    return false;
  }
  return account;
}

export function dbGetUsername(id) {
  const db = new DB("data/database.db");

  const [result] = db.query("SELECT * users WHERE id=?", [id]);
  const username = result[1];

  db.close();
  return username;
}
