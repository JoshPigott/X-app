import { generateAuthenticationOptions } from "authModule";

// Gets the current account's info to make a passkey
const getOptions = async () => {
  // const credentials = dbGetCredentialIds(acountId);
  const RP_ID = Deno.env.get("RP_ID") || "localhost";

  // info need to set up a passkey for current user
  const options = await generateAuthenticationOptions({
    rpID: RP_ID,
    // If I uses credentials it will not work
    allowCredentials: [],
    userVerification: "preferred",
  });

  return options;
};
export default getOptions;
