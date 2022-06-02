import { BpmnVisualization } from "bpmn-visualization";
// this is simple example of the BPMN diagram, loaded as string. Load support provided by Webpack.
// for other load methods, see https://github.com/process-analytics/bpmn-visualization-examples
import diagram from "./diagram.bpmn";

// instantiate the BpmnVisualization, pass the container HTMLElement - present in index.html
const bpmnVisualization = new BpmnVisualization({ container: 'bpmn-container' });

// load the BPMN diagram defined above
bpmnVisualization.load(diagram);

// Add overlay on activity
const overlay = { position: 'top-left', label: '38%' };
bpmnVisualization.bpmnElementsRegistry.addOverlays('Activity_1', overlay);

// display the bpmn-visualization version in the footer
const footer = document.querySelector("footer");
const version = bpmnVisualization.getVersion();
const versionAsString = `bpmn-visualization@${version.lib}`;
const dependenciesAsString = [...version.dependencies].map(([name, version]) => `${name}@${version}`).join('/');
footer.innerText = `${versionAsString} with ${dependenciesAsString}`;
