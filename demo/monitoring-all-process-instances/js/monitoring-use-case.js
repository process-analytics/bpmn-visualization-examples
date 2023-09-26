class MonitoringUseCase extends UseCase {
    #executionData;

    constructor(getDiagram, executionData, title) {
        document.querySelector(`[id*="monitoring-title"]`).textContent = title;
        document.querySelector(`[id*="monitoring-bpmn-container"]`).textContent = undefined;
        super('monitoring', getDiagram, true);
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
                    if (value.pathStyle) {
                        this._bpmnVisualization.bpmnElementsRegistry.updateStyle(key, buildResetPathStyle());
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
                    if (value.pathStyle) {
                        this._bpmnVisualization.bpmnElementsRegistry.updateStyle(key, value.pathStyle);
                    }
                });
                break;
            case 'both':
            default:
                this.#executionData.displayPathLegend();
                this.#executionData.displayOverlaysLegends();
                this.#executionData.data.forEach((value, key) => {
                    if (value.pathStyle) {
                        this._bpmnVisualization.bpmnElementsRegistry.updateStyle(key, value.pathStyle);
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
