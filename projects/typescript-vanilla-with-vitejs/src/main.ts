import './style.css'
// this is simple example of the BPMN diagram, loaded as string. The '?.raw' extension support is provided by Vite.
// for other load methods, see https://github.com/process-analytics/bpmn-visualization-examples
import diagram from './diagram.bpmn?raw'
import { mxgraph, BpmnVisualization } from 'bpmn-visualization';

// instantiate BpmnVisualization, pass the container HTMLElement - present in index.html
const bpmnVisualization = new BpmnVisualization({
    container: "bpmn-container",
});
// load the BPMN diagram defined above
bpmnVisualization.load(diagram);

const registry = bpmnVisualization.bpmnElementsRegistry;
// Style elements with CSS
registry.addCssClasses(
    "Activity_1",
    "bpmn-highlight"
);

// Style elements with the "Update Style" API
registry.updateStyle(["EndEvent_1"], {
    stroke: {color: "blue", width: 6},
    fill: {color: "orange", opacity: 40},
});
registry.updateStyle(["Flow_2"], {
    stroke: {color: "blue", width: 4},
});


// display the bpmn-visualization version in the footer
const footer = document.querySelector<HTMLElement>('footer')!;
const version = bpmnVisualization.getVersion();
const versionAsString = `bpmn-visualization@${version.lib}`;
const dependenciesAsString = [...version.dependencies].map(([name, version]) => `${name}@${version}`).join('/');
footer.innerText = `${versionAsString} with ${dependenciesAsString} | direct usage of mxGraph@${mxgraph.mxClient.VERSION}`;
