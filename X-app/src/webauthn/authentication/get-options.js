import { generateAuthenticationOptions } from "authModule";
import { getCredentialIds } from "../../data-base/passkeys.js";
import {
  storeAccount,
  storeAuthChallenge,
} from "../../data-base/account-challenge.js";
import json from "../../helper-functions/json-response.js";

// Gets current accounts info to make a passkey
const getOptions = async (username, acountId) => {
  storeAccount(username, acountId, false);

  const credentials = getCredentialIds(acountId);

  // info need to set up a passkey for current user
  const options = await generateAuthenticationOptions({
    rpID: "localhost",
    allowCredentials: credentials,
    userVerification: "preferred",
  });

  // saves the challenge so the response can be sent
  storeAuthChallenge(options.challenge);
  return await json(options, { status: 200 });
};
export default getOptions;
