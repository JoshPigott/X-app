import { DB } from "sqliteModule";

// transports = [transportsType], transportsType = (often) "internal",  as an array can't be stored in the database

// returns passkey ID credentials in the format of [{id:id, transport: transport}] from database
export function getCredentialIds(userId) {
  const db = new DB("src/data/database.db");
  const credentials = db.query(
    "SELECT credentialId, transportsType FROM passkeys WHERE userId=?",
    [userId],
  );

  const formatedCredentials = [];

  credentials.forEach((credential) => {
    const [id, transports] = credential;

    const formated = {
      id,
      transports: [transports],
    };
    formatedCredentials.push(formated);
  });
  db.close();
  return formatedCredentials;
}

// Adds a passkey to the database
export function addPasskey(
  userId,
  credentialId,
  publicKey,
  counter,
  transports,
) {
  const db = new DB("src/data/database.db");
  const [transportsType] = transports;
  db.query(
    "INSERT into passkeys (userId, credentialId, publicKey, counter, transportsType) VALUES(?, ?, ?, ?, ?)",
    [userId, credentialId, publicKey, counter, transportsType],
  );
  db.close();
}

// returns a passkey credentials containing id, publickey, counter and transports from the database
export function getCredentials(credentialId) {
  console.log("credentialId:", credentialId);
  const db = new DB("src/data/database.db");
  const [[publicKey, counter, transportsType]] = db.query(
    "SELECT publicKey, counter, transportsType FROM passkeys WHERE credentialId=?",
    [credentialId],
  );
  // Updates of tranport from a string to an array
  const transports = [transportsType];
  db.close();
  return {
    id: credentialId,
    publicKey: publicKey,
    counter: counter,
    transports: transports,
  };
}

// Makes sure counter on device and server are the same
export function updateCounter(credentialId, newCounter) {
  const db = new DB("src/data/database.db");
  db.query("UPDATE passkeys set counter=? WHERE credentialId=?", [
    newCounter,
    credentialId,
  ]);
  db.close();
}
