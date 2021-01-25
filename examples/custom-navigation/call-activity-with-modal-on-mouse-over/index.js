// Main BPMN Container
const mainBpmnContainerElt = window.document.getElementById('main-bpmn-container');
const mainBpmnVisualization = new bpmnvisu.BpmnVisualization({ container: mainBpmnContainerElt });
mainBpmnVisualization.load(getOrderFulfillmentBpmnDiagram(), { fit: {type: 'Center'} });

// Secondary BPMN Container
const secondaryBpmnContainerElt = window.document.getElementById('secondary-bpmn-container');
const secondaryBpmnVisualization = new bpmnvisu.BpmnVisualization({ container: secondaryBpmnContainerElt });


// Interaction
const modalElt = document.getElementById('modal');

let secondaryBpmnDiagramIsAlreadyLoad = false;
const callActivityElt = mainBpmnVisualization.bpmnElementsRegistry.getElementsByIds(['call_activity'])[0].htmlElement;

callActivityElt.onmouseover = () => {
    // Display the modal
    modalElt.classList.add('active');

    if(!secondaryBpmnDiagramIsAlreadyLoad) {
        secondaryBpmnVisualization.load(getProcurementBpmnDiagram(), { fit: {type: 'Center', margin: 10 } });
        secondaryBpmnDiagramIsAlreadyLoad = true;
    }
}
