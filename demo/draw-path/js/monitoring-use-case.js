class PathUseCase extends UseCase {

    _state;

    _bpmnElementIds;

    _steps;

    constructor(getDiagram) {
        super('path', getDiagram, true);

        this._state = {
            firstSelectedShape: undefined,
            secondSelectedShape: undefined,
        };


        this._steps = new Steps();
    }

    display() {
        super.display();

        const allShapes = this._bpmnVisualization.bpmnElementsRegistry.getElementsByKinds([
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
        const allEdges = this._bpmnVisualization.bpmnElementsRegistry.getElementsByKinds([
            bpmnvisu.FlowKind.SEQUENCE_FLOW, bpmnvisu.FlowKind.MESSAGE_FLOW, bpmnvisu.FlowKind.ASSOCIATION_FLOW]);
        this._bpmnElementIds = [...allShapes, ...allEdges].map(shapeOrEdge => shapeOrEdge.bpmnSemantic.id);

        allShapes.forEach(item => {
            const currentId = item.bpmnSemantic.id;

            item.htmlElement.onclick = () => {
                if (this._state.firstSelectedShape && this._state.secondSelectedShape) {
                    this._reset();
                }

                if (!this._state.firstSelectedShape) {
                    this._disableAllShapesAndEdgesExcept(currentId);
                    this._highlight(currentId);
                    this._state.firstSelectedShape = currentId;
                    this._steps.goToStep2();
                } else {
                    this.doActionBeforeSecondShapeSelection(currentId, (filteredPath) => {
                        this._highlight([filteredPath.edgeId, filteredPath.targetId]);
                        this._activatePointerOnAllShapesAndEdges();
                        this._state.secondSelectedShape = currentId;
                        this._steps.goToStep3();
                    });
                }
            };
            item.htmlElement.onmouseenter = () => {
                this.doActionBeforeSecondShapeSelection(currentId, (filteredPath) => this._displayPossibleNext(filteredPath));
            };
            item.htmlElement.onmouseleave = () => {
                this.doActionBeforeSecondShapeSelection(currentId, (filteredPath) => this._nonDisplayPossibleNext(filteredPath));
            };
        });
    }

    doActionBeforeSecondShapeSelection(possibleSecondShapeId, action) {
        if (this._state.firstSelectedShape && !this._state.secondSelectedShape) {
            const filteredPaths =  paths.filter(path => path.sourceId === this._state.firstSelectedShape && path.targetId === possibleSecondShapeId);
            if (filteredPaths.length > 0) {
                action(filteredPaths[0]);
            }
        }
    }

    _reset() {
        this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses(this._bpmnElementIds, ['disableAll', 'possibleNext', 'highlight', 'disablePointer']);
        this._state.firstSelectedShape = undefined;
        this._state.secondSelectedShape = undefined;
        this._steps.reset();
    }

    _displayPossibleNext(path) {
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses([path.edgeId, path.targetId], 'possibleNext');
        this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses([path.edgeId, path.targetId], 'disablePointer');
    }

    _nonDisplayPossibleNext(path) {
        this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses([path.edgeId, path.targetId], 'possibleNext');
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses([path.edgeId, path.targetId], 'disablePointer');
    }

    _highlight(bpmnElementIds) {
        this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses(bpmnElementIds, ['disableAll', 'possibleNext']);
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(bpmnElementIds, ['highlight', 'disablePointer']);
    }

    _disableAllShapesAndEdgesExcept(id) {
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(this._bpmnElementIds.filter(shapeOrEdge => shapeOrEdge !== id), ['disableAll', 'disablePointer']);
    }

    _activatePointerOnAllShapesAndEdges() {
        this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses(this._bpmnElementIds, 'disablePointer');
    }
}
