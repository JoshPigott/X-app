// used for storing authChallenge and account need for verification of passkey
const challenges = new Map();

// The promblem is challenge
export function storeAuthChallenge(tempId, account, challenge) {
  challenges.set(tempId, { account, challenge });
  // Makes sure challegnes don't build up, get deleted after 5 mintues
  setTimeout(() => (challenges.delete(tempId)), 5 * 60 * 1000);
}

export function getAuthChallenge(tempId) {
  return challenges.get(tempId);
}
