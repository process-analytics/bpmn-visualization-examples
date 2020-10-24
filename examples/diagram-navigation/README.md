# BPMN Diagram navigation

Javascript example to demonstrate how to navigate the BPMN diagram with the mouse.
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/diagram-navigation/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

When instantiating `BpmnVisualization`, pass an additional option to active mouse navigation support.

```javascript
const bpmnVisualizationNavigation = 
new bpmnvisu.BpmnVisualization(
    document.getElementById('bpmn-viewport-navigation'),
    { mouseNavigationSupport: true } // allow to navigate the diagram with the mouse
);
bpmnVisualizationNavigation.load(bpmnDiagram());
```
