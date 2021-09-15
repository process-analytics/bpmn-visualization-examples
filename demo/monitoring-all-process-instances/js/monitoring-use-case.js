class MonitoringUseCase extends UseCase {
    #executionData;

    constructor(type, getDiagram, executionData) {
        super(type, getDiagram, true);
        this.#executionData = executionData;
    }

    display(dataType) {
        super.display(dataType);
        this.displayData(dataType);
    }

    displayData(dataType) {
        console.info('Setting %s data', dataType);
        switch (dataType) {
            case 'overlays':
                this.#executionData.hidePathLegend();
                this.#executionData.displayOverlaysLegends();
                this.#executionData.data.forEach((value, key) => {
                    if (value.pathClass) {
                        this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses(key, value.pathClass);
                    }

                    if (value.overlay) {
                        this._bpmnVisualization.bpmnElementsRegistry.addOverlays(key, value.overlay);
                    }
                });
                break;
            case 'paths':
                this.#executionData.hideOverlaysLegends();
                this.#executionData.displayPathLegend();
                this.#executionData.data.forEach((value, key) => {
                    this._bpmnVisualization.bpmnElementsRegistry.removeAllOverlays(key);

                    if (value.pathClass) {
                        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(key, value.pathClass);
                    }
                });
                break;
            case 'both':
            default:
                this.#executionData.displayPathLegend();
                this.#executionData.displayOverlaysLegends();
                this.#executionData.data.forEach((value, key) => {
                    if (value.pathClass) {
                        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(key, value.pathClass);
                    }

                    if (value.overlay) {
                        this._bpmnVisualization.bpmnElementsRegistry.addOverlays(key, value.overlay);
                    }
                });
        }
        console.info('%s data set', dataType);
    }


    _displayPanel() {
        super._displayPanel();
        this.#executionData.updateLegends();
    }
}
