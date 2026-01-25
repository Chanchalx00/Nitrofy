import { defineConfig } from '@shopify/hydrogen/config';
import { oxygen } from '@shopify/remix-oxygen';

export default defineConfig({
  adapter: oxygen(),
});
