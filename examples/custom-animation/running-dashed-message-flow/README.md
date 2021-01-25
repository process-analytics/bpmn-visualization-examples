# Running Dashed Message Flow

Javascript example to demonstrate how to add custom running dashed animation on a Message Flow of the BPMN Diagram.
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-animation/running-dashed-message-flow/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

After the main `BpmnVisualization` instantiation, get the HTML element corresponding to the message flow to add custom CSS class for the animation.

ℹ️ We need to apply the animation to the SVG element corresponding to the line of the edge. \
In this example, it is the second path of the HTML element of the edge. \
It looks like `<path d="..." fill="none" stroke="black" stroke-width="1.78" stroke-miterlimit="10" pointer-events="stroke"></path>` in the DOM.
````css
    .running-dashed > path:nth-child(2) {
        stroke: Red;
        stroke-dasharray: 4, 2, 1, 2;
        animation-name: dash;
        animation-duration: 300ms;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: reverse;
    }
    @keyframes dash {
        from {
            stroke-dashoffset: 0;
        }
        to {
            stroke-dashoffset: 10;
        }
    }
````

```javascript
    const animatedSequenceFlowElt = bpmnVisualization.bpmnElementsRegistry.addCssClasses(['message_4'], 'running-dashed');
```

⚠️ It's not possible to manipulate the class of the HTML element with the zoom, the panning and the fit features, because it recalculated and is overidden by them. \
A new API comes later to support this case, and simplify the customization of the edges.
