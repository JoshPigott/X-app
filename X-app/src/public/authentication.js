// deno-lint-ignore no-import-prefix
import { startAuthentication } from "https://esm.sh/@simplewebauthn/browser";

// Allows the user to login
async function authenticate(e) {
  const response = e.detail.xhr;

  // gets login options
  const options = JSON.parse(response.responseText);

  // Allow you to show the user what is happeing so it does look the stite has crashed
  const meassage = document.querySelector(".auth-page__meassage");

  if (response.status === 404) {
    console.log(options.error);
    meassage.textContent = `${options.error}`;
    return;
  }

  meassage.textContent = [
    "Please wait.",
    "Processing the passkey...",
    "This may take some time.",
  ].join("\n");

  // starts login
  const attestation = await startAuthentication({ optionsJSON: options });

  // checks login
  const res = await fetch("/authenticate/verification", {
    method: "POST",
    headers: { "content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(attestation),
  });

  const body = await res.json();
  const accepted = body.verified;

  // logging for debugging
  if (accepted) {
    // switches to home page
    globalThis.location.href = "./home.html";
  } else {
    console.log("authentification unsuccessful ❌");
  }
}

// Sends up an event after every request
document.body.addEventListener("htmx:afterRequest", async (e) => {
  // Only call authenticate after you sent a request for login options
  if (e.detail.pathInfo.requestPath === "/authenticate/start") {
    await authenticate(e);
  }
});
