// Authentication
import getOptions from "../services/webauthn/authentication/get-options.js";
import isVerifiedAuth from "../services/webauthn/authentication/verify-response.js";
// Registration
import createOptions from "../services/webauthn/registration/create-options.js";
import isVerifiedReg from "../services/webauthn/registration/verify-response.js";

import { dbGetId } from "../database/users.js";
import { createSession, getSession } from "../services/session.js";
import { dbStoreAuthChallenge } from "../services/account-challenge.js";
import json from "../utils/json-response.js";

// Starts the process of getting login options for authentication
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

// Starts the process of getting login options for registration
export async function registerStart(ctx) {
  const form = await ctx.req.formData();
  const username = form.get("username");
  let id = dbGetId(username);

  // Existing account
  if (id !== undefined) {
    console.log("Account already exists");
    return json({ error: "Account already exists" }, { status: 409 });
  }

  // New account
  const sessionId = createSession();
  console.log("sessionId:", sessionId);

  id = crypto.randomUUID();
  const account = { username, id };

  const options = await createOptions(username, id);
  console.log("registration options are done!");

  // saves the challenge and account so it can accessed at verification
  dbStoreAuthChallenge(sessionId, account, options.challenge);

  return json(options, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionId=${sessionId}; HttpOnly; SameSite=Strict; Path=/`,
    },
  });
}

// Verifies the passkey-signed challenge for authentication
export async function authVerify(ctx) {
  const sessionId = getSession(ctx.req);
  const body = await ctx.req.json();
  return await isVerifiedAuth(body, sessionId);
}

// Verifies the passkey-signed challenge for registration
export async function regVerify(ctx) {
  const sessionId = getSession(ctx.req);
  const body = await ctx.req.json();
  return await isVerifiedReg(body, sessionId);
}
