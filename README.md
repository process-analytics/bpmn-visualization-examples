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

All examples are available in the [__ :fast_forward: live environment__](https://cdn.statically.io/gh/process-analytics/bpmn-visualization-examples/master/examples/index.html).

### Running examples locally

The examples currently load ES Modules, so you cannot open html page directly from your local disk

For instance, on Chrome, the Console would display the following errors 
> Access to script at 'file:///...../bpmn-visualization-examples/examples/utils.js' from origin 'null' has been
> blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome,
> chrome-extension, https. index.html:1  
> Failed to load resource: net::ERR_FAILED utils.js:1

You need to run a local web server and then access the examples via the http protocol. The local web server must serve
the whole repository, as the examples (stored in the `./exmaples` folder) require resources available in the `./demo`
folder. 

Go to the repository root and use one the following solutions 
- python2: `python -m SimpleHTTPServer 8001` and go to http://localhost:8001/examples/ 
- python3: `python3 -m http.server 8002` and go to http://localhost:8002/examples/ 
- nodejs/npm: `npx http-server --port 8003  -o ./examples` and your default web browser opens http://localhost:8003/examples/ 
- .... your own lovely web server




### `bpmn-visualization` usage examples

- [load remote BPMN diagrams](examples/load-remote-bpmn-diagrams/README.md)

### `bpmn-visualization` extensibility examples

**DISCLAIMER: extension points are currently very experimental and are subject to changes.**  
They are mainly hacks to let you see what will be later available in a more integrated way. Extensibility features will
be progressively added to `bpmn-visualization`. See the [`Extensions` Milestone](https://github.com/process-analytics/bpmn-visualization-js/milestone/13).


- [custom user task icon](./examples/custom-user-task-icon/README.md) - use your own icon
- [custom colors](examples/custom-colors/README.md) - custom defaults, specific to BPMN element types
- [custom fonts](examples/custom-fonts/README.md) - custom defaults, specific to BPMN element types

# Powered by

[![statically.io logo](https://statically.io/icons/icon-96x96.png "statically.io")](https://statically.io)

**[statically.io](https://statically.io)** (demo environment and live examples)