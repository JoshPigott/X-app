import { DB } from "sqliteModule";

// transports = [transportsType], transportsType = (often) "internal",  as an array can't be stored in the database

export function getCredentialIds(userId) {
  const db = new DB("data/database.db");
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

export function addPasskey(
  userId,
  credentialId,
  publicKey,
  counter,
  transports,
) {
  const db = new DB("data/database.db");
  const [transportsType] = transports;
  db.query(
    "INSERT into passkeys (userId, credentialId, publicKey, counter, transportsType) VALUES(?, ?, ?, ?, ?)",
    [userId, credentialId, publicKey, counter, transportsType],
  );
  db.close();
}

export function getCredentials(credentialId) {
  const db = new DB("data/database.db");
  const [[publicKey, counter, transportsType]] = db.query(
    "SELECT publicKey, counter, transportsType FROM passkeys WHERE credentialId=?",
    [credentialId],
  );
  const transports = [transportsType];
  db.close();
  return {
    id: credentialId,
    publicKey: publicKey,
    counter: counter,
    transports: transports,
  };
}

export function updateCounter(credentialId) {
  const db = new DB("data/database.db");
  let [[counter]] = db.query(
    "SELECT counter FROM passkeys WHERE credentialId=?",
    [credentialId],
  );
  // The passkey has been used
  counter += 1;
  db.query("UPDATE passkeys set counter=? WHERE credentialId=?", [
    counter,
    credentialId,
  ]);
  db.close();
}
