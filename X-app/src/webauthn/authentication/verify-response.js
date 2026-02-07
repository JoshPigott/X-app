import { verifyAuthenticationResponse } from "authModule";
import {
  getAccount,
  getAuthChallenge,
} from "../../data-base/account-challenge.js";

import { getCredentials, updateCounter } from "../../data-base/passkeys.js";
import { createSession } from "../sessions/session.js";

import json from "../../helper-functions/json-response.js";

const getVerification = async (body) => {
  console.log("authentication verification has started");

  const account = getAccount();
  // Gets challenge that was sent
  const authChallenge = getAuthChallenge();

  const credentialId = body.id;
  const { id, publicKey, counter, transports } = getCredentials(credentialId);

  const verification = await verifyAuthenticationResponse({
    response: body,
    expectedChallenge: authChallenge,
    expectedOrigin: "http://localhost:8000",
    expectedRPID: "localhost",
    credential: {
      id: id,
      publicKey: publicKey,
      counter: counter,
      transports: transports,
    },
  });

  // The passkey and registration was valid
  if (verification.verified) {
    // Adds one the counter
    updateCounter(id);
    44;
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
