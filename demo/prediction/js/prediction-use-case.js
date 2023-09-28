class PredicatedLateUseCase extends UseCase {

    _style;
    _executionData;

    constructor(title) {
        document.querySelector(`[id*="prediction-title"]`).textContent = title;
        document.querySelector(`[id*="prediction-bpmn-container"]`).textContent = undefined;
        super('prediction', () => pizzaDiagram(), false, {fit: {type: 'Center', margin: 20}});
    }

    display(dataType) {
        super.display(dataType);
        this._style.switchLegend();
    }

    _postLoadDiagram() {
        this._initManagers();

        this._style.reduceVisibilityOfExecutedElements(this._executionData.executedElements);
        this._style.highlightRunningElementWithPrediction(this._executionData.runningElementWithPrediction);
        this._style.toggleHighlightRunningElementsWithoutPrediction(this._executionData.runningElementsWithoutPrediction);
        this._registerInteractions(this._executionData.runningElementWithPrediction.id, this._executionData.predictedPaths, this._executionData.runningElementsWithoutPrediction);
    }

    _initManagers() {
        this._style = new PredicatedLateStyle(this._bpmnVisualization);
        const pathResolver = new PathResolver(this._bpmnVisualization);
        this._executionData = new PredicatedLateExecutionData(pathResolver);
    }

    _registerInteractions(id, predictedPath, runningElementsWithoutPrediction, runningElementWithPrediction) {
        // on hover, highlight the predicted path
        const elementTogglingPath = this._bpmnVisualization.bpmnElementsRegistry.getElementsByIds(id)[0]; // exist and only one

        const highlightPredictedPath = () => {
            this._style.toggleHighlightRunningElementsWithoutPrediction(runningElementsWithoutPrediction);
            this._style.toggleHighlightPredictedPath(predictedPath);
            this._style.toggleReduceVisibilityOfNonPredictedElements(this._executionData.nonPredictedElements);
        }

        elementTogglingPath.htmlElement.addEventListener('mouseenter', highlightPredictedPath);
        elementTogglingPath.htmlElement.addEventListener('mouseleave', highlightPredictedPath);
    }
}


class PredictedOnTimeUseCase extends PredicatedLateUseCase {

    _initManagers() {
        this._style = new PredictedOnTimeStyle(this._bpmnVisualization);
        const pathResolver = new PathResolver(this._bpmnVisualization);
        this._executionData = new PredictedOnTimeExecutionData(pathResolver);
    }
}
