export default {
  appDirectory: 'app',
  buildDirectory: 'dist',
  watchPaths: ['./public', './.env'],
  server: './server.js',
  publicPath: (process.env.HYDROGEN_ASSET_BASE_URL ?? '/') + 'build/',
  assetsBuildDirectory: 'dist/client/assets',
  serverConditions: ['worker', process.env.NODE_ENV],
  serverDependenciesToBundle: 'all',
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
  serverMinify: process.env.NODE_ENV === 'production',
  tailwind: true,
  postcss: true,
  serverBuildPath: 'dist/server/index.js',
  serverMainFields: ['browser', 'module', 'main'],
};

/** @typedef {import('@react-router/dev/config').Config} Config */
