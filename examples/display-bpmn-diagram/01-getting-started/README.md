# Getting Started

Javascript example to demonstrate how to integrate `bpmn-visualization` in an html page.
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/display-bpmn-diagram/01-getting-started/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

### Load the library
Load the browser bundle from [jsdelivr](https://www.jsdelivr.com/package/npm/bpmn-visualization), [unpkg](https://unpkg.com/browse/bpmn-visualization)
or any other location:
```html
<script src="https://cdn.jsdelivr.net/npm/bpmn-visualization@0.19.5/dist/bpmn-visualization.min.js"></script>
```

💡 During the development step, you can use the non-minified version:
```html
<script src="https://cdn.jsdelivr.net/npm/bpmn-visualization@0.19.5/dist/bpmn-visualization.js"></script>
```

### Use the library

Initialize `BPMN Visualization` and then load a BPMN Diagram. \
The library is bundled as an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) style script and binds itself to the global `bpmnvisu` variable.

In the following, the HTML page defined a div identified by the `bpmn-container` id, where the BPMN diagram is rendered. 

```javascript
// initialize BPMN Visualization
const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container' });
// load the BPMN diagram
bpmnVisualization.load(bpmnDiagram());
```

