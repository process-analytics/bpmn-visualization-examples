function removeAllOverlays() {
    // Remove all overlays
    // Shape
    bpmnElementsRegistry.removeAllOverlays('Activity_1potg3p');

    // Edge
    bpmnElementsRegistry.removeAllOverlays('Flow_1wkfbb0');
}


// Initialize the panel of Overlay settings
var fontColorElt = document.getElementById('font-color');
var fontSizeElt = document.getElementById('font-size');
var fillColorElt = document.getElementById('fill-color');
var strokeColorElt = document.getElementById('stroke-color');

var style = {
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
};

fontColorElt.onchange = (event) => style.font.color = event.target.value;
fontSizeElt.onchange = (event) => style.font.size = event.target.value;
fillColorElt.onchange = (event) => style.fill.color = event.target.value;
strokeColorElt.onchange = (event) => style.stroke.color = event.target.value;

// Initialize BpmnVisualization
const bpmnVisualization = new bpmnvisu.BpmnVisualization({container: 'bpmn-container', navigation: {enabled: true}});
const bpmnElementsRegistry = bpmnVisualization.bpmnElementsRegistry;

// Load BPMN diagram
bpmnVisualization.load(getHardwareRetailerDiagram(), {fit: {type: 'Center'}});

document.getElementById('btn-set-overlay').onclick = () => {
    removeAllOverlays();

    // Add overlays
    // Shape
    bpmnElementsRegistry.addOverlays('Activity_1potg3p', {position: 'bottom-right', label: 'OK 👌', style});

    // Edge
    bpmnElementsRegistry.addOverlays('Flow_1wkfbb0', {position: 'middle', label: '763', style});
};

document.getElementById('btn-reset').onclick = () => {
    removeAllOverlays();
    bpmnVisualization.fit({type: 'Center'});
};
