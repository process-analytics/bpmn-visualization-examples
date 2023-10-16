class PathUseCase extends UseCase {

    #steps;

    #style;

    #pathManager;

    constructor(getDiagram) {
        super(  {getDiagram, navigationEnabled: true});

        this.#steps = new Steps();
    }

    /**
     * @protected
     */
    _postLoadDiagram() {
        const bpmnElementsRegistry = this._bpmnVisualization.bpmnElementsRegistry;

        this.#style = new Style(bpmnElementsRegistry);

        const shapesWithoutEndEvent = this._getActivitiesGatewaysEventsWithoutEndEvents();
        const shapesOfEndEvent = bpmnElementsRegistry.getElementsByKinds(bpmnvisu.ShapeBpmnElementKind.EVENT_END);
        const allShapes = [...shapesWithoutEndEvent, ...shapesOfEndEvent];

        const allEdges = bpmnElementsRegistry.getElementsByKinds(Object.values(bpmnvisu.FlowKind));
        this.#pathManager = new PathManager(allEdges);

        const bpmnElementIdsOfEndEvent = this._getBpmnElementIds(shapesOfEndEvent);
        const bpmnElementIdsWithoutEndEvent = this._getBpmnElementIds([...shapesWithoutEndEvent, ...allEdges]);

        this._configureShapeHandlers(allShapes, bpmnElementIdsWithoutEndEvent, bpmnElementIdsOfEndEvent);
        this._configureEdgeHandlers(allEdges, bpmnElementIdsWithoutEndEvent, bpmnElementIdsOfEndEvent);

        document.getElementById('btn-reset').onclick = () => {
            this._reset([...bpmnElementIdsOfEndEvent, ...bpmnElementIdsWithoutEndEvent]);
            this.#style.disablePointerOn(bpmnElementIdsOfEndEvent);
        };
    }

    /**
     * @param bpmnElements must be an array
     * @private
     */
    _getBpmnElementIds(bpmnElements) {
        return bpmnElements.map(shapeOrEdge => shapeOrEdge.bpmnSemantic.id);
    }

    /**
     * @private
     */
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

    /**
     * @private
     */
    _isEndEvent(item) {
        return item.bpmnSemantic.kind === bpmnvisu.ShapeBpmnElementKind.EVENT_END;
    }

    /**
     * @private
     */
    _configureShapeHandlers(allShapes, bpmnElementIdsWithoutEndEvent, bpmnElementIdsOfEndEvent) {
        const allBpmnElementsIds = [...bpmnElementIdsOfEndEvent, ...bpmnElementIdsWithoutEndEvent];

        allShapes.forEach(item => {
            const currentId = item.bpmnSemantic.id;
            const filterForPath = path => path.sourceId === this.#steps.firstSelectedShapeId && path.targetId === currentId;

            item.htmlElement.onclick = () => {
                if (this._isEndEvent(item) && !this.#steps.hasOnlyOneSelectedShape()) {
                    return;
                }

                if (this.#steps.hasTwoSelectedShapes()) {
                    this._reset(allBpmnElementsIds);
                }

                if (this.#steps.hasNoSelectedShape()) {
                    this.#style.disableAllShapesAndEdgesExcept(allBpmnElementsIds, [currentId]);
                    this.#style.highlight(currentId);
                    this.#steps.goToStep2(currentId);
                } else { // Only one shape is selected
                    this.#pathManager.doActionOnPath(filterForPath,(filteredPath) => {
                        this.#style.highlight([filteredPath.edgeId, filteredPath.targetId]);
                        this.#style.activatePointerOn(bpmnElementIdsWithoutEndEvent);
                        this.#steps.goToStep3(currentId);
                    });
                }
            };
            item.htmlElement.onmouseenter = () => {
                if (this.#steps.hasOnlyOneSelectedShape()) {
                    this.#pathManager.doActionOnPath(filterForPath, (filteredPath) => this._displayPossibleNextPath(filteredPath));
                } else if (!this._isEndEvent(item)) {
                    this.#style.displayPossibleNextElements(currentId);
                }
            };
            item.htmlElement.onmouseleave = () => {
                if (this.#steps.hasOnlyOneSelectedShape()) {
                    this.#pathManager.doActionOnPath(filterForPath, (filteredPath) => this._nonDisplayPossibleNextPath(filteredPath));
                } else if (!this._isEndEvent(item)) {
                    this.#style.nonDisplayPossibleNextElements(currentId);
                }
            };
        });

        this.#style.disablePointerOn(bpmnElementIdsOfEndEvent);
    }

    /**
     * @private
     */
    _configureEdgeHandlers(allEdges, bpmnElementIdsWithoutEndEvent, bpmnElementIdsOfEndEvent) {
        const allBpmnElementsIds = [...bpmnElementIdsOfEndEvent, ...bpmnElementIdsWithoutEndEvent];

        allEdges.forEach(item => {
            const currentId = item.bpmnSemantic.id;
            const filterForPath = path => (this.#steps.hasOnlyOneSelectedShape() ? path.sourceId === this.#steps.firstSelectedShapeId : true) && path.edgeId === currentId;

            item.htmlElement.onclick = () => {
                if (this.#steps.hasTwoSelectedShapes()) {
                    this._reset(allBpmnElementsIds);
                }

                this.#pathManager.doActionOnPath(filterForPath, (filteredPath) => {
                    if (this.#steps.hasNoSelectedShape()) {
                        this.#style.disableAllShapesAndEdgesExcept(allBpmnElementsIds, [filteredPath.sourceId]);
                        this.#style.highlight(filteredPath.sourceId);
                        this.#steps.goToStep2(filteredPath.sourceId);
                    }
                    this.#style.highlight([filteredPath.edgeId, filteredPath.targetId]);
                    this.#style.activatePointerOn(bpmnElementIdsWithoutEndEvent);
                    this.#steps.goToStep3(filteredPath.targetId);
                });
            };
            item.htmlElement.onmouseenter = () => {
                this.#pathManager.doActionOnPath(filterForPath,(filteredPath) => this._displayPossibleNextPath(filteredPath));
            };
            item.htmlElement.onmouseleave = () => {
                this.#pathManager.doActionOnPath(filterForPath, (filteredPath) => this._nonDisplayPossibleNextPath(filteredPath));
            };
        });
    }

    /**
     * @param {string[]|string} ids
     * @private
     */
    _reset(ids) {
        this.#style.reset(ids);
        this.#steps.reset();
    }

    /**
     * @param {Path} path
     * @private
     */
    _displayPossibleNextPath(path) {
        const ids = [path.edgeId, path.targetId];
        !this.#steps.hasOnlyOneSelectedShape() ? ids.push(path.sourceId) : this.#style.activatePointerOn(ids);
        this.#style.displayPossibleNextElements(ids);
    }

    /**
     * @param {Path} path
     * @private
     */
    _nonDisplayPossibleNextPath(path) {
        const ids = [path.edgeId, path.targetId];
        !this.#steps.hasOnlyOneSelectedShape() ? ids.push(path.sourceId) : this.#style.disablePointerOn(ids);
        this.#style.nonDisplayPossibleNextElements(ids);
    }
}
