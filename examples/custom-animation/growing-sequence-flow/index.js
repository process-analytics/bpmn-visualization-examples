// Initialize BpmnVisualization
const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container', navigation: { enabled: true } });

// Load BPMN diagram
bpmnVisualization.load(getIncidentManagementBpmnDiagram(), {fit: {type: bpmnvisu.FitType.Center, margin:20}});

// Apply custom animation class
bpmnVisualization.bpmnElementsRegistry.addCssClasses(['flow_5'], 'growing');
