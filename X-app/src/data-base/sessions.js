import db from "./set-up.js";

export function dbCreateSession(sessionId, loginStatus) {
  db.query(
    "INSERT into sessions (sessionId, loginStatus, userId, username) VALUES(?,?,NULL,NULL)",
    [sessionId, loginStatus],
  );
}

export function dbUpdateSession(sessionId, loginStatus, userId, username) {
  db.query(
    "UPDATE sessions SET loginStatus=?, userId=?, username=? WHERE sessionId=?",
    [loginStatus, userId, username, sessionId],
  );
}

export function dbDeleteSession(sessionId) {
  db.query("DELETE FROM sessions WHERE sessionId=?", [sessionId]);
}

// Checks if the sessionId that sent exist
export function dbIsValidSession(sessionId) {
  const [session] = db.query("SELECT * FROM sessions WHERE sessionId=?", [
    sessionId,
  ]);
  if (session === undefined) {
    return false;
  }
  return true;
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
