// Initialize BpmnVisualization for Time Data
const timeBpmnVisualization = new bpmnvisu.BpmnVisualization({container: 'time-bpmn-container', navigation: {enabled: true}});
const timeBpmnElementsRegistry = timeBpmnVisualization.bpmnElementsRegistry;

// Load BPMN diagram
timeBpmnVisualization.load(getHardwareRetailerDiagram(), {fit: {type: 'Center', margin: 30}});

getTimeData().forEach((value, key) => {
    timeBpmnElementsRegistry.addOverlays(key, value);
});

// Initialize BpmnVisualization for Frequency Data
const frequencyBpmnVisualization = new bpmnvisu.BpmnVisualization({container: 'frequency-bpmn-container', navigation: {enabled: true}});
const frequencyBpmnElementsRegistry = frequencyBpmnVisualization.bpmnElementsRegistry;
document.getElementById('btn-time').checked = true;



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
        let frequencyData = getFrequencyData();
        frequencyData.shape.forEach((value, key) => {
            frequencyBpmnElementsRegistry.addOverlays(key, value);
        });
        frequencyData.edge.forEach((value, key) => {
            frequencyBpmnElementsRegistry.addOverlays(key, value);
        });

        frequencyBpmnDiagramIsAlreadyLoad = true;
    }
}