// Sends request every 10 seounds
setInterval(checkIfLogin, 10 * 1000);

// Run right at the start
checkIfLogin();

// If not login in switches to login pages if on home page
async function checkIfLogin() {
  const res = await fetch("/is-login", { method: "GET" });

  const body = await res.json();
  if (body.login == false) {
    globalThis.location.href = "./index.html";
  }
}
