import './style.css'
// this is simple example of the BPMN diagram, loaded as string
import diagram from './diagram.bpmn?raw'
import { BpmnVisualization } from 'bpmn-visualization';
import { mxgraph } from "./mxgraph-intializer";

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

// display the bpmn-visualization version in the footer
const footer = document.querySelector<HTMLElement>('footer')!;
const version = bpmnVisualization.getVersion();
const versionAsString = `bpmn-visualization@${version.lib}`;
const dependenciesAsString = [...version.dependencies].map(([name, version]) => `${name}@${version}`).join('/');
// FIXME the mxgraph version described in lib is not the same as the actual one!
footer.innerText = `${versionAsString} with ${dependenciesAsString} | raw mxGraph: ${mxgraph.mxClient.VERSION}`;
