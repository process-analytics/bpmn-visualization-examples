import './style.css';
// this is simple example of the BPMN diagram, loaded as string. The '?.raw' extension support is provided by Vite.
// for other load methods, see https://github.com/process-analytics/bpmn-visualization-examples
import diagram from './diagram.bpmn?raw';
import { BpmnVisualization, FitType, mxgraph } from 'bpmn-visualization';

// instantiate BpmnVisualization, pass the container HTMLElement - present in index.html
const bpmnVisualization = new BpmnVisualization({
    container: "bpmn-container",
});
// load the BPMN diagram defined above
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
const version = bpmnVisualization.getVersion();
const versionAsString = `bpmn-visualization@${version.lib}`;
const dependenciesAsString = [...version.dependencies].map(([name, version]) => `${name}@${version}`).join('/');
footer.innerText = `${versionAsString} with ${dependenciesAsString} | direct usage of mxGraph@${mxgraph.mxClient.VERSION}`;
