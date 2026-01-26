import server from "../dist/server/index.js";

export default async (req, context) => {
  // Create URL from Vercel request
  const url = new URL(
    req.url || req.path || '/',
    `https://${req.headers.host || req.headers.get('host')}`
  );
  
  // Create standard Request object
  const request = new Request(url.toString(), {
    method: req.method,
    headers: new Headers(req.headers),
  });

  // Pass environment variables
  const env = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN,
    PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN,
  };

  // Create execution context
  const executionContext = {
    waitUntil: context.waitUntil || (() => {}),
    passThroughOnException: () => {},
  };

  // Call server.fetch
  return await server.fetch(request, env, executionContext);
};