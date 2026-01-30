import {redirect} from '@shopify/remix-oxygen';

// if we don't implement this, /account/logout will get caught by account.$.tsx to do login

export async function loader() {
  return redirect('/');
}

/**
 * @param {ActionFunctionArgs}
 */
export async function action({context}) {
  return context.customerAccount.logout();
}
export default function Robots() {
  return null;
}

/** @typedef {import('@shopify/remix-oxygen').ActionFunctionArgs} ActionFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
