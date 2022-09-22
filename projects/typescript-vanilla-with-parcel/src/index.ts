import { BpmnVisualization, FitType } from "bpmn-visualization";
// BPMN diagram content conveniently retrieved with parcel (as string)
// for other load methods, see https://github.com/process-analytics/bpmn-visualization-examples
import diagram from "bundle-text:./diagram.bpmn";
import "./styles.css";
// put this import after the 'BpmnVisualization' import to ensure mxGraph is correctly configured by bpmn-visualization
import { mxgraph } from "./mxgraph-initializer";

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
// Try the "Center" type to fit the whole container and center the diagram
bpmnVisualization.load(diagram, { fit: { type: FitType.None } });

// Add Overlay
const overlayColor = "#d7a329";
// Use the following bpmn element id to apply the overlay to another element
// StartEvent_08hc3xj: start event
// Activity_1potg3p: activity
// Event_05akz22: end event
bpmnVisualization.bpmnElementsRegistry.addOverlays("Event_05akz22", {
  position: "top-right",
  label: "OK!", // this is the only mandatory property
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

// Add style to BPMN Element
bpmnVisualization.bpmnElementsRegistry.addCssClasses("Activity_1potg3p", [
  "bpmn-activity-success" // CSS class declared in the CSS resources
  // "bpmn-activity-info" can be used instead for instance
]);
