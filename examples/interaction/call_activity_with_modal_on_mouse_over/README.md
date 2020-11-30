# Open a modal on event on a call activity

Javascript example to demonstrate how to navigate the BPMN diagram with the mouse.
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/interaction/call_activity_with_modal_on_mouse_over/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

When after the main `BpmnVisualization` instantiating, get the HTML element corresponding to the call activity to add a listener and activate the modal.

⚠️ The secondary `BpmnVisualization` must be visible during the BPMN diagram loading, otherwise the elements of the graph are not visible.


```javascript
const callActivityElt = mainBpmnVisualization.htmlElementRegistry.getBpmnHtmlElement('call_activity');
callActivityElt.onmouseover = () => {
    // Display the modal
    const modalElt = document.getElementById('modal');
    modalElt.classList.add('active');

    secondaryBpmnVisualization.load(getCalledBpmnDiagram(), { fit: {type: 'Center'} });
}
```
