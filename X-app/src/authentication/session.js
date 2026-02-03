// Allows you do get the session Id later on
const sessions = new Map();

export function createSession(id, username) {
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, { id: id, username: username });
  return sessionId;
}

// Gets cookies from a request as an object
function getCookies(req) {
  const cookies = req.headers.get("cookie");
  if (!cookies) return;
  const splitCookies = cookies.split("; ");
  const keyValueCookies = splitCookies.map((c) => c.split("="));
  return Object.fromEntries(keyValueCookies);
}

function getSessions(req) {
  const cookies = getCookies(req);
  const sessionId = cookies.sessionId;
  const data = sessions.get(sessionId);
  return data;
}

export function dbGetUsername(req) {
  const data = getSessions(req);
  return data.username;
}

export function getId(req) {
  const data = getSessions(req);
  return data.id;
}
