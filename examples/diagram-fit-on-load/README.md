# Fit BPMN Diagram on load

Javascript example to demonstrate how can fit the BPMN diagram on load.
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/diagram-fit-on-load/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage
:warning: In order to avoid to have to many content in the README, we simplify it. You can find all the content of the example in [diagram-fit-on-load.js](diagram-fit-on-load.js).

1. Declare the graph container with a fixed width & a fixed height
```html
<html>
    <body>
        <!-- load bpmn-visualization -->
        <!-- To uncomment when the release of the 0.5.1 is done -->
        <!--    <script src="https://unpkg.com/bpmn-visualization@0.5.1/dist/bpmn-visualization.js"></script>-->
        <!-- To delete when the release of the 0.5.1 is done -->
        <script src="../../demo/0.5.1-alpha/bpmn-visualization.js"></script>

        <section>
            <div id="graph-container" class="column col-10 col-mx-auto graph-container"/>
        </section>
    </body>
</html>
```
```css
.graph-container {
    /* use absolute values for height to ensure that the vertical diagram is not fully displayed when the page is opened. */
    width: 100%;
    height: 600px;
    border-style: solid;
    border-color: #B0B0B0;
    border-width: 1px;
    /* This ensures that the parts of the diagram outside of the viewport are not displayed. */
    overflow: hidden;
}
```

2. Load BPMN content
```javascript
const bpmnVisualization = new BpmnVisualization(window.document.getElementById('graph-container'));

const bpmnContent = ``; // your BPMN 2.0 XML content
const fitTypeValue = 'Center'; // From radio button or select
bpmnVisualization.load(bpmnContent, { fitType: FitType[fitTypeValue] });
```
