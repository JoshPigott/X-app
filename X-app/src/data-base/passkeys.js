import db from "./set-up.js";

// Note: transports = [transportsType], transportsType = "internal" (often),  as an array can't be stored in the database

// returns passkey ID credentials in the format of [{id:id, transport: transport}] from database
export function dbGetCredentialIds(userId) {
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
  return formatedCredentials;
}

// Adds a passkey to the database
export function dbAddPasskey(
  userId,
  credentialId,
  publicKey,
  counter,
  transports,
) {
  const [transportsType] = transports;
  db.query(
    "INSERT into passkeys (userId, credentialId, publicKey, counter, transportsType) VALUES(?, ?, ?, ?, ?)",
    [userId, credentialId, publicKey, counter, transportsType],
  );
}

// returns a passkey credentials containing id, publickey, counter and transports from the database
export function dbGetCredentials(credentialId) {
  const [[publicKey, counter, transportsType]] = db.query(
    "SELECT publicKey, counter, transportsType FROM passkeys WHERE credentialId=?",
    [credentialId],
  );
  // Updates of tranport from a string to an array
  const transports = [transportsType];

  return {
    id: credentialId,
    publicKey: publicKey,
    counter: counter,
    transports: transports,
  };
}

// Makes sure counter on device and server are the same
export function dbUpdateCounter(credentialId, newCounter) {
  db.query("UPDATE passkeys set counter=? WHERE credentialId=?", [
    newCounter,
    credentialId,
  ]);
}
