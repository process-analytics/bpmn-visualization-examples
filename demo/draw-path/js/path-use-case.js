class PathUseCase extends UseCase {

    _state;

    _steps;

    _style;

    constructor(getDiagram) {
        super('path', getDiagram, true);

        this._state = {
            firstSelectedShape: undefined,
            secondSelectedShape: undefined,
        };

        this._steps = new Steps();
    }

    _postLoadDiagram() {
        const bpmnElementsRegistry = this._bpmnVisualization.bpmnElementsRegistry;

        this._style = new Style(bpmnElementsRegistry);

        const shapesWithoutEndEvent = this._getActivitiesGatewaysEventsWithoutEndEvents();
        const shapesOfEndEvent = bpmnElementsRegistry.getElementsByKinds(bpmnvisu.ShapeBpmnElementKind.EVENT_END);
        const allShapes = [...shapesWithoutEndEvent, ...shapesOfEndEvent];

        const allEdges = bpmnElementsRegistry.getElementsByKinds(Object.values(bpmnvisu.FlowKind));

        const bpmnElementIdsOfEndEvent = this._getBpmnElementIds(shapesOfEndEvent);
        const bpmnElementIdsWithoutEndEvent = this._getBpmnElementIds([...shapesWithoutEndEvent, ...allEdges]);

        this._configureShapeHandlers(allShapes, bpmnElementIdsWithoutEndEvent, bpmnElementIdsOfEndEvent);
        this._configureEdgeHandlers(allEdges, bpmnElementIdsWithoutEndEvent, bpmnElementIdsOfEndEvent);

        document.getElementById('btn-reset').onclick = () => {
            this._reset([...bpmnElementIdsOfEndEvent, ...bpmnElementIdsWithoutEndEvent]);
            this._style.disablePointerOn(bpmnElementIdsOfEndEvent);
        };
    }

    /**
     * @param bpmnElements must be an array
     * @private
     */
    _getBpmnElementIds(bpmnElements) {
        return bpmnElements.map(shapeOrEdge => shapeOrEdge.bpmnSemantic.id);
    }

    _getActivitiesGatewaysEventsWithoutEndEvents() {
        return this._bpmnVisualization.bpmnElementsRegistry.getElementsByKinds(
            Object.values(bpmnvisu.ShapeBpmnElementKind).filter(kind =>
                kind !== bpmnvisu.ShapeBpmnElementKind.EVENT_END &&
                kind !== bpmnvisu.ShapeBpmnElementKind.LANE &&
                kind !== bpmnvisu.ShapeBpmnElementKind.POOL &&
                kind !== bpmnvisu.ShapeBpmnElementKind.GROUP &&
                kind !== bpmnvisu.ShapeBpmnElementKind.TEXT_ANNOTATION &&
                kind !== bpmnvisu.ShapeBpmnElementKind.GLOBAL_TASK &&
                kind !== bpmnvisu.ShapeBpmnElementKind.GLOBAL_TASK_BUSINESS_RULE &&
                kind !== bpmnvisu.ShapeBpmnElementKind.GLOBAL_TASK_MANUAL &&
                kind !== bpmnvisu.ShapeBpmnElementKind.GLOBAL_TASK_SCRIPT &&
                kind !== bpmnvisu.ShapeBpmnElementKind.GLOBAL_TASK_USER)
        ) ;
    }

    _configureShapeHandlers(allShapes, bpmnElementIdsWithoutEndEvent, bpmnElementIdsOfEndEvent) {
        const allBpmnElementsIds = [...bpmnElementIdsOfEndEvent, ...bpmnElementIdsWithoutEndEvent];

        allShapes.forEach(item => {
            const currentId = item.bpmnSemantic.id;

            item.htmlElement.onclick = () => {
                if (this._isEndEvent(item) && !this._hasOnlyOneSelectedShape()) {
                    return;
                }

                if (this._hasTwoSelectedShapes()) {
                    this._reset(allBpmnElementsIds);
                }

                if (this._hasNoSelectedShape()) {
                    this._style.disableAllShapesAndEdgesExcept(allBpmnElementsIds, [currentId]);
                    this._style.highlight(currentId);
                    this._state.firstSelectedShape = currentId;
                    this._steps.goToStep2();
                } else { // Only one shape is selected
                    this._doActionBeforeSecondShapeSelection(currentId, (filteredPath) => {
                        this._style.highlight([filteredPath.edgeId, filteredPath.targetId]);
                        this._style.activatePointerOn(bpmnElementIdsWithoutEndEvent);
                        this._state.secondSelectedShape = currentId;
                        this._steps.goToStep3();
                    });
                }
            };
            item.htmlElement.onmouseenter = () => {
                if (this._hasOnlyOneSelectedShape()) {
                    this._doActionBeforeSecondShapeSelection(currentId, (filteredPath) => this._displayPossibleNextPath(filteredPath));
                } else if (!this._isEndEvent(item)) {
                    this._style.displayPossibleNextElements(currentId);
                }
            };
            item.htmlElement.onmouseleave = () => {
                if (this._hasOnlyOneSelectedShape()) {
                    this._doActionBeforeSecondShapeSelection(currentId, (filteredPath) => this._nonDisplayPossibleNextPath(filteredPath));
                } else if (!this._isEndEvent(item)) {
                    this._style.nonDisplayPossibleNextElements(currentId);
                }
            };
        });

        this._style.disablePointerOn(bpmnElementIdsOfEndEvent);
    }

    _isEndEvent(item) {
        return item.bpmnSemantic.kind === bpmnvisu.ShapeBpmnElementKind.EVENT_END;
    }

    _configureEdgeHandlers(allEdges, bpmnElementIdsWithoutEndEvent, bpmnElementIdsOfEndEvent) {
        const allBpmnElementsIds = [...bpmnElementIdsOfEndEvent, ...bpmnElementIdsWithoutEndEvent];

        allEdges.forEach(item => {
            const currentId = item.bpmnSemantic.id;

            item.htmlElement.onclick = () => {
                if (this._hasTwoSelectedShapes()) {
                    this._reset(allBpmnElementsIds);
                }

                this._doActionOnEdge(currentId, (filteredPath) => {
                    if (this._hasNoSelectedShape()) {
                        this._style.disableAllShapesAndEdgesExcept(allBpmnElementsIds, [filteredPath.sourceId]);
                        this._style.highlight(filteredPath.sourceId);
                        this._state.firstSelectedShape = filteredPath.sourceId;
                    }
                    this._style.highlight([filteredPath.edgeId, filteredPath.targetId]);
                    this._style.activatePointerOn(bpmnElementIdsWithoutEndEvent);
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

    _doActionBeforeSecondShapeSelection(possibleSecondShapeId, actionOnFilteredPath) {
        doActionOnPath(path => path.sourceId === this._state.firstSelectedShape && path.targetId === possibleSecondShapeId, actionOnFilteredPath);
    }

    _doActionOnEdge(edgeId, actionOnFilteredPath) {
        doActionOnPath(path => (this._hasOnlyOneSelectedShape() ? path.sourceId === this._state.firstSelectedShape : true) && path.edgeId === edgeId, actionOnFilteredPath);
    }

    _hasOnlyOneSelectedShape() {
        return this._state.firstSelectedShape && !this._state.secondSelectedShape ;
    }

    _hasTwoSelectedShapes() {
        return this._state.firstSelectedShape && this._state.secondSelectedShape;
    }

    _hasNoSelectedShape() {
        return !this._state.firstSelectedShape;
    }

    /**
     * @param ids can be an array or a string
     * @private
     */
    _reset(ids) {
        this._style.reset(ids);
        this._state.firstSelectedShape = undefined;
        this._state.secondSelectedShape = undefined;
        this._steps.reset();
    }

    _displayPossibleNextPath(path) {
        const ids = [path.edgeId, path.targetId];
        (this._hasNoSelectedShape() || this._hasTwoSelectedShapes()) ? ids.push(path.sourceId) : this._style.activatePointerOn(ids);
        this._style.displayPossibleNextElements(ids);
    }

    _nonDisplayPossibleNextPath(path) {
        const ids = [path.edgeId, path.targetId];
        (this._hasNoSelectedShape() || this._hasTwoSelectedShapes()) ? ids.push(path.sourceId) : this._style.disablePointerOn(ids);
        this._style.nonDisplayPossibleNextElements(ids);
    }

    /*    _togglePossibleNextPath(filteredPath, actionForPointer, actionForPossibleNextElements) {
            const ids = [filteredPath.edgeId, filteredPath.targetId];
            (!this._state.firstSelectedShape || this._hasTwoSelectedShapes()) ? ids.push(filteredPath.sourceId) : actionForPointer(ids);
            actionForPossibleNextElements(ids);
        }*/
}
