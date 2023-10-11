const navigation = {enabled: true};
const loadOptions = {fit: {type: bpmnvisu.FitType.Center, margin: 20}};

class BpmnVisualizationCustomizedColors extends bpmnvisu.BpmnVisualization {
    constructor(globalOptions) {
        super(globalOptions);
        this.configureStyle();
    }

    configureStyle() {
        // do nothing by default
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom markers for message flows
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class BpmnVisualizationCustomColorsMarkers extends BpmnVisualizationCustomizedColors {
    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet parameter
        const style = styleSheet.styles[bpmnvisu.FlowKind.MESSAGE_FLOW];
        style[bpmnvisu.BpmnStyleIdentifier.EDGE_START_FILL_COLOR] = '#ee1cb0';
        style[bpmnvisu.BpmnStyleIdentifier.EDGE_END_FILL_COLOR] = 'orange';
    }
}

const bpmnVisualization1 = new BpmnVisualizationCustomColorsMarkers({container: 'bpmn-container-1', navigation});
bpmnVisualization1.load(getIncidentManagementBpmnDiagram(), loadOptions);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom markers for sequence flows
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class BpmnVisualizationCustomColorsMarkersSeqFlow extends BpmnVisualizationCustomizedColors {
    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet parameter
        const seqFlowConditionalMarkerFromActivityStyle = styleSheet.styles[bpmnvisu.SequenceFlowKind.CONDITIONAL_FROM_ACTIVITY];
        seqFlowConditionalMarkerFromActivityStyle[bpmnvisu.BpmnStyleIdentifier.EDGE_START_FILL_COLOR] = '#6a71ee';
    }
}

const bpmnVisualization2 = new BpmnVisualizationCustomColorsMarkersSeqFlow({container: 'bpmn-container-2', navigation});
bpmnVisualization2.load(sequenceFlowDiagram(), loadOptions);

