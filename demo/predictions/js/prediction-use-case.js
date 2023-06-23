class PredicatedLateUseCase extends UseCase {

    _style;
    _executionData;

    constructor(type) {
        super(type, () => pizzaDiagram(), true, {fit: {type: 'Center', margin: 20}});
        this._executionData = new PredicatedLateExecutionData();
    }

    _postLoadDiagram() {
        this._initManager();

        this._style.reduceVisibilityOfExecutedElements(this._executionData.executedElements);
        this._style.highlightRunningElementsWithPrediction(this._executionData.runningElementWithPrediction);
        this._style.toggleHighlightRunningElementsWithoutPrediction(this._executionData.runningElementsWithoutPrediction);
        this._registerInteractions(this._executionData.predictedPaths, this._executionData.runningElementsWithoutPrediction, this._executionData.runningElementWithPrediction);
    }

    _initManager() {
        this._style = new PredicatedLateStyle(this._bpmnVisualization.bpmnElementsRegistry);
    }

    _registerInteractions(predictedPath, runningElementsWithoutPrediction, runningElementWithPrediction) {
        // on hover, highlight the predicted path
        const elementTogglingPath = this._bpmnVisualization.bpmnElementsRegistry.getElementsByIds(runningElementWithPrediction)[0]; // exist and only one

        const highlightPredictedPath = () => {
            this._style.toggleHighlightRunningElementsWithoutPrediction(runningElementsWithoutPrediction);
            this._style.toggleHighlightPredictedPath(predictedPath);
        }

        elementTogglingPath.htmlElement.addEventListener('mouseenter', highlightPredictedPath);
        elementTogglingPath.htmlElement.addEventListener('mouseleave', highlightPredictedPath);
    }
}


class PredictedOnTimeUseCase extends PredicatedLateUseCase {
    constructor(type) {
        super(type);
        this._executionData = new PredictedOnTimeExecutionData();
    }
    
    _initManager() {
        this._style = new PredictedOnTimeStyle(this._bpmnVisualization.bpmnElementsRegistry);
    }
}
