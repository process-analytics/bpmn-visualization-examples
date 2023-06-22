// From Bonita Day 2023 Demo
class PathResolver {
    _bpmnVisualization;

    constructor(bpmnVisualization) {
        this._bpmnVisualization = bpmnVisualization;
    }

    getVisitedEdges(shapeIds) {
        const edgeIds = new Set();
        for (const shapeId of shapeIds) {
            const shapeElt = this._bpmnVisualization.bpmnElementsRegistry.getElementsByIds(shapeId)[0];
            if (!shapeElt) {
                continue;
            }

            const bpmnSemantic = shapeElt.bpmnSemantic;
            const incomingEdges = bpmnSemantic.incomingIds;
            if (incomingEdges) {
                for (const edgeId of incomingEdges) {
                    const edgeElement = this._bpmnVisualization.bpmnElementsRegistry.getElementsByIds(edgeId)[0];
                    const sourceRef = edgeElement.bpmnSemantic.sourceRefId;
                    if (shapeIds.includes(sourceRef)) {
                        edgeIds.add(edgeId);
                    }
                }
            }

            const outgoingEdges = bpmnSemantic.outgoingIds;
            if (outgoingEdges) {
                for (const edgeId of outgoingEdges) {
                    const edgeElement = this._bpmnVisualization.bpmnElementsRegistry.getElementsByIds(edgeId)[0];
                    const targetRef = edgeElement.bpmnSemantic.targetRefId;
                    if (shapeIds.includes(targetRef)) {
                        edgeIds.add(edgeId);
                    }
                }
            }
        }

        return Array.from(edgeIds);
    }
}