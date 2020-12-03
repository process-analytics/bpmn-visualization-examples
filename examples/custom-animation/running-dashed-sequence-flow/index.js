// Main BPMN Container
const bpmnContainerElt = window.document.getElementById('bpmn-container');
const bpmnVisualization = new bpmnvisu.BpmnVisualization(bpmnContainerElt);

bpmnVisualization.load(getIncidentManagementBpmnDiagram(), {fit: {type: bpmnvisu.FitType.Center}});

// Custom animation
const animatedSequenceFlowElt = bpmnVisualization.htmlElementRegistry.getBpmnHtmlElement('flow_5');

// WARNING: The class adding doesn't work with the zoom, the panning and the fit
// TODO Need to replace by the dedicated API when it is implemented
animatedSequenceFlowElt.classList.add('running-dashed');


