# Apply css to BPMN elements

Javascript example to demonstrate how to apply CSS classes to elements of the BPMN Diagram.
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-interaction/apply-css-classes/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

ℹ️ . Apply css classes after retrieving the HTMLElement with the `bpmn-visualization` API.

```javascript
const bpmnElements = bpmnVisualization.bpmnElementsRegistry.getElementsByIds('prepareBankTransfer');
// we suppose that the elements have been found (otherwise, the returned array is empty)
const htmlElement = bpmnElements[0].htmlElement;
htmlElement.classList.toggle('bpmn-activity-in-progress');
```

⚠️ It's not possible to manipulate the class of the HTML element with the zoom, the panning and the fit features, because it recalculated and is overridden by them. \
A new API comes later to support this case, and simplify the customization of the Bpmn elements.

⚠️ Highlighting path currently requires to identify all elements by their ids: `bpmn-visualization` will provide some API
to simplify this in the future, see [bpmn-visualization #930](https://github.com/process-analytics/bpmn-visualization-js/issues/930)
