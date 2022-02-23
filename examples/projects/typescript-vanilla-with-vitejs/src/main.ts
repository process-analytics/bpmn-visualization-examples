import './style.css'
// this is simple example of the BPMN diagram, loaded as string
import diagram from './diagram.bpmn?raw'
import { BpmnVisualization } from 'bpmn-visualization';
import factory, { type mxGraphExportObject } from 'mxgraph';

// instantiate BpmnVisualization, pass the container HTMLElement - present in index.html
const bpmnVisualization = new BpmnVisualization({
    container: "bpmn-container",
});
// load the BPMN diagram defined above
bpmnVisualization.load(diagram);

// highlight task
bpmnVisualization.bpmnElementsRegistry.addCssClasses(
    "Activity_1",
    "bpmn-highlight"
);


// TODO hack to remove when new bpmn-visualization release is available with the version API
const mxgraph = initialize();

function initialize(): mxGraphExportObject {
  // set options globally, as it is not working when passing options to the factory (https://github.com/jgraph/mxgraph/issues/479)
  (window as any)['mxLoadResources'] = false;
  (window as any)['mxLoadStylesheets'] = false;
  // extras, otherwise we got 'Uncaught ReferenceError: assignment to undeclared variable mx...'
  (window as any)['mxForceIncludes'] = false;
  (window as any)['mxResourceExtension'] = '.txt';
  return factory({});
}

// display the bpmn-visualization version in the footer
const footer = document.querySelector<HTMLElement>('footer')!;
footer.innerHTML = `
  bpmn-visualization@xxx with mxGraph@${mxgraph.mxClient.VERSION}
`
