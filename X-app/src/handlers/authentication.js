import { dbGetId } from "../data-base/users.js";
import getOptions from "../webauthn/authentication/get-options.js";
import isVerified from "../webauthn/authentication/verify-response.js";
import { createSession, getSession } from "../webauthn/sessions/session.js";
import { dbStoreAuthChallenge } from "../data-base/account-challenge.js";
import json from "../helper-functions/json-response.js";

// Starts the process of getting login options
export async function authenticateStart(ctx) {
  const form = await ctx.req.formData();
  const username = form.get("username");
  const id = dbGetId(username);
  const account = { id, username };

  const sessionId = createSession();
  console.log("sessionId:", sessionId);

  // Checks if accounts exits or not
  if (id === undefined) {
    console.log("The account does not exits");
    return json({ error: "The Account not exists" }, { status: 404 });
  }

  const options = await getOptions(account);

  // saves the challenge and account so it can accessed at verification
  dbStoreAuthChallenge(sessionId, account, options.challenge);

  console.log("authentication options are done!");

  return await json(options, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionId=${sessionId}; HttpOnly; SameSite=Strict; Path=/`,
    },
  });
}

// Sends the passkey signed challange away to be verified
export async function authVerify(ctx) {
  const sessionId = getSession(ctx.req);
  const body = await ctx.req.json();
  return await isVerified(body, sessionId);
}
