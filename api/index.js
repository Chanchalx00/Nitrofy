import server from '../dist/server/index.js';

export default {
  async fetch(request, env, executionContext) {
    return server.fetch(request, env, executionContext);
  },
};