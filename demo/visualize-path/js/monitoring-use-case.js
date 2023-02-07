class PathUseCase extends UseCase {

    _firstSelectedShape;

    constructor(getDiagram) {
        super('path', getDiagram, true);
    }

    display() {
        super.display();

        this._bpmnVisualization.bpmnElementsRegistry.getElementsByKinds([
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
            bpmnvisu.ShapeBpmnElementKind.GATEWAY_PARALLEL])
            .forEach(item => item.htmlElement.onclick = () => {
                if(!this._firstSelectedShape) {
                    this._bpmnVisualization.bpmnElementsRegistry.addCssClasses(item.bpmnSemantic.id, 'highlight');
                    this._firstSelectedShape = item.bpmnSemantic.id
                }
            });

        /*        "bpmn-type-event"
                "bpmn-type-gateway"
                "bpmn-type-activity"
        "bpmn-type-flow"*/
    }
}
