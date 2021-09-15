# Custom font

**DISCLAIMER: this extension point is very experimental and is subject to change**.  
In particular, the way of changing the defaults will be done via configuration in the future.

Javascript example
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-bpmn-theme/custom-fonts/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser


## ♻️ BPMN Visualization Usage
Override the BPMN element fonts using various ways. `mxGraph` knowledge is required to handle style changes.
See the [development documentation](https://github.com/process-analytics/bpmn-visualization-js/blob/master/docs/contributors/bpmn-support-how-to.md) for more details.

:warning: In order to avoid having to many content in the README, we simplify it. You can find all the content of the example in [custom-font.js](custom-font.js).


Content:
- override default font: 
  - update the `StyleConstant` default values
```javascript
  StyleDefault.DEFAULT_FONT_SIZE = '12';
  StyleDefault.DEFAULT_FONT_FAMILY = 'Courier New,serif';
```

  - update the `StyleConfigurator` method
```javascript
StyleConfigurator.configureCommonDefaultStyle = function (style) {
    originalConfigureCommonDefaultStyle(style);
    style[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_ITALIC;
}
```

- different fonts for `event`, `gateway` and `task`: extend the lib class entry point
```javascript
class BpmnVisualizationCustomFonts extends BpmnVisualization {

    constructor(containerId) {
        super({ container: containerId });
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        const userTaskStyle = styleSheet.styles[ShapeBpmnElementKind.TASK_USER];
        userTaskStyle[mxConstants.STYLE_FONTFAMILY] = 'Courier New,serif';
        userTaskStyle[mxConstants.STYLE_FONTSIZE] = '14';
        userTaskStyle[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_BOLD + mxConstants.FONT_ITALIC;
    }
}

const bpmnVisualizationCustomFonts = new BpmnVisualizationCustomFonts('bpmn-container-custom-fonts');
```

**Note**: for example about font colors, see the [custom-colors example](../custom-colors/README.md).
