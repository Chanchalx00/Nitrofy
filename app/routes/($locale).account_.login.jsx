/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({request, context}) {
  return context.customerAccount.login();
}
export default function Robots() {
  return null;
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
