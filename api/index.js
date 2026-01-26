import * as server from '../dist/server/index.js';

export default async (req, context) => {
  // Create URL from Vercel request
  const url = new URL(
    req.url || req.path || '/',
    `https://${req.headers.host || req.headers.get('host')}`,
  );

  // Create standard Request object
  const request = new Request(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  // Pass ALL environment variables with fallbacks
  const env = {
    SESSION_SECRET: process.env.SESSION_SECRET || 'default-secret-key',
    PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN || '',
    PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN || 'mock.shop',
    PUBLIC_STOREFRONT_API_VERSION:
      process.env.PUBLIC_STOREFRONT_API_VERSION || '2024-01',
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID:
      process.env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID || '',
    PUBLIC_CUSTOMER_ACCOUNT_API_URL:
      process.env.PUBLIC_CUSTOMER_ACCOUNT_API_URL || '',
    PUBLIC_CHECKOUT_DOMAIN: process.env.PUBLIC_CHECKOUT_DOMAIN || '',
    // Add any other env vars your app might need
  };

  // Create execution context
  const executionContext = {
    waitUntil: context.waitUntil || (() => {}),
  };

  return await server.fetch(request, env, executionContext);
};
