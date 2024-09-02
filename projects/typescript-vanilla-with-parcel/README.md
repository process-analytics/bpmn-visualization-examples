# Integrate `bpmn-visualization` in a vanilla TypeScript project built with Parcel

Parcel v2 is used in this project: https://parceljs.org

To run locally:

1. `npm install`
2. `npm start`
3. [localhost app](http://localhost:1234)

You will see the following diagram:

![BPMN diagram in the home page](docs/home.png)

The code calling `bpmn-visualization` to render the BPMN diagram is available in [index.ts](src/index.ts).

If you want to bundle the application, run `npm run build`.


## WARNING about the Parcel configuration for some `bpmn-visualization` versions

### 0.44.0 and newer[](url)

`bpmn-visualization` [0.44.0](https://github.com/process-analytics/bpmn-visualization-js/releases/tag/v0.44.0) starts depending on [es-toolkit](https://github.com/toss/es-toolkit) (version 1.16.0).
The package.json file of es-toolkit declares a `browser` attrbute ("./dist/browser.global.js"), so it is used by parcel as the entry point of the module. However, parcel encounters an error with this entry point.

To workaround this problem, configure an alias in the package.json to use the same entry point as defined by the `module` attribute ("./dist/index.mjs").

See [PR 599](https://github.com/process-analytics/bpmn-visualization-examples/pull/599) for more details.


### 0.26.1 and older

When using bpmn-visualization@0.26.1 or older, a special configuration is required. This no more needed starting from version 0.26.2 (see [PR 384](https://github.com/process-analytics/bpmn-visualization-examples/pull/384) for more explanations).

For old versions, configure an alias in the package.json: https://github.com/process-analytics/bpmn-visualization-examples/blob/v0.26.1/projects/typescript-vanilla-with-parcel/package.json#L18-L20
