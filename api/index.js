import server from "../dist/server/index.js";

export default async (req, context) => {

  const url = new URL(
    req.url || "/",
    `https://${req.headers.host}`
  );

  const request = new Request(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  // 🔒 Proxy so no env lookup ever returns undefined
  const rawEnv = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN,
    PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN,
    PUBLIC_STOREFRONT_API_VERSION:
      process.env.PUBLIC_STOREFRONT_API_VERSION || "2024-01",
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID:
      process.env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID || "",
    PUBLIC_CUSTOMER_ACCOUNT_API_URL:
      process.env.PUBLIC_CUSTOMER_ACCOUNT_API_URL || "",
    PUBLIC_CHECKOUT_DOMAIN:
      process.env.PUBLIC_CHECKOUT_DOMAIN || "",
  };

  const env = new Proxy(rawEnv, {
    get(target, prop) {
      return prop in target ? target[prop] : "";
    }
  });

  const executionContext = {
    waitUntil: context.waitUntil || (() => {}),
  };

  return server.fetch(request, env, executionContext);
};
