class HacktoberfestUseCase extends UseCase {

    constructor(inputProjectName, title) {
        super({
            getDiagram: () => getHacktoberfestBpmnDiagram(inputProjectName),
            navigationEnabled: false,
            title
        });
    }

    _initBpmnVisualization(options) {
        bpmnvisu.IconPainterProvider.set(new bpmnvisu.IconPainter());
        return super._initBpmnVisualization(options);
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

}