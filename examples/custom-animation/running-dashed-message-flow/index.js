// BPMN Container
const bpmnContainerElt = window.document.getElementById('bpmn-container');
const bpmnVisualization = new bpmnvisu.BpmnVisualization(bpmnContainerElt);

bpmnVisualization.load(getIncidentManagementBpmnDiagram(), {fit: {type: bpmnvisu.FitType.Center, margin: 20}});

// Custom animation
const animatedMessageFlowElt = bpmnVisualization.bpmnElementsRegistry.getElementsByIds(['message_4'])[0];

// WARNING: The class adding doesn't work with the zoom, the panning and the fit
// TODO Need to replace by the dedicated API when it is implemented
animatedMessageFlowElt.classList.add('running-dashed');


