function initAndLoadDiagram(container) {
    const bpmnVisualization = new bpmnvisu.BpmnVisualization({
        container,
        navigation: {enabled: true}
    });
    bpmnVisualization.load(getHardwareRetailerDiagram(), {fit: {type: 'Center', margin: 30}});
    return bpmnVisualization;
}

function displayElementAndHideOthers(switchValue, subId) {
    // Display corresponding BPMN container & Hide others
    const bpmnContainers = document.querySelectorAll(`[id*="${subId}"]`);
    for (let i = 0; i < bpmnContainers.length; i++) {
        bpmnContainers.item(i).classList.add('d-hide');
    }
    document.getElementById(`${switchValue}-${subId}`).classList.remove('d-hide');
}

document.getElementById('btn-time').checked = true;
document.getElementById('btn-both').checked = true;

// Initialize BpmnVisualization for Time Data
const timeBpmnVisualization = initAndLoadDiagram('time-bpmn-container');
const timeData = getTimeData();
switchData(timeBpmnVisualization, timeData);

let frequencyBpmnDiagramIsAlreadyLoad = false;
let frequencyBpmnVisualization;
let frequencyData;

document.getElementById('choose-diagram-panel').onclick = () => {
    const diagramType = document.querySelector("input[type='radio'][name='diagram-type']:checked").value;
    switchDiagram(diagramType);
    switchData();
}

function switchDiagram(switchValue) {
    displayElementAndHideOthers(switchValue, "bpmn-container");
    displayElementAndHideOthers(switchValue, "title");

    // Load BPMN diagram for Frequency Data, if it's not already done
    if (switchValue === 'frequency') {
        if (!frequencyBpmnDiagramIsAlreadyLoad) {
            frequencyBpmnVisualization = initAndLoadDiagram('frequency-bpmn-container');
            frequencyData = getFrequencyData();
            frequencyBpmnDiagramIsAlreadyLoad = true;
        }
        updateFrequencyLegends();
    } else {
        updateTimeLegends();
    }
    console.info('Switched to %s', switchValue)
}

document.addEventListener('DOMContentLoaded', function () {
    updateTimeLegends();
})

function switchData() {
    const diagramType = document.querySelector("input[type='radio'][name='diagram-type']:checked").value;
    const dataType = document.querySelector("input[type='radio'][name='data-type']:checked").value;
    const bpmnVisualization = diagramType === 'time' ? timeBpmnVisualization : frequencyBpmnVisualization;
    const data = diagramType === 'time' ? timeData : frequencyData;

    console.info('Setting %s data', dataType);
    switch (dataType) {
        case 'overlays':
            data.forEach((value, key) => {
                if (value.pathClass) {
                    bpmnVisualization.bpmnElementsRegistry.removeCssClasses(key, value.pathClass);
                }
                if (value.overlay) {
                    bpmnVisualization.bpmnElementsRegistry.addOverlays(key, value.overlay);
                }
            });
            break;
        case 'paths':
            data.forEach((value, key) => {
                bpmnVisualization.bpmnElementsRegistry.removeAllOverlays(key);
                if (value.pathClass) {
                    bpmnVisualization.bpmnElementsRegistry.addCssClasses(key, value.pathClass);
                }
            });
            break;
        case 'both':
        default:
            data.forEach((value, key) => {
                if (value.pathClass) {
                    bpmnVisualization.bpmnElementsRegistry.addCssClasses(key, value.pathClass);
                }
                if (value.overlay) {
                    bpmnVisualization.bpmnElementsRegistry.addOverlays(key, value.overlay);
                }
            });
    }
    console.info('%s data set', dataType);
}

document.getElementById('choose-data-panel').onclick = () => {
    switchData();
}

