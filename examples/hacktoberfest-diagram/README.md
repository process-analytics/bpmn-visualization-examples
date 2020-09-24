# Hacktoberfest diagram

**DISCLAIMER: this extension point is very experimental and is subject to changes**.  
In particular, the way of changing the defaults will be done via configuration in the future.

Javascript example
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/hacktoberfest-diagram/index.html)
- to run locally, see the [explanations in the repository README](../../README.md#running-examples-locally)


## ♻️ BPMN Visualization Usage
Override the BPMN element styles using various ways. `mxGraph` knowledge is required to handle style changes.
See https://process-analytics.github.io/bpmn-visualization-js/#bpmn-support-howto-elements-rendering for more information.

:warning: In order to avoid to have to many content in the README, we simplify it. You can find all the content of the example in [hacktoberfest-diagram.js](hacktoberfest-diagram.js).


Content:
- override the `StyleConstant` default values, like [Custom fonts](../custom-fonts/README.md) & [Custom colors](../custom-colors/README.md)
- extend the lib class entry point, like [Custom fonts](../custom-fonts/README.md) & [Custom colors](../custom-colors/README.md)
- update the label value of a cell 
:warning: If you try to reload each graph, all the style configuration is overrided (even if you try to save/restore the configuration)
```javascript
inputProjectName.oninput = function(event) {
    let projectName = event.target.value;
    bpmn = bpmnDiagram(projectName);

    const cell = bpmnVisualization.graph.model.getCell("call_activity");
    bpmnVisualization.graph.model.setValue(cell, `Contribute to ${projectName} 🔧`);
};
```