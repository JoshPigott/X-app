// deno-fmt-ignore-file

// Imports all the handler
import { registerStart, regVerify } from "../handlers/registration.js";
import { authenticateStart, authVerify } from "../handlers/authentication.js";
import isLogin from "../handlers/is-login.js"

import post from "../handlers/post.js";
import { like, unlike } from "../handlers/like-unlike.js";
import deletePost from "../handlers/delete-post.js";
import getPosts from "../handlers/get-posts.js";

import { requireAuth } from "../server.js"

// Links methods, pathnames and handler together
const tableRouter = [
  { method: "GET",    path: "/is-login",                  handler: isLogin},
  { method: "POST",   path: "/register/start",            handler: registerStart },
  { method: "POST",   path: "/authenticate/start",        handler: authenticateStart },
  { method: "POST",   path: "/register/verification",     handler: regVerify },
  { method: "POST",   path: "/authenticate/verification", handler: authVerify },
  { method: "POST",   path: "/post",                      handler: requireAuth(post) },
  { method: "POST",   path: "/post/:id/like",             handler: requireAuth(like) },
  { method: "POST",   path: "/post/:id/unlike",           handler: requireAuth(unlike) },
  { method: "DELETE", path: "/post/:id",                  handler: requireAuth(deletePost) },
  { method: "GET",    path: "/posts",                     handler: requireAuth(getPosts) },
];

// Compile at start for speed and cleanliness
const compiledRouter = tableRouter.map((r) => ({
  method: r.method.toUpperCase(),
  pattern: new URLPattern({ pathname: r.path }),
  handler: r.handler,
}));

export default compiledRouter;
