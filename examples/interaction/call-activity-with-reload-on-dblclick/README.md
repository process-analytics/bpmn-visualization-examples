# Load BPMN Diagram on the same container on event on a call activity

Javascript example to demonstrate how to use the same container on event on an element of the BPMN Diagram.
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/interaction/call-activity-with-reload-on-dblclick/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

After the main `BpmnVisualization` instantiation, get the HTML element corresponding to the call activity to add a listener to load a new BPMN Diagram on the same container on activation.

```javascript
const callActivityElt = bpmnVisualization.htmlElementRegistry.getBpmnHtmlElement('call_activity');
callActivityElt.ondblclick = () => {
    bpmnVisualization.load(getCalledBpmnDiagram(), { fit: {type: 'Center'} });
}
```
