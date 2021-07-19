function initBpmnVisualization(container) {
    return new bpmnvisu.BpmnVisualization({
        container,
        navigation: { enabled: true }
    });
}

function loadData(bpmnVisualization, getData) {
    // Load BPMN diagram
    bpmnVisualization.load(getHardwareRetailerDiagram(), { fit: { type: 'Center', margin: 30 } });

    getData().forEach((value, key) => {
        bpmnVisualization.bpmnElementsRegistry.addOverlays(key, value.overlay);
        if(value.pathClass) {
            bpmnVisualization.bpmnElementsRegistry.addCssClasses(key, value.pathClass);
        }
    });
}

let frequencyBpmnDiagramIsAlreadyLoad = false;
function switchDiagram(switchValue, frequencyBpmnVisualization) {
    // Display corresponding BPMN container & Hide others
    const bpmnContainers = document.getElementsByClassName("bpmn-container");
    for (let i = 0; i < bpmnContainers.length; i++) {
        bpmnContainers.item(i).classList.add('d-hide');
    }
    document.getElementById(`${switchValue}-bpmn-container`).classList.remove('d-hide');

    // Load BPMN diagram for Frequency Data, if it's not already done
    if(switchValue==='frequency') {
        if(!frequencyBpmnDiagramIsAlreadyLoad) {
            loadData(frequencyBpmnVisualization, getFrequencyData);
            frequencyBpmnDiagramIsAlreadyLoad = true;
        }
        updateFrequencyLegends();
    } else if(switchValue!=='frequency') {
        updateTimeLegends();
    }
}

document.getElementById('btn-time').checked = true;

// Initialize BpmnVisualization for Time Data
const timeBpmnVisualization = initBpmnVisualization('time-bpmn-container');
loadData(timeBpmnVisualization, getTimeData);

// Initialize BpmnVisualization for Frequency Data
const frequencyBpmnVisualization = initBpmnVisualization('frequency-bpmn-container');

document.getElementById('switch-panel').onclick = () => {
    let switchId = document.querySelector("input[type='radio'][name='switch-data-type']:checked").id;
    switchDiagram(switchId==='btn-time'? 'time' : 'frequency', frequencyBpmnVisualization);
}

document.addEventListener('DOMContentLoaded', function () {
    updateTimeLegends();
})

