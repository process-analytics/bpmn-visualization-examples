# Add style to overlay displayed on BPMN elements

Javascript example to demonstrate how to add style to overlay displayed on BPMN elements.
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/overlays/customize-style/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

First create a `bpmnVisualization` instance prior being able to add customizable overlays to BPMN elements.

### Add style to overlay and display it on BPMN element

```javascript
    const overlayConfig = {
      style: {
        font: {
          color: '#ffaacc',
          size: 12,
        },
        fill: {
          color: '#ffaacc',
          opacity: 1,
        },
        stroke: {
          color: '#ffaacc',
          pattern: '3 2',
          width: 2,
        }
      }
    };
    const overlay = { position: 'top-left', label: '456', ...overlayConfig };
    bpmnVisualization.bpmnElementsRegistry.addOverlays('exclusive_gateway_id', overlay);
```
