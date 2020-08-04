const bpmn = bpmnDiagram();
bpmnVisu.load(bpmn);

// demonstrate how to hard code the color for a specific icon
const userTaskIconColor = 'orange';

// adapted from https://github.com/primer/octicons/blob/638c6683c96ec4b357576c7897be8f19c933c052/icons/person.svg
// use mxgraph svg2xml to generate the xml stencil and port it to code
IconPainter.paintWomanIcon = function({ c, ratioFromParent, shape: { x, y, w, h }, icon }) {
    this.updateCanvasStyle(c, Object.assign(Object.assign({}, icon), { isFilled: true }));
    // icon coordinates fill a 12x13 rectangle
    const canvas = MxCanvasUtil.getConfiguredCanvas(c, w, h, 13, ratioFromParent);
    MxCanvasUtil.translateToStartingIconPosition(c, x, y, w, h, 20);

    c.setFillColor(userTaskIconColor);

    canvas.begin();
    canvas.moveTo(12, 13);
    canvas.arcTo(1, 1, 0, 0, 1, 11, 14);
    canvas.lineTo(1, 14);
    canvas.arcTo(1, 1, 0, 0, 1, 0, 13);
    canvas.lineTo(0, 12);
    canvas.curveTo(0, 9.37, 4, 8, 4, 8);
    canvas.curveTo(4, 8, 4.23, 8, 4, 8);
    canvas.curveTo(3.16, 6.38, 3.06, 5.41, 3, 3);
    canvas.curveTo(3.17, 0.59, 4.87, 0, 6, 0);
    canvas.curveTo(7.13, 0, 8.83, 0.59, 9, 3);
    canvas.curveTo(8.94, 5.41, 8.84, 6.38, 8, 8);
    canvas.curveTo(8, 8, 12, 9.37, 12, 12);
    canvas.lineTo(12, 13);
    canvas.close();
    canvas.fill();
};

const bpmnVisuAlternate = new BpmnVisu(window.document.getElementById('graphAlternate'));
bpmnVisuAlternate.load(bpmn);

function bpmnDiagram() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_12nbmjq" targetNamespace="http://example.bpmn.com/schema/bpmn">
  <bpmn:collaboration id="Collaboration_1cajy2f">
    <bpmn:participant id="Participant_0zyusbn" name="Pool" processRef="Process_1duwsyj" />
  </bpmn:collaboration>
  <bpmn:process id="Process_1duwsyj" isExecutable="false">
    <bpmn:startEvent id="StartEvent_05jmofc" name="Start">
      <bpmn:outgoing>Flow_1bic2fy</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:endEvent id="Event_1o095l8" name="End">
      <bpmn:incoming>Flow_1nkimwz</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:task id="Activity_04fn9qe" name="Abstract Task 1">
      <bpmn:incoming>Flow_1bic2fy</bpmn:incoming>
      <bpmn:outgoing>Flow_1sfz0po</bpmn:outgoing>
    </bpmn:task>
    <bpmn:userTask id="Activity_13y9ou5" name="User Task 2">
      <bpmn:incoming>Flow_1sfz0po</bpmn:incoming>
      <bpmn:outgoing>Flow_12gqqr8</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:serviceTask id="Activity_0dllg4f" name="Service Task 3">
      <bpmn:incoming>Flow_12gqqr8</bpmn:incoming>
      <bpmn:outgoing>Flow_1nkimwz</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="Flow_1bic2fy" sourceRef="StartEvent_05jmofc" targetRef="Activity_04fn9qe" />
    <bpmn:sequenceFlow id="Flow_1sfz0po" sourceRef="Activity_04fn9qe" targetRef="Activity_13y9ou5" />
    <bpmn:sequenceFlow id="Flow_12gqqr8" sourceRef="Activity_13y9ou5" targetRef="Activity_0dllg4f" />
    <bpmn:sequenceFlow id="Flow_1nkimwz" sourceRef="Activity_0dllg4f" targetRef="Event_1o095l8" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_1cajy2f">
      <bpmndi:BPMNShape id="Participant_0zyusbn_di" bpmnElement="Participant_0zyusbn" isHorizontal="true">
        <dc:Bounds x="152" y="39" width="760" height="121" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_05jmofc">
        <dc:Bounds x="206" y="81" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="210" y="124" width="28" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1o095l8_di" bpmnElement="Event_1o095l8">
        <dc:Bounds x="852" y="81" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="864" y="124" width="12" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1wvlsrv_di" bpmnElement="Activity_04fn9qe">
        <dc:Bounds x="300" y="59" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0jp7sxr_di" bpmnElement="Activity_13y9ou5">
        <dc:Bounds x="490" y="59" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1e6btip_di" bpmnElement="Activity_0dllg4f">
        <dc:Bounds x="670" y="59" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1bic2fy_di" bpmnElement="Flow_1bic2fy">
        <di:waypoint x="242" y="99" />
        <di:waypoint x="300" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1sfz0po_di" bpmnElement="Flow_1sfz0po">
        <di:waypoint x="400" y="99" />
        <di:waypoint x="490" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_12gqqr8_di" bpmnElement="Flow_12gqqr8">
        <di:waypoint x="590" y="99" />
        <di:waypoint x="670" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1nkimwz_di" bpmnElement="Flow_1nkimwz">
        <di:waypoint x="770" y="99" />
        <di:waypoint x="852" y="99" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
}