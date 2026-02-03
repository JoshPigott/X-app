import register from "../handlers/register.js";
import post from "../handlers/post.js";
import { like, unlike } from "../handlers/like-unlike.js";
import deletePost from "../handlers/deletePost.js";
import getPosts from "../handlers/getPosts.js";

// Links methods, pathnames and handler together
const tableRouter = [
  { method: "POST", path: "/register", handler: register },
  { method: "POST", path: "/post", handler: post },
  { method: "POST", path: "/like", handler: like },
  { method: "POST", path: "/unlike", handler: unlike },
  { method: "DELETE", path: "/post", handler: deletePost },
  { method: "GET", path: "/post", handler: getPosts },
];

// Compile at start for speed and cleanliness
const compiledRouter = tableRouter.map((r) => ({
  method: r.method.toUpperCase(),
  pattern: new URLPattern({ pathname: r.path }),
  handler: r.handler,
}));

export default compiledRouter;
