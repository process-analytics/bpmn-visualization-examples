// Initialize BpmnVisualization
const bpmnVisualization = new bpmnvisu.BpmnVisualization({container: 'bpmn-container', navigation: {enabled: true}});
const bpmnElementsRegistry = bpmnVisualization.bpmnElementsRegistry;

// Load BPMN diagram
bpmnVisualization.load(getIncidentManagementBpmnDiagram());


configureAddOverlaysOnShape('top-left', '123');
configureAddOverlaysOnShape('top-center', '4');
configureAddOverlaysOnShape('top-right', '56789');
configureAddOverlaysOnShape('bottom-left', '752');
configureAddOverlaysOnShape('bottom-center', '98478465');
configureAddOverlaysOnShape('bottom-right', '9');
configureAddOverlaysOnShape('middle-left', '3');
configureAddOverlaysOnShape('middle-right', '86');

configureRemoveAllOverlays();


function configureAddOverlaysOnShape(position, label) {
    document.getElementById(`btn-${position}`).onclick = () => {
        // Add overlays
        bpmnElementsRegistry.addOverlays('exclusive_gateway', { position, label });
        bpmnElementsRegistry.addOverlays('manual_task_2', { position, label });
        bpmnElementsRegistry.addOverlays('end_event', { position, label });
    };
}

function configureRemoveAllOverlays() {
    document.getElementById('btn-reset').onclick = () => {
        // Remove all overlays
        bpmnElementsRegistry.removeAllOverlays('exclusive_gateway');
        bpmnElementsRegistry.removeAllOverlays('manual_task_2');
        bpmnElementsRegistry.removeAllOverlays('end_event');
    };
}




