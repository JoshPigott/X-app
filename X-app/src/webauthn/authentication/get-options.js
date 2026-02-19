import { generateAuthenticationOptions } from "authModule";

// Gets the current account's info to make a passkey
const getOptions = async () => {
  // const credentials = getCredentialIds(acountId);

  // info need to set up a passkey for current user
  const options = await generateAuthenticationOptions({
    rpID: "localhost",
    // If I uses credentials it will not work
    allowCredentials: [],
    userVerification: "preferred",
  });

  return options;
};
export default getOptions;
