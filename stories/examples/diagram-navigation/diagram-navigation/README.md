# BPMN Diagram navigation

Javascript example to demonstrate how to navigate the BPMN diagram with the mouse.
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/diagram-navigation/diagram-navigation/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

When instantiating the `BpmnVisualization` object, pass an additional option to active mouse navigation support.

```javascript
const bpmnVisualizationNavigation = 
new bpmnvisu.BpmnVisualization(
    {
        container: 'bpmn-container',
        navigation: { enabled: true } // allow to navigate the diagram with the mouse
    }
);
bpmnVisualizationNavigation.load(bpmnDiagram());
```

### Scrollbars

The `overflow` CSS property of the `bpmn-container` defines if scrollbars are used to display the BPMN diagram.
For values of `auto` or `scroll`, the scrollbars will be shown.

In this example, the scrollbars appear on toggle of the `overflow` CSS property from `hidden` (use the regular panning) to `auto`. In this case, the diagram can be moved
by both using the scrollbars or the panning.
