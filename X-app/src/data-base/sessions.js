import db from "./set-up.js";

export function dbCreateSession(sessionId, loginStatus, expiryTime) {
  db.query(
    "INSERT into sessions (sessionId, loginStatus, userId, username, expiryTime) VALUES(?,?,NULL,NULL,?)",
    [sessionId, loginStatus, expiryTime],
  );
}

export function dbUpdateSession(sessionId, loginStatus, userId, username) {
  db.query(
    "UPDATE sessions SET loginStatus=?, userId=?, username=? WHERE sessionId=?",
    [loginStatus, userId, username, sessionId],
  );
}

export function dbDeleteSession(sessionId) {
  try {
    db.query("DELETE FROM sessions WHERE sessionId=?", [sessionId]);
    console.log("A session was just deleted");
  } catch (_err) {
    // Session was already deleted
  }
}

// Get data to check if the session exist
export function dbIsValidSession(sessionId) {
  const [session] = db.query(
    "SELECT expiryTime FROM sessions WHERE sessionId=?",
    [
      sessionId,
    ],
  );
  return session;
}

// Checks if the user is login
export function dbGetLoginStatus(sessionId) {
  const [[loginStatus]] = db.query(
    "SELECT loginStatus FROM sessions WHERE sessionId=?",
    [sessionId],
  );
  return loginStatus;
}

export function dbGetusername(sessionId) {
  const [[username]] = db.query(
    "SELECT username FROM sessions WHERE sessionId=?",
    [sessionId],
  );
  return username;
}

export function dbGetuserId(sessionId) {
  const [[userId]] = db.query("SELECT userId FROM sessions WHERE sessionId=?", [
    sessionId,
  ]);
  return userId;
}

export function dbGetAllsessions() {
  const sessions = db.query("SELECT * from sessions");
  return sessions;
}
