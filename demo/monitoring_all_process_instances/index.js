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


// Initialize BpmnVisualization for Time Data
const timeBpmnVisualization = new bpmnvisu.BpmnVisualization({container: 'time-bpmn-container', navigation: {enabled: true}});
const timeBpmnElementsRegistry = timeBpmnVisualization.bpmnElementsRegistry;

// Load BPMN diagram
timeBpmnVisualization.load(getHardwareRetailerDiagram(), {fit: {type: 'Center', margin: 30}});



// Initialize BpmnVisualization for Frequency Data
const frequencyBpmnVisualization = new bpmnvisu.BpmnVisualization({container: 'frequency-bpmn-container', navigation: {enabled: true}});
const frequencyBpmnElementsRegistry = frequencyBpmnVisualization.bpmnElementsRegistry;



let frequencyBpmnDiagramIsAlreadyLoad = false;
document.getElementById('switch-panel').onclick = () => {
    let switchId = document.querySelector("input[type='radio'][name='switch-data-type']:checked").id;
    switchDiagram(switchId==='btn-time'? 'time' : 'frequency');
}

function switchDiagram(switchValue) {
    // Display corresponding BPMN container & Hide others
    const bpmnContainers = document.getElementsByClassName("bpmn-container");
    for (let i = 0; i < bpmnContainers.length; i++) {
        bpmnContainers.item(i).classList.add('d-hide');
    }
    document.getElementById(`${switchValue}-bpmn-container`).classList.remove('d-hide');

    // Load BPMN diagram for Frequency Data, if it's not already done
    if(switchValue==='frequency' && !frequencyBpmnDiagramIsAlreadyLoad) {
        frequencyBpmnVisualization.load(getHardwareRetailerDiagram(), { fit: {type: 'Center', margin: 30 } });
        frequencyBpmnDiagramIsAlreadyLoad = true;
    }
}



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
