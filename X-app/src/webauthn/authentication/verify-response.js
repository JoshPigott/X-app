import { verifyAuthenticationResponse } from "authModule";
import { getAuthChallenge } from "../../data-base/account-challenge.js";
import { getCredentials, updateCounter } from "../../data-base/passkeys.js";
import { updateSession } from "../sessions/session.js";

import json from "../../helper-functions/json-response.js";

const getVerification = async (body, sessionId) => {
  console.log("authentication verification has started");

  // Gets account and challenge
  const auth = getAuthChallenge(sessionId);

  const credentialId = body.id;

  const { id, publicKey, counter, transports } = getCredentials(credentialId);

  const verification = await verifyAuthenticationResponse({
    response: body,
    expectedChallenge: auth.challenge,
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

    updateSession(sessionId, auth.account.id, auth.account.username);

    return json({ "verified": true }, {
      status: 200,
      headers: { "Set-Cookie": `sessionId=${sessionId}; HttpOnly; Path=/` },
    });
  }
  // The passkey was invalid
  return json({ verified: verification.verified }, { status: 400 });
};
export default getVerification;
