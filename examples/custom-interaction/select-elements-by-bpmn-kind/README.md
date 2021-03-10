# Select elements by BPMN kind


Javascript example to demonstrate how to select elements by BPMN kind and register custom behaviour on found elements
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-interaction/select-elements-by-bpmn-kind/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

All BPMN diagrams used in this example are taken from the [miwg-test-suite repository](https://github.com/bpmn-miwg/bpmn-miwg-test-suite/blob/master/Reference).


First, retrieve the BPMN elements with the `bpmn-visualization` API by passing one or several BPMN kinds \
In the following, we retrieve all `Pools` and `End Events`.

```javascript
const bpmnElements = bpmnVisualization.bpmnElementsRegistry.getElementsByKinds(
    [ShapeBpmnElementKind.EVENT_END, ShapeBpmnElementKind.POOL]
);
```

The returned array contains elements for both BPMN kinds.
If you want to process the BPMN kinds differently, you can filter the array as in the following if you first
want to manage `End Events`. 

```javascript
bpmnElements
    .filter(elt => elt.bpmnSemantic.kind !== bpmnvisu.ShapeBpmnElementKind.POOL)
    .forEach(elt => {
            const bpmnSemantic = elt.bpmnSemantic;
            elt.htmlElement.addEventListener('click', function (event) {
                // do something with bpmnSemantic.id or bpmnSemantic.name
                ...
            });
        }
    );
```

Then custom processing for `Pools`:
```javascript
const pools = bpmnElements
    .map(elt => elt.bpmnSemantic)
    .filter(bpmnSemantic => bpmnSemantic.kind === bpmnvisu.ShapeBpmnElementKind.POOL);
// do something with the BPMN Semantic of pools
...
```



## Example implementation notes

This example displays toast on `End Events` click thanks to [Notyf](https://github.com/caroso1222/notyf).

It also allows hiding or collapsing `Pools`. The `bpmn-visualization` API is used to retrieve the `Pool` ids, but the `Pool`
display is then fully managed by custom mxGraph code. \
`bpmn-visualization` may directly provide such capabilities in the future: see [#592](https://github.com/process-analytics/bpmn-visualization-js/issues/592) for instance.
