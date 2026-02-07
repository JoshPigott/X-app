import { generateRegistrationOptions } from "authModule";
import json from "../../helper-functions/json-response.js";
import {
  storeAccount,
  storeAuthChallenge,
} from "../../data-base/account-challenge.js";

// creates id and the info need to set up a passkey
const createOptions = async (username, id) => {
  id = crypto.randomUUID();
  storeAccount(username, id, true); // new account is true

  // info need to set up a passkey
  const options = await generateRegistrationOptions({
    rpName: "X app",
    rpID: "localhost",
    userId: id,
    userName: username,
    attestationType: "none",
  });
  // saves the challenge so the response can be sent
  storeAuthChallenge(options.challenge);

  return json(options, { status: 200 });
};
export default createOptions;
