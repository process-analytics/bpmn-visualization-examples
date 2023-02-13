const defaultLoadOptions = {
    fit: {type: 'Center', margin: 30}
}

class UseCase {
    #type;
    #getDiagram;
    #navigationEnabled;
    #loadOptions;
    _bpmnVisualization;
    #alreadyLoad = false;

    constructor(type, getDiagram, navigationEnabled, loadOptions) {
        this.#type = type;
        this.#getDiagram = getDiagram;
        this.#navigationEnabled = navigationEnabled;
        this.#loadOptions = {...defaultLoadOptions, ...loadOptions};
    }

    get type() {
        return this.#type;
    }

    display(dataType) {
        this._displayPanel();

        if (!this.#alreadyLoad) {
            this._bpmnVisualization = this._initBpmnVisualization({container: `${this.#type}-bpmn-container`, navigation: {enabled: this.#navigationEnabled}});
            this._displayVersionInfoInFooter(); // This is called by each use case available in the page, but this is not an issue. All use the same bpmn-visualization version
            this._preLoadDiagram();
            this._bpmnVisualization.load(this.#getDiagram(), this.#loadOptions);
            this._postLoadDiagram();
            this.#alreadyLoad = true;
        }
    }

    _displayVersionInfoInFooter() {
        const footerElt = document.querySelector('footer');
        if (footerElt) {
            const version = this._bpmnVisualization.getVersion();
            footerElt.innerText = `bpmn-visualization@${version.lib}`;
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
    _postLoadDiagram() {
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
