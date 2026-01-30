import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from '~/lib/session';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';
import {getLocaleFromRequest} from '~/lib/i18n';

/**
 * The context implementation is separate from server.ts
 * so that type can be extracted for AppLoadContext
 * @param {Request} request
 * @param {Env} env
 * @param {ExecutionContext} executionContext
 */
export async function createAppLoadContext(request, env, executionContext) {
  /**
   * Open a cache instance in the worker and a custom session instance.
   */
  console.log('[CONTEXT] Creating app load context...');

  const SESSION_SECRET = env.SESSION_SECRET || 'foobar;';

  const waitUntil =
    executionContext?.waitUntil?.bind(executionContext) || (() => {});

  // Create mock cache for Vercel (caches API not available in serverless)
  const cacheMap = new Map();
  const cache = {
    match: async (key) => cacheMap.get(key),
    put: async (key, value) => cacheMap.set(key, value),
    delete: async (key) => cacheMap.delete(key),
  };

  const session = await AppSession.init(request, [SESSION_SECRET]);
  const i18n = {
    language: 'EN',
    country: 'US',
    pathPrefix: '',
  };
  // In context.js, before createHydrogenContext
console.log('[DEBUG] env:', JSON.stringify(env, null, 2));
console.log('[DEBUG] i18n:', JSON.stringify(i18n, null, 2));
console.log('[DEBUG] session exists:', Boolean(session));
  const hydrogenContext = createHydrogenContext({
    env,
    request,
    cache,
    waitUntil,
    session,
    i18n: getLocaleFromRequest(request),
    cart: {
      queryFragment: CART_QUERY_FRAGMENT,
    },
  });

  return {
    ...hydrogenContext,
    // declare additional Remix loader context
  };
}
