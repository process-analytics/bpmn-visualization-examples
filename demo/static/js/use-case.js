class UseCase {
    #type;
    #getDiagram;
    _bpmnVisualization;
    #alreadyLoad = false;

    // Default BPMN Visualization theme
    #originalDefaultFontColor;
    #originalDefaultFontFamily;
    #originalDefaultStrokeColor;
    #originalDefaultFillColor;
    #originalPoolLabelFillColor;
    #originalConfigureCommonDefaultStyle;

    constructor(type, getDiagram, navigationEnabled) {
        this.#type = type;
        this.#getDiagram = getDiagram;
        this._bpmnVisualization = this._initBpmnVisualization({container: `${type}-bpmn-container`, navigation: {enabled: navigationEnabled}});
    }

    display(dataType) {
        this._displayPanel();

        if (!this.#alreadyLoad) {
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

    /**
     * Generic implementation
     */
    _saveDefaultTheme() {
        this.#originalDefaultFontColor = bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR;
        this.#originalDefaultFontFamily = bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY;
        this.#originalDefaultStrokeColor = bpmnvisu.StyleDefault.DEFAULT_STROKE_COLOR;
        this.#originalDefaultFillColor = bpmnvisu.StyleDefault.DEFAULT_FILL_COLOR;
        this.#originalPoolLabelFillColor = bpmnvisu.StyleDefault.POOL_LABEL_FILL_COLOR;
        this.#originalConfigureCommonDefaultStyle = bpmnvisu.StyleConfigurator.configureCommonDefaultStyle;
    }

    /**
     * Generic implementation
     */
    _restoreDefaultTheme() {
        bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR = this.#originalDefaultFontColor;
        bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY = this.#originalDefaultFontFamily;
        bpmnvisu.StyleDefault.DEFAULT_STROKE_COLOR = this.#originalDefaultStrokeColor;
        bpmnvisu.StyleDefault.DEFAULT_FILL_COLOR = this.#originalDefaultFillColor;
        bpmnvisu.StyleDefault.POOL_LABEL_FILL_COLOR = this.#originalPoolLabelFillColor;
        bpmnvisu.StyleConfigurator.configureCommonDefaultStyle = this.#originalConfigureCommonDefaultStyle;
    }
}
