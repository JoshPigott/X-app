// used for storing authChallenge and account need for verification of passkey
let authChallenge;
let account;

export function storeAccount(username, id, newAccount) {
  account = { "username": username, "id": id, "new": newAccount };
}

export function storeAuthChallenge(challenge) {
  authChallenge = challenge;
}

export function getAuthChallenge() {
  return authChallenge;
}

export function getAccount() {
  return account;
}
