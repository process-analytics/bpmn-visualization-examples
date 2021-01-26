function loadOrderFulfillmentBpmnDiagram() {
    bpmnVisualization.load(getOrderFulfillmentBpmnDiagram(), {fit: {type: 'Center'}});
    secondaryBpmnDiagramIsLoad = false;

    // Interaction
    const callActivityElt = bpmnVisualization.bpmnElementsRegistry.getElementsByIds(['call_activity'])[0].htmlElement;
    callActivityElt.ondblclick = () => {
        loadBpmnDiagram('secondary');
    }
    bpmnVisualization.bpmnElementsRegistry.addCssClasses(['call_activity'], 'c-hand');
}

function loadBpmnDiagram(tabIndex) {
    switch(tabIndex) {
        case 'main':
            if(secondaryBpmnDiagramIsLoad) {
                removeSectionInBreadcrumbs();
                loadOrderFulfillmentBpmnDiagram();
            }
            break;
        case 'secondary':
            if(!secondaryBpmnDiagramIsLoad) {
                addSectionInBreadcrumbs();

                // Load secondary diagram
                bpmnVisualization.load(getProcurementBpmnDiagram(), {fit: {type: 'Center', margin: 10}});
                secondaryBpmnDiagramIsLoad = true;
            }
            break;
        default:
    }
}

let secondaryBpmnDiagramIsLoad;

// Main BPMN Container
const bpmnContainerElt = window.document.getElementById('bpmn-container');
const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: bpmnContainerElt, navigation: { enabled: true } });
loadOrderFulfillmentBpmnDiagram();
