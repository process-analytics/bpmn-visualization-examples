# Running Dashed Message Flow

Javascript example to demonstrate how to add custom running dashed animation on a Message Flow of the BPMN Diagram.
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-animation/running-dashed-message-flow/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

After the main `BpmnVisualization` instantiation, get the HTML element corresponding to the message flow to add custom CSS class for the animation.
````css
    .running-dashed > path:nth-child(2) {
        /* The corresponding SVG element for the line of the edge:
            <path d="M 719.24 319.13 L 786.53 319.13" fill="none" stroke="black" stroke-width="1.78" stroke-miterlimit="10" pointer-events="stroke"></path>
        */
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
    const animatedMessageFlowElt = bpmnVisualization.htmlElementRegistry.getBpmnHtmlElement('message_flow_id');
    animatedMessageFlowElt.classList.add('running-dashed');
```

⚠️ It's not possible to manipulate the class of the HTML element with the zoom, the panning and the fit features, because it recalculated and is overidden by them. \
A new API comes later to support this case, and simplify the customization of the edges.
