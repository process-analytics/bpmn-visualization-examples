class PredicatedLateUseCase extends UseCase {
    constructor(type) {
        super(type, () => pizzaDiagram(), true, {fit: {type: 'Center', margin: 20}});
        this._executionData = new PredicatedLateExecutionData();
    }

    _postLoadDiagram() {
        this._reduceVisibilityOfAlreadyExecutedElements();
        this._highlightRunningElementsWithPrediction();
        this._toggleHighlightRunningElementsWithoutPrediction();
        this._registerInteractions();
    }

    _reduceVisibilityOfAlreadyExecutedElements() {
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(this._executionData.executedElements, 'state-already-executed');
    }

    _registerInteractions() {
        // on hover, highlight the predicted path
        const elementTogglingPath = this._bpmnVisualization.bpmnElementsRegistry.getElementsByIds(this._executionData.runningElementWithPrediction.bpmnId)[0]; // exist and only one

        const highlightPredictedPath = () => {
            this._toggleHighlightRunningElementsWithoutPrediction();
            const predictedPath = this._executionData.predictedPaths;
            this._bpmnVisualization.bpmnElementsRegistry.toggleCssClasses(predictedPath.ids, predictedPath.cssClasses);
        }

        elementTogglingPath.htmlElement.addEventListener('mouseenter', highlightPredictedPath);
        elementTogglingPath.htmlElement.addEventListener('mouseleave', highlightPredictedPath);
    }

    _toggleHighlightRunningElementsWithoutPrediction() {
        this._bpmnVisualization.bpmnElementsRegistry.toggleCssClasses(this._executionData.runningElementsWithoutPrediction, 'state-running');
    }

    _highlightRunningElementsWithPrediction() {
        const elementWithPrediction =  this._executionData.runningElementWithPrediction;
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(elementWithPrediction.bpmnId, elementWithPrediction.cssClasses);
    }
}


class PredictedOnTimeUseCase extends PredicatedLateUseCase {
    constructor(type) {
        super(type);
        this._executionData = new PredictedOnTimeExecutionData();
    }
}
