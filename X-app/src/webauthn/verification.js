import { verifyRegistrationResponse } from "authModule";
import {
  getAccount,
  getAuthChallenge,
} from "../data-base/account-challenge.js";
import { addPasskey } from "../data-base/passkeys.js";
import { dbAddUser } from "../data-base/users.js";
import { createSession } from "./sessions/session.js";
import json from "../helper-functions/json-response.js";

const getVerification = async (body) => {
  console.log("verification has started");

  const account = getAccount();
  // Gets challenge that was sent
  const authChallenge = getAuthChallenge();
  let verification;

  // The account has used a passkey beofore
  if (account.new === false) {
    const credentialId = body.id;
    const credentials = getCredentials(credentialId);

    verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: authChallenge,
      expectedOrigin: "http://localhost:8000",
      expectedRPID: "localhost",
      authenticator: credentials,
    });
  } // A new account
  else {
    verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: authChallenge,
      expectedOrigin: "http://localhost:8000",
      expectedRPID: "localhost",
      // Just no authenticator
    });
  }

  // The passkey was valid
  if (verification.verified) {
    const credentialId = verification.registrationInfo.credential.id;
    const publicKey = verification.registrationInfo.credential.publicKey;
    const counter = verification.registrationInfo.credential.counter;

    addPasskey(account.id, credentialId, publicKey, counter);

    dbAddUser(account.id, account.username);
    const sessionId = createSession(account.id, account.username);
    console.log("sessionId:", sessionId);

    return json({ "verified": true }, {
      status: 200,
      headers: { "Set-Cookie": `sessionId=${sessionId}; HttpOnly; Path=/` },
    });
  }
  // The passkey was invalid
  return json({ verified: verification.verified }, { status: 400 });
};
export default getVerification;
