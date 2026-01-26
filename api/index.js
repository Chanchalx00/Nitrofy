import server from "../dist/server/index.js";

export default async (req, context) => {

  // ✅ Inject env into Node runtime
  Object.assign(process.env, {
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
  });

  // Create URL from Vercel request
  const url = new URL(
    req.url || "/",
    `https://${req.headers.host}`
  );

  // Create standard Request object
  const request = new Request(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  // Create execution context
  const executionContext = {
    waitUntil: context.waitUntil || (() => {}),
  };
  console.log("SESSION_SECRET =", process.env.SESSION_SECRET);

  console.log("PUBLIC_STOREFRONT_API_TOKEN =", process.env.PUBLIC_STOREFRONT_API_TOKEN);
  console.log("PUBLIC_STORE_DOMAIN =", process.env.PUBLIC_STORE_DOMAIN);
  console.log("PUBLIC_STOREFRONT_API_VERSION =", process.env.PUBLIC_STOREFRONT_API_VERSION);
  console.log("PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID =", process.env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID);
  console.log("PUBLIC_CUSTOMER_ACCOUNT_API_URL =", process.env.PUBLIC_CUSTOMER_ACCOUNT_API_URL);
  console.log("PUBLIC_CHECKOUT_DOMAIN =", process.env.PUBLIC_CHECKOUT_DOMAIN);

  // ✅ Pass empty env object
  return server.fetch(request, {}, executionContext);
};
