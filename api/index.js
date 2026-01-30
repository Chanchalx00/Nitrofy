export const runtime = 'edge';

import server from '../dist/server/index.js';

export default {
  fetch(request, env, executionContext) {
    return server.fetch(request, env, executionContext);
  },
};