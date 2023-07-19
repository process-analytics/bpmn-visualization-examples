class Style {

    _bpmnElementsRegistry;

    constructor(bpmnElementsRegistry) {
        this._bpmnElementsRegistry = bpmnElementsRegistry;
    }

    /**
     * @param {string[]} ids
     */
    reduceVisibilityOfExecutedElements(ids) {
        this._bpmnElementsRegistry.addCssClasses(ids, 'state-already-executed');
    }

    /**
     * @param {string[]} ids
     */
    reduceVisibilityOfNonPredictedElements(ids) {
        const styleColor = { color:'gray' };
        this._bpmnElementsRegistry.updateStyle(ids, { font: styleColor, stroke: styleColor })
    }

    /**
     * @param {string[]} ids
     */
    toggleHighlightRunningElementsWithoutPrediction(ids) {
        this._bpmnElementsRegistry.toggleCssClasses(ids, 'state-running');
    }

    /**
     * @param {string[]} ids
     */
    toggleHighlightPredictedPath(ids) {
    }

    /**
     * @param {string[] | string} ids
     */
    highlightRunningElementsWithPrediction(ids) {
    }
}

class PredicatedLateStyle extends Style {

    constructor(bpmnElementsRegistry) {
       super(bpmnElementsRegistry);
    }

    /**
     * @param {string[]} ids
     */
    toggleHighlightPredictedPath(ids) {
        this._bpmnElementsRegistry.toggleCssClasses(ids, 'path-predicted-late');
    }

    /**
     * @param {string[] | string} ids
     */
    highlightRunningElementsWithPrediction(ids) {
        this._bpmnElementsRegistry.addCssClasses(ids, 'state-predicted-late');
    }
}


class PredictedOnTimeStyle extends Style {

    constructor(bpmnElementsRegistry) {
        super(bpmnElementsRegistry);
    }

    /**
     * @param {string[]} ids
     */
    toggleHighlightPredictedPath(ids) {
        this._bpmnElementsRegistry.toggleCssClasses(ids, 'path-predicted-on-time');
    }

    /**
     * @param {string[] | string} ids
     */
    highlightRunningElementsWithPrediction(ids) {
        this._bpmnElementsRegistry.addCssClasses(ids, 'state-predicted-on-time');
    }
}