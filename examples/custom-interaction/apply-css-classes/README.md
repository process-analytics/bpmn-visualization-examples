# Apply css to BPMN elements

Javascript example to demonstrate how to apply CSS classes to elements of the BPMN Diagram.
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-interaction/apply-css-classes/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

ℹ️ . Apply css classes after retrieving the HTMLElement with the `bpmn-visualization` API.

```javascript
// add css classes
bpmnVisualization.bpmnElementsRegistry.addCssClasses('prepareBankTransfer', 'bpmn-activity-in-progress');
// remove css classes
bpmnVisualization.bpmnElementsRegistry.removeCssClasses(['reviewSuccessful_gw', 'invoice_approved'], ['bpmn-gateway-warning', 'bpmn-activity-info']);
// toggle css classes
bpmnVisualization.bpmnElementsRegistry.toggleCssClasses('prepareBankTransfer', 'bpmn-activity-in-progress');
```

⚠️ Highlighting path currently requires to identify all elements by their ids: `bpmn-visualization` will provide some API
to simplify this in the future, see [bpmn-visualization #930](https://github.com/process-analytics/bpmn-visualization-js/issues/930)
