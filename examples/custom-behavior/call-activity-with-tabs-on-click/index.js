// Main BPMN Container
const mainBpmnContainerElt = window.document.getElementById('main-bpmn-container');
const mainBpmnVisualization = new bpmnvisu.BpmnVisualization({ container: mainBpmnContainerElt, navigation: { enabled: true } });
mainBpmnVisualization.load(getOrderFulfillmentBpmnDiagram(), { fit: {type: 'Center'} });

// Secondary BPMN Container
const secondaryBpmnContainerElt = window.document.getElementById('secondary-bpmn-container');
const secondaryBpmnVisualization = new bpmnvisu.BpmnVisualization({ container: secondaryBpmnContainerElt });


// Interaction
let secondaryBpmnDiagramIsAlreadyLoad = false;
const callActivityElt = mainBpmnVisualization.bpmnElementsRegistry.getElementsByIds(['call_activity'])[0].htmlElement;
callActivityElt.onclick = () => {
    openTab('secondary');
}
mainBpmnVisualization.bpmnElementsRegistry.addCssClasses(['call_activity'], 'c-hand');

function openTab(tabIndex) {
    // Activate corresponding tab & Deactivate others
    const tabItems = document.getElementsByClassName("tab-item");
    for (let i = 0; i < tabItems.length; i++) {
        tabItems.item(i).classList.remove('active');
    }
    document.getElementById(`${tabIndex}-tab`).classList.add('active');

    // Display corresponding BPMN container & Hide others
    const bpmnContainers = document.getElementsByClassName("bpmn-container");
    for (let i = 0; i < tabItems.length; i++) {
        bpmnContainers.item(i).classList.add('d-hide');
    }
    document.getElementById(`${tabIndex}-bpmn-container`).classList.remove('d-hide');

    // Load secondary BPMN diagram, if it's not already done
    if(tabIndex==='secondary' && !secondaryBpmnDiagramIsAlreadyLoad) {
        secondaryBpmnVisualization.load(getProcurementBpmnDiagram(), { fit: {type: 'Center', margin: 10 } });
        secondaryBpmnDiagramIsAlreadyLoad = true;
    }
}
