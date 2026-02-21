import db from "./set-up.js";

const setupDatabase = () => {
  // Users table
  db.execute(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    username TEXT UNIQUE)`);

  // Posts table
  db.execute(`CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY NOT NULL, 
    userId TEXT NOT NULL, username TEXT NOT NULL, content TEXT, 
    likes INTGER NOT NULL, time INTGER NOT NULL)`);

  // Passkey table
  db.execute(`CREATE TABLE IF NOT EXISTS passkeys (
    userId TEXT NOT NULL, credentialId BLOB NOT NULL,
    publicKey BLOB NOT NULL, counter INTGER NOT NULL,
    transportsType TEXT NOT NULL, 
    PRIMARY KEY(userId, credentialId))`);

  // Session table
  db.execute(`CREATE TABLE IF NOT EXISTS sessions
    (sessionId TEXT PRIMARY KEY NOT NULL, loginStatus TEXT,
    userId TEXT, username TEXT)`);
};
export default setupDatabase;
