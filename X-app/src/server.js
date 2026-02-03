import { serveFile } from "serveFileModule";
import { dirname, join } from "pathModule";
import { fromFileUrl } from "fromFileUrlModule";
import setupDatabase from "./data-base/table.js";
import compiledRouter from "./routes/table.js";

// setups data base
setupDatabase();

// middleware
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

// Helper function
function json(data, init) {
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json; charset=UTF-8");
  return new Response(JSON.stringify(data), { ...init, headers });
}

// If pathname not found returns pathname with an error
function notFound(pathname) {
  if (pathname !== "/favicon.ico") { // Ignore specific requests and not get an error But this should get updated in the further
    console.log(`${pathname} was not found`);
    return json({ error: `${pathname} was not found` }, { status: 404 });
  }
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

  for (const r of compiledRouter) {
    if (r.method !== req.method) {
      continue;
    }
    const matches = r.pattern.exec(url);
    if (!matches) {
      continue;
    }
    const params = matches?.groups ?? {};
    return await r.handler(req, url, params);
  }
  return notFound(pathname);
}

// Makes sure error don't leak
async function safeServer(req) {
  try {
    return await server(req);
  } catch (err) {
    console.log(`There is an error of ${err}`);
    return json(`${err}`, { status: 400 });
  }
}
Deno.serve({ port: 8000 }, safeServer);
