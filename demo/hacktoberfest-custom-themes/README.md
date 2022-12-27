# Hacktoberfest custom themes

**DISCLAIMER: this demo uses extension points that are very experimental and are subject to change**.  
In particular, the way of changing the defaults will be done via configuration in the future.

Javascript example
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/demo/hacktoberfest-custom-themes/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser


## ♻️ Usage
Override the BPMN element styles using various ways. `mxGraph` knowledge is required to handle style changes.
See the [development documentation](https://github.com/process-analytics/bpmn-visualization-js/blob/master/docs/contributors/bpmn-support-how-to.md) for more information.

:warning: In order to avoid having to many content in the README, we simplify it. You can find all the content of the example in [index.js](js/index.js).

Content:
- override the `StyleConstant` default values, like [Custom fonts](../../examples/custom-bpmn-theme/custom-fonts/README.md) & [Custom colors](../../examples/custom-bpmn-theme/custom-colors/README.md)
- extend the lib class entry point, like [Custom fonts](../../examples/custom-bpmn-theme/custom-fonts/README.md) & [Custom colors](../../examples/custom-bpmn-theme/custom-colors/README.md)
- override the default `IconPainter`, like [Custom User Task icon](../../examples/custom-bpmn-theme/custom-user-task-icon/README.md)
- update the label value of a cell 
:warning: If you try to reload each graph, all the style configuration is overridden (even if you try to save/restore the configuration)
```javascript
inputProjectName.oninput = function(event) {
    let projectName = event.target.value;
    bpmn = bpmnDiagram(projectName);

    const cell = bpmnVisualization.graph.model.getCell("call_activity");
    bpmnVisualization.graph.model.setValue(cell, `Contribute to ${projectName} 🔧`);
};
```
