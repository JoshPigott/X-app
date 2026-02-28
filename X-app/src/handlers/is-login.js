import { getLoginStatus } from "./../services/session.js";

import json from "../utils/json-response.js";
function isLogin(ctx) {
  const login = getLoginStatus(ctx.req);
  return json({ login }, { status: 200 });
}
export default isLogin;
