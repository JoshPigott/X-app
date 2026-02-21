import {
  dbCreateSession,
  dbDeleteSession,
  dbGetLoginStatus,
  dbGetuserId,
  dbGetusername,
  dbIsValidSession,
  dbUpdateSession,
} from "../../data-base/sessions.js";

// Makes new session and stores it
export function createSession() {
  const sessionId = crypto.randomUUID();
  dbCreateSession(sessionId, false);

  // Deletes session after 2 hours to clear memory
  try {
    setTimeout(() => {
      console.log("The session has been deleted");
      dbDeleteSession(sessionId);
    }, 2 * 60 * 60 * 1000); 
  } catch (_err) {
    // The session was already deleted
  }
  return sessionId;
}

// Updates the session
export function updateSession(sessionId, id, username) {
  dbUpdateSession(sessionId, true, id, username);
}

// Gets cookies from a request as an object
function getCookies(req) {
  const cookies = req.headers.get("cookie");
  if (!cookies) return;
  // splits each cookie up
  const splitCookies = cookies.split("; ");
  // Turns each cookie into a key value array
  const keyValueCookies = splitCookies.map((c) => c.split("="));
  // Converts from a key value array to an object
  return Object.fromEntries(keyValueCookies);
}

// Gets sessionId from cookies
export function getSession(req) {
  const cookies = getCookies(req);
  const sessionId = cookies?.sessionId;
  return sessionId;
}

// Gets username from the session
export function getUsername(req) {
  const sessionId = getSession(req);
  const username = dbGetusername(sessionId);
  return username;
}

// Gets the id from the session
export function getId(req) {
  const sessionId = getSession(req);
  const userId = dbGetuserId(sessionId);
  return userId;
}

// Returns if user is login or not
export function getLoginStatus(req) {
  const sessionId = getSession(req);
  // Checks if session was sent
  if (!sessionId) {
    return false;
  }
  // Check if sessiondId is valid
  if (dbIsValidSession(sessionId) === false) {
    return false;
  }
  // Check session login status
  const loginStatus = dbGetLoginStatus(sessionId);
  return loginStatus;
}
