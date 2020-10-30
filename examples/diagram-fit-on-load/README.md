# Fit BPMN Diagram on load

Javascript example to demonstrate how can fit the BPMN diagram on load.
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/diagram-fit-on-load/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage
:warning: In order to avoid to have to many content in the README, we simplify it. You can find all the content of the example in [diagram-fit-on-load.js](diagram-fit-on-load.js).

1. Declare the graph container with a fixed width & a fixed height
```css
.graph-container {
    /* use absolute values for height to ensure that the vertical diagram is not fully displayed when the page is opened. */
    width: 100%;
    height: 600px;
    border-style: solid;
    border-color: #B0B0B0;
    border-width: 1px;
    /* This ensures that the parts of the diagram outside of the viewport are not displayed. */
    overflow: hidden;
}
```

2. Load BPMN content
```javascript
const containerId = 'graph-container';
const bpmnVisualization = new BpmnVisualization(window.document.getElementById(containerId));

const bpmnContent = ``; // your BPMN 2.0 XML content
const fitTypeValue = 'Center'; // From radio button or select
bpmnVisualization.load(bpmnContent, { fitType: FitType[fitTypeValue] });
```
