# Add and remove overlays on BPMN elements

Javascript example to demonstrate how to add default overlays and remove all overlays on BPMN elements.
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/overlays/add-remove/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

First create a `bpmnVisualization` instance prior being able to add default overlays and remove all overlays to BPMN elements.

### Add one default overlay

```javascript
    const overlay = { position: 'top-left', label: '456' };
    bpmnVisualization.bpmnElementsRegistry.addOverlays('exclusive_gateway_id', overlay);
```

### Add several default overlays
```javascript
    const overlay1 = { position: 'top-left', label: '456' };
    const overlay2 = { position: 'bottom-center', label: '9' };
    bpmnVisualization.bpmnElementsRegistry.addOverlays('exclusive_gateway_id', [overlay1, overlay2]);
```

### Remove all overlays
```javascript
    bpmnVisualization.bpmnElementsRegistry.removeAllOverlays('exclusive_gateway_id');
```
