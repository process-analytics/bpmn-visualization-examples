import factory, {type mxGraphExportObject} from 'mxgraph';

// The following is only needed when you access to mxGraph value objects. They are necessary to instantiate or extend mxGraph objects.
// You don't need it if you don't directly use mxGraph in your code.

export const mxgraph = initialize();

function initialize(): mxGraphExportObject {
  // The mxGraph options are configured by bpmn-visualization, so there is no need to set them again globally.
  return factory({});
}
