# Custom user task icon

**DISCLAIMER: this extension point is very experimental and is subject to changes.**  
The current way of doing is a hack as there is no official way of doing it. In the future, this will be probably done by
subclassing `IconPainter`.

Javascript example
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/custom-user-task-icon/index.html)
- to run locally, see the [explanations in the repository README](../../README.md#running-examples-locally)

Override the `IconPainter` static method related to the icon of the BPMN element and paint the icon using the mxGraph
API. See https://process-analytics.github.io/bpmn-visualization-js/#bpmn-support-howto-elements-rendering for more
information.
