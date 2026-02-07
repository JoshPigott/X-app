import { verifyRegistrationResponse } from "authModule";
import {
  getAccount,
  getAuthChallenge,
} from "../../data-base/account-challenge.js";
import { addPasskey } from "../../data-base/passkeys.js";
import { dbAddUser } from "../../data-base/users.js";
import { createSession } from "../sessions/session.js";
import json from "../../helper-functions/json-response.js";

// Adds passkey info to data base, creates new account in data, creates a new session
function addUserAndPasskey(verification) {
  const account = getAccount();

  // Gets passkey info
  const credentialId = verification.registrationInfo.credential.id;
  const publicKey = verification.registrationInfo.credential.publicKey;
  const counter = verification.registrationInfo.credential.counter;
  const transports = verification.registrationInfo.credential.transports;

  addPasskey(account.id, credentialId, publicKey, counter, transports);

  dbAddUser(account.id, account.username);
  const sessionId = createSession(account.id, account.username);
  console.log("sessionId:", sessionId);

  return sessionId;
}

// Checks the signed challenge
const getVerification = async (body) => {
  console.log("registration verification has started");

  // Gets challenge that was sent
  const authChallenge = getAuthChallenge();

  const verification = await verifyRegistrationResponse({
    response: body,
    expectedChallenge: authChallenge,
    expectedOrigin: "http://localhost:8000",
    expectedRPID: "localhost",
  });

  // The passkey and registration was valid
  if (verification.verified) {
    const sessionId = addUserAndPasskey(verification);
    return json({ "verified": true }, {
      status: 200,
      headers: { "Set-Cookie": `sessionId=${sessionId}; HttpOnly; Path=/` },
    });
  }
  // The passkey was invalid
  return json({ verified: verification.verified }, { status: 400 });
};
export default getVerification;
