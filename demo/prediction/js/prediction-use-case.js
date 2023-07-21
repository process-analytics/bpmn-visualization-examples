class PredicatedLateUseCase extends UseCase {

    _style;
    _executionData;

    constructor(type) {
        super(type, () => pizzaDiagram(), false, {fit: {type: 'Center', margin: 20}});
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
        this._registerInteractions(this._executionData.predictedPaths, this._executionData.runningElementsWithoutPrediction, this._executionData.runningElementWithPrediction);
    }

    _initManagers() {
        this._style = new PredicatedLateStyle(this._bpmnVisualization.bpmnElementsRegistry, `${this.type}-bpmn-container`);
        const pathResolver = new PathResolver(this._bpmnVisualization);
        this._executionData = new PredicatedLateExecutionData(pathResolver);
    }

    _registerInteractions(predictedPath, runningElementsWithoutPrediction, runningElementWithPrediction) {
        // on hover, highlight the predicted path
        const elementTogglingPath = this._bpmnVisualization.bpmnElementsRegistry.getElementsByIds(runningElementWithPrediction)[0]; // exist and only one

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
        this._style = new PredictedOnTimeStyle(this._bpmnVisualization.bpmnElementsRegistry, `${this.type}-bpmn-container`);
        const pathResolver = new PathResolver(this._bpmnVisualization);
        this._executionData = new PredictedOnTimeExecutionData(pathResolver);
    }
}
