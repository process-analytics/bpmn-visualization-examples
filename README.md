# bpmn-visualization examples

This repository contains examples showing how to use [bpmn-visualization](https://github.com/process-analytics/bpmn-visualization-js).

## Demo

This example let you load a BPMN file to see how the lib renders it. Various versions of the lib are available. 

- online: [bpmn-visualization-examples demo](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/demo/index.html)
thanks to the [statically.io](https://statically.io/) service
- local: [demo](./demo) 


If you need BPMN examples, you can use resources 
- from the [BPMN Model Interchange Working Group (BPMN MIWG)](http://www.omgwiki.org/bpmn-miwg)
  - https://github.com/bpmn-miwg/bpmn-miwg-test-suite
  - https://github.com/bpmn-miwg/bpmn-miwg-demos
- [files used to test](./bpmn-files/README.md) how the lib renders BPMN elements

## Examples

All examples are available live, see [index.html](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/index.html)

### Usage

- [load remote BPMN diagrams](examples/load-remote-bpmn-diagrams/README.md)

### Extensibility

**DISCLAIMER: extension points are currently very experimental and are subject to changes.**  
They are mainly hacks to let you see what will be later available in a more integrated way. Extensibility features will
be progressively added to `bpmn-visualization`. See the [`Extensions` Milestone](https://github.com/process-analytics/bpmn-visualization-js/milestone/13).


- [custom user task icon](./examples/custom-user-task-icon/README.md) - use your own icon
- [custom colors](examples/custom-colors/README.md) - custom defaults, specific to BPMN element types
- [custom fonts](examples/custom-fonts/README.md) - custom defaults, specific to BPMN element types

# Powered by

[![statically.io logo](https://statically.io/icons/icon-96x96.png "statically.io")](https://statically.io)

**[statically.io](https://statically.io)** (demo environment and live examples)