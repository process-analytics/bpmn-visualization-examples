class HacktoberfestUseCase extends UseCase {

    // Default BPMN Visualization theme
    #originalDefaultFontColor;
    #originalDefaultFontFamily;
    #originalDefaultStrokeColor;
    #originalDefaultFillColor;
    #originalPoolLabelFillColor;
    #originalConfigureCommonDefaultStyle;

    constructor(type, inputProjectName) {
        super(type, () => getHacktoberfestBpmnDiagram(inputProjectName), false);
    }

    updateCellsLabel(projectName) {
        this._updateCellLabel("call_activity", `Contribute to ${projectName} 🔧`);
        this._updateCellLabel("user_task_5", `Tweet how it was fun to contribute to ${projectName} 😃`);
    }

    /**
     * Generic implementation
     */
    _updateCellLabel(cellId, value) {
        const cell = this._bpmnVisualization.graph.model.getCell(cellId);
        this._bpmnVisualization.graph.model.setValue(cell, value);
    }

    /**
     * Generic implementation
     */
    _preLoadDiagram() {
        bpmnvisu.IconPainterProvider.set(new bpmnvisu.IconPainter());
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
