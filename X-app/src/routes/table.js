// Imports all the handler
import { registerStart, regVerify } from "../handlers/registration.js";
import { authenticateStart, authVerify } from "../handlers/authentication.js";

import post from "../handlers/post.js";
import { like, unlike } from "../handlers/like-unlike.js";
import deletePost from "../handlers/delete-post.js";
import getPostForm from "../handlers/post-form-template.js";
import getPosts from "../handlers/get-posts.js";

// Links methods, pathnames and handler together
const tableRouter = [
  { method: "POST", path: "/register/start", handler: registerStart },
  { method: "POST", path: "/authenticate/start", handler: authenticateStart },
  { method: "POST", path: "/register/verification", handler: regVerify },
  { method: "POST", path: "/authenticate/verification", handler: authVerify },
  { method: "POST", path: "/post", handler: post },
  { method: "POST", path: "/post/:id/like", handler: like },
  { method: "POST", path: "/post/:id/unlike", handler: unlike },
  { method: "DELETE", path: "/post/:id", handler: deletePost },
  { method: "GET", path: "/posts", handler: getPosts },
  { method: "GET", path: "/post/form", handler: getPostForm },
];

// Compile at start for speed and cleanliness
const compiledRouter = tableRouter.map((r) => ({
  method: r.method.toUpperCase(),
  pattern: new URLPattern({ pathname: r.path }),
  handler: r.handler,
}));

export default compiledRouter;
