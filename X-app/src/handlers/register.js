import { dbAccount, dbAddUser } from "../data-base/users.js";
import { createSession } from "../authentication/session.js";
import htmlResponse from "../helper-functions/htmlReponse.js";

const register = async (req, _url, _params) => {
  const form = await req.formData();
  const username = form.get("username");
  const usernameTaken = dbAccount(username);

  // There is all an account
  if (usernameTaken !== false) {
    const html = /*html*/ `<div>Username: ${username} is already taken</div>`;
    return htmlResponse(html, { staus: 409 });
  }

  const id = crypto.randomUUID();
  dbAddUser(id, username);
  const sessionId = createSession(id, username);
  console.log(`session id:`, sessionId);
  const html = /*html*/ `<div>Account created</div>`;
  return htmlResponse(html, {
    staus: 201,
    headers: { Cookie: { sessionId: sessionId } },
  });
};

export default register;
