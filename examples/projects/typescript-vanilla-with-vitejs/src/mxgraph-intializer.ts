import factory, { type mxGraphExportObject } from 'mxgraph';


// TODO hack to detect mxgraph version mismatch

export const mxgraph = initialize();

// Taken from the bpmn-visualization code
function initialize(): mxGraphExportObject {
  // set options globally, as it is not working when passing options to the factory (https://github.com/jgraph/mxgraph/issues/479)
  (window as any)['mxLoadResources'] = false;
  (window as any)['mxLoadStylesheets'] = false;
  // extras, otherwise we got 'Uncaught ReferenceError: assignment to undeclared variable mx...'
  (window as any)['mxForceIncludes'] = false;
  (window as any)['mxResourceExtension'] = '.txt';
  return factory({});
}
