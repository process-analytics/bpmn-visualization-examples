class UseCase {
    #type;
    #getDiagram;
    _bpmnVisualization;
    #alreadyLoad = false;

    constructor(type, getDiagram, navigationEnabled) {
        this.#type = type;
        this.#getDiagram = getDiagram;
        this._bpmnVisualization = new bpmnvisu.BpmnVisualization({container: `${type}-bpmn-container`, navigation: {enabled: navigationEnabled}});
    }

    display(dataType) {
        this._displayPanel();

        if (!this.#alreadyLoad) {
            this._bpmnVisualization.load(this.#getDiagram(), {fit: {type: 'Center', margin: 30}});
            this.#alreadyLoad = true;
        }
    }

    _displayPanel() {
        this._displayElementAndHideOthers("bpmn-container");
        this._displayElementAndHideOthers("title");
    }

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
