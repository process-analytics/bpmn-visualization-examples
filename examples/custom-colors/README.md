# Custom colors

**DISCLAIMER: this extension point is very experimental and is subject to changes**.  
In particular, the way of changing the defaults will be done via configuration in the future.

Javascript example
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-colors/index.html)
- to run locally, see the [explanations in the repository README](../../README.md#running-examples-locally)


## ♻️ BPMN Visualization Usage
Override the BPMN element styles using various ways. `mxGraph` knowledge is required to handle style changes.
See https://process-analytics.github.io/bpmn-visualization-js/#bpmn-support-howto-elements-rendering for more information.

Content
- override default font color: update the `StyleConstant` default values
- override default fill and stroke colors: update the `StyleConfigurator` method prototypes
- different fill and stroke colors for `event`, `gateway` and `task`: extend the lib class entry point
- different fill and stroke colors for `events`: extend the lib class entry point
- specific font color for ` user task`: extend the lib class entry point