import { generateRegistrationOptions } from "authModule";

// info need to set up a passkey
const createOptions = async (username, id) => {
  const options = await generateRegistrationOptions({
    rpName: "X app",
    rpID: "localhost",
    userId: id,
    userName: username,
    attestationType: "none",
  });
  return options;
};
export default createOptions;
