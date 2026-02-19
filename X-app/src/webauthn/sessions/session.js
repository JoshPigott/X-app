// Allows you do get the session Id later on
const sessions = new Map();

// Makes new session and stores it
export function createSession() {
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, { login: false });
  return sessionId;
}

// Updates the session
export function updateSession(sessionId, id, username) {
  sessions.set(sessionId, { id: id, username: username, login: true });
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

// gets data from cookie
export function getSession(req) {
  const cookies = getCookies(req);
  const sessionId = cookies?.sessionId;
  return sessionId;
}

// Get the data from the session
function getData(sessionId) {
  const data = sessions.get(sessionId);
  return data;
}

// gets username from the session
export function dbGetUsername(req) {
  const sessionId = getSession(req);
  const data = getData(sessionId);
  return data.username;
}

// gets the id from the session
export function getId(req) {
  const sessionId = getSession(req);
  const data = getData(sessionId);
  return data.id;
}

// returns if user is login or not
export function getLoginStatus(req) {
  const sessionId = getSession(req);
  if (!sessionId) {
    return false;
  }
  const data = getData(sessionId);
  return data.login;
}
