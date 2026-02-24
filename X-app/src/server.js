import { serveFile } from "@std/http/file-server";
import { dirname, join } from "@std/path";
import { fromFileUrl } from "@std/path/from-file-url";
import {
  checkExpiryTimes,
  getLoginStatus,
} from "./webauthn/sessions/session.js";
import setupDatabase from "./data-base/table.js";
import compiledRouter from "./routes/table.js";
import json from "./helper-functions/json-response.js";

// setups data base
setupDatabase();
// Checks if has expried and set delete time other session
checkExpiryTimes();

// middleware

// Check if login or not with a session
export function requireAuth(handler) {
  return (ctx) => {
    const loginStatus = getLoginStatus(ctx.req);
    if (loginStatus === false) {
      console.log("Unauthorised request");
      return new Response("Unauthorised", { status: 401 });
    }
    return handler(ctx);
  };
}

async function isStaticFile(filePath) {
  try {
    // Will throw an error if the file does not exit
    const stat = await Deno.stat(filePath);
    return stat.isFile;
  } catch (_err) {
    // There is no static file
    return false;
  }
}

async function serveStaticFiles(req, pathname) {
  let filePath;
  // Gets the current directory path
  const __dirname = dirname(fromFileUrl(import.meta.url));
  if (pathname === "/") {
    filePath = join(__dirname, "public", "index.html");
  } else {
    filePath = join(__dirname, "public", pathname);
  }
  // Must checks so if not static file request body will not read as can only be read once
  if (await isStaticFile(filePath) === true) {
    return serveFile(req, filePath);
  }
  return null;
}

// If pathname not found returns pathname with an error
function notFound(pathname) {
  console.log(`${pathname} was not found`);
  // Is this too spefic
  return json({ error: `Resource not found` }, { status: 404 });
}

// Finds the right handler/fucnation to get correct Response
async function server(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const staticFile = await serveStaticFiles(req, pathname);
  // Checks to see if the static file exists
  if (staticFile !== null) {
    return staticFile;
  }

  // Finds route of request
  for (const r of compiledRouter) {
    if (r.method !== req.method) {
      continue;
    }
    const matches = r.pattern.exec(url);
    if (!matches) {
      continue;
    }
    // Allows url prama to be sent
    const params = matches.pathname?.groups ?? {};
    const theHandler = await r.handler({ req, url, params });
    return theHandler;
  }
  return notFound(pathname);
}

// Makes sure error don't leak
async function safeServer(req) {
  try {
    return await server(req);
  } catch (err) {
    console.log(`There is an error of ${err}`);
    return json({ error: `Somthing went wrong` }, { status: 500 });
  }
}
// Starts server
Deno.serve({ port: 8000 }, safeServer);
