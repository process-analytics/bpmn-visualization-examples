function initBpmnVisualization(container) {
    return new bpmnvisu.BpmnVisualization({
        container,
        navigation: { enabled: true }
    });
}

function loadData(bpmnVisualization, data) {
    // Load BPMN diagram
    bpmnVisualization.load(getHardwareRetailerDiagram(), { fit: { type: 'Center', margin: 30 } });

    data.forEach((value, key) => {
        bpmnVisualization.bpmnElementsRegistry.addOverlays(key, value.overlay);
        if (value.pathClass) {
            bpmnVisualization.bpmnElementsRegistry.addCssClasses(key, value.pathClass);
        }
    });
}

function displayElementAndHideOthers(switchValue, subId) {
    // Display corresponding BPMN container & Hide others
    const bpmnContainers = document.querySelectorAll(`[id*="${subId}"]`);
    for (let i = 0; i < bpmnContainers.length; i++) {
        bpmnContainers.item(i).classList.add('d-hide');
    }
    document.getElementById(`${switchValue}-${subId}`).classList.remove('d-hide');
}

// Initialize BpmnVisualization for Time Data
const timeBpmnVisualization = initBpmnVisualization('time-bpmn-container');
const timeData = getTimeData();
loadData(timeBpmnVisualization, timeData);
document.getElementById('btn-time').checked = true;
let currentDiagram = 'time';

// Initialize BpmnVisualization for Frequency Data
const frequencyBpmnVisualization = initBpmnVisualization('frequency-bpmn-container');
const frequencyData = getFrequencyData();
let frequencyBpmnDiagramIsAlreadyLoad = false;

document.getElementById('switch-panel').onclick = () => {
    let switchId = document.querySelector("input[type='radio'][name='switch-data-type']:checked").id;
    switchDiagram(switchId==='btn-time'? 'time' : 'frequency', frequencyBpmnVisualization);
}

function switchDiagram(switchValue) {
    displayElementAndHideOthers(switchValue, "bpmn-container");
    displayElementAndHideOthers(switchValue, "title");

    // Load BPMN diagram for Frequency Data, if it's not already done
    if (switchValue === 'frequency') {
        if (!frequencyBpmnDiagramIsAlreadyLoad) {
            loadData(frequencyBpmnVisualization, frequencyData);
            frequencyBpmnDiagramIsAlreadyLoad = true;
        }
        updateFrequencyLegends();
    } else if (switchValue !== 'frequency') {
        updateTimeLegends();
    }
    currentDiagram = switchValue;
    console.info('Switched to %s', currentDiagram)
}

document.addEventListener('DOMContentLoaded', function () {
    updateTimeLegends();
})

/*
document.getElementById('btn-toggle-paths').onclick = () => {
    console.info('Toggling paths for', currentDiagram);
    const bpmnVisualization = currentDiagram === 'time' ? timeBpmnVisualization : frequencyBpmnVisualization;
    const data = currentDiagram === 'time' ? timeData : frequencyData;

    data.forEach((value, key) => {
        if (value.pathClass) {
            bpmnVisualization.bpmnElementsRegistry.toggleCssClasses(key, value.pathClass);
        }
    });

    console.info('Paths toggled');
}

let overlaysTimeDisplayed = true;
let overlaysFrequencyDisplayed = true;
document.getElementById('btn-toggle-overlays').onclick = () => {
    console.info('Toggling overlays for', currentDiagram);
    // TODO duplicate check with paths
    const bpmnVisualization = currentDiagram === 'time' ? timeBpmnVisualization : frequencyBpmnVisualization;
    const data = currentDiagram === 'time' ? timeData : frequencyData;

    const overlaysDisplayed = currentDiagram === 'time' ? overlaysTimeDisplayed : overlaysFrequencyDisplayed;
    const addOverlays = !overlaysDisplayed;
    console.info('Add overlays?', addOverlays);

    data.forEach((value, key) => {
        addOverlays ?
            bpmnVisualization.bpmnElementsRegistry.addOverlays(key, value.overlay)
            : bpmnVisualization.bpmnElementsRegistry.removeAllOverlays(key);
    });

    currentDiagram === 'time' ?
        overlaysTimeDisplayed = !overlaysTimeDisplayed
        : overlaysFrequencyDisplayed = !overlaysFrequencyDisplayed;
    console.info('Overlays toggled');
}
*/
