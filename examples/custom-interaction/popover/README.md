# Add a popover with information to the task found by it's id

Javascript example to demonstrate how to open a new BPMN diagram in a tab.
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-interaction/popover/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser

## ♻️ Usage

After the main `BpmnVisualization` instantiation, get the HTML element corresponding to the id from search input.

⚠️  In order to avoid having to many content in the README, we simplify it. You can find all the content of the example in [index.js](index.js).
What is important to know:
- Definition of style for the popover are in index.html
- The HTML passed as the content of the popover is not sanitized - it is up to integrator to do so.


⚠️ It's not possible to use BPMN diagram navigation at the moment. \
Panning and zooming causes the diagram to be redrawn.
A new API comes later to support this case.
