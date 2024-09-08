import './index.css';
// the URL support is provided by rsbuild, see rsbuild.config.ts
import diagramUrl from './assets/diagram.bpmn';
import { BpmnVisualization, FitType, getVersion, mxgraph } from 'bpmn-visualization';

// TMP - to investigate surge.sh issue
import diagramTxtUrl from './assets/diagram.bpmn.txt';
import diagramXmlUrl from './assets/diagram.bpmn.xml';
console.log('diagramTxtUrl:', diagramTxtUrl);
console.log('diagramTXmlUrl:', diagramXmlUrl);
// end of TMP


document.querySelector('#root')!.innerHTML = `
    <h1 class="title">bpmn-visualization TypeScript Integration with Rsbuild</h1>
    <div id="bpmn-container"></div>
    <footer></footer>
`;

// instantiate BpmnVisualization, pass the container HTMLElement - present in index.html
const bpmnVisualization = new BpmnVisualization({
  container: "bpmn-container",
});
// load the BPMN diagram defined above
const response = await fetch(diagramUrl);
const diagram = await response.text();
bpmnVisualization.load(diagram, { fit: { type: FitType.Center, margin: 10}});
const registry = bpmnVisualization.bpmnElementsRegistry;

// Style elements with CSS
registry.addCssClasses(
  [
    'Activity_1t65hvk', // Create Purchase Order Item
    'Activity_00vbm9s', // Record Goods Receipts
  ],
  'bpmn-highlight',
);

// Style elements with the "Update Style" API
registry.updateStyle(['Gateway_1ezcj46', 'Activity_0yabbur', 'Event_07598zy'],
  {
    stroke: { color: 'blue', width: 6 },
    fill: { color: 'orange', opacity: 40 },
  });
registry.updateStyle(['Flow_1kkicvr', 'Flow_12q12yb'],
  {
    stroke: { color: 'blue', width: 4 },
  });

// Add overlays
// Record Invoice Receipt
registry.addOverlays('Activity_1u4jwkv',
  {
    label: '150',
    position: 'top-center',
    style: {
      font: {
        size: 18
      },
      stroke: {
        color: 'white'
      }
    },
  });
// Remove Payment Block
registry.addOverlays('Activity_083jf01',
  {
    label: '72',
    position: 'top-center',
    style: {
      fill: {
        color: '#ff0101'
      },
      font: {
        color: 'white',
        size: 22,
      },
      stroke: {
        color: '#ff0101',
      },
    },
  });

// display the bpmn-visualization version in the footer
const footer = document.querySelector<HTMLElement>('footer')!;
const version = getVersion();
const versionAsString = `bpmn-visualization@${version.lib}`;
const dependenciesAsString = [...version.dependencies].map(([name, version]) => `${name}@${version}`).join('/');
footer.innerText = `${versionAsString} with ${dependenciesAsString} | direct usage of mxGraph@${mxgraph.mxClient.VERSION}`;
