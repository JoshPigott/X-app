import { dbAccount } from "../data-base/users.js";
import htmlResponse from "../helper-functions/htmlReponse.js";
import { createSession } from "../authentication/session.js";

const login = async (req) => {
  const form = await req.formData();
  const username = form.get("username");
  const account = dbAccount(username);

  // There is no account with that username
  if (account === false) {
    const html = /*html*/ `<div>${username} is an incorrect username</div>`;
    return htmlResponse(html, { status: 200 });
  }
  const id = account[0];
  const sessionId = createSession(id, username);
  console.log("session id:", sessionId);

  const html = /*html*/ `<div>${username} was login</div>`;
  return htmlResponse(html, { status: 200 });
};
export default login;
