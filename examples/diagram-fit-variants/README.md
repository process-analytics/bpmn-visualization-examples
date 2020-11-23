# BPMN Diagram fit variants

Javascript example to demonstrate how the BPMN diagram can fit the viewport.
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/diagram-fit-variants/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage
⚠️ In order to avoid having to many content in the README, we simplify it. You can find all the content of the example in [index.html](index.html).

1. You need to initialize the BPMN container with a fixed width & a fixed height, and load the BPMN diagram, like [done here](../diagram-fit-on-load/README.md). 

2. Fit the BPMN container
```javascript
bpmnVisualization.fit({ type: bpmnvisu.FitType.Horizontal, margin: 10 });
```

ℹ️ `type` and `margin` are optional.
