# Add stylized overlays on BPMN elements

Javascript example to demonstrate how to add stylized overlay on BPMN elements.
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/overlays/add-stylized/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

First, create a `BpmnVisualization` instance (named `bpmnVisualization`)  prior being able to add stylized overlays to BPMN elements.

### Add stylized overlay on BPMN element

```javascript
    const overlayConfig = {
      style: {
        font: {
          color: '#ffaacc',
          size: 12,
        },
        fill: {
          color: '#ffaacc',
        },
        stroke: {
          color: '#ffaacc',
        }
      }
    };
    const overlay = { position: 'top-left', label: '456', ...overlayConfig };
    bpmnVisualization.bpmnElementsRegistry.addOverlays('exclusive_gateway_id', overlay);
```
