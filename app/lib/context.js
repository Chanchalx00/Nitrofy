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

  const SESSION_SECRET = env.SESSION_SECRET || 'foobars';
   console.log('[ENV CHECK]');
  console.log('SESSION_SECRET exists:', Boolean(env.SESSION_SECRET));
  console.log('PUBLIC_STORE_DOMAIN:', env.PUBLIC_STORE_DOMAIN);
  console.log(
    'PUBLIC_STOREFRONT_API_TOKEN exists:',
    Boolean(env.PUBLIC_STOREFRONT_API_TOKEN)
  );

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
