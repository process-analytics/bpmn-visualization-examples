const defaultLoadOptions = {
    fit: {type: 'Center', margin: 30}
}

class UseCase {
    #getDiagram;
    #navigationEnabled;
    #loadOptions;

    /**
     * @type {BpmnVisualization}
     */
    _bpmnVisualization;

    constructor({ getDiagram, navigationEnabled, loadOptions, title }) {
        this.#getDiagram = getDiagram;
        this.#navigationEnabled = navigationEnabled;
        this.#loadOptions = {...defaultLoadOptions, ...loadOptions};

        document.querySelector(`[id*="title"]`).textContent = title;
        document.querySelector(`[id*="bpmn-container"]`).textContent = undefined;
    }

    /**
     * Initialize bpmn-visualization and load the diagram.
     */
    display() {
        this._bpmnVisualization = this._initBpmnVisualization({ container: 'bpmn-container', navigation: { enabled: this.#navigationEnabled } });
        this._displayVersionInfoInFooter(); // This is called by each use case available in the page, but this is not an issue. All use the same bpmn-visualization version
        this._preLoadDiagram();
        this._bpmnVisualization.load(this.#getDiagram(), this.#loadOptions);
        this._postLoadDiagram();
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
}
