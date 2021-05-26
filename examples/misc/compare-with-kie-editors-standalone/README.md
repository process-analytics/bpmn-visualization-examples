# Compare bpmn-visualization and kie-editors-standalone when loading Local BPMN Diagrams

Javascript example
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/misc/compare-with-kie-editors-standalone/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser


## Overview

This example let you compare [bpmn-visualization](https://github.com/process-analytics/bpmn-visualization-js) with [kie-editors-standalone](https://github.com/kiegroup/kogito-tooling/tree/master/packages/kie-editors-standalone) on
- BPMN elements rendering
- API usage

**WARN** \
The following applies at least to `kie-editors-standalone@0.10.0`
- The javascript bundle is very large (12 MB, more than 2.5 MB after compression), very slow to load and generates a lot of error in the console.
- It is unable to display most of the C.x diagrams from the miwg-test-suite (parsing errors).


## Implementation notes

This example has been created by following the [BPMN and DMN Standalone Editors article](https://blog.kie.org/2020/10/bpmn-and-dmn-standalone-editors.html).

To avoid side effects between the 2 libraries, each of them is using a dedicated div to display and interact with the BPMN
diagram (this is similar to what it is implemented in the [bpmn-js comparison example](../compare-with-bpmn-js/README.md). \
The div are located exactly at the same place on the HTML page and only one is displayed at a given time.

On library switch, the corresponding div is displayed, and the one of the other library is hidden.
