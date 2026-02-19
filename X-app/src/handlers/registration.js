import { dbGetId } from "../data-base/users.js";
import createOptions from "../webauthn/registration/create-options.js";
import verifyResponse from "../webauthn/registration/verify-response.js";
import { createSession, getSession } from "../webauthn/sessions/session.js";
import { storeAuthChallenge } from "../data-base/account-challenge.js";
import json from "../helper-functions/json-response.js";

// Starts the process of getting login options
export async function registerStart(ctx) {
  const form = await ctx.req.formData();
  const username = form.get("username");
  let id = dbGetId(username);

  // Existing account
  if (id !== undefined) {
    console.log("Account already exists");
    return json({ error: "Account already exists" }, { status: 404 });
  }

  // New account
  const sessionId = createSession();
  console.log("sessionId:", sessionId);

  id = crypto.randomUUID();
  const account = { username, id };

  const options = await createOptions(username, id);
  console.log("registration options are done!");

  // saves the challenge and account so it can accessed at verification
  storeAuthChallenge(sessionId, account, options.challenge);

  return json(options, {
    status: 200,
    headers: { "Set-Cookie": `sessionId=${sessionId}; HttpOnly; Path=/` },
  });
}

// Sends the passkey signed challange away to be verified
export async function regVerify(ctx) {
  const sessionId = getSession(ctx.req);
  const body = await ctx.req.json();
  return await verifyResponse(body, sessionId);
}
