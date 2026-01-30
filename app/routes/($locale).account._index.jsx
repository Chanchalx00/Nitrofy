import {redirect} from '@shopify/remix-oxygen';

export async function loader() {
  return redirect('/account/orders');
}
export default function Robots() {
  return null;
}

/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
