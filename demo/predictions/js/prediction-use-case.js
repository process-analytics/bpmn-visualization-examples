class PredicatedLateUseCase extends UseCase {
    constructor(type) {
        super(type, () => pizzaDiagram(), true, {fit: {type: 'Center', margin: 20}});
        this._styleManager = new PredicatedLateStyleManager(this._bpmnVisualization.bpmnElementsRegistry);
        this._executionData = new PredicatedLateExecutionData();
    }

    _postLoadDiagram() {
        this._styleManager.reduceVisibilityOfExecutedElements(this._dataExecutionManager.executedElements);
        this._styleManager.highlightRunningElementsWithPrediction(this._dataExecutionManager.runningElementWithPrediction);
        this._styleManager.toggleHighlightRunningElementsWithoutPrediction(this._dataExecutionManager.runningElementsWithoutPrediction);
        this._registerInteractions(this._dataExecutionManager.predictedPaths, this._dataExecutionManager.runningElementsWithoutPrediction, this._dataExecutionManager.runningElementWithPrediction);
    }

    _registerInteractions(predictedPath, runningElementsWithoutPrediction, runningElementWithPrediction) {
        // on hover, highlight the predicted path
        const elementTogglingPath = this._bpmnVisualization.bpmnElementsRegistry.getElementsByIds(runningElementWithPrediction)[0]; // exist and only one

        const highlightPredictedPath = () => {
            this._styleManager.toggleHighlightRunningElementsWithoutPrediction(runningElementsWithoutPrediction);
            this._styleManager.toggleHighlightPredictedPath(predictedPath);
        }

        elementTogglingPath.htmlElement.addEventListener('mouseenter', highlightPredictedPath);
        elementTogglingPath.htmlElement.addEventListener('mouseleave', highlightPredictedPath);
    }
}


class PredictedOnTimeUseCase extends PredicatedLateUseCase {
    constructor(type) {
        super(type);
        this._styleManager = new PredictedOnTimeStyleManager(this._bpmnVisualization.bpmnElementsRegistry);
        this._executionData = new PredictedOnTimeExecutionData();
    }
}
