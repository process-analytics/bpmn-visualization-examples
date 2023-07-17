class Path {
    #sourceId ;
    #edgeId;
    #targetId;

    constructor(sourceId, edgeId, targetId) {
        this.#sourceId = sourceId;
        this.#edgeId = edgeId;
        this.#targetId = targetId;
    }

    get sourceId() {
        return this.#sourceId;
    }

    get edgeId() {
        return this.#edgeId;
    }

    get targetId() {
        return this.#targetId;
    }
}

// From the Path Demo
class PathResolver {

    #paths;

    constructor(bpmnVisualization) {
        this.#paths = this.#buildPaths(bpmnVisualization.bpmnElementsRegistry.getElementsByKinds(Object.values(bpmnvisu.FlowKind)));
    }

/*    doActionOnPath(filter, actionOnFilteredPath)  {
        const filteredPaths = this.#paths.filter(path => filter(path));
        if (filteredPaths.length > 0) {
            actionOnFilteredPath(filteredPaths[0]);
        }
    }*/

    flatPaths(shapeIds) {
        return [...shapeIds, ...this.#paths.filter(path => shapeIds.includes(path.sourceId) || shapeIds.includes(path.targetId)).map(path => path.edgeId)];
    }

    #buildPaths(edges) {
        return edges.map(edge => {
            const bpmnSemantic = edge.bpmnSemantic;
            return new Path(bpmnSemantic.sourceRefId, bpmnSemantic.id , bpmnSemantic.targetRefId);
        });
    }
}