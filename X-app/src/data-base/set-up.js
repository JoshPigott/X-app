import { DB } from "sqliteModule";
const db = new DB("src/data/database.db");
export default db;

// Makes database get closed when server stops running
Deno.addSignalListener("SIGINT", () => {
  db.close();
  Deno.exit();
});
