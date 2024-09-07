import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  html: {
    favicon: './src/assets/favicon.svg',
    title: 'bpmn-visualization TypeScript Integration with Rsbuild',
  },
  output: {
    // ensure assets are correctly loaded when the application is not at the root of the server, for examples when it is deployed on GitHub pages.
    assetPrefix: 'auto',
  },
  // https://rsbuild.dev/guide/basic/static-assets#extend-asset-types
  tools: {
    rspack(config, { addRules }) {
      addRules([
        {
          test: /\.bpmn$/,
          // converts asset to a separate file and exports the URL address.
          type: 'asset/resource',
        },
      ]);
    },
  },
});
