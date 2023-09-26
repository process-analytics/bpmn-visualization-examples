class HacktoberfestUseCase extends UseCase {

    constructor(inputProjectName, title) {
        document.querySelector(`[id*="hacktoberfest-title"]`).textContent = title;
        document.querySelector(`[id*="hacktoberfest-bpmn-container"]`).textContent = undefined;
        super('hacktoberfest', () => getHacktoberfestBpmnDiagram(inputProjectName), false);
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

}