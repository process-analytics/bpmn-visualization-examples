# Custom colors

**DISCLAIMER: this extension point is very experimental and is subject to change**.  
In particular, the way of changing the defaults will be done via configuration in the future.

Javascript example
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-bpmn-theme/custom-colors/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser


## ♻️ BPMN Visualization Usage
Override the BPMN element styles using various ways. `mxGraph` knowledge is required to handle style changes.
See the [development documentation](https://github.com/process-analytics/bpmn-visualization-js/blob/master/docs/contributors/bpmn-support-how-to.md) for more details.

:warning: In order to avoid having to many content in the README, we simplify it. You can find all the content of the example in [custom-colors.js](custom-colors.js).


Content:
- override default font color: update the `StyleConstant` default values
```javascript
StyleDefault.DEFAULT_FONT_COLOR = 'Cyan';
```

- override default fill and stroke colors: update the `StyleConfigurator` method
```javascript
const originalConfigureCommonDefaultStyle = StyleConfigurator.configureCommonDefaultStyle;
StyleConfigurator.configureCommonDefaultStyle = function (style) {
    originalConfigureCommonDefaultStyle(style);
    style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = 'LemonChiffon';
    style[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = 'Orange';
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
            style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = 'Pink';
        });

        ShapeUtil.taskKinds().forEach(kind => {
            const style = styleSheet.styles[kind];
            style[bpmnvisu.mxConstants.STYLE_GRADIENT_DIRECTION] = bpmnvisu.mxConstants.DIRECTION_EAST;
            style[bpmnvisu.mxConstants.STYLE_GRADIENTCOLOR] = 'White';
        });

        const poolStyle = styleSheet.styles[ShapeBpmnElementKind.POOL];
        poolStyle[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = 'PaleGreen';
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
        startEventStyle[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = '#d6eea5';

        [ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH, ShapeBpmnElementKind.EVENT_INTERMEDIATE_THROW].forEach(kind => {
            const intermediateEventStyle = styleSheet.styles[kind];
            intermediateEventStyle[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = '#7307df';
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
        style[bpmnvisu.mxConstants.STYLE_FONTCOLOR] = '#2b992a';
   }
}

const bpmnVisualizationCustomColorsUserTask = new BpmnVisualizationCustomColorsUserTask('bpmn-container-custom-colors-user-task');
```
