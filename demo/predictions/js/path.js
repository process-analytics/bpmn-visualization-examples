// From the Path Demo
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

class PathResolver {

    #paths;

    constructor(bpmnVisualization) {
        this.#paths = this.#buildPaths(bpmnVisualization.bpmnElementsRegistry.getElementsByKinds(Object.values(bpmnvisu.FlowKind)));
    }

    flatPaths(shapeIds) {
        return [...shapeIds, ...this.#paths.filter(path => shapeIds.includes(path.sourceId)).map(path => path.edgeId)];
    }

    #buildPaths(edges) {
        return edges.map(edge => {
            const bpmnSemantic = edge.bpmnSemantic;
            return new Path(bpmnSemantic.sourceRefId, bpmnSemantic.id , bpmnSemantic.targetRefId);
        });
    }
}