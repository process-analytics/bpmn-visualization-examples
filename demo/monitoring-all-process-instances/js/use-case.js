class UseCase {
    #type;
    #bpmnVisualization;
    #executionData;
    #alreadyLoad = false;

    constructor(type, executionData) {
        this.#type = type;
        this.#executionData = executionData;

        this.#bpmnVisualization = new bpmnvisu.BpmnVisualization({container: `${type}-bpmn-container`, navigation: {enabled: true}});
    }

    display(dataType) {
        this._displayPanel();

        if(!this.#alreadyLoad) {
            this.#bpmnVisualization.load(getHardwareRetailerDiagram(), {fit: {type: 'Center', margin: 30}});
            this.#alreadyLoad  = true;
        }

        this.displayData(dataType);
    }

    displayData(dataType) {
        console.info('Setting %s data', dataType);
        let dataActionOnDisplay = this._getDataActionOnDisplay(dataType);
        this.#executionData.data.forEach((value, key) =>  dataActionOnDisplay(key, value));
        console.info('%s data set', dataType);
    }


    _displayPanel() {
        this._displayElementAndHideOthers("bpmn-container");
        this._displayElementAndHideOthers("title");

        this.#executionData.updateLegends();
    }

    _displayElementAndHideOthers(subId) {
        // Hide all corresponding HTML elements
        const bpmnContainers = document.querySelectorAll(`[id*="${subId}"]`);
        for (let i = 0; i < bpmnContainers.length; i++) {
            bpmnContainers.item(i).classList.add('d-hide');
        }

        // Display corresponding HTML element
        document.getElementById(`${this.#type}-${subId}`).classList.remove('d-hide');
        console.info('%s displayed', `${this.#type}-${subId}`);
    }

    _getDataActionOnDisplay(dataType) {
        switch (dataType) {
            case 'overlays':
                return (key, value) => {
                    if (value.pathClass) {
                        this.#bpmnVisualization.bpmnElementsRegistry.removeCssClasses(key, value.pathClass);
                    }
                    if (value.overlay) {
                        this.#bpmnVisualization.bpmnElementsRegistry.addOverlays(key, value.overlay);
                    }
                };
            case 'paths':
                return (key, value) => {
                    this.#bpmnVisualization.bpmnElementsRegistry.removeAllOverlays(key);
                    if (value.pathClass) {
                        this.#bpmnVisualization.bpmnElementsRegistry.addCssClasses(key, value.pathClass);
                    }
                };
            case 'both':
            default:
                return (key, value) => {
                    if (value.pathClass) {
                        this.#bpmnVisualization.bpmnElementsRegistry.addCssClasses(key, value.pathClass);
                    }
                    if (value.overlay) {
                        this.#bpmnVisualization.bpmnElementsRegistry.addOverlays(key, value.overlay);
                    }
                };
        }
    }
}
