import './style.css'
// this is simple example of the BPMN diagram, loaded as string
import diagram from './diagram.bpmn?raw'
import { BpmnVisualization } from 'bpmn-visualization';

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`

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
