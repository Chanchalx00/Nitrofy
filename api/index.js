import server from '../dist/server/index.js';

export default async (req, context) => {
  console.log('[BOOT] Hydrogen server starting...');
  const env = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN,
    PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN,
    PRIVATE_STOREFRONT_API_TOKEN: process.env.PRIVATE_STOREFRONT_API_TOKEN,
    PUBLIC_STOREFRONT_ID: process.env.PUBLIC_STOREFRONT_ID,
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID:
      process.env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
    PUBLIC_CUSTOMER_ACCOUNT_API_URL:
      process.env.PUBLIC_CUSTOMER_ACCOUNT_API_URL,
    PUBLIC_CHECKOUT_DOMAIN: process.env.PUBLIC_CHECKOUT_DOMAIN,
    PUBLIC_STOREFRONT_API_VERSION: process.env.PUBLIC_STOREFRONT_API_VERSION || '2024-01',
  };
  for (const [key, value] of Object.entries(env)) {
    if (!value) {
      console.error(`[ENV ERROR] Missing ${key}`);
      throw new Error(`Missing environment variable: ${key}`);
    }
  }
  console.log('[ENV OK]', {
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
      passThroughOnException: () => {},
  };

  return server.fetch(request, env, executionContext);
};
