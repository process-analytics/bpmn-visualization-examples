# Custom default style of the overlays

**DISCLAIMER: this extension point is very experimental and is subject to change**.  
In particular, the way of changing the defaults will be done via configuration in the future.

Javascript example
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/overlays/custom-overlay-default-style/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser


## ♻️ BPMN Visualization Usage
:warning: In order to avoid having to many content in the README, we simplify it. You can find all the content of the example in [index.js](index.js).


Content:
- override default font: update the `StyleConstant` default [values](https://process-analytics.github.io/bpmn-visualization-js/api/interfaces/overlayfont.html)
```javascript
StyleDefault.DEFAULT_OVERLAY_FONT_COLOR = 'Pink';
StyleDefault.DEFAULT_OVERLAY_FONT_WIDTH = 30;
```

- override default fill: update the `StyleConstant` default [values](https://process-analytics.github.io/bpmn-visualization-js/api/interfaces/overlayfill.html)
```javascript
StyleDefault.DEFAULT_OVERLAY_FILL_COLOR = 'Grey';
```

- override default stroke: update the `StyleConstant` default [values](https://process-analytics.github.io/bpmn-visualization-js/api/interfaces/overlaystroke.html)
```javascript
StyleDefault.DEFAULT_OVERLAY_STROKE_COLOR = 'Cyan';
```
