// deno-fmt-ignore-file

// Imports all the handler
import { registerStart, authenticateStart, regVerify, authVerify } from "../handlers/auth.js";
import isLogin from "../handlers/is-login.js";
import {addPost, getPosts, deletePost } from "../handlers/post.js";
import { like, unlike } from "../handlers/like-unlike.js";
import requireAuth from "../middleware/auth.js";

// Links methods, pathnames and handler together
const tableRouter = [
  { method: "GET",    path: "/is-login",                  handler: isLogin},
  { method: "POST",   path: "/register/start",            handler: registerStart },
  { method: "POST",   path: "/authenticate/start",        handler: authenticateStart },
  { method: "POST",   path: "/register/verification",     handler: regVerify },
  { method: "POST",   path: "/authenticate/verification", handler: authVerify },
  { method: "POST",   path: "/post",                      handler: requireAuth(addPost) },
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
