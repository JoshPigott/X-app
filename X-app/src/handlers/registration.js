import { dbGetId } from "../data-base/users.js";
import createOptions from "../webauthn/registration/create-options.js";
import verifyResponse from "../webauthn/registration/verify-response.js";
import json from "../helper-functions/json-response.js";

// Starts the process of getting login in options
export async function registerStart(ctx) {
  const form = await ctx.req.formData();
  const username = form.get("username");
  const id = dbGetId(username);

  // New account
  if (id !== undefined) {
    console.log("Account already exists");
    return json({ error: "Account already exists" }, { status: 404 });
  }
  // Existing account

  const registrationInstructions = await createOptions(username, id);

  console.log("registration options are done!");
  return await registrationInstructions;
}

// Sends the passkey signed challange away to be verified
export async function regVerify(ctx) {
  const body = await ctx.req.json();
  return await verifyResponse(body);
}