function sequenceFlowDiagram() {
    return `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0g0wkw3" targetNamespace="http://example.com/schema/bpmn">
  <bpmn:process id="Process_0jsrcqv" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1omufvy">
      <bpmn:outgoing>Flow_1qbojo4</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_116eaag" default="Flow_1io36a6">
      <bpmn:incoming>Flow_0e2llvg</bpmn:incoming>
      <bpmn:outgoing>Flow_07vj0qd</bpmn:outgoing>
      <bpmn:outgoing>Flow_1io36a6</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0e2llvg" sourceRef="Gateway_0qsbw8c" targetRef="Activity_116eaag" />
    <bpmn:exclusiveGateway id="Gateway_0hq2be7" default="Flow_0v4ibpj">
      <bpmn:incoming>Flow_0zxbqa5</bpmn:incoming>
      <bpmn:outgoing>Flow_1nstpgm</bpmn:outgoing>
      <bpmn:outgoing>Flow_0v4ibpj</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_0zxbqa5" sourceRef="Gateway_0qsbw8c" targetRef="Gateway_0hq2be7" />
    <bpmn:endEvent id="Event_0445f4y">
      <bpmn:incoming>Flow_06mrz3i</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_07vj0qd" sourceRef="Activity_116eaag" targetRef="Gateway_1b07tw9">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression" />
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_1nstpgm" sourceRef="Gateway_0hq2be7" targetRef="Gateway_1b07tw9">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression" />
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_0v4ibpj" sourceRef="Gateway_0hq2be7" targetRef="Gateway_02a5re3" />
    <bpmn:sequenceFlow id="Flow_1io36a6" sourceRef="Activity_116eaag" targetRef="Gateway_02a5re3" />
    <bpmn:parallelGateway id="Gateway_02a5re3">
      <bpmn:incoming>Flow_1io36a6</bpmn:incoming>
      <bpmn:incoming>Flow_0v4ibpj</bpmn:incoming>
      <bpmn:outgoing>Flow_0jjktak</bpmn:outgoing>
    </bpmn:parallelGateway>
    <bpmn:exclusiveGateway id="Gateway_1b07tw9">
      <bpmn:incoming>Flow_07vj0qd</bpmn:incoming>
      <bpmn:incoming>Flow_0jjktak</bpmn:incoming>
      <bpmn:incoming>Flow_1nstpgm</bpmn:incoming>
      <bpmn:outgoing>Flow_04af1mr</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_0jjktak" sourceRef="Gateway_02a5re3" targetRef="Gateway_1b07tw9" />
    <bpmn:sequenceFlow id="Flow_1qbojo4" sourceRef="StartEvent_1omufvy" targetRef="Gateway_0qsbw8c" />
    <bpmn:parallelGateway id="Gateway_0qsbw8c">
      <bpmn:incoming>Flow_1qbojo4</bpmn:incoming>
      <bpmn:outgoing>Flow_0e2llvg</bpmn:outgoing>
      <bpmn:outgoing>Flow_0zxbqa5</bpmn:outgoing>
    </bpmn:parallelGateway>
    <bpmn:sequenceFlow id="Flow_04af1mr" sourceRef="Gateway_1b07tw9" targetRef="Activity_04acs78" />
    <bpmn:sequenceFlow id="Flow_06mrz3i" sourceRef="Activity_04acs78" targetRef="Event_0445f4y" />
    <bpmn:sequenceFlow id="Flow_0jud8xv" sourceRef="Activity_04acs78" targetRef="Event_1tkvvjj">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression" />
    </bpmn:sequenceFlow>
    <bpmn:task id="Activity_04acs78" default="Flow_06mrz3i">
      <bpmn:incoming>Flow_04af1mr</bpmn:incoming>
      <bpmn:outgoing>Flow_06mrz3i</bpmn:outgoing>
      <bpmn:outgoing>Flow_0jud8xv</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="Event_1tkvvjj">
      <bpmn:incoming>Flow_0jud8xv</bpmn:incoming>
      <bpmn:signalEventDefinition id="SignalEventDefinition_03inplf" />
    </bpmn:endEvent>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0jsrcqv">
      <bpmndi:BPMNEdge id="Flow_0jud8xv_di" bpmnElement="Flow_0jud8xv">
        <di:waypoint x="850" y="300" />
        <di:waypoint x="850" y="440" />
        <di:waypoint x="1032" y="440" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_06mrz3i_di" bpmnElement="Flow_06mrz3i">
        <di:waypoint x="900" y="260" />
        <di:waypoint x="1032" y="260" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_04af1mr_di" bpmnElement="Flow_04af1mr">
        <di:waypoint x="755" y="260" />
        <di:waypoint x="800" y="260" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1qbojo4_di" bpmnElement="Flow_1qbojo4">
        <di:waypoint x="192" y="260" />
        <di:waypoint x="245" y="260" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0jjktak_di" bpmnElement="Flow_0jjktak">
        <di:waypoint x="515" y="260" />
        <di:waypoint x="705" y="260" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1io36a6_di" bpmnElement="Flow_1io36a6">
        <di:waypoint x="490" y="139" />
        <di:waypoint x="490" y="235" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0v4ibpj_di" bpmnElement="Flow_0v4ibpj">
        <di:waypoint x="490" y="415" />
        <di:waypoint x="490" y="285" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1nstpgm_di" bpmnElement="Flow_1nstpgm">
        <di:waypoint x="515" y="440" />
        <di:waypoint x="730" y="440" />
        <di:waypoint x="730" y="285" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_07vj0qd_di" bpmnElement="Flow_07vj0qd">
        <di:waypoint x="540" y="99" />
        <di:waypoint x="730" y="99" />
        <di:waypoint x="730" y="235" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0zxbqa5_di" bpmnElement="Flow_0zxbqa5">
        <di:waypoint x="270" y="285" />
        <di:waypoint x="270" y="440" />
        <di:waypoint x="465" y="440" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0e2llvg_di" bpmnElement="Flow_0e2llvg">
        <di:waypoint x="270" y="235" />
        <di:waypoint x="270" y="99" />
        <di:waypoint x="440" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1omufvy">
        <dc:Bounds x="156" y="242" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_116eaag_di" bpmnElement="Activity_116eaag">
        <dc:Bounds x="440" y="59" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0hq2be7_di" bpmnElement="Gateway_0hq2be7" isMarkerVisible="true">
        <dc:Bounds x="465" y="415" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0445f4y_di" bpmnElement="Event_0445f4y">
        <dc:Bounds x="1032" y="242" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1b5bwj7_di" bpmnElement="Gateway_02a5re3">
        <dc:Bounds x="465" y="235" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1b07tw9_di" bpmnElement="Gateway_1b07tw9" isMarkerVisible="true">
        <dc:Bounds x="705" y="235" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0eacrzg_di" bpmnElement="Gateway_0qsbw8c">
        <dc:Bounds x="245" y="235" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_11qmyek_di" bpmnElement="Activity_04acs78">
        <dc:Bounds x="800" y="220" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_04oou7y_di" bpmnElement="Event_1tkvvjj">
        <dc:Bounds x="1032" y="422" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
    `;
}
