import { generateRegistrationOptions } from "authModule";

// info need to set up a passkey
const createOptions = async (username, id) => {
  const RP_NAME = Deno.env.get("RP_NAME") || "X app";
  const RP_ID = Deno.env.get("RP_ID") || "localhost";

  const options = await generateRegistrationOptions({
    rpName: RP_NAME,
    rpID: RP_ID,
    userId: id,
    userName: username,
    attestationType: "none",
  });
  return options;
};
export default createOptions;
