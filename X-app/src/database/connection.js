import { DB } from "sqlite";
const db = new DB("data/database.db");
export default db;

// Makes database get closed when server stops running
Deno.addSignalListener("SIGINT", () => {
  db.close();
  Deno.exit();
});
