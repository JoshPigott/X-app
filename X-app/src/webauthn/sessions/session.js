// Allows you do get the session Id later on
const sessions = new Map();

// Makes new session and stores it
export function createSession(id, username) {
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, { id: id, username: username });
  return sessionId;
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
function getSessions(req) {
  const cookies = getCookies(req);
  const sessionId = cookies.sessionId;
  const data = sessions.get(sessionId);
  return data;
}

// gets username from the session
export function dbGetUsername(req) {
  const data = getSessions(req);
  return data.username;
}

// gets the id from the session
export function getId(req) {
  const data = getSessions(req);
  return data.id;
}
