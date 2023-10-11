# Load Local BPMN Diagrams

Javascript example
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/display-bpmn-diagram/load-local-bpmn-diagrams/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

**Tips**: you can use BPMN diagrams available in this repository in the [bpmn-files](../../../bpmn-files) folder.

Let's assume that a `bpmnVisualization` variable has already been initialized and the `inputFileHtmlElement` variable relates
to the input file html element.  \
The content of the selected file is loaded as BPMN diagram which is rendered on the page. 

```javascript
inputFileHtmlElement.addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        bpmnVisualization.load(reader.result);
    };
    reader.readAsText(file);
}
```
