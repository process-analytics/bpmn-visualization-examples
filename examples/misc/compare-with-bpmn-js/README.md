# Compare bpmn-visualization and bpmn-js when loading Local BPMN Diagrams

Javascript example
- [__⏩ live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/misc/compare-with-bpmn-js/index.html)
- to run locally, open the [index.html](index.html) directly in a Web Browser


## Overview

This example let you compare [bpmn-visualization](https://github.com/process-analytics/bpmn-visualization-js) with [bpmn-js](https://github.com/bpmn-io/bpmn-js/) on
- BPMN elements rendering
- navigation
- zoom level at load time or after BPMN diagram load
- API usage


## Implementation notes

To avoid side effects between the 2 libraries, each of them is using a dedicated div to display and interact with the BPMN
diagram. \
The div are located exactly at the same place on the HTML page and only one is displayed at a given time.

On library switch, the corresponding div is displayed, and the one of the other library is hidden.
