# Custom colors

**DISCLAIMER: this extension point is very experimental and is subject to change**.  
In particular, the way of changing the defaults will be done via configuration in the future.

Javascript example
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-bpmn-theme/custom-colors/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser


## ♻️ Usage
Override the BPMN element styles using various ways. `mxGraph` knowledge is required to handle style changes.
See the [development documentation](https://github.com/process-analytics/bpmn-visualization-js/blob/master/docs/contributors/bpmn-support-how-to.md) for more details.

⚠️To avoid having to many content in the README, we simplify it. You can find all the content of the example in [index.js](index.js).

ℹ Generally, the `style` keys and values constants are related to the `mxConstants` object that comes from mxGraph.
For reference, see the [mxConstants API](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxConstants-js.html#mxConstants). \
We are using `Directions` and `StyleIdentifiers` here that store the constants string values. They are defined in [style-identifier.js](../../static/js/style-identifiers.js).
But you can also use the string value directly, for instance `style['fillColor']=...`.

Content:
- override default font color or default fill and stroke colors: 
```js
configureStyle() {
    const styleSheet = this.graph.getStylesheet(); // mxStylesheet
  // edge
  styleSheet.getDefaultEdgeStyle()[StyleIdentifiers.STYLE_STROKECOLOR] = 'Gray';
  // vertex
  const defaultVertexStyle = styleSheet.getDefaultVertexStyle();
  defaultVertexStyle[StyleIdentifiers.STYLE_FILLCOLOR] = 'LemonChiffon';
  defaultVertexStyle[StyleIdentifiers.STYLE_STROKECOLOR] = 'Chartreuse';
}
```

- different fill and stroke colors for `event`, `gateway` and `task`: extend the lib class entry point
```javascript
class BpmnVisualizationCustomColors extends BpmnVisualization {

    constructor(containerId) {
        super({ container: containerId });
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        ShapeUtil.topLevelBpmnEventKinds().forEach(kind => {
            const style = styleSheet.styles[kind];
            style[StyleIdentifiers.STYLE_FILLCOLOR] = 'Pink';
        });

        ShapeUtil.taskKinds().forEach(kind => {
            const style = styleSheet.styles[kind];
            style[StyleIdentifiers.STYLE_GRADIENT_DIRECTION] = Directions.DIRECTION_EAST;
            style[StyleIdentifiers.STYLE_GRADIENTCOLOR] = 'White';
        });

        const poolStyle = styleSheet.styles[ShapeBpmnElementKind.POOL];
        poolStyle[StyleIdentifiers.STYLE_FILLCOLOR] = 'PaleGreen';
    }
}

const bpmnVisualizationCustomColors = new BpmnVisualizationCustomColors('bpmn-container-custom-colors');
```

- different fill and stroke colors for `events`: extend the lib class entry point
```javascript
class BpmnVisualizationCustomEventColors extends BpmnVisualization {

    constructor(containerId) {
        super({ container: containerId });
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        const startEventStyle = styleSheet.styles[ShapeBpmnElementKind.EVENT_START];
        startEventStyle[StyleIdentifiers.STYLE_FILLCOLOR] = '#d6eea5';

        [ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH, ShapeBpmnElementKind.EVENT_INTERMEDIATE_THROW].forEach(kind => {
            const intermediateEventStyle = styleSheet.styles[kind];
            intermediateEventStyle[StyleIdentifiers.STYLE_STROKECOLOR] = '#7307df';
        })
    }
}

const bpmnVisualizationEventCustomColors = new BpmnVisualizationCustomEventColors('bpmn-container-custom-colors');
```

- specific font color for ` user task`: extend the lib class entry point
```javascript
class BpmnVisualizationCustomColorsUserTask extends BpmnVisualization {

    constructor(containerId) {
        super({ container: containerId });
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet
        const style = styleSheet.styles[ShapeBpmnElementKind.TASK_USER];
        style[StyleIdentifiers.STYLE_FONTCOLOR] = '#2b992a';
   }
}

const bpmnVisualizationCustomColorsUserTask = new BpmnVisualizationCustomColorsUserTask('bpmn-container-custom-colors-user-task');
```
