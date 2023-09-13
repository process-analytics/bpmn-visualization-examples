# Attach tooltip and popover to BPMN elements

Javascript example to demonstrate how to identify HtmlElement related to BPMN diagram elements and retrieve BPMN information.
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-behavior/javascript-tooltip-and-popover/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

The following code shows you how to use the `bpmn-visualization` API. This is what is used in the example to
create popups and popovers with [Tippy.js](https://atomiks.github.io/tippyjs/).

```javascript
// here we want to get a single element, in the example, we retrieve several elements
const bpmnElement = bpmnVisualization.bpmnElementsRegistry.getElementsByIds([
    'element_id'
])[0];


// The DOM element used to attach the tooltip/popover to
const htmlElement = bpmnElement.htmlElement;
// information retrieved from the BPMN diagram
const bpmnSemantic = bpmnElement.bpmnSemantic;

// use retrieved data to create the tooltip/popover
...
```
