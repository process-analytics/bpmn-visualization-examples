# Custom font

**DISCLAIMER: this extension point is very experimental and is subject to changes**.  
In particular, the way of changing the defaults will be done via configuration in the future.

Javascript example
- [source](./index.html)
- [live environment](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-fonts/index.html)

Override the BPMN element fonts using various ways. `mxGraph` knowledge is required to handle style changes.
See https://process-analytics.github.io/bpmn-visualization-js/#bpmn-support-howto-elements-rendering for more information.

Content
- override default font: update the `StyleConstant` default values and update the `StyleConfigurator` method prototypes
- different fonts for `event`, `gateway` and `task`: extend the lib class entry point

**Note**: for example about font colors, see the [custom-colors example](../custom-colors/README.md).