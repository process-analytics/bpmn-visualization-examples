function loadOrderFulfillmentBpmnDiagram() {
    bpmnVisualization.load(getOrderFulfillmentBpmnDiagram(), {fit: {type: 'Center'}});
    secondaryBpmnDiagramIsLoad = false;

    // Interaction
    const callActivityElt = bpmnVisualization.htmlElementRegistry.getBpmnHtmlElement('call_activity');

    // WARNING: The class adding doesn't work with the zoom, the panning and the fit
    // TODO Need to replace by the dedicated API when it is implemented
    callActivityElt.classList.add('c-hand');

    callActivityElt.ondblclick = () => {
        loadBpmnDiagram('secondary');
    }
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
const bpmnVisualization = new bpmnvisu.BpmnVisualization(bpmnContainerElt);
loadOrderFulfillmentBpmnDiagram();
