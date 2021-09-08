function initBpmnVisualization(container) {
    return new bpmnvisu.BpmnVisualization({
        container,
        navigation: {enabled: true}
    });
}

function loadData(bpmnVisualization, data) {
    // Load BPMN diagram
    bpmnVisualization.load(getHardwareRetailerDiagram(), {fit: {type: 'Center', margin: 30}});
    updateData(bpmnVisualization, data);
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
let currentDiagram = 'time';
document.getElementById('btn-both').checked = true;

// Initialize BpmnVisualization for Time Data
const timeBpmnVisualization = initBpmnVisualization('time-bpmn-container');
const timeData = getTimeData();
loadData(timeBpmnVisualization, timeData);

let frequencyBpmnDiagramIsAlreadyLoad = false;
let frequencyBpmnVisualization;
let frequencyData;

document.getElementById('choose-diagram-panel').onclick = () => {
    const diagramType = document.querySelector("input[type='radio'][name='diagram-type']:checked").value;
    switchDiagram(diagramType);
}

function switchDiagram(switchValue) {
    displayElementAndHideOthers(switchValue, "bpmn-container");
    displayElementAndHideOthers(switchValue, "title");

    // Load BPMN diagram for Frequency Data, if it's not already done
    if (switchValue === 'frequency') {
        if (!frequencyBpmnDiagramIsAlreadyLoad) {
            frequencyBpmnVisualization = initBpmnVisualization('frequency-bpmn-container');
            frequencyData = getFrequencyData();
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

function updateData(bpmnVisualization, data) {
    const dataType = document.querySelector("input[type='radio'][name='data-type']:checked").value;

    console.info('Setting %s data for', dataType);
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
    const bpmnVisualization = currentDiagram === 'time' ? timeBpmnVisualization : frequencyBpmnVisualization;
    const data = currentDiagram === 'time' ? timeData : frequencyData;
    updateData(bpmnVisualization, data);
}




