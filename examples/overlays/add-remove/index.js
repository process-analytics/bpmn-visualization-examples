// Initialize BpmnVisualization
const bpmnVisualization = new bpmnvisu.BpmnVisualization({container: 'bpmn-container', navigation: {enabled: true}});
const bpmnElementsRegistry = bpmnVisualization.bpmnElementsRegistry;

// Load BPMN diagram
bpmnVisualization.load(getIncidentManagementBpmnDiagram());


configureAddOverlaysOnEdge('start', '1');
configureAddOverlaysOnEdge('middle', '234567');
configureAddOverlaysOnEdge('end', '89');
configureAddOverlaysOnShape('top-left', '123');
configureAddOverlaysOnShape('top-center', '4');
configureAddOverlaysOnShape('top-right', '56789');
configureAddOverlaysOnShape('bottom-left', '752');
configureAddOverlaysOnShape('bottom-center', '98478465');
configureAddOverlaysOnShape('bottom-right', '9');
configureAddOverlaysOnShape('middle-left', '3');
configureAddOverlaysOnShape('middle-right', '86');

configureRemoveAllOverlays();

function setupOverlaysConfiguration() {
    console.log(document.getElementById('font-color').value);
    console.log(document.getElementById('font-size').value);

    console.log(document.getElementById('fill-color').value);
    console.log(document.getElementById('fill-opacity').value);

    console.log(document.getElementById('stroke-color').value);
    console.log(document.getElementById('stroke-width').value);
    console.log(document.getElementById('stroke-pattern').value);
}
function configureAddOverlaysOnShape(position, label) {
    document.getElementById(`btn-${position}`).onclick = () => {
        // TODO: just to log options chosen - will be removed when actual functionality is added
        setupOverlaysConfiguration();
        // Add overlays
        bpmnElementsRegistry.addOverlays('exclusive_gateway', { position, label });
        bpmnElementsRegistry.addOverlays('manual_task_2', { position, label });
        bpmnElementsRegistry.addOverlays('end_event', { position, label });
    };
}

function configureAddOverlaysOnEdge(position, label) {
    document.getElementById(`btn-${position}`).onclick = () => {
        // TODO: just to log options chosen - will be removed when actual functionality is added
        setupOverlaysConfiguration();
        // Add overlays
        bpmnElementsRegistry.addOverlays('message_4', { position, label });
        bpmnElementsRegistry.addOverlays('message_6', { position, label });
        bpmnElementsRegistry.addOverlays('flow_4', { position, label });
        bpmnElementsRegistry.addOverlays('flow_5', { position, label });
    };
}

function configureRemoveAllOverlays() {
    document.getElementById('btn-reset').onclick = () => {
        // Remove all overlays
        // Shape
        bpmnElementsRegistry.removeAllOverlays('exclusive_gateway');
        bpmnElementsRegistry.removeAllOverlays('manual_task_2');
        bpmnElementsRegistry.removeAllOverlays('end_event');

        // Edge
        bpmnElementsRegistry.removeAllOverlays('message_4');
        bpmnElementsRegistry.removeAllOverlays('message_6');
        bpmnElementsRegistry.removeAllOverlays('flow_4');
        bpmnElementsRegistry.removeAllOverlays('flow_5');
    };
}




