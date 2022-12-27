# Custom font

**DISCLAIMER: this extension point is very experimental and is subject to change**.  
In particular, the way of changing the defaults will be done via configuration in the future.

Javascript example
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-bpmn-theme/custom-fonts/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser


## ♻️ Usage
Override the BPMN element fonts using various ways. `mxGraph` knowledge is required to handle style changes.
See the [development documentation](https://github.com/process-analytics/bpmn-visualization-js/blob/master/docs/contributors/bpmn-support-how-to.md) for more details.

⚠️To avoid having to many content in the README, we simplify it. You can find all the content of the example in [index.js](index.js).

ℹ Generally, the `style` keys and values constants are related to the `mxConstants` object that comes from mxGraph.
For reference, see the [mxConstants API](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxConstants-js.html#mxConstants). \
We are using `FontStyle` and `StyleIdentifiers` here that store the constants string values. They are defined in [style-identifier.js](../../static/js/style-identifiers.js).
But you can also use the string value directly, for instance `style['fontStyle']=...`.


Content:
- override default font: 
  - update the `StyleDefault` default values
```javascript
  StyleDefault.DEFAULT_FONT_SIZE = '12';
  StyleDefault.DEFAULT_FONT_FAMILY = 'Courier New,serif';
```

  - update the `StyleConfigurator` method
```javascript
StyleConfigurator.configureCommonDefaultStyle = function (style) {
    originalConfigureCommonDefaultStyle(style);
    style[StyleIdentifiers.STYLE_FONTSTYLE] = FontStyle.FONT_ITALIC;
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
        userTaskStyle[StyleIdentifiers.STYLE_FONTFAMILY] = 'Courier New,serif';
        userTaskStyle[StyleIdentifiers.STYLE_FONTSIZE] = '14';
        userTaskStyle[StyleIdentifiers.STYLE_FONTSTYLE] = FontStyle.FONT_BOLD + FontStyle.FONT_ITALIC;
    }
}

const bpmnVisualizationCustomFonts = new BpmnVisualizationCustomFonts('bpmn-container-custom-fonts');
```

**Note**: for example about font colors, see the [custom-colors example](../custom-colors/README.md).
