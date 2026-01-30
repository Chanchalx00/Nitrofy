/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  return context.customerAccount.authorize();
}
export default function Robots() {
  return null;
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
