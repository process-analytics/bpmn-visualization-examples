class Style {

    _bpmnElementsRegistry;
    _bpmnContainerId;

    constructor(bpmnElementsRegistry, bpmnContainerId) {
        this._bpmnElementsRegistry = bpmnElementsRegistry;
        this._bpmnContainerId = bpmnContainerId;

        // tippy global configuration
        tippy.setDefaultProps({
            appendTo: window.document.getElementById(this._bpmnContainerId).parentElement.parentElement,
            allowHTML: true,
            ignoreAttributes: true,
            interactive: true,
            sticky: 'reference',
            arrow: true,
            placement: 'left',
        });
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
    toggleReduceVisibilityOfNonPredictedElements(ids) {
        this._bpmnElementsRegistry.toggleCssClasses(ids, 'state-already-executed');
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
     * @param {{id:string, startDate:string, predictedEnd:string, currentDelay: string, predictedDelay: string}} element
     */
    highlightRunningElementWithPrediction(element) {
        this._addPopup(element);
    }

    switchLegend() {
    }

    _addPopup({ id, startDate, predictedEnd, currentDelay, predictedDelay }) {
        this._bpmnElementsRegistry.addCssClasses(id, 'c-hand');

        const isLate = predictedDelay !== 'N/A';

        const htmlElement = this._bpmnElementsRegistry.getElementsByIds(id)[0].htmlElement;
        tippy(htmlElement, {
            content:
                `<div class="bpmn-popover">
                    <div style="text-align: center; font-weight: bold; font-size: larger">
                        ${isLate ? 'Late 😣' : 'On time 🎉'}
                    </div>
                    <hr>
                    <ul>
                        <li>Start date: ${startDate}</li>
                        <li>Predicted end: ${predictedEnd}</li>
                         ${currentDelay !== 'N/A' ? `<li>Current delay: ${currentDelay}</li>` : ''}
                         ${isLate ? `<li>Predicted delay: ${predictedDelay}</li>` : ''}
                    </ul>
                </div>`
        });
    }
}

class PredicatedLateStyle extends Style {

    constructor(bpmnElementsRegistry, bpmnContainerId) {
       super(bpmnElementsRegistry, bpmnContainerId);
    }

    /**
     * @param {string[]} ids
     */
    toggleHighlightPredictedPath(ids) {
        this._bpmnElementsRegistry.toggleCssClasses(ids, 'path-predicted-late');
    }

    /**
     * @param {{id:string, startDate:string, predictedEnd:string, currentDelay: string, predictedDelay: string}} element
     */
    highlightRunningElementWithPrediction(element) {
        super.highlightRunningElementWithPrediction(element);
        this._bpmnElementsRegistry.addCssClasses(element.id, 'state-predicted-late');
    }

    switchLegend() {
        const element = document.getElementById(`legend`);
        element.classList.remove('state-predicted-on-time');
        element.classList.add('state-predicted-late');
    }
}


class PredictedOnTimeStyle extends Style {

    constructor(bpmnElementsRegistry, bpmnContainerId) {
        super(bpmnElementsRegistry, bpmnContainerId);
    }

    /**
     * @param {string[]} ids
     */
    toggleHighlightPredictedPath(ids) {
        this._bpmnElementsRegistry.toggleCssClasses(ids, 'path-predicted-on-time');
    }

    /**
     * @param {{id:string, startDate:string, predictedEnd:string, currentDelay: string, predictedDelay: string}} element
     */
    highlightRunningElementWithPrediction(element) {
        super.highlightRunningElementWithPrediction(element);
        this._bpmnElementsRegistry.addCssClasses(element.id, 'state-predicted-on-time');
    }

    switchLegend() {
        const element = document.getElementById(`legend`);
        element.classList.remove('state-predicted-late');
        element.classList.add('state-predicted-on-time');
    }
}
