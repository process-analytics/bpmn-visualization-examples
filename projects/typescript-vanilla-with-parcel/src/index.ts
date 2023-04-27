import { mxgraph, BpmnVisualization, FitType } from "bpmn-visualization";
// BPMN diagram content conveniently retrieved with parcel (as string)
// for other load methods, see https://github.com/process-analytics/bpmn-visualization-examples
import diagram from "bundle-text:./diagram.bpmn";
import "./styles.css";

// 'bpmn-visualization' API documentation: https://process-analytics.github.io/bpmn-visualization-js/api/index.html
const bpmnVisualization = new BpmnVisualization({
  container: "bpmn-container",
  navigation: { enabled: true } // remove this line or set to false if you don't want to use Diagram Navigation
});

// display the bpmn-visualization version in the footer
const footer = document.querySelector("footer")!;
const version = bpmnVisualization.getVersion();
const versionAsString = `bpmn-visualization@${version.lib}`;
const dependenciesAsString = [...version.dependencies].map(([name, version]) => `${name}@${version}`).join('/');
footer.innerText = `${versionAsString} with ${dependenciesAsString} | direct usage of mxGraph@${mxgraph.mxClient.VERSION}`;


// Load BPMN diagram
bpmnVisualization.load(diagram, { fit: { type: FitType.Center, margin: 10}});
const registry = bpmnVisualization.bpmnElementsRegistry;

// Style elements with CSS
registry.addCssClasses([
    'Activity_1t65hvk', // Create Purchase Order Item
    'Activity_00vbm9s', // Record Goods Receipts
  ],
  [
    'bpmn-activity-success', // CSS class declared in the CSS resources
    // "bpmn-activity-info" can be used instead for instance
  ]);

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

// Add Overlays
const overlayColor = "#d7a329";
// Use the following bpmn element id to apply the overlay to another element
// Activity_1u4jwkv:  Record Invoice Receipt
// Activity_083jf01: Remove Payment Block
registry.addOverlays("Activity_1u4jwkv", {
  position: "top-center",
  label: "OK",
  style: {
    font: {
      color: overlayColor,
      size: 20
    },
    fill: {
      color: "white"
    },
    stroke: {
      color: overlayColor
    }
  }
});
