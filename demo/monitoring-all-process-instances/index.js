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
        // bpmnVisualization.bpmnElementsRegistry.addOverlays(key, value.overlay);
        if(value.pathClass) {
            bpmnVisualization.bpmnElementsRegistry.addCssClasses(key, value.pathClass);
        }
    });
}

// for removal of css, we have only toggle api that requires to keep the map and loop over it
function toggleCssClasses(bpmnVisualization, data) {
    // TODO filter non set pathClass
    data.forEach((value, key) => {
        if(value.pathClass) {
            bpmnVisualization.bpmnElementsRegistry.toggleCssClasses(key, value.pathClass);
        }
    });
}

// The following would also need to trigger recompute the whole view
//   removeAllClassNames(bpmnElementIds?: string[]): void {
//     // TODO return true on change
//     // diff between the number of elements in map before and after (as we do for update classnames of an element)
//     if (!bpmnElementIds) {
//       // clean the map
//     }
//     // string param --> string[]
//     bpmnElementIds.forEach(id => this.classNamesByBPMNId.delete(id));
//   }

let currentDiagram = 'time';
let frequencyBpmnDiagramIsAlreadyLoad = false;

function displayElementAndHideOthers(switchValue, subId) {
    // Display corresponding BPMN container & Hide others
    const bpmnContainers = document.querySelectorAll(`[id*="${subId}"]`);
    for (let i = 0; i < bpmnContainers.length; i++) {
        bpmnContainers.item(i).classList.add('d-hide');
    }
    document.getElementById(`${switchValue}-${subId}`).classList.remove('d-hide');
}

document.getElementById('btn-time').checked = true;

// Initialize BpmnVisualization for Time Data
const timeBpmnVisualization = initBpmnVisualization('time-bpmn-container');
const timeData = getTimeData();
loadData(timeBpmnVisualization, timeData);

// Initialize BpmnVisualization for Frequency Data
const frequencyBpmnVisualization = initBpmnVisualization('frequency-bpmn-container');

const frequencyData = getFrequencyData();
function switchDiagram(switchValue) {
    displayElementAndHideOthers(switchValue, "bpmn-container");
    displayElementAndHideOthers(switchValue, "title");

    // Load BPMN diagram for Frequency Data, if it's not already done
    if(switchValue==='frequency') {
        if(!frequencyBpmnDiagramIsAlreadyLoad) {
            loadData(frequencyBpmnVisualization, frequencyData);
            frequencyBpmnDiagramIsAlreadyLoad = true;
        }
        updateFrequencyLegends();
    } else if(switchValue!=='frequency') {
        updateTimeLegends();
    }
    currentDiagram = switchValue;
    console.info('Switched to %s', currentDiagram)
}

document.getElementById('switch-panel').onclick = () => {
    let switchId = document.querySelector("input[type='radio'][name='switch-data-type']:checked").id;
    switchDiagram(switchId==='btn-time'? 'time' : 'frequency');
}

document.addEventListener('DOMContentLoaded', function () {
    updateTimeLegends();
})

// toggle highlight paths
// detect the current diagram and
