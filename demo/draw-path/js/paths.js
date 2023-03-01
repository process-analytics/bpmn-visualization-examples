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

class PathManager {

    #paths;

    constructor(edges) {
        this.#paths = this.#buildPaths(edges);
    }

    doActionOnPath(filter, actionOnFilteredPath)  {
        const filteredPaths = this.#paths.filter(path => filter(path));
        if (filteredPaths.length > 0) {
            actionOnFilteredPath(filteredPaths[0]);
        }
    }

    #buildPaths(edges) {
        return edges.map(edge => {
            const bpmnSemantic = edge.bpmnSemantic;
            return new Path(bpmnSemantic.sourceRefId, bpmnSemantic.id , bpmnSemantic.targetRefId);
        });
    }
}
