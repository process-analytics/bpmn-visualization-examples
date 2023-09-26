class MonitoringUseCase extends UseCase {
    #executionData;
    #dataType;

    constructor({ getDiagram, executionData, title, dataType }) {
        super({ getDiagram, navigationEnabled: true, title });
        this.#executionData = executionData;
        this.#executionData.updateLegends();
        this.#dataType = dataType;
    }

    _postLoadDiagram() {
        console.info('Setting %s data', this.#dataType);
        switch (this.#dataType) {
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
        console.info('%s data set', this.#dataType);
    }
}
