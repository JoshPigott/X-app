import { DB } from "sqliteModule";
const setupDatabase = () => {
  const db = new DB("data/database.db");
  // Users table
  db.execute(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE)`);
  // Posts table
  db.execute(`CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY, 
    userId TEXT, username TEXT, content TEXT, 
    likes INTGER, time INTGER)`);
  db.close();
};
export default setupDatabase;

// tables
// id, username
// posts username, content, likes, time of post
