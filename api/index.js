import server from '../dist/server/index.js';

export const runtime = 'nodejs';

export default {
  async fetch(request, _env, executionContext) {
    // Force Node env vars into Hydrogen
    return server.fetch(request, process.env, executionContext);
  },
};