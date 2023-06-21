class PredicatedLateUseCase extends UseCase {
    constructor(type) {
        super(type, () => pizzaDiagram(), true, {fit: {type: 'Center', margin: 20}});
        this._dataExecutionManager = new PredicatedLateDataExecutionManager();
    }

    _postLoadDiagram() {
        this._reduceVisibilityOfAlreadyExecutedElements();
        this._highlightRunningElementsWithPrediction();
        this._toggleHighlightRunningElementsWithoutPrediction();
        this._registerInteractions();
    }

    _reduceVisibilityOfAlreadyExecutedElements() {
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(this._dataExecutionManager.executedElements(), 'state-already-executed');
    }

    _registerInteractions() {
        // on hover, highlight the predicted path
        const elementTogglingPath = this._bpmnVisualization.bpmnElementsRegistry.getElementsByIds(this._dataExecutionManager.elementWithPrediction().bpmnId)[0]; // exist and only one

        const highlightPredictedPath = () => {
            this._toggleHighlightRunningElementsWithoutPrediction();
            let predictedPath = this._dataExecutionManager.predictedPath();
            this._bpmnVisualization.bpmnElementsRegistry.toggleCssClasses(predictedPath.ids, predictedPath.cssClasses);
        }

        elementTogglingPath.htmlElement.addEventListener('mouseenter', highlightPredictedPath);
        elementTogglingPath.htmlElement.addEventListener('mouseleave', highlightPredictedPath);
    }

    _toggleHighlightRunningElementsWithoutPrediction() {
        this._bpmnVisualization.bpmnElementsRegistry.toggleCssClasses(this._dataExecutionManager.runningElementsWithoutPrediction(), 'state-running');
    }

    _highlightRunningElementsWithPrediction() {
        const elementWithPrediction =  this._dataExecutionManager.elementWithPrediction();
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(elementWithPrediction.bpmnId, elementWithPrediction.cssClasses);
    }
}


class PredictedOnTimeUseCase extends PredicatedLateUseCase {
    constructor(type) {
        super(type);
        this._dataExecutionManager = new PredictedOnTimeDataExecutionManager();
    }
}
