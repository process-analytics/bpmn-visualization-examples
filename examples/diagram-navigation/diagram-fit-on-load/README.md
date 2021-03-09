# Fit BPMN Diagram on load

Javascript example to demonstrate how can fit the BPMN diagram on load.
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/diagram-navigation/diagram-fit-on-load/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage
⚠️ In order to avoid having to many content in the README, we simplify it. You can find all the content of the example in [diagram-fit-on-load.js](diagram-fit-on-load.js).

1. Declare the BPMN container with a fixed width & a fixed height
```css
.bpmn-container {
    /* use absolute values for height to ensure that the vertical diagram is not fully displayed when the page is opened. */
    width: 100%;
    height: 600px;
    border-style: solid;
    border-color: #B0B0B0;
    border-width: 1px;
    /* This ensures that the parts of the diagram outside of the container are not displayed. */
    overflow: hidden;
}
```

2. Load BPMN content
```javascript
const bpmnContainerElt = window.document.getElementById('bpmn-container');
const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: bpmnContainerElt });

const bpmnContent = ``; // your BPMN 2.0 XML content
bpmnVisualization.load(bpmnContent, { fit: {type: bpmnvisu.FitType.Center, margin: 10} });
```

ℹ️ `type` and `margin` are optional.
Moreover, `margin` is only considered when FitType is not None.
