import { getLoginStatus } from "../services/session.js";
// Check if login or not with a session
function requireAuth(handler) {
  return (ctx) => {
    const loginStatus = getLoginStatus(ctx.req);
    if (loginStatus === false) {
      console.log("Unauthorised request");
      return new Response("Unauthorised", { status: 401 });
    }
    return handler(ctx);
  };
}
export default requireAuth;
