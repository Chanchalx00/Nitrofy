import * as server from "../dist/server/index.js";

export default async function handler(req, context) {
  const url = new URL(
    req.url || "/",
    `https://${req.headers.host}`
  );

  const request = new Request(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.body
  });

  const env = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN,
    PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN
  };

  const executionContext = {
    waitUntil: context.waitUntil || (() => {})
  };

  return server.fetch(request, env, executionContext);
}
