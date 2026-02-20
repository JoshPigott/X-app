import { verifyAuthenticationResponse } from "authModule";
import { getAuthChallenge } from "../../data-base/account-challenge.js";
import { getCredentials, updateCounter } from "../../data-base/passkeys.js";
import { updateSession } from "../sessions/session.js";

import json from "../../helper-functions/json-response.js";

async function getVerification(body, auth) {
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

  if (verification.verified) {
    updateCounter(id, verification.authenticationInfo.newCounter);
  }

  return verification;
}

const isVerified = async (body, sessionId) => {
  console.log("authentication verification has started");

  // Gets account and challenge
  const auth = getAuthChallenge(sessionId);
  const verification = await getVerification(body, auth);

  // The passkey and registration was valid
  if (verification.verified) {
    updateSession(sessionId, auth.account.id, auth.account.username);

    return json({ "verified": true }, {
      status: 200,
      headers: {
        "Set-Cookie":
          `sessionId=${sessionId}; HttpOnly; SameSite=Strict; Path=/`,
      },
    });
  }
  // The passkey was invalid
  return json({ verified: verification.verified }, { status: 400 });
};
export default isVerified;
