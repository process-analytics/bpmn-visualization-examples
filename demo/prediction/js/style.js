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
            /*
            ignoreAttributes: true,
            interactive: true,*/
            animation: false
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
     * @param {string} id
     */
    highlightRunningElementWithPrediction(id) {
        this._addPopup(id);
    }

    switchLegend() {
    }

    _addPopup(id) {
        this._bpmnElementsRegistry.addCssClasses(id, 'c-hand');

        const htmlElement = this._bpmnElementsRegistry.getElementsByIds(id)[0].htmlElement;
        tippy(htmlElement, {
            sticky: 'reference',
            arrow: true,
            placement: 'bottom',
            content:
                `<div class="bpmn-popover">
                <ul>
                    <li>Start date: </li>
                    <li>Predicted end:</li>
                    <li>Late:</li>
                </ul>
            </div>`
            /*      content(reference) {
                        const id = reference.getAttribute('data-template');
                        const template = document.getElementById(id);
                        return template.innerHTML;
                    },
                    */
        });

/*        tippy(htmlElement, {
            content: `<div class="bpmn-popover">
                <ul>
                    <li>Start date: </li>
                    <li>Predicted end:</li>
                    <li>Late:</li>
                </ul>
            </div>`,
            render(instance) {
                // The recommended structure is to use the popper as an outer wrapper
                // element, with an inner `box` element
                const popper = document.createElement('div');
                const box = document.createElement('div');

                popper.appendChild(box);

                box.className = 'my-custom-class';
                box.innerHTML = instance.props.content;

                function onUpdate(prevProps, nextProps) {
                    // DOM diffing
                    if (prevProps.content !== nextProps.content) {
                        box.textContent = nextProps.content;
                    }
                }

                // Return an object with two properties:
                // - `popper` (the root popper element)
                // - `onUpdate` callback whenever .setProps() or .setContent() is called
                return {
                    popper,
                    onUpdate, // optional
                };
            },
        });*/
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
     * @param {string} id
     */
    highlightRunningElementWithPrediction(id) {
        super.highlightRunningElementWithPrediction(id);
        this._bpmnElementsRegistry.addCssClasses(id, 'state-predicted-late');
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
     * @param {string} id
     */
    highlightRunningElementWithPrediction(id) {
        super.highlightRunningElementWithPrediction(id);
        this._bpmnElementsRegistry.addCssClasses(id, 'state-predicted-on-time');
    }

    switchLegend() {
        const element = document.getElementById(`legend`);
        element.classList.remove('state-predicted-late');
        element.classList.add('state-predicted-on-time');
    }
}
