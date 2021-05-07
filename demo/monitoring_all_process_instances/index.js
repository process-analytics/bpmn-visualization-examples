/*function removeAllOverlays() {
    // Remove all overlays
    // Shape
    bpmnElementsRegistry.removeAllOverlays('Activity_1potg3p');

    // Edge
    bpmnElementsRegistry.removeAllOverlays('Flow_1wkfbb0');
}*/



/*var style = {
    font: {
        color: fontColorElt.value,
        size: fontSizeElt.value,
    },
    fill: {
        color: fillColorElt.value,
    },
    stroke: {
        color: strokeColorElt.value,
    }
};*/

// Initialize BpmnVisualization
const bpmnVisualization = new bpmnvisu.BpmnVisualization({container: 'bpmn-container', navigation: {enabled: true}});
const bpmnElementsRegistry = bpmnVisualization.bpmnElementsRegistry;

// Load BPMN diagram
bpmnVisualization.load(getHardwareRetailerDiagram(), {fit: {type: 'Center', margin: 30}});

/*document.getElementById('btn-set-overlay').onclick = () => {
    removeAllOverlays();

    // Add overlays
    // Shape
    bpmnElementsRegistry.addOverlays('Activity_1potg3p', {position: 'bottom-right', label: 'OK 👌', style});

    // Edge
    bpmnElementsRegistry.addOverlays('Flow_1wkfbb0', {position: 'middle', label: '763', style});
};*/

/*document.getElementById('btn-reset').onclick = () => {
    removeAllOverlays();
    bpmnVisualization.fit({type: 'Center'});
};*/
