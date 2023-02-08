
class PathUseCase extends UseCase {

    _state;

    _allShapes;
    _allEdges;

    constructor(getDiagram) {
        super('path', getDiagram, true);

        this._state =
            {
                firstSelectedShape:undefined,
                secondSelectedShape:undefined,
                edge: undefined
            }
    }

    display() {
        super.display();

        this._allShapes = this._bpmnVisualization.bpmnElementsRegistry.getElementsByKinds([
            bpmnvisu.ShapeBpmnElementKind.EVENT_END,
            bpmnvisu.ShapeBpmnElementKind.EVENT_BOUNDARY,
            bpmnvisu.ShapeBpmnElementKind.EVENT_START,
            bpmnvisu.ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH,
            bpmnvisu.ShapeBpmnElementKind.EVENT_INTERMEDIATE_THROW,
            bpmnvisu.ShapeBpmnElementKind.CALL_ACTIVITY,
            bpmnvisu.ShapeBpmnElementKind.SUB_PROCESS,
            bpmnvisu.ShapeBpmnElementKind.TASK,
            bpmnvisu.ShapeBpmnElementKind.TASK_BUSINESS_RULE,
            bpmnvisu.ShapeBpmnElementKind.TASK_RECEIVE,
            bpmnvisu.ShapeBpmnElementKind.TASK_MANUAL,
            bpmnvisu.ShapeBpmnElementKind.TASK_SEND,
            bpmnvisu.ShapeBpmnElementKind.TASK_SERVICE,
            bpmnvisu.ShapeBpmnElementKind.TASK_SCRIPT,
            bpmnvisu.ShapeBpmnElementKind.TASK_USER,
            bpmnvisu.ShapeBpmnElementKind.GATEWAY_EVENT_BASED,
            bpmnvisu.ShapeBpmnElementKind.GATEWAY_EXCLUSIVE,
            bpmnvisu.ShapeBpmnElementKind.GATEWAY_INCLUSIVE,
            bpmnvisu.ShapeBpmnElementKind.GATEWAY_PARALLEL]);

        this._allEdges = this._bpmnVisualization.bpmnElementsRegistry.getElementsByKinds([
            bpmnvisu.FlowKind.SEQUENCE_FLOW, bpmnvisu.FlowKind.MESSAGE_FLOW, bpmnvisu.FlowKind.ASSOCIATION_FLOW]);

        this._allShapes.forEach(item => {
            item.htmlElement.onclick = () => {
                if(this._state.firstSelectedShape && this._state.secondSelectedShape){
                    this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses([...this._allShapes, ...this._allEdges].map(shapeOrEdge => shapeOrEdge.bpmnSemantic.id), ['disableAll', 'possibleNext', 'highlight']);
                    this._state.firstSelectedShape = undefined;
                    this._state.secondSelectedShape = undefined;
                    this._state.edge = undefined;
                }

                if (!this._state.firstSelectedShape) {
                    [...this._allShapes, ...this._allEdges].filter(shapeOrEdge => shapeOrEdge !== item).forEach(shapeOrEdge => this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(shapeOrEdge.bpmnSemantic.id, 'disableAll'));
                    this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(item.bpmnSemantic.id, 'highlight');
                    this._state.firstSelectedShape = item.bpmnSemantic.id;
                } else if (!this._state.secondSelectedShape){
                    const filteredPaths = getFilteredPaths(this._state.firstSelectedShape, item.bpmnSemantic.id);
                    if (filteredPaths.length > 0) {
                        const path = filteredPaths[0];
                        this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses([path.edgeId, path.targetId], ['disableAll', 'possibleNext']);
                        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses([path.edgeId, path.targetId], 'highlight');

                        this._state.secondSelectedShape = item.bpmnSemantic.id;
                        this._state.edge = path.edgeId;
                    }
                }
            }
            item.htmlElement.onmouseenter = () => {
                if (this._state.firstSelectedShape && !this._state.secondSelectedShape) {
                    const filteredPaths = getFilteredPaths(this._state.firstSelectedShape, item.bpmnSemantic.id);
                    if (filteredPaths.length > 0) {
                        const path = filteredPaths[0];
                        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses([path.edgeId, path.targetId], 'possibleNext');
                    }
                }
            }
            item.htmlElement.onmouseleave = () => {
                if (this._state.firstSelectedShape && !this._state.secondSelectedShape) {
                    const filteredPaths = getFilteredPaths(this._state.firstSelectedShape, item.bpmnSemantic.id);
                    if (filteredPaths.length > 0) {
                        const path = filteredPaths[0];
                        this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses([path.edgeId, path.targetId], 'possibleNext');
                    }
                }
            }
        });
    }
}
