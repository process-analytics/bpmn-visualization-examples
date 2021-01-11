# Compare bpmn-visualization and kie-editors-standalone when loading Local BPMN Diagrams

Javascript example
- [__:fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/misc/compare-with-kie-editors-standalone/index.html)
- to run locally, run a web server to open the [index.html](index.html) the page. See the [explanations in the repository README](../../../README.md#running-examples-locally)


## Overview

This example let you compare [bpmn-visualization](https://github.com/process-analytics/bpmn-visualization-js) with [kie-editors-standalone](https://github.com/kiegroup/kogito-tooling/tree/master/packages/kie-editors-standalone) on
- BPMN elements rendering
- API usage

**WARN**
the following applies at least to `kie-editors-standalone@0.8.1`
- the  js bundle is very large (more than 38mb), very slow to load and generates a lot of error in the console
- it is unable to display most of the C.x diagrams from the miwg-test-suite (parsing errors)
- you must serve this example with a http server (see link on top of this file), otherwise, the diagram won't load in kie-editors-standalone (`window.location.origin` issue)


## Implementation notes

This example has been created by following the [BPMN and DMN Standalone Editors article](https://blog.kie.org/2020/10/bpmn-and-dmn-standalone-editors.html).

To avoid side effects between the 2 libraries, each of them is using a dedicated div to display and interact with the BPMN
diagram (this is similar to what it is implemented in the [bpmn-js comparison example](../compare-with-bpmn-js/README.md). \
The div are located exactly at the same place on the HTML page and only one is displayed at a given time.

On library switch, the corresponding div is displayed, and the one of the other library is hidden.
