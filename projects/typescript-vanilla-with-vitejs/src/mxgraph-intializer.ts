import factory, {type mxGraphExportObject} from 'mxgraph';

// The following is taken from bpmn-visualization
// It demonstrates how to access to mxGraph value objects that are required to instantiate mxGraph objects or extending the mxGraph code.
// It is not necessary if you only need to use mxGraph types.

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
