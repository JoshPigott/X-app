// deno-lint-ignore no-import-prefix
import { startRegistration } from "https://esm.sh/@simplewebauthn/browser";

async function register(e) {
  const response = e.detail.xhr;

  // gets registration options
  const options = await JSON.parse(response.responseText);

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

  // starts registration with passkey
  const attestation = await startRegistration({ optionsJSON: options });

  // checks signed passkey challenge
  const res = await fetch("/register/verification", {
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
    console.log("registration unsuccessful ❌");
  }
}

// Sends up an event after every request
document.body.addEventListener("htmx:afterRequest", async (e) => {
  // Only call register after you sent a request for registration options
  if (e.detail.pathInfo.requestPath === "/register/start") {
    await register(e);
  }
});
