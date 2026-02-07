import { dbGetId } from "../data-base/users.js";
import getOptions from "../webauthn/authentication/get-options.js";
import getVerification from "../webauthn/authentication/verify-response.js";
import json from "../helper-functions/json-response.js";

// Starts the process of getting login options
export async function authenticateStart(ctx) {
  const form = await ctx.req.formData();
  const username = form.get("username");
  const id = dbGetId(username);

  if (id === undefined) {
    console.log("The account does not exits");
    return json({ error: "The Account not exists" }, { status: 404 });
  }

  const authenticationInstructions = await getOptions(username, id);

  console.log("authentication options are done!");
  return await authenticationInstructions;
}

// Sends the passkey signed challange away to be verified
export async function authVerify(ctx) {
  const body = await ctx.req.json();
  return await getVerification(body);
}
