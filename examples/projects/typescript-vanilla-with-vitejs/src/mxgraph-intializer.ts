import factory, {type mxGraphExportObject} from 'mxgraph';

// The following is needed if you need to access to mxGraph value objects that are required to instantiate mxGraph objects or extending the mxGraph code.
// It is not necessary if you only need to directly use mxGraph in your code.

export const mxgraph = initialize();

function initialize(): mxGraphExportObject {
  // The mxGraph options are configured by bpmn-visualization, so there is no need to set them again globally.
  return factory({});
}
