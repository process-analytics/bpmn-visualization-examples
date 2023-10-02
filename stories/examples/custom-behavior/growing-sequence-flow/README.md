# Growing Sequence Flow

Javascript example to demonstrate how to add custom growing animation on a Sequence Flow of the BPMN Diagram.
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-animation/growing-sequence-flow/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

After the instantiation of the `BpmnVisualization` object, get the HTML element corresponding to the sequence flow to add custom CSS class for the animation.

ℹ️ We need to apply the animation to the SVG element corresponding to the line of the edge. \
In this example, it is the second path of the HTML element of the edge. \
It looks like `<path d="..." fill="none" stroke="black" stroke-width="1.78" stroke-miterlimit="10" pointer-events="stroke"></path>` in the DOM.
````css
    .growing > path:nth-child(2) {
        stroke: Chartreuse;
        animation-name: grow;
        animation-duration: 2s;
        animation-timing-function: ease-in;
        animation-iteration-count: infinite;
        animation-direction: normal;
    }
    @keyframes grow {
        from {
            stroke-dashoffset: 100%;
            stroke-dasharray: 100%;
        }
        to {
            stroke-dashoffset: 0;
        }
    }
````

```javascript
    bpmnVisualization.bpmnElementsRegistry.addCssClasses(['sequence_flow_id'], 'growing');
```
