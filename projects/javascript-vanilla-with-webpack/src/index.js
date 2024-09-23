import { BpmnVisualization, FitType, getVersion } from 'bpmn-visualization';
import { ShapeUtil } from '@process-analytics/bv-experimental-add-ons';
// this is simple example of the BPMN diagram, loaded as string. Load support provided by Webpack.
// for other load methods, see https://github.com/process-analytics/bpmn-visualization-examples
import diagram from './diagram.bpmn';

// TMP to validate that the bv-addons dependency does not break the build
console.info('bv-addons ShapeUtil', ShapeUtil.isBpmnArtifact('kind'))

// instantiate the BpmnVisualization, pass the container HTMLElement - present in index.html
const bpmnVisualization = new BpmnVisualization({ container: 'bpmn-container' });

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
    label: '38%',
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
const footer = document.querySelector("footer");
const version = getVersion();
const versionAsString = `bpmn-visualization@${version.lib}`;
const dependenciesAsString = [...version.dependencies].map(([name, version]) => `${name}@${version}`).join('/');
footer.innerText = `${versionAsString} with ${dependenciesAsString}`;
