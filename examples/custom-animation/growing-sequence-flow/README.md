# Growing Sequence Flow

Javascript example to demonstrate how to add custom growing animation on a Sequence Flow of the BPMN Diagram.
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-animation/growing-sequence-flow/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

After the `BpmnVisualization` instantiation, get the HTML element corresponding to the sequence flow to add custom CSS class for the animation.

ℹ️ We need to apply the animation to the SVG element corresponding to the line of the edge. \
In this example, it is the second path of the HTML element of the edge. \
It looks like `<path d="..." fill="none" stroke="black" stroke-width="1.78" stroke-miterlimit="10" pointer-events="stroke"></path>` in the DOM.
````css
    .growing > path:nth-child(2) {
        stroke: Chartreuse;
        animation-name: grow;
        animation-duration: 2s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-direction: normal;
    }
    @keyframes grow {
        from {
            stroke-dashoffset: 150;
            stroke-dasharray: 150;
        }
        to {
            stroke-dashoffset: 0;
        }
    }
````

```javascript
    const animatedSequenceFlowElt = bpmnVisualization.htmlElementRegistry.getBpmnHtmlElement('sequence_flow_id');
    animatedSequenceFlowElt.classList.add('growing');
```

⚠️ It's not possible to manipulate the class of the HTML element with the zoom, the panning and the fit features, because it recalculated and is overidden by them. \
A new API comes later to support this case, and simplify the customization of the edges.
