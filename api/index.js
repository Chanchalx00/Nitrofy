import server from '../dist/server/index.js';

export default async (req, context) => {
   console.log("[BOOT] Hydrogen server starting...");
  const env = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN,
    PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN,
  };
  for (const [key, value] of Object.entries(env)) {
    if (!value) {
       console.error(`[ENV ERROR] Missing ${key}`);
      throw new Error(`Missing environment variable: ${key}`);
    }
  }
console.log("[ENV OK]", {
    SESSION_SECRET: true,
    PUBLIC_STORE_DOMAIN: env.PUBLIC_STORE_DOMAIN,
    PUBLIC_STOREFRONT_API_TOKEN: true,
  });
  const url = new URL(req.url || '/', `https://${req.headers.host}`);

  const request = new Request(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req.body,
  });

  const executionContext = {
    waitUntil: context?.waitUntil?.bind(context) ?? (() => {}),
  };

  return server.fetch(request, env, executionContext);
};
