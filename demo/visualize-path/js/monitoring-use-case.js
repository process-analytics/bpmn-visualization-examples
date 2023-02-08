class PathUseCase extends UseCase {

    _firstSelectedShape;

    _allShapes;
    _allEdges;

    constructor(getDiagram) {
        super('path', getDiagram, true);
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


        this._allShapes.forEach(item => item.htmlElement.onclick = () => {
                if(!this._firstSelectedShape) {
                    [...this._allShapes, ... this._allEdges].filter(shapeOrEdge => shapeOrEdge !== item).forEach(shapeOrEdge => this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(shapeOrEdge.bpmnSemantic.id, 'disableAll'));

                    paths.filter(path => path.sourceId === item.bpmnSemantic.id).forEach(path => {
                        const htmlElement = this._bpmnVisualization.bpmnElementsRegistry.getElementsByIds(path.targetId)[0].htmlElement;
                        htmlElement.onmouseenter = () => this._bpmnVisualization.bpmnElementsRegistry.addCssClasses([path.edgeId, path.targetId], 'possibleNext');
                        htmlElement.onmouseleave = () => this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses([path.edgeId, path.targetId], 'possibleNext');
                    });

                    this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(item.bpmnSemantic.id, 'highlight');

                    this._firstSelectedShape = item.bpmnSemantic.id
                } else {
                    const filteredPaths = paths.filter(path => path.sourceId === this._firstSelectedShape && path.targetId === item.bpmnSemantic.id);
                    if (filteredPaths.length > 0) {
                        const path = filteredPaths[0];
                        this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses([path.edgeId, path.targetId], 'disableAll');
                        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses([path.edgeId, path.targetId], 'highlight');
                    }
                }
            });
    }
}
