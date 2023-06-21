class PredicatedLateUseCase extends UseCase {
    constructor(type) {
        super(type, () => pizzaDiagram(), true, {fit: {type: 'Center', margin: 20}});
    }

    _postLoadDiagram() {
        this._reduceVisibilityOfAlreadyExecutedElements();
        this._highlightRunningElementsWithPrediction();
        this._toggleHighlightRunningElementsWithoutPrediction();
        this._registerInteractions();
    }

    _reduceVisibilityOfAlreadyExecutedElements() {
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(this._getExecutedElements(), 'state-already-executed');
    }

    _registerInteractions() {
        // on hover, highlight the predicted path
        const elementTogglingPath = this._bpmnVisualization.bpmnElementsRegistry.getElementsByIds(this._getElementWithPrediction().bpmnId)[0]; // exist and only one

        const highlightPredictedPath = () => {
            this._toggleHighlightRunningElementsWithoutPrediction();
            this._bpmnVisualization.bpmnElementsRegistry.toggleCssClasses(this._getPredictedPath().ids, this._getPredictedPath().cssClasses);
        }

        elementTogglingPath.htmlElement.addEventListener('mouseenter', highlightPredictedPath);
        elementTogglingPath.htmlElement.addEventListener('mouseleave', highlightPredictedPath);
    }

    _toggleHighlightRunningElementsWithoutPrediction() {
        this._bpmnVisualization.bpmnElementsRegistry.toggleCssClasses(this._getRunningElementsWithoutPrediction(), 'state-running');
    }

    _highlightRunningElementsWithPrediction() {
        const elementWithPrediction = this._getElementWithPrediction();
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(elementWithPrediction.bpmnId, elementWithPrediction.cssClasses);
    }


     _getExecutedElements() {
        return predicatedLateAlreadyExecutedElements;
    }

    _getElementWithPrediction() {
        return predicatedLateData.elementWithPrediction;
    }

    _getPredictedPath() {
        return predicatedLateData.predictedPath;
    }

    _getRunningElementsWithoutPrediction() {
        return [vendorWhereIsMyPizzaId, customerEvtBasedGwId];
    }
}


class PredictedOnTimeUseCase extends PredicatedLateUseCase {
    constructor(type) {
        super(type);
    }

    _getExecutedElements() {
        return predictedOnTimeAlreadyExecutedElements;
    }

    _getElementWithPrediction() {
        return predictedOnTimeData.elementWithPrediction;
    }

    _getPredictedPath() {
        return predictedOnTimeData.predictedPath;
    }
}
