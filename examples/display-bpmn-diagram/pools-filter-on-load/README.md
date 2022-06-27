# Filter Pools at load time

Javascript example to demonstrate how can fit the BPMN diagram on load.
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/display-bpmn-diagram/pools-filter-on-load/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage
⚠️ In order to avoid having to many content in the README, we simplify it. You can find all the content of the example in [index.js](index.js).

Load the BPMN content and pass the information about the pools you want to filter
```javascript
const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container' });

const bpmnContent = ``; // your BPMN 2.0 XML content
bpmnVisualization.load(bpmnContent, { 
  modelFilter: {
    pools: [{id: 'id_1'}, { name: 'pool_name_2'}],
  }
});
```

For more details, see the [API documentation](https://process-analytics.github.io/bpmn-visualization-js/api/interfaces/ModelFilter.html).
