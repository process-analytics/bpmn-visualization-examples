# Custom colors for Edge Markers

**DISCLAIMER: this extension point is very experimental and is subject to change**.  

Javascript example
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-bpmn-theme/custom-edge-markers-colors/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser


## ♻️ Usage
`mxGraph` knowledge is required to handle style changes.
See the [development documentation](https://github.com/process-analytics/bpmn-visualization-js/blob/master/docs/contributors/bpmn-support-how-to.md) for more details.

⚠️To avoid having to many content in the README, we simplify it. You can find all the content of the example in [index.js](index.js).

ℹ The implementation proposed here extends the lib class entry point. You can also do it by [changing the default colors](../custom-colors/README.md).


Use different fill colors for the start and end markers of the `message flows` by extending the lib class entry point
```javascript
class BpmnVisualizationCustomColors extends BpmnVisualization {

    constructor(containerId) {
        super({ container: containerId });
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        const style = styleSheet.styles[FlowKind.MESSAGE_FLOW];
        style[BpmnStyleIdentifier.EDGE_START_FILL_COLOR] = '#ee1cb0';
        style[BpmnStyleIdentifier.EDGE_END_FILL_COLOR] = 'orange';
    }
}

const bpmnVisualizationCustomColors = new BpmnVisualizationCustomColors('bpmn-container');
```
