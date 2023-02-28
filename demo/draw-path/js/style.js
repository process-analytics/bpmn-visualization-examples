class Style {

    #bpmnElementsRegistry;

    constructor(bpmnElementsRegistry) {
        this.#bpmnElementsRegistry = bpmnElementsRegistry;
    }

    /**
     * @param ids can be an array or a string
     * @private
     */
    reset(ids) {
        this.#bpmnElementsRegistry.removeCssClasses(ids, ['disableAll', 'possibleNext', 'highlight', 'disablePointer']);
    }

    displayPossibleNextElements(ids) {
        this.#bpmnElementsRegistry.addCssClasses(ids, 'possibleNext');
    }

    nonDisplayPossibleNextElements(ids) {
        this.#bpmnElementsRegistry.removeCssClasses(ids, 'possibleNext');
    }

    /**
     * @param ids can be an array or a string
     * @private
     */
    highlight(ids) {
        this.#bpmnElementsRegistry.removeCssClasses(ids, ['disableAll', 'possibleNext']);
        this.#bpmnElementsRegistry.addCssClasses(ids, ['highlight', 'disablePointer']);
    }

    /**
     * @param allBpmnElementIds must be an array
     * @param exceptedIds must be an array
     * @private
     */
    disableAllShapesAndEdgesExcept(allBpmnElementIds, exceptedIds) {
        this.#bpmnElementsRegistry.addCssClasses(allBpmnElementIds.filter(shapeOrEdge => !exceptedIds.includes(shapeOrEdge)), ['disableAll', 'disablePointer']);
    }

    /**
     * @param ids can be an array or a string
     * @private
     */
    disablePointerOn(ids) {
        this.#bpmnElementsRegistry.addCssClasses(ids, 'disablePointer');
    }

    /**
     * @param ids can be an array or a string
     * @private
     */
    activatePointerOn(ids) {
        this.#bpmnElementsRegistry.removeCssClasses(ids, 'disablePointer');
    }
}
