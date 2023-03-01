class Steps {

    #state;

    constructor() {
        this.reset();
    }

    get firstSelectedShapeId() {
        return this.#state.firstSelectedShapeId;
    }

    hasNoSelectedShape() {
        return !this.#state.firstSelectedShapeId;
    }

    hasOnlyOneSelectedShape() {
        return this.#state.firstSelectedShapeId && !this.#state.secondSelectedShapeId ;
    }

    hasTwoSelectedShapes() {
        return this.#state.firstSelectedShapeId && this.#state.secondSelectedShapeId;
    }

    reset() {
        this.#state = {
            firstSelectedShapeId: undefined,
            secondSelectedShapeId: undefined,
        };
        this._goToStep(1);
    }

    /**
     * @param {string} firstSelectedShapeId
     */
    goToStep2(firstSelectedShapeId){
        this.#state.firstSelectedShapeId = firstSelectedShapeId;
        this._goToStep(2);
    }

    /**
     * @param {string} secondSelectedShapeId
     */
    goToStep3(secondSelectedShapeId){
        this.#state.secondSelectedShapeId = secondSelectedShapeId;
        this._goToStep(3);
    }

    /**
     * @param {number} index
     * @private
     */
    _goToStep(index) {
        const stepItems = document.getElementsByClassName("step-item");
        for (let stepItem of stepItems) {
            stepItem.classList.remove('active');
        }
        document.getElementById(`step${index}`).classList.add('active');
    }
}