# Integrate `bpmn-visualization` in a vanilla webpack JavaScript project

## Usage

To run locally:

1. `npm install`
2. `npm run serve`
3. [localhost app](http://localhost:8080)

You will see the following diagram:

![BPMN diagram in the home page](docs/home.png)

The code calling `bpmn-visualization` to render the BPMN diagram is available in [index.js](src/index.js).
Any code changes is quickly made available in the browser.


## WARNING about the webpack configuration for old bpmn-visualization versions

When using bpmn-visualization@0.26.1 or older, a special configuration is required.

See the [README of the 0.26.1 examples](https://github.com/process-analytics/bpmn-visualization-examples/blob/v0.26.1/projects/javascript-vanilla-with-webpack/README.md) for more details.
