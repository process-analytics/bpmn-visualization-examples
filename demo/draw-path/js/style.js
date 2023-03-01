class Style {

    #bpmnElementsRegistry;

    constructor(bpmnElementsRegistry) {
        this.#bpmnElementsRegistry = bpmnElementsRegistry;
    }

    /**
     * @param {string[] | string} ids
     */
    reset(ids) {
        this.#bpmnElementsRegistry.removeCssClasses(ids, ['disableAll', 'possibleNext', 'highlight', 'disablePointer']);
    }

    /**
     * @param {string[] | string} ids
     */
    displayPossibleNextElements(ids) {
        this.#bpmnElementsRegistry.addCssClasses(ids, 'possibleNext');
    }

    /**
     * @param {string[] | string} ids
     */
    nonDisplayPossibleNextElements(ids) {
        this.#bpmnElementsRegistry.removeCssClasses(ids, 'possibleNext');
    }

    /**
     * @param {string[] | string} ids
     */
    highlight(ids) {
        this.#bpmnElementsRegistry.removeCssClasses(ids, ['disableAll', 'possibleNext']);
        this.#bpmnElementsRegistry.addCssClasses(ids, ['highlight', 'disablePointer']);
    }

    /**
     * @param {string[]} allBpmnElementIds ids representing bpmn elements to disable
     * @param {string[]} exceptedIds ids to exclude from allBpmnElementIds
     */
    disableAllShapesAndEdgesExcept(allBpmnElementIds, exceptedIds) {
        this.#bpmnElementsRegistry.addCssClasses(allBpmnElementIds.filter(shapeOrEdge => !exceptedIds.includes(shapeOrEdge)), ['disableAll', 'disablePointer']);
    }

    /**
     * @param {string[] | string} ids
     */
    disablePointerOn(ids) {
        this.#bpmnElementsRegistry.addCssClasses(ids, 'disablePointer');
    }

    /**
     * @param {string[] | string} ids
     */
    activatePointerOn(ids) {
        this.#bpmnElementsRegistry.removeCssClasses(ids, 'disablePointer');
    }
}
