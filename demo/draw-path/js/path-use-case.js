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

        const allShapes = this._getAllShapes();
        const allEdges = this._getAllEdges();
        this._bpmnElementIds = [...allShapes, ...allEdges].map(shapeOrEdge => shapeOrEdge.bpmnSemantic.id);
        const endEventIds = allShapes.filter(shape => shape.bpmnSemantic.kind === bpmnvisu.ShapeBpmnElementKind.EVENT_END).map(endEvent => endEvent.bpmnSemantic.id);

        this._configureShapeHandlers(allShapes, endEventIds);
        this._configureEdgeHandlers(allEdges, endEventIds);

        document.getElementById('btn-reset').onclick = () => {
            this._reset();
            this._disablePointerOn(endEventIds);
        };
    }

    _getAllShapes() {
        return this._bpmnVisualization.bpmnElementsRegistry.getElementsByKinds([
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
    }

    _getAllEdges() {
        return this._bpmnVisualization.bpmnElementsRegistry.getElementsByKinds([
            bpmnvisu.FlowKind.SEQUENCE_FLOW, bpmnvisu.FlowKind.MESSAGE_FLOW, bpmnvisu.FlowKind.ASSOCIATION_FLOW]);
    }

    _configureShapeHandlers(allShapes, endEventIds) {
        allShapes.forEach(item => {
            const currentId = item.bpmnSemantic.id;

            item.htmlElement.onclick = () => {
                if (!this._isEndEvent(item) && this._state.firstSelectedShape && this._state.secondSelectedShape) {
                    this._reset();
                }

                if (!this._isEndEvent(item) && !this._state.firstSelectedShape) {
                    this._disableAllShapesAndEdgesExcept([currentId]);
                    this._highlight(currentId);
                    this._state.firstSelectedShape = currentId;
                    this._steps.goToStep2();
                } else if (this._state.firstSelectedShape) {
                    this._doActionBeforeSecondShapeSelection(currentId, (filteredPath) => {
                        this._highlight([filteredPath.edgeId, filteredPath.targetId]);
                        this._activatePointerOn(this._bpmnElementIds.filter(id => !endEventIds.includes(id)));
                        this._state.secondSelectedShape = currentId;
                        this._steps.goToStep3();
                    });
                }
            };
            item.htmlElement.onmouseenter = () => {
                if (!this._isEndEvent(item) && (!this._state.firstSelectedShape || (this._state.firstSelectedShape && this._state.secondSelectedShape))) {
                    this._displayPossibleNextElements(currentId);
                } else {
                    this._doActionBeforeSecondShapeSelection(currentId, (filteredPath) => this._displayPossibleNextPath(filteredPath));
                }
            };
            item.htmlElement.onmouseleave = () => {
                if (!this._isEndEvent(item) && (!this._state.firstSelectedShape || (this._state.firstSelectedShape && this._state.secondSelectedShape))) {
                    this._nonDisplayPossibleNextElements(currentId);
                } else {
                    this._doActionBeforeSecondShapeSelection(currentId, (filteredPath) => this._nonDisplayPossibleNextPath(filteredPath));
                }
            };
        });
        this._disablePointerOn(endEventIds);
    }

    _isEndEvent(item) {
        return item.bpmnSemantic.kind === bpmnvisu.ShapeBpmnElementKind.EVENT_END;
    }

    _configureEdgeHandlers(allEdges, endEventIds) {
        allEdges.forEach(item => {
            const currentId = item.bpmnSemantic.id;

            item.htmlElement.onclick = () => {
                if (this._state.firstSelectedShape && this._state.secondSelectedShape) {
                    this._reset();
                }

                this._doActionOnEdge(currentId, (filteredPath) => {
                    if (!this._state.firstSelectedShape) {
                        this._disableAllShapesAndEdgesExcept([filteredPath.sourceId]);
                        this._highlight(filteredPath.sourceId);
                        this._state.firstSelectedShape = filteredPath.sourceId;
                    }
                    this._highlight([filteredPath.edgeId, filteredPath.targetId]);
                    this._activatePointerOn(this._bpmnElementIds.filter(id => !endEventIds.includes(id)));
                    this._state.secondSelectedShape = filteredPath.targetId;
                    this._steps.goToStep3();
                });
            };
            item.htmlElement.onmouseenter = () => {
                this._doActionOnEdge(currentId, (filteredPath) => this._displayPossibleNextPath(filteredPath));
            };
            item.htmlElement.onmouseleave = () => {
                this._doActionOnEdge(currentId, (filteredPath) => this._nonDisplayPossibleNextPath(filteredPath));
            };
        });
    }

    _doActionBeforeSecondShapeSelection(possibleSecondShapeId, action) {
        if (this._state.firstSelectedShape && !this._state.secondSelectedShape) {
            const filteredPaths = paths.filter(path => path.sourceId === this._state.firstSelectedShape && path.targetId === possibleSecondShapeId);
            if (filteredPaths.length > 0) {
                action(filteredPaths[0]);
            }
        }
    }

    _doActionOnEdge(edgeId, action) {
        if (!this._state.secondSelectedShape || (this._state.secondSelectedShape && this._state.firstSelectedShape)) {
            const filteredPaths = paths.filter(path => ((!this._state.secondSelectedShape && this._state.firstSelectedShape) ? path.sourceId === this._state.firstSelectedShape : true) && path.edgeId === edgeId);
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

    _displayPossibleNextPath(path) {
        const ids = [path.edgeId, path.targetId];
        (!this._state.firstSelectedShape || (this._state.secondSelectedShape && this._state.firstSelectedShape)) ? ids.push(path.sourceId) : this._activatePointerOn(ids);
        this._displayPossibleNextElements(ids);
    }

    _displayPossibleNextElements(ids) {
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(ids, 'possibleNext');
    }

    _nonDisplayPossibleNextPath(path) {
        const ids = [path.edgeId, path.targetId];
        (!this._state.firstSelectedShape || (this._state.secondSelectedShape && this._state.firstSelectedShape)) ? ids.push(path.sourceId) : this._disablePointerOn(ids);
        this._nonDisplayPossibleNextElements(ids);
    }

    _nonDisplayPossibleNextElements(ids) {
        this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses(ids, 'possibleNext');
    }

    /**
     * @param ids can be an array or a string
     * @private
     */
    _highlight(ids) {
        this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses(ids, ['disableAll', 'possibleNext']);
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(ids, ['highlight', 'disablePointer']);
    }

    /**
     * @param ids must be an array
     * @private
     */
    _disableAllShapesAndEdgesExcept(ids) {
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(this._bpmnElementIds.filter(shapeOrEdge => !ids.includes(shapeOrEdge)), ['disableAll', 'disablePointer']);
    }

    /**
     * @param ids can be an array or a string
     * @private
     */
    _disablePointerOn(ids) {
        this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(ids, 'disablePointer');
    }

    /**
     * @param ids can be an array or a string
     * @private
     */
    _activatePointerOn(ids) {
        this._bpmnVisualization.bpmnElementsRegistry.removeCssClasses(ids, 'disablePointer');
    }
}
