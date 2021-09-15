class UseCase {
    #type;
    #getDiagram;
    #navigationEnabled;
    _bpmnVisualization;
    #alreadyLoad = false;

    constructor(type, getDiagram, navigationEnabled) {
        this.#type = type;
        this.#getDiagram = getDiagram;
        this.#navigationEnabled = navigationEnabled;
    }

    display(dataType) {
        this._displayPanel();

        if (!this.#alreadyLoad) {
            this._bpmnVisualization = this._initBpmnVisualization({container: `${this.#type}-bpmn-container`, navigation: {enabled: this.#navigationEnabled}});
            this._preLoadDiagram();
            this._bpmnVisualization.load(this.#getDiagram(), {fit: {type: 'Center', margin: 30}});
            this.#alreadyLoad = true;
        }
    }

    /**
     * Generic implementation
     */
    _initBpmnVisualization(options) {
        return new bpmnvisu.BpmnVisualization(options);
    }

    /**
     * Generic implementation
     */
    _preLoadDiagram() {
    }

    /**
     * Generic implementation
     */
    _displayPanel() {
        this._displayElementAndHideOthers("bpmn-container");
        this._displayElementAndHideOthers("title");
    }

    /**
     * Generic implementation
     */
    _displayElementAndHideOthers(subId) {
        // Hide all corresponding HTML elements
        const bpmnContainers = document.querySelectorAll(`[id*="${subId}"]`);
        for (let i = 0; i < bpmnContainers.length; i++) {
            bpmnContainers.item(i).classList.add('d-hide');
        }

        // Display corresponding HTML element
        document.getElementById(`${this.#type}-${subId}`).classList.remove('d-hide');
        console.info('%s displayed', `${this.#type}-${subId}`);
    }

}
