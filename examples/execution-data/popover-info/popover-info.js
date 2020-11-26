// TODO duplicated with the 'diagram-fit-variants' example
function getBpmnDiagramHorizontal() {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1jzeku5" targetNamespace="http://example.com/schema/bpmn">
          <bpmn:process id="Process_1tm11eu" isExecutable="false">
            <bpmn:startEvent id="StartEvent_07yal9c" name="Start">
              <bpmn:outgoing>Flow_0alm7tv</bpmn:outgoing>
            </bpmn:startEvent>
            <bpmn:task id="Activity_1xr04un" name="Task 1">
              <bpmn:incoming>Flow_0alm7tv</bpmn:incoming>
              <bpmn:outgoing>Flow_0wu2yg6</bpmn:outgoing>
            </bpmn:task>
            <bpmn:sequenceFlow id="Flow_0alm7tv" sourceRef="StartEvent_07yal9c" targetRef="Activity_1xr04un" />
            <bpmn:sequenceFlow id="Flow_0wu2yg6" sourceRef="Activity_1xr04un" targetRef="Activity_0kn4d46" />
            <bpmn:sequenceFlow id="Flow_1gcjvke" sourceRef="Activity_0kn4d46" targetRef="Activity_1j15wcw" />
            <bpmn:sequenceFlow id="Flow_1bmck4z" sourceRef="Activity_1j15wcw" targetRef="Activity_0wbisol" />
            <bpmn:sequenceFlow id="Flow_1i7r7y7" sourceRef="Activity_0wbisol" targetRef="Activity_0y3sd80" />
            <bpmn:sequenceFlow id="Flow_12yysoe" sourceRef="Activity_0y3sd80" targetRef="Event_157byoi" />
            <bpmn:endEvent id="Event_157byoi" name="End">
              <bpmn:incoming>Flow_12yysoe</bpmn:incoming>
            </bpmn:endEvent>
            <bpmn:userTask id="Activity_0kn4d46" name="Task 2">
              <bpmn:incoming>Flow_0wu2yg6</bpmn:incoming>
              <bpmn:outgoing>Flow_1gcjvke</bpmn:outgoing>
            </bpmn:userTask>
            <bpmn:manualTask id="Activity_1j15wcw" name="Task 3">
              <bpmn:incoming>Flow_1gcjvke</bpmn:incoming>
              <bpmn:outgoing>Flow_1bmck4z</bpmn:outgoing>
            </bpmn:manualTask>
            <bpmn:serviceTask id="Activity_0wbisol" name="Task 4">
              <bpmn:incoming>Flow_1bmck4z</bpmn:incoming>
              <bpmn:outgoing>Flow_1i7r7y7</bpmn:outgoing>
            </bpmn:serviceTask>
            <bpmn:scriptTask id="Activity_0y3sd80" name="Task 5">
              <bpmn:incoming>Flow_1i7r7y7</bpmn:incoming>
              <bpmn:outgoing>Flow_12yysoe</bpmn:outgoing>
            </bpmn:scriptTask>
          </bpmn:process>
          <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1tm11eu">
              <bpmndi:BPMNEdge id="Flow_0alm7tv_di" bpmnElement="Flow_0alm7tv">
                <di:waypoint x="192" y="99" />
                <di:waypoint x="250" y="99" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_0wu2yg6_di" bpmnElement="Flow_0wu2yg6">
                <di:waypoint x="350" y="99" />
                <di:waypoint x="410" y="99" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_1gcjvke_di" bpmnElement="Flow_1gcjvke">
                <di:waypoint x="510" y="99" />
                <di:waypoint x="570" y="99" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_1bmck4z_di" bpmnElement="Flow_1bmck4z">
                <di:waypoint x="670" y="99" />
                <di:waypoint x="730" y="99" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_1i7r7y7_di" bpmnElement="Flow_1i7r7y7">
                <di:waypoint x="830" y="99" />
                <di:waypoint x="890" y="99" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_12yysoe_di" bpmnElement="Flow_12yysoe">
                <di:waypoint x="990" y="99" />
                <di:waypoint x="1062" y="99" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_07yal9c">
                <dc:Bounds x="156" y="81" width="36" height="36" />
                <bpmndi:BPMNLabel>
                  <dc:Bounds x="162" y="124" width="24" height="14" />
                </bpmndi:BPMNLabel>
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Activity_1xr04un_di" bpmnElement="Activity_1xr04un">
                <dc:Bounds x="250" y="59" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Activity_03oln2l_di" bpmnElement="Activity_0kn4d46">
                <dc:Bounds x="410" y="59" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Activity_0owvwg0_di" bpmnElement="Activity_1j15wcw">
                <dc:Bounds x="570" y="59" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Activity_10z8211_di" bpmnElement="Activity_0wbisol">
                <dc:Bounds x="730" y="59" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Activity_1aadlt5_di" bpmnElement="Activity_0y3sd80">
                <dc:Bounds x="890" y="59" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Event_157byoi_di" bpmnElement="Event_157byoi">
                <dc:Bounds x="1062" y="81" width="36" height="36" />
                <bpmndi:BPMNLabel>
                  <dc:Bounds x="1070" y="124" width="20" height="14" />
                </bpmndi:BPMNLabel>
              </bpmndi:BPMNShape>
            </bpmndi:BPMNPlane>
          </bpmndi:BPMNDiagram>
        </bpmn:definitions>
        `;
}

const bpmnContainerId = 'bpmn-container';
const bpmnContainerElt = window.document.getElementById(bpmnContainerId);
const bpmnVisualization = new bpmnvisu.BpmnVisualization(bpmnContainerElt);
const diagram = getBpmnDiagramHorizontal();

bpmnVisualization.load(diagram, { fit: {type: 'Center'} });

document.getElementById('toggle-dropdown-diagram-choice').onchange = function () {
    // dropdownDiagramChoiceElt.classList.remove('hidden');

}
