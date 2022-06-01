// --------------------------------------------
// Inspired from 'Procurement Processes with Error Handling - Stencil Trisotech 3 pages.bpmn' of https://www.omg.org/cgi-bin/doc?dtc/10-06-02.zip
function getOrderFulfillmentBpmnDiagram() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<semantic:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL">
  <semantic:process id="process_1" isExecutable="false">
    <semantic:startEvent id="start_event" name="Order received">
      <semantic:outgoing>flow_1</semantic:outgoing>
      <semantic:messageEventDefinition messageRef="message_1" />
    </semantic:startEvent>
    <semantic:task id="task_1" name="Check availability">
      <semantic:incoming>flow_1</semantic:incoming>
      <semantic:outgoing>flow_2</semantic:outgoing>
    </semantic:task>
    <semantic:exclusiveGateway id="exclusive_gateway" name="Article available">
      <semantic:incoming>flow_2</semantic:incoming>
      <semantic:outgoing>flow_3</semantic:outgoing>
      <semantic:outgoing>flow_4</semantic:outgoing>
    </semantic:exclusiveGateway>
    <semantic:callActivity id="call_activity" name="Procurement" calledElement="process_2">
      <semantic:incoming>flow_3</semantic:incoming>
      <semantic:outgoing>flow_5</semantic:outgoing>
    </semantic:callActivity>
    <semantic:boundaryEvent id="boundary_event_1" name="Late delivery" cancelActivity="false" attachedToRef="call_activity">
      <semantic:outgoing>flow_6</semantic:outgoing>
      <semantic:escalationEventDefinition />
    </semantic:boundaryEvent>
    <semantic:boundaryEvent id="boundary_event_2" name="Undeliverable" attachedToRef="call_activity">
      <semantic:outgoing>flow_10</semantic:outgoing>
      <semantic:errorEventDefinition />
    </semantic:boundaryEvent>
    <semantic:task id="task_2" name="Ship article">
      <semantic:incoming>flow_4</semantic:incoming>
      <semantic:incoming>flow_5</semantic:incoming>
      <semantic:outgoing>flow_8</semantic:outgoing>
    </semantic:task>
    <semantic:task id="task_3" name="Inform customer">
      <semantic:incoming>flow_6</semantic:incoming>
      <semantic:outgoing>flow_7</semantic:outgoing>
    </semantic:task>
    <semantic:endEvent id="end_event_2" name="Customer informed">
      <semantic:incoming>flow_7</semantic:incoming>
    </semantic:endEvent>
    <semantic:subProcess id="sub_process" name="Financial settlement">
      <semantic:incoming>flow_8</semantic:incoming>
      <semantic:outgoing>flow_9</semantic:outgoing>
    </semantic:subProcess>
    <semantic:endEvent id="end_event_1" name="Payment received">
      <semantic:incoming>flow_9</semantic:incoming>
    </semantic:endEvent>
    <semantic:task id="task_4" name="Inform customer">
      <semantic:incoming>flow_10</semantic:incoming>
      <semantic:outgoing>flow_11</semantic:outgoing>
    </semantic:task>
    <semantic:task id="task_5" name="Remove article from catalogue">
      <semantic:incoming>flow_11</semantic:incoming>
      <semantic:outgoing>flow_12</semantic:outgoing>
    </semantic:task>
    <semantic:endEvent id="end_event_3" name="Article removed">
      <semantic:incoming>flow_12</semantic:incoming>
    </semantic:endEvent>
    <semantic:sequenceFlow id="flow_1" name="" sourceRef="start_event" targetRef="task_1" />
    <semantic:sequenceFlow id="flow_2" name="" sourceRef="task_1" targetRef="exclusive_gateway" />
    <semantic:sequenceFlow id="flow_3" name="no" sourceRef="exclusive_gateway" targetRef="call_activity" />
    <semantic:sequenceFlow id="flow_4" name="yes" sourceRef="exclusive_gateway" targetRef="task_2" />
    <semantic:sequenceFlow id="flow_5" name="" sourceRef="call_activity" targetRef="task_2" />
    <semantic:sequenceFlow id="flow_6" name="" sourceRef="boundary_event_1" targetRef="task_3" />
    <semantic:sequenceFlow id="flow_7" name="" sourceRef="task_3" targetRef="end_event_2" />
    <semantic:sequenceFlow id="flow_8" name="" sourceRef="task_2" targetRef="sub_process" />
    <semantic:sequenceFlow id="flow_9" name="" sourceRef="sub_process" targetRef="end_event_1" />
    <semantic:sequenceFlow id="flow_10" name="" sourceRef="boundary_event_2" targetRef="task_4" />
    <semantic:sequenceFlow id="flow_11" name="" sourceRef="task_4" targetRef="task_5" />
    <semantic:sequenceFlow id="flow_12" name="" sourceRef="task_5" targetRef="end_event_3" />
  </semantic:process>
  <bpmndi:BPMNDiagram id="Trisotech.Visio-_6" name="Order Fulfillment" documentation="" resolution="96.00000267028808">
    <bpmndi:BPMNPlane bpmnElement="process_1">
      <bpmndi:BPMNEdge id="Trisotech.Visio__6_flow_8" bpmnElement="flow_8">
        <di:waypoint x="704" y="124" />
        <di:waypoint x="750" y="124" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__6_flow_5" bpmnElement="flow_5">
        <di:waypoint x="577" y="208" />
        <di:waypoint x="663" y="208" />
        <di:waypoint x="663" y="158" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__6_flow_4" bpmnElement="flow_4">
        <di:waypoint x="416" y="124" />
        <di:waypoint x="621" y="124" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="510" y="99" width="18" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__6_flow_3" bpmnElement="flow_3">
        <di:waypoint x="395" y="146" />
        <di:waypoint x="395" y="208" />
        <di:waypoint x="463" y="208" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="403" y="183" width="13" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__6_flow_2" bpmnElement="flow_2">
        <di:waypoint x="321" y="124" />
        <di:waypoint x="375" y="124" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__6_flow_6" bpmnElement="flow_6">
        <di:waypoint x="554" y="266" />
        <di:waypoint x="554" y="300" />
        <di:waypoint x="670" y="300" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__6_flow_7" bpmnElement="flow_7">
        <di:waypoint x="753" y="300" />
        <di:waypoint x="771" y="300" />
        <di:waypoint x="804" y="300" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__6_flow_10" bpmnElement="flow_10">
        <di:waypoint x="486" y="266" />
        <di:waypoint x="486" y="403" />
        <di:waypoint x="545" y="403" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__6_flow_11" bpmnElement="flow_11">
        <di:waypoint x="632" y="403" />
        <di:waypoint x="681" y="403" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__6_flow_12" bpmnElement="flow_12">
        <di:waypoint x="764" y="403" />
        <di:waypoint x="782" y="403" />
        <di:waypoint x="816" y="403" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__6_flow_9" bpmnElement="flow_9">
        <di:waypoint x="833" y="124" />
        <di:waypoint x="851" y="124" />
        <di:waypoint x="890" y="124" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__6_flow_1" bpmnElement="flow_1">
        <di:waypoint x="185" y="124" />
        <di:waypoint x="238" y="124" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_exclusive_gateway" bpmnElement="exclusive_gateway" isMarkerVisible="true">
        <dc:Bounds x="374" y="104" width="42" height="42" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="351" y="83" width="78" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_task_2" bpmnElement="task_2">
        <dc:Bounds x="621" y="90" width="83" height="68" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_call_activity" bpmnElement="call_activity" isExpanded="false">
        <dc:Bounds x="463" y="167" width="114" height="83" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_task_3" bpmnElement="task_3">
        <dc:Bounds x="670" y="266" width="88" height="68" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_end_event_2" bpmnElement="end_event_2">
        <dc:Bounds x="804" y="284" width="32" height="32" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="796" y="325" width="48" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_task_4" bpmnElement="task_4">
        <dc:Bounds x="545" y="369" width="88" height="68" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_task_5" bpmnElement="task_5">
        <dc:Bounds x="681" y="369" width="83" height="68" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_end_event_3" bpmnElement="end_event_3">
        <dc:Bounds x="816" y="387" width="32" height="32" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="793" y="432" width="77" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_end_event_1" bpmnElement="end_event_1">
        <dc:Bounds x="890" y="108" width="32" height="32" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="861" y="153" width="100" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_task_1" bpmnElement="task_1">
        <dc:Bounds x="238" y="90" width="83" height="68" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_start_event" bpmnElement="start_event">
        <dc:Bounds x="155" y="109" width="30" height="30" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="133" y="153" width="73" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_sub_process" bpmnElement="sub_process" isExpanded="false">
        <dc:Bounds x="750" y="90" width="83" height="68" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="760" y="100" width="63" height="48" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_boundary_event_2" bpmnElement="boundary_event_2">
        <dc:Bounds x="470" y="234" width="32" height="32" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="402" y="266" width="68" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__6_boundary_event_1" bpmnElement="boundary_event_1">
        <dc:Bounds x="538" y="234" width="32" height="32" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="573" y="266" width="63" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</semantic:definitions>
        `;
}

// It can be used as Process called by Order Fulfillment Process, or alone.
function getProcurementBpmnDiagram() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<semantic:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL">
  <semantic:process id="process_2" isExecutable="false">
    <semantic:startEvent id="start_event_2" name="" />
    <semantic:task id="task_2_1" name="Check availability with supplier" />
    <semantic:exclusiveGateway id="exclusive_gateway_2_1" name="Deliverable?" />
    <semantic:intermediateThrowEvent id="intermediate_throw_event_2_1" name="Late delivery">
      <semantic:escalationEventDefinition />
    </semantic:intermediateThrowEvent>
    <semantic:endEvent id="end_event_2_1" name="Article procured" />
    <semantic:endEvent id="end_event_2_2" name="Undeliverable">
      <semantic:errorEventDefinition />
    </semantic:endEvent>
    <semantic:intermediateCatchEvent id="intermediate_catch_event_2_1" name="Article received">
      <semantic:messageEventDefinition messageRef="message_2" />
    </semantic:intermediateCatchEvent>
    <semantic:task id="task_2_2" name="Order from supplier" />
    <semantic:sequenceFlow id="flow_2_1" name="" sourceRef="start_event_2" targetRef="task_2_1" />
    <semantic:sequenceFlow id="flow_2_2" name="" sourceRef="task_2_1" targetRef="exclusive_gateway_2_1" />
    <semantic:sequenceFlow id="flow_2_3" name="&#62; 2 days" sourceRef="exclusive_gateway_2_1" targetRef="intermediate_throw_event_2_1" />
    <semantic:sequenceFlow id="flow_2_4" name="&#60; = 2 days" sourceRef="exclusive_gateway_2_1" targetRef="task_2_2" />
    <semantic:sequenceFlow id="flow_2_5" name="" sourceRef="intermediate_throw_event_2_1" targetRef="task_2_2" />
    <semantic:sequenceFlow id="flow_2_6" name="No" sourceRef="exclusive_gateway_2_1" targetRef="end_event_2_2" />
    <semantic:sequenceFlow id="flow_2_7" name="" sourceRef="intermediate_catch_event_2_1" targetRef="end_event_2_1" />
    <semantic:sequenceFlow id="flow_2_8" name="" sourceRef="task_2_2" targetRef="intermediate_catch_event_2_1" />
  </semantic:process>
  <bpmndi:BPMNDiagram id="Trisotech.Visio-_0" name="Procurement" documentation="" resolution="96.00000267028808">
    <bpmndi:BPMNPlane bpmnElement="process_2">
      <bpmndi:BPMNShape id="Trisotech.Visio__0_start_event_2" bpmnElement="start_event_2">
        <dc:Bounds x="155" y="204" width="30" height="30" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_task_2_1" bpmnElement="task_2_1">
        <dc:Bounds x="228" y="185" width="83" height="68" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_exclusive_gateway_2_1" bpmnElement="exclusive_gateway_2_1" isMarkerVisible="true">
        <dc:Bounds x="400" y="198" width="42" height="42" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="339" y="190" width="62" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_intermediate_throw_event_2_1" bpmnElement="intermediate_throw_event_2_1">
        <dc:Bounds x="550" y="203" width="32" height="32" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="534" y="243" width="63" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_end_event_2_1" bpmnElement="end_event_2_1">
        <dc:Bounds x="834" y="97" width="32" height="32" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="825" y="132" width="50" height="30" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_end_event_2_2" bpmnElement="end_event_2_2">
        <dc:Bounds x="550" y="301" width="32" height="32" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="532" y="343" width="68" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_intermediate_catch_event_2_1" bpmnElement="intermediate_catch_event_2_1">
        <dc:Bounds x="740" y="97" width="32" height="32" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="725" y="132" width="60" height="30" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_task_2_2" bpmnElement="task_2_2">
        <dc:Bounds x="601" y="79" width="83" height="68" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_2_1" bpmnElement="flow_2_1">
        <di:waypoint x="185" y="219" />
        <di:waypoint x="228" y="219" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_2_2" bpmnElement="flow_2_2">
        <di:waypoint x="311" y="219" />
        <di:waypoint x="400" y="219" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_2_3" bpmnElement="flow_2_3">
        <di:waypoint x="442" y="219" />
        <di:waypoint x="550" y="219" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="465" y="194" width="42" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_2_4" bpmnElement="flow_2_4">
        <di:waypoint x="421" y="198" />
        <di:waypoint x="421" y="113" />
        <di:waypoint x="601" y="113" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="434" y="123" width="52" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_2_5" bpmnElement="flow_2_5">
        <di:waypoint x="582" y="219" />
        <di:waypoint x="642" y="219" />
        <di:waypoint x="642" y="147" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_2_6" bpmnElement="flow_2_6">
        <di:waypoint x="421" y="240" />
        <di:waypoint x="421" y="317" />
        <di:waypoint x="550" y="317" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="429" y="293" width="15" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_2_7" bpmnElement="flow_2_7">
        <di:waypoint x="772" y="113" />
        <di:waypoint x="834" y="113" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_2_8" bpmnElement="flow_2_8">
        <di:waypoint x="684" y="113" />
        <di:waypoint x="740" y="113" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</semantic:definitions>
        `;
}

function getIncidentManagementBpmnDiagram(){
    return `<?xml version="1.0" encoding="UTF-8"?>
<semantic:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL">
  <semantic:message id="message_1" />
  <semantic:message id="message_2" />
  <semantic:process id="process_2" isExecutable="false">
    <semantic:startEvent id="start_event" name="Customer has a problem">
      <semantic:outgoing>flow_7</semantic:outgoing>
      <semantic:messageEventDefinition messageRef="message_1" />
    </semantic:startEvent>
    <semantic:manualTask id="manual_task_1" name="Get problem description">
      <semantic:incoming>flow_7</semantic:incoming>
      <semantic:outgoing>flow_6</semantic:outgoing>
    </semantic:manualTask>
    <semantic:manualTask id="manual_task_3" name="Explain solution">
      <semantic:incoming>flow_4</semantic:incoming>
      <semantic:incoming>flow_2</semantic:incoming>
      <semantic:outgoing>flow_1</semantic:outgoing>
    </semantic:manualTask>
    <semantic:manualTask id="manual_task_2" name="Send mail to support system">
      <semantic:incoming>flow_5</semantic:incoming>
      <semantic:outgoing>flow_3</semantic:outgoing>
    </semantic:manualTask>
    <semantic:intermediateCatchEvent id="intermediate_catch_event" name="Answer received">
      <semantic:incoming>flow_3</semantic:incoming>
      <semantic:outgoing>flow_2</semantic:outgoing>
      <semantic:messageEventDefinition messageRef="message_2" />
    </semantic:intermediateCatchEvent>
    <semantic:endEvent id="end_event" name="">
      <semantic:incoming>flow_1</semantic:incoming>
    </semantic:endEvent>
    <semantic:exclusiveGateway id="exclusive_gateway" name="Can handle myself?" default="flow_5">
      <semantic:incoming>flow_6</semantic:incoming>
      <semantic:outgoing>flow_5</semantic:outgoing>
      <semantic:outgoing>flow_4</semantic:outgoing>
    </semantic:exclusiveGateway>
    <semantic:sequenceFlow id="flow_1" name="" sourceRef="manual_task_3" targetRef="end_event" />
    <semantic:sequenceFlow id="flow_2" name="" sourceRef="intermediate_catch_event" targetRef="manual_task_3" />
    <semantic:sequenceFlow id="flow_3" name="" sourceRef="manual_task_2" targetRef="intermediate_catch_event" />
    <semantic:sequenceFlow id="flow_4" name="yes" sourceRef="exclusive_gateway" targetRef="manual_task_3" />
    <semantic:sequenceFlow id="flow_5" name="no" sourceRef="exclusive_gateway" targetRef="manual_task_2" />
    <semantic:sequenceFlow id="flow_6" name="" sourceRef="manual_task_1" targetRef="exclusive_gateway" />
    <semantic:sequenceFlow id="flow_7" name="" sourceRef="start_event" targetRef="manual_task_1" />
  </semantic:process>
  <semantic:collaboration id="C1276277259631">
    <semantic:participant id="participant_2" name="Key account manager" processRef="process_2" />
    <semantic:participant id="participant_3" name="Trouble Ticket System" />
    <semantic:participant id="participant_1" name="VIP customer" />
    <semantic:messageFlow id="message_3" name="" sourceRef="participant_1" targetRef="manual_task_1" />
    <semantic:messageFlow id="message_4" name="" sourceRef="participant_1" targetRef="start_event" />
    <semantic:messageFlow id="message_5" name="" sourceRef="manual_task_1" targetRef="participant_1" />
    <semantic:messageFlow id="message_6" name="" sourceRef="manual_task_3" targetRef="participant_1" />
    <semantic:messageFlow id="message_7" name="" sourceRef="manual_task_2" targetRef="participant_3" />
    <semantic:messageFlow id="message_8" name="" sourceRef="participant_3" targetRef="intermediate_catch_event" />
  </semantic:collaboration>
  <bpmndi:BPMNDiagram id="Trisotech.Visio-_0" name="Account Manager Only" documentation="" resolution="96.00000267028808">
    <bpmndi:BPMNPlane bpmnElement="C1276277259631">
      <bpmndi:BPMNShape id="Trisotech.Visio_participant_2" bpmnElement="participant_2" isHorizontal="true">
        <dc:Bounds x="120" y="236" width="1000" height="194" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_7" bpmnElement="flow_7">
        <di:waypoint x="216" y="351" />
        <di:waypoint x="298" y="351" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_6" bpmnElement="flow_6">
        <di:waypoint x="381" y="351" />
        <di:waypoint x="459" y="351" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_5" bpmnElement="flow_5">
        <di:waypoint x="501" y="351" />
        <di:waypoint x="608" y="351" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="537" y="326" width="13" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_4" bpmnElement="flow_4">
        <di:waypoint x="480" y="330" />
        <di:waypoint x="480" y="287" />
        <di:waypoint x="878" y="287" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="491" y="293" width="18" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_3" bpmnElement="flow_3">
        <di:waypoint x="691" y="351" />
        <di:waypoint x="794" y="351" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_2" bpmnElement="flow_2">
        <di:waypoint x="826" y="351" />
        <di:waypoint x="920" y="351" />
        <di:waypoint x="920" y="321" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_flow_1" bpmnElement="flow_1">
        <di:waypoint x="961" y="287" />
        <di:waypoint x="1044" y="287" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_start_event" bpmnElement="start_event">
        <dc:Bounds x="186" y="336" width="30" height="30" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="162" y="372" width="78" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_manual_task_1" bpmnElement="manual_task_1">
        <dc:Bounds x="298" y="317" width="83" height="68" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_manual_task_3" bpmnElement="manual_task_3">
        <dc:Bounds x="878" y="253" width="83" height="68" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_manual_task_2" bpmnElement="manual_task_2">
        <dc:Bounds x="608" y="317" width="83" height="68" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_intermediate_catch_event" bpmnElement="intermediate_catch_event">
        <dc:Bounds x="794" y="335" width="32" height="32" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="763" y="313" width="82" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_end_event" bpmnElement="end_event">
        <dc:Bounds x="1044" y="271" width="32" height="32" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio__0_exclusive_gateway" bpmnElement="exclusive_gateway" isMarkerVisible="true">
        <dc:Bounds x="459" y="330" width="42" height="42" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="452" y="376" width="57" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio_participant_3" bpmnElement="participant_3" isHorizontal="true">
        <dc:Bounds x="120" y="478" width="1000" height="108" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Trisotech.Visio_participant_1" bpmnElement="participant_1" isHorizontal="true">
        <dc:Bounds x="120" y="82" width="1000" height="108" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_message_3" bpmnElement="message_3">
        <di:waypoint x="353" y="190" />
        <di:waypoint x="353" y="317" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_message_4" bpmnElement="message_4">
        <di:waypoint x="201" y="190" />
        <di:waypoint x="201" y="336" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_message_5" bpmnElement="message_5">
        <di:waypoint x="325" y="317" />
        <di:waypoint x="325" y="190" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_message_6" bpmnElement="message_6">
        <di:waypoint x="920" y="253" />
        <di:waypoint x="920" y="190" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_message_7" bpmnElement="message_7">
        <di:waypoint x="650" y="385" />
        <di:waypoint x="650" y="478" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Trisotech.Visio__0_message_8" bpmnElement="message_8">
        <di:waypoint x="810" y="478" />
        <di:waypoint x="810" y="367" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</semantic:definitions>

`;
}
// --------------------------------------------

// --------------------------------------------
// Inspired from 'triso - Hardware Retailer v2.bpmn' of https://www.omg.org/cgi-bin/doc?dtc/10-06-02.zip
function getHardwareRetailerDiagram(){
    return `<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
<semantic:definitions xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                      xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                      xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                      xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL">
    <semantic:process id="process_1" isExecutable="false">
        <semantic:laneSet>
            <semantic:lane id="lane_1" name="Logistics  Manager">
                <semantic:flowNodeRef>task_7</semantic:flowNodeRef>
            </semantic:lane>
            <semantic:lane id="lane_2" name="Clerk">
                <semantic:flowNodeRef>start_event</semantic:flowNodeRef>
                <semantic:flowNodeRef>parallel_gateway_1</semantic:flowNodeRef>
                <semantic:flowNodeRef>task_1</semantic:flowNodeRef>
                <semantic:flowNodeRef>exclusive_gateway_1</semantic:flowNodeRef>
                <semantic:flowNodeRef>task_3</semantic:flowNodeRef>
                <semantic:flowNodeRef>task_4</semantic:flowNodeRef>
                <semantic:flowNodeRef>task_6</semantic:flowNodeRef>
                <semantic:flowNodeRef>task_5</semantic:flowNodeRef>
                <semantic:flowNodeRef>inclusive_gateway_1</semantic:flowNodeRef>
                <semantic:flowNodeRef>inclusive_gateway_2</semantic:flowNodeRef>
                <semantic:flowNodeRef>exclusive_gateway_2</semantic:flowNodeRef>
            </semantic:lane>
            <semantic:lane id="lane_3" name="Warehouse Worker">
                <semantic:flowNodeRef>task_2</semantic:flowNodeRef>
                <semantic:flowNodeRef>parallel_gateway_2</semantic:flowNodeRef>
                <semantic:flowNodeRef>task_8</semantic:flowNodeRef>
                <semantic:flowNodeRef>end_event</semantic:flowNodeRef>
            </semantic:lane>
        </semantic:laneSet>
        <semantic:startEvent id="start_event" name="Goods  to ship"/>
        <semantic:parallelGateway id="parallel_gateway_1" name="" gatewayDirection="Unspecified"/>
        <semantic:task id="task_1" name="Decide if normal post or special shipment" completionQuantity="1" isForCompensation="false" startQuantity="1"/>
        <semantic:task id="task_2" name="Package goods" completionQuantity="1" isForCompensation="false" startQuantity="1"/>
        <semantic:exclusiveGateway id="exclusive_gateway_1" name="Mode of delivery" gatewayDirection="Unspecified"/>
        <semantic:task id="task_3" name="Request quotes from carriers" completionQuantity="1" isForCompensation="false" startQuantity="1"/>
        <semantic:task id="task_4" name="Assign a carrier &amp; prepare paperwork" completionQuantity="1" isForCompensation="false" startQuantity="1"/>
        <semantic:task id="task_5" name="Check if extra insurance is necessary" completionQuantity="1" isForCompensation="false" startQuantity="1"/>
        <semantic:inclusiveGateway id="inclusive_gateway_1" name="" gatewayDirection="Unspecified"/>
        <semantic:task id="task_6" name="Fill in a Post label" completionQuantity="1" isForCompensation="false" startQuantity="1"/>
        <semantic:task id="task_7" name="Take out extra insurance" completionQuantity="1" isForCompensation="false" startQuantity="1"/>
        <semantic:inclusiveGateway id="inclusive_gateway_2" name="" gatewayDirection="Unspecified"/>
        <semantic:exclusiveGateway id="exclusive_gateway_2" name="" gatewayDirection="Unspecified"/>
        <semantic:parallelGateway id="parallel_gateway_2" name="" gatewayDirection="Unspecified"/>
        <semantic:task id="task_8" name="Add paperwork and move package to pick area" completionQuantity="1" isForCompensation="false" startQuantity="1"/>
        <semantic:endEvent id="end_event" name="Goods available  for pick"/>
        <semantic:sequenceFlow id="sequence_flow_1" name="" sourceRef="start_event" targetRef="parallel_gateway_1"/>
        <semantic:sequenceFlow id="sequence_flow_2" name="" sourceRef="parallel_gateway_1" targetRef="task_1"/>
        <semantic:sequenceFlow id="sequence_flow_3" name="" sourceRef="task_1" targetRef="exclusive_gateway_1"/>
        <semantic:sequenceFlow id="sequence_flow_4" name="Special Carrier" sourceRef="exclusive_gateway_1" targetRef="task_3"/>
        <semantic:sequenceFlow id="sequence_flow_5" name="Normal Post" sourceRef="exclusive_gateway_1" targetRef="task_5"/>
        <semantic:sequenceFlow id="sequence_flow_6" name="" sourceRef="task_5" targetRef="inclusive_gateway_1"/>
        <semantic:sequenceFlow id="sequence_flow_7" name="extra insurance required" sourceRef="inclusive_gateway_1" targetRef="task_7"/>
        <semantic:sequenceFlow id="sequence_flow_8" name="Always" sourceRef="inclusive_gateway_1" targetRef="task_6"/>
        <semantic:sequenceFlow id="sequence_flow_9" name="" sourceRef="task_6" targetRef="inclusive_gateway_2"/>
        <semantic:sequenceFlow id="sequence_flow_10" name="" sourceRef="task_7" targetRef="inclusive_gateway_2"/>
        <semantic:sequenceFlow id="sequence_flow_11" name="" sourceRef="inclusive_gateway_2" targetRef="exclusive_gateway_2"/>
        <semantic:sequenceFlow id="sequence_flow_12" name="" sourceRef="task_3" targetRef="task_4"/>
        <semantic:sequenceFlow id="sequence_flow_13" name="" sourceRef="task_4" targetRef="exclusive_gateway_2"/>
        <semantic:sequenceFlow id="sequence_flow_14" name="" sourceRef="exclusive_gateway_2" targetRef="parallel_gateway_2"/>
        <semantic:sequenceFlow id="sequence_flow_15" name="" sourceRef="task_2" targetRef="parallel_gateway_2"/>
        <semantic:sequenceFlow id="sequence_flow_16" name="" sourceRef="parallel_gateway_2" targetRef="task_8"/>
        <semantic:sequenceFlow id="sequence_flow_17" name="" sourceRef="task_8" targetRef="end_event"/>
        <semantic:sequenceFlow id="sequence_flow_18" name="" sourceRef="parallel_gateway_1" targetRef="task_2"/>
        <!-- not correctly displayed, see https://github.com/process-analytics/bpmn-visualization-js/issues/1368
        <semantic:textAnnotation id="text_annotation">
            <semantic:text>Insurance is included in carrier service</semantic:text>
        </semantic:textAnnotation>
        <semantic:association id="association" associationDirection="None" sourceRef="sequence_flow_4" targetRef="text_annotation"/>
        -->
    </semantic:process>
    <semantic:collaboration id="collaboration">
        <semantic:participant id="participant_1" name="Hardware Retailer" processRef="process_1"/>
    </semantic:collaboration>
    <bpmndi:BPMNDiagram name="Untitled Diagram" documentation="" resolution="96.00000267028808">
        <bpmndi:BPMNPlane bpmnElement="collaboration">
            <bpmndi:BPMNShape id="shape_participant_1" bpmnElement="participant_1" isHorizontal="true">
                <dc:Bounds x="160" y="82" width="1570" height="658"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_lane_1" bpmnElement="lane_1" isHorizontal="true">
                <dc:Bounds x="190" y="82" width="1540" height="148"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_lane_2" bpmnElement="lane_2" isHorizontal="true">
                <dc:Bounds x="190" y="230" width="1540" height="300"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_lane_3" bpmnElement="lane_3" isHorizontal="true">
                <dc:Bounds x="190" y="530" width="1540" height="210"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_task_7" bpmnElement="task_7">
                <dc:Bounds x="1058" y="122" width="83" height="68"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_start_event" bpmnElement="start_event">
                <dc:Bounds x="275" y="425" width="30" height="30"/>
                <bpmndi:BPMNLabel>
                    <dc:Bounds x="256" y="455" width="68" height="14"/>
                </bpmndi:BPMNLabel>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_parallel_gateway_1" bpmnElement="parallel_gateway_1">
                <dc:Bounds x="359" y="419" width="42" height="42"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_task_1" bpmnElement="task_1">
                <dc:Bounds x="468" y="406" width="83" height="68"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_exclusive_gateway_1" bpmnElement="exclusive_gateway_1" isMarkerVisible="false">
                <dc:Bounds x="619" y="419" width="42" height="42"/>
                <bpmndi:BPMNLabel>
                    <dc:Bounds x="600" y="461" width="81" height="14"/>
                </bpmndi:BPMNLabel>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_task_3" bpmnElement="task_3">
                <dc:Bounds x="868" y="406" width="83" height="68"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_task_4" bpmnElement="task_4">
                <dc:Bounds x="1078" y="406" width="83" height="68"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_task_6" bpmnElement="task_6">
                <dc:Bounds x="1018" y="287" width="83" height="68"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_task_5" bpmnElement="task_5">
                <dc:Bounds x="728" y="287" width="83" height="68"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_inclusive_gateway_1" bpmnElement="inclusive_gateway_1">
                <dc:Bounds x="889" y="300" width="42" height="42"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_inclusive_gateway_2" bpmnElement="inclusive_gateway_2">
                <dc:Bounds x="1179" y="300" width="42" height="42"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_exclusive_gateway_2" bpmnElement="exclusive_gateway_2" isMarkerVisible="false">
                <dc:Bounds x="1259" y="419" width="42" height="42"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_task_2" bpmnElement="task_2">
                <dc:Bounds x="598" y="596" width="83" height="68"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_parallel_gateway_2" bpmnElement="parallel_gateway_2">
                <dc:Bounds x="1259" y="609" width="42" height="42"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_task_8" bpmnElement="task_8">
                <dc:Bounds x="1428" y="596" width="83" height="68"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNShape id="shape_end_event" bpmnElement="end_event">
                <dc:Bounds x="1634" y="614" width="32" height="32"/>
                <bpmndi:BPMNLabel>
                    <dc:Bounds x="1611" y="646" width="79" height="27"/>
                </bpmndi:BPMNLabel>
            </bpmndi:BPMNShape>
            <!-- not correctly displayed, see https://github.com/process-analytics/bpmn-visualization-js/issues/1368
            <bpmndi:BPMNShape id="shape_text_annotation" bpmnElement="text_annotation">
                <dc:Bounds x="740" y="460" width="108" height="49" />
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNShape>
            -->
            <bpmndi:BPMNEdge id="edge_sequence_flow_10" bpmnElement="sequence_flow_10">
                <di:waypoint x="1141" y="156"/>
                <di:waypoint x="1200" y="156"/>
                <di:waypoint x="1200" y="300"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_16" bpmnElement="sequence_flow_16">
                <di:waypoint x="1301" y="630"/>
                <di:waypoint x="1428" y="630"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_14" bpmnElement="sequence_flow_14">
                <di:waypoint x="1280" y="461"/>
                <di:waypoint x="1280" y="609"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_12" bpmnElement="sequence_flow_12">
                <di:waypoint x="951" y="440"/>
                <di:waypoint x="1078" y="440"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_3" bpmnElement="sequence_flow_3">
                <di:waypoint x="551" y="440"/>
                <di:waypoint x="619" y="440"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_8" bpmnElement="sequence_flow_8">
                <di:waypoint x="931" y="321"/>
                <di:waypoint x="1018" y="321"/>
                <bpmndi:BPMNLabel>
                    <dc:Bounds x="948" y="296" width="35" height="14"/>
                </bpmndi:BPMNLabel>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_5" bpmnElement="sequence_flow_5">
                <di:waypoint x="640" y="419"/>
                <di:waypoint x="640" y="321"/>
                <di:waypoint x="728" y="321"/>
                <bpmndi:BPMNLabel>
                    <dc:Bounds x="649" y="333" width="61" height="14"/>
                </bpmndi:BPMNLabel>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_18" bpmnElement="sequence_flow_18">
                <di:waypoint x="380" y="461"/>
                <di:waypoint x="380" y="630"/>
                <di:waypoint x="598" y="630"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_17" bpmnElement="sequence_flow_17">
                <di:waypoint x="1511" y="630"/>
                <di:waypoint x="1634" y="630"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_7" bpmnElement="sequence_flow_7">
                <di:waypoint x="910" y="300"/>
                <di:waypoint x="910" y="156"/>
                <di:waypoint x="1058" y="156"/>
                <bpmndi:BPMNLabel>
                    <dc:Bounds x="922" y="166" width="76" height="27"/>
                </bpmndi:BPMNLabel>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_4" bpmnElement="sequence_flow_4">
                <di:waypoint x="661" y="440"/>
                <di:waypoint x="868" y="440"/>
                <bpmndi:BPMNLabel>
                    <dc:Bounds x="723" y="413" width="73" height="14" />
                </bpmndi:BPMNLabel>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_2" bpmnElement="sequence_flow_2">
                <di:waypoint x="401" y="440"/>
                <di:waypoint x="468" y="440"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_15" bpmnElement="sequence_flow_15">
                <di:waypoint x="681" y="630"/>
                <di:waypoint x="1259" y="630"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_11" bpmnElement="sequence_flow_11">
                <di:waypoint x="1221" y="321"/>
                <di:waypoint x="1280" y="321"/>
                <di:waypoint x="1280" y="419"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_13" bpmnElement="sequence_flow_13">
                <di:waypoint x="1161" y="440"/>
                <di:waypoint x="1259" y="440"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_1" bpmnElement="sequence_flow_1">
                <di:waypoint x="305" y="440"/>
                <di:waypoint x="359" y="440"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_9" bpmnElement="sequence_flow_9">
                <di:waypoint x="1101" y="321"/>
                <di:waypoint x="1179" y="321"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNEdge id="edge_sequence_flow_6" bpmnElement="sequence_flow_6">
                <di:waypoint x="811" y="321"/>
                <di:waypoint x="889" y="321"/>
                <bpmndi:BPMNLabel/>
            </bpmndi:BPMNEdge>
            <!-- not correctly displayed, see https://github.com/process-analytics/bpmn-visualization-js/issues/1368
            <bpmndi:BPMNEdge id="edge_association" bpmnElement="association">
                <di:waypoint x="710" y="440" />
                <di:waypoint x="710" y="488" />
                <di:waypoint x="740" y="488" />
                <bpmndi:BPMNLabel />
            </bpmndi:BPMNEdge>
            -->
        </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
</semantic:definitions>`;
}

// --------------------------------------------

// --------------------------------------------
// Custom diagram to show fit capabilities
function getHorizontalBpmnDiagram() {
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

function getVerticalBpmnDiagram() {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1jzeku5" targetNamespace="http://example.com/schema/bpmn">
          <bpmn:process id="Process_1tm11eu" isExecutable="false">
            <bpmn:startEvent id="StartEvent_07yal9c" name="Start">
              <bpmn:outgoing>Flow_0alm7tv</bpmn:outgoing>
            </bpmn:startEvent>
            <bpmn:task id="Activity_1xr04un" name="Task 1">
              <bpmn:incoming>Flow_0ptmqyy</bpmn:incoming>
              <bpmn:outgoing>Flow_0crjat0</bpmn:outgoing>
            </bpmn:task>
            <bpmn:sequenceFlow id="Flow_0alm7tv" sourceRef="StartEvent_07yal9c" targetRef="Gateway_0a2irgl" />
            <bpmn:sequenceFlow id="Flow_0wu2yg6" sourceRef="Gateway_0a2irgl" targetRef="Activity_0kn4d46" />
            <bpmn:sequenceFlow id="Flow_1gcjvke" sourceRef="Activity_0kn4d46" targetRef="Activity_1j15wcw" />
            <bpmn:sequenceFlow id="Flow_1bmck4z" sourceRef="Activity_1j15wcw" targetRef="Activity_0wbisol" />
            <bpmn:endEvent id="Event_157byoi" name="End">
              <bpmn:incoming>Flow_0nht2cb</bpmn:incoming>
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
              <bpmn:outgoing>Flow_005tmmb</bpmn:outgoing>
            </bpmn:serviceTask>
            <bpmn:scriptTask id="Activity_0y3sd80" name="Task 5">
              <bpmn:incoming>Flow_0crjat0</bpmn:incoming>
              <bpmn:outgoing>Flow_13bsxw3</bpmn:outgoing>
            </bpmn:scriptTask>
            <bpmn:exclusiveGateway id="Gateway_0a2irgl">
              <bpmn:incoming>Flow_0alm7tv</bpmn:incoming>
              <bpmn:outgoing>Flow_0ptmqyy</bpmn:outgoing>
              <bpmn:outgoing>Flow_0wu2yg6</bpmn:outgoing>
            </bpmn:exclusiveGateway>
            <bpmn:sequenceFlow id="Flow_0ptmqyy" sourceRef="Gateway_0a2irgl" targetRef="Activity_1xr04un" />
            <bpmn:exclusiveGateway id="Gateway_0d7p6vt">
              <bpmn:incoming>Flow_005tmmb</bpmn:incoming>
              <bpmn:incoming>Flow_13bsxw3</bpmn:incoming>
              <bpmn:outgoing>Flow_0nht2cb</bpmn:outgoing>
            </bpmn:exclusiveGateway>
            <bpmn:sequenceFlow id="Flow_005tmmb" sourceRef="Activity_0wbisol" targetRef="Gateway_0d7p6vt" />
            <bpmn:sequenceFlow id="Flow_13bsxw3" sourceRef="Activity_0y3sd80" targetRef="Gateway_0d7p6vt" />
            <bpmn:sequenceFlow id="Flow_0crjat0" sourceRef="Activity_1xr04un" targetRef="Activity_0y3sd80" />
            <bpmn:sequenceFlow id="Flow_0nht2cb" sourceRef="Gateway_0d7p6vt" targetRef="Event_157byoi" />
          </bpmn:process>
          <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1tm11eu">
              <bpmndi:BPMNEdge id="Flow_0alm7tv_di" bpmnElement="Flow_0alm7tv">
                <di:waypoint x="304" y="138" />
                <di:waypoint x="304" y="195" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_0wu2yg6_di" bpmnElement="Flow_0wu2yg6">
                <di:waypoint x="329" y="220" />
                <di:waypoint x="400" y="220" />
                <di:waypoint x="400" y="290" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_1gcjvke_di" bpmnElement="Flow_1gcjvke">
                <di:waypoint x="400" y="370" />
                <di:waypoint x="400" y="430" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_1bmck4z_di" bpmnElement="Flow_1bmck4z">
                <di:waypoint x="400" y="510" />
                <di:waypoint x="400" y="580" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_0ptmqyy_di" bpmnElement="Flow_0ptmqyy">
                <di:waypoint x="279" y="220" />
                <di:waypoint x="210" y="220" />
                <di:waypoint x="210" y="290" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_005tmmb_di" bpmnElement="Flow_005tmmb">
                <di:waypoint x="400" y="660" />
                <di:waypoint x="400" y="730" />
                <di:waypoint x="329" y="730" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_13bsxw3_di" bpmnElement="Flow_13bsxw3">
                <di:waypoint x="210" y="660" />
                <di:waypoint x="210" y="730" />
                <di:waypoint x="279" y="730" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_0crjat0_di" bpmnElement="Flow_0crjat0">
                <di:waypoint x="210" y="370" />
                <di:waypoint x="210" y="580" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="Flow_0nht2cb_di" bpmnElement="Flow_0nht2cb">
                <di:waypoint x="304" y="755" />
                <di:waypoint x="304" y="832" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_07yal9c">
                <dc:Bounds x="286" y="102" width="36" height="36" />
                <bpmndi:BPMNLabel>
                  <dc:Bounds x="292" y="78" width="24" height="14" />
                </bpmndi:BPMNLabel>
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Gateway_0a2irgl_di" bpmnElement="Gateway_0a2irgl" isMarkerVisible="true">
                <dc:Bounds x="279" y="195" width="50" height="50" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Activity_1xr04un_di" bpmnElement="Activity_1xr04un">
                <dc:Bounds x="160" y="290" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Activity_03oln2l_di" bpmnElement="Activity_0kn4d46">
                <dc:Bounds x="350" y="290" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Activity_0owvwg0_di" bpmnElement="Activity_1j15wcw">
                <dc:Bounds x="350" y="430" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Activity_10z8211_di" bpmnElement="Activity_0wbisol">
                <dc:Bounds x="350" y="580" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Activity_1aadlt5_di" bpmnElement="Activity_0y3sd80">
                <dc:Bounds x="160" y="580" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Event_157byoi_di" bpmnElement="Event_157byoi">
                <dc:Bounds x="286" y="832" width="36" height="36" />
                <bpmndi:BPMNLabel>
                  <dc:Bounds x="294" y="875" width="20" height="14" />
                </bpmndi:BPMNLabel>
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Gateway_0d7p6vt_di" bpmnElement="Gateway_0d7p6vt" isMarkerVisible="true">
                <dc:Bounds x="279" y="705" width="50" height="50" />
              </bpmndi:BPMNShape>
            </bpmndi:BPMNPlane>
          </bpmndi:BPMNDiagram>
        </bpmn:definitions>
        `;
}
// --------------------------------------------

function getCustomColorsBpmnDiagram() {
    return  `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_12nbmjq" targetNamespace="http://example.bpmn.com/schema/bpmn">
  <bpmn:collaboration id="Collaboration_03068dc">
    <bpmn:participant id="Participant_0nuvj8r" name="Pool 1" processRef="Process_0vbjbkf" />
  </bpmn:collaboration>
  <bpmn:process id="Process_0vbjbkf" isExecutable="false">
    <bpmn:laneSet id="LaneSet_1e2wb07">
      <bpmn:lane id="Lane_0xke7q1" name="Lane 3">
        <bpmn:flowNodeRef>Event_1q818hp</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_1wihmdr</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_0gsh2b6</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_1s7095g</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_049h7gx</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_1dunul0" name="Lane 2">
        <bpmn:flowNodeRef>Activity_1wr0s0r</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1c0vze1</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_0gj6ba4</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_1euev5d</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_0b04u9t</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1isj93o</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_1hq21li</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_13kpaun" name="Lane 1">
        <bpmn:flowNodeRef>Activity_1sn3x37</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_05sspdt</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_14pg2n4</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_06pc14u</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_19jjic7</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>StartEvent_0av7pgo</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1s8cug0</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>
    <bpmn:userTask id="Activity_1sn3x37" name="User Task 0">
      <bpmn:incoming>Flow_1ueepp9</bpmn:incoming>
      <bpmn:outgoing>Flow_1bewc4s</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_05sspdt" name="gateway 1">
      <bpmn:incoming>Flow_1noi0ay</bpmn:incoming>
      <bpmn:outgoing>Flow_0i9h5sw</bpmn:outgoing>
      <bpmn:outgoing>Flow_0ule9dn</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:endEvent id="Event_14pg2n4" name="terminate end 1">
      <bpmn:incoming>Flow_1dmga1h</bpmn:incoming>
      <bpmn:terminateEventDefinition />
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1ueepp9" sourceRef="StartEvent_0av7pgo" targetRef="Activity_1sn3x37" />
    <bpmn:sequenceFlow id="Flow_1bewc4s" name="link" sourceRef="Activity_1sn3x37" targetRef="Activity_06pc14u" />
    <bpmn:sequenceFlow id="Flow_0i9h5sw" name="rejected" sourceRef="Gateway_05sspdt" targetRef="Activity_1wr0s0r" />
    <bpmn:sequenceFlow id="Flow_0ule9dn" name="accepted" sourceRef="Gateway_05sspdt" targetRef="Activity_1s8cug0" />
    <bpmn:sequenceFlow id="Flow_1ceafgv" sourceRef="Activity_1s8cug0" targetRef="Activity_19jjic7" />
    <bpmn:sequenceFlow id="Flow_1dmga1h" sourceRef="Activity_19jjic7" targetRef="Event_14pg2n4" />
    <bpmn:sequenceFlow id="Flow_1noi0ay" sourceRef="Activity_06pc14u" targetRef="Gateway_05sspdt" />
    <bpmn:task id="Activity_06pc14u" name="Task 1">
      <bpmn:incoming>Flow_1bewc4s</bpmn:incoming>
      <bpmn:outgoing>Flow_1noi0ay</bpmn:outgoing>
    </bpmn:task>
    <bpmn:serviceTask id="Activity_19jjic7" name="Service Task 1.2">
      <bpmn:incoming>Flow_1ceafgv</bpmn:incoming>
      <bpmn:outgoing>Flow_1dmga1h</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:startEvent id="StartEvent_0av7pgo" name="start 1">
      <bpmn:outgoing>Flow_1ueepp9</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_17xfjtr" />
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_0g017tm" sourceRef="Event_1q818hp" targetRef="Gateway_1hq21li" />
    <bpmn:sequenceFlow id="Flow_0y3c2hb" sourceRef="Event_0b04u9t" targetRef="Activity_1isj93o" />
    <bpmn:serviceTask id="Activity_1wr0s0r" name="Service Task 2.1">
      <bpmn:incoming>Flow_0i9h5sw</bpmn:incoming>
      <bpmn:outgoing>Flow_1hvyo7b</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="Flow_1hvyo7b" sourceRef="Activity_1wr0s0r" targetRef="Activity_1c0vze1" />
    <bpmn:sequenceFlow id="Flow_0sqwsrw" sourceRef="Activity_1c0vze1" targetRef="Gateway_1hq21li" />
    <bpmn:sequenceFlow id="Flow_09zytr1" sourceRef="Gateway_1hq21li" targetRef="Event_0gj6ba4" />
    <bpmn:sequenceFlow id="Flow_1rtnm1c" sourceRef="Activity_1isj93o" targetRef="Event_1euev5d" />
    <bpmn:sequenceFlow id="Flow_08z7uoy" sourceRef="Activity_0gsh2b6" targetRef="Event_1wihmdr" />
    <bpmn:sequenceFlow id="Flow_0t8djvo" sourceRef="Event_1wihmdr" targetRef="Event_1q818hp" />
    <bpmn:boundaryEvent id="Event_0b04u9t" attachedToRef="Activity_1c0vze1">
      <bpmn:outgoing>Flow_0y3c2hb</bpmn:outgoing>
      <bpmn:timerEventDefinition id="TimerEventDefinition_1uqne1v" />
    </bpmn:boundaryEvent>
    <bpmn:userTask id="Activity_1c0vze1" name="User Task 2.2">
      <bpmn:incoming>Flow_1hvyo7b</bpmn:incoming>
      <bpmn:outgoing>Flow_0sqwsrw</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:endEvent id="Event_0gj6ba4" name="end 2.1">
      <bpmn:incoming>Flow_09zytr1</bpmn:incoming>
      <bpmn:messageEventDefinition id="MessageEventDefinition_0kuujqg" />
    </bpmn:endEvent>
    <bpmn:endEvent id="Event_1euev5d" name="end 2.2">
      <bpmn:incoming>Flow_1rtnm1c</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:intermediateThrowEvent id="Event_1q818hp" name="message throw intermediate 1">
      <bpmn:incoming>Flow_0t8djvo</bpmn:incoming>
      <bpmn:outgoing>Flow_0g017tm</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_11kxj5k" />
    </bpmn:intermediateThrowEvent>
    <bpmn:intermediateCatchEvent id="Event_1wihmdr" name="message catch intermediate 1">
      <bpmn:incoming>Flow_08z7uoy</bpmn:incoming>
      <bpmn:outgoing>Flow_0t8djvo</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_077j2qu" />
    </bpmn:intermediateCatchEvent>
    <bpmn:userTask id="Activity_0gsh2b6" name="User Task 3.1">
      <bpmn:incoming>Flow_1xebfcb</bpmn:incoming>
      <bpmn:outgoing>Flow_08z7uoy</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:startEvent id="Event_1s7095g" name="start 2">
      <bpmn:outgoing>Flow_0pmwt6x</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_0pmwt6x" sourceRef="Event_1s7095g" targetRef="Activity_049h7gx" />
    <bpmn:sequenceFlow id="Flow_1xebfcb" sourceRef="Activity_049h7gx" targetRef="Activity_0gsh2b6" />
    <bpmn:manualTask id="Activity_049h7gx" name="Manual Task 3.0">
      <bpmn:incoming>Flow_0pmwt6x</bpmn:incoming>
      <bpmn:outgoing>Flow_1xebfcb</bpmn:outgoing>
    </bpmn:manualTask>
    <bpmn:scriptTask id="Activity_1s8cug0" name="Script Task 1.1">
      <bpmn:incoming>Flow_0ule9dn</bpmn:incoming>
      <bpmn:outgoing>Flow_1ceafgv</bpmn:outgoing>
    </bpmn:scriptTask>
    <bpmn:task id="Activity_1isj93o" name="Task 2.3">
      <bpmn:incoming>Flow_0y3c2hb</bpmn:incoming>
      <bpmn:outgoing>Flow_1rtnm1c</bpmn:outgoing>
    </bpmn:task>
    <bpmn:parallelGateway id="Gateway_1hq21li" name="gateway 2">
      <bpmn:incoming>Flow_0sqwsrw</bpmn:incoming>
      <bpmn:incoming>Flow_0g017tm</bpmn:incoming>
      <bpmn:outgoing>Flow_09zytr1</bpmn:outgoing>
    </bpmn:parallelGateway>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_03068dc">
      <bpmndi:BPMNShape id="Participant_0nuvj8r_di" bpmnElement="Participant_0nuvj8r" isHorizontal="true">
        <dc:Bounds x="158" y="50" width="1062" height="430" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_13kpaun_di" bpmnElement="Lane_13kpaun" isHorizontal="true">
        <dc:Bounds x="188" y="50" width="1032" height="125" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_1dunul0_di" bpmnElement="Lane_1dunul0" isHorizontal="true">
        <dc:Bounds x="188" y="175" width="1032" height="185" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_0xke7q1_di" bpmnElement="Lane_0xke7q1" isHorizontal="true">
        <dc:Bounds x="188" y="360" width="1032" height="120" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1xebfcb_di" bpmnElement="Flow_1xebfcb">
        <di:waypoint x="420" y="420" />
        <di:waypoint x="500" y="420" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0pmwt6x_di" bpmnElement="Flow_0pmwt6x">
        <di:waypoint x="270" y="420" />
        <di:waypoint x="320" y="420" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0t8djvo_di" bpmnElement="Flow_0t8djvo">
        <di:waypoint x="718" y="420" />
        <di:waypoint x="822" y="420" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_08z7uoy_di" bpmnElement="Flow_08z7uoy">
        <di:waypoint x="600" y="420" />
        <di:waypoint x="682" y="420" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1rtnm1c_di" bpmnElement="Flow_1rtnm1c">
        <di:waypoint x="1040" y="226" />
        <di:waypoint x="1102" y="226" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_09zytr1_di" bpmnElement="Flow_09zytr1">
        <di:waypoint x="1015" y="304" />
        <di:waypoint x="1102" y="304" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0sqwsrw_di" bpmnElement="Flow_0sqwsrw">
        <di:waypoint x="890" y="304" />
        <di:waypoint x="965" y="304" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1hvyo7b_di" bpmnElement="Flow_1hvyo7b">
        <di:waypoint x="750" y="304" />
        <di:waypoint x="790" y="304" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0y3c2hb_di" bpmnElement="Flow_0y3c2hb">
        <di:waypoint x="890" y="246" />
        <di:waypoint x="890" y="226" />
        <di:waypoint x="940" y="226" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0g017tm_di" bpmnElement="Flow_0g017tm">
        <di:waypoint x="858" y="420" />
        <di:waypoint x="990" y="420" />
        <di:waypoint x="990" y="329" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1noi0ay_di" bpmnElement="Flow_1noi0ay">
        <di:waypoint x="600" y="110" />
        <di:waypoint x="675" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1dmga1h_di" bpmnElement="Flow_1dmga1h">
        <di:waypoint x="1040" y="110" />
        <di:waypoint x="1102" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ceafgv_di" bpmnElement="Flow_1ceafgv">
        <di:waypoint x="890" y="110" />
        <di:waypoint x="940" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ule9dn_di" bpmnElement="Flow_0ule9dn">
        <di:waypoint x="725" y="110" />
        <di:waypoint x="790" y="110" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="732" y="90" width="45" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0i9h5sw_di" bpmnElement="Flow_0i9h5sw">
        <di:waypoint x="700" y="135" />
        <di:waypoint x="700" y="264" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="708" y="144" width="40" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1bewc4s_di" bpmnElement="Flow_1bewc4s">
        <di:waypoint x="412" y="110" />
        <di:waypoint x="500" y="110" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="448" y="92" width="17" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ueepp9_di" bpmnElement="Flow_1ueepp9">
        <di:waypoint x="270" y="110" />
        <di:waypoint x="312" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Activity_0ifu0xr_di" bpmnElement="Activity_1sn3x37">
        <dc:Bounds x="312" y="70" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_05sspdt_di" bpmnElement="Gateway_05sspdt" isMarkerVisible="true">
        <dc:Bounds x="675" y="85" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="658" y="63" width="51" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_14pg2n4_di" bpmnElement="Event_14pg2n4">
        <dc:Bounds x="1102" y="92" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1106" y="135" width="28" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1u44j4q_di" bpmnElement="Activity_06pc14u">
        <dc:Bounds x="500" y="70" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_02k08fd_di" bpmnElement="Activity_19jjic7">
        <dc:Bounds x="940" y="70" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1kkb8ww_di" bpmnElement="StartEvent_0av7pgo">
        <dc:Bounds x="234" y="92" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="237" y="135" width="31" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0iznnsm_di" bpmnElement="Activity_1wr0s0r">
        <dc:Bounds x="650" y="264" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0jljuyk_di" bpmnElement="Activity_1c0vze1">
        <dc:Bounds x="790" y="264" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0bpyu2c_di" bpmnElement="Event_0gj6ba4">
        <dc:Bounds x="1102" y="286" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1102" y="329" width="37" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1euev5d_di" bpmnElement="Event_1euev5d">
        <dc:Bounds x="1102" y="208" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1102" y="251" width="37" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_14o73vn_di" bpmnElement="Event_1q818hp">
        <dc:Bounds x="822" y="402" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="803" y="445" width="75" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_00seehq_di" bpmnElement="Event_1wihmdr">
        <dc:Bounds x="682" y="402" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="663" y="445" width="74" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1wcuws6_di" bpmnElement="Activity_0gsh2b6">
        <dc:Bounds x="500" y="380" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0q6nq79_di" bpmnElement="Event_1s7095g">
        <dc:Bounds x="234" y="402" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="237" y="445" width="31" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0yqrg6a_di" bpmnElement="Activity_049h7gx">
        <dc:Bounds x="320" y="380" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1ozehkd_di" bpmnElement="Activity_1s8cug0">
        <dc:Bounds x="790" y="70" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1isj93o_di" bpmnElement="Activity_1isj93o">
        <dc:Bounds x="940" y="186" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0m423t9_di" bpmnElement="Gateway_1hq21li">
        <dc:Bounds x="965" y="279" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="924" y="329" width="51" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_09mwmj0_di" bpmnElement="Event_0b04u9t">
        <dc:Bounds x="872" y="246" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
}

function getCustomFontsBpmnDiagram() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_12nbmjq" targetNamespace="http://example.bpmn.com/schema/bpmn">
  <bpmn:collaboration id="Collaboration_03068dc">
    <bpmn:participant id="Participant_0nuvj8r" name="Pool 1" processRef="Process_0vbjbkf" />
  </bpmn:collaboration>
  <bpmn:process id="Process_0vbjbkf" isExecutable="false">
    <bpmn:laneSet id="LaneSet_1e2wb07">
      <bpmn:lane id="Lane_0xke7q1" name="Lane 3">
        <bpmn:flowNodeRef>Event_1wihmdr</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_1q818hp</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_1s7095g</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_0gsh2b6</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_1dunul0" name="Lane 2">
        <bpmn:flowNodeRef>Activity_1wr0s0r</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_1hq21li</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_0gj6ba4</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_13kpaun" name="Lane 1">
        <bpmn:flowNodeRef>Gateway_05sspdt</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_06pc14u</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_14pg2n4</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>StartEvent_0av7pgo</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1sn3x37</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>
    <bpmn:sequenceFlow id="Flow_08z7uoy" sourceRef="Activity_0gsh2b6" targetRef="Event_1wihmdr" />
    <bpmn:sequenceFlow id="Flow_1wwy4bv" sourceRef="Event_1s7095g" targetRef="Activity_0gsh2b6" />
    <bpmn:sequenceFlow id="Flow_1ueepp9" sourceRef="StartEvent_0av7pgo" targetRef="Activity_1sn3x37" />
    <bpmn:sequenceFlow id="Flow_1bewc4s" name="link" sourceRef="Activity_1sn3x37" targetRef="Activity_06pc14u" />
    <bpmn:sequenceFlow id="Flow_0i9h5sw" name="rejected" sourceRef="Gateway_05sspdt" targetRef="Activity_1wr0s0r" />
    <bpmn:sequenceFlow id="Flow_0ule9dn" name="accepted" sourceRef="Gateway_05sspdt" targetRef="Event_14pg2n4" />
    <bpmn:sequenceFlow id="Flow_1hvyo7b" sourceRef="Activity_1wr0s0r" targetRef="Gateway_1hq21li" />
    <bpmn:sequenceFlow id="Flow_09zytr1" sourceRef="Gateway_1hq21li" targetRef="Event_0gj6ba4" />
    <bpmn:sequenceFlow id="Flow_1noi0ay" sourceRef="Activity_06pc14u" targetRef="Gateway_05sspdt" />
    <bpmn:sequenceFlow id="Flow_0t8djvo" sourceRef="Event_1wihmdr" targetRef="Event_1q818hp" />
    <bpmn:sequenceFlow id="Flow_0g017tm" sourceRef="Event_1q818hp" targetRef="Gateway_1hq21li" />
    <bpmn:exclusiveGateway id="Gateway_05sspdt" name="gateway 1">
      <bpmn:incoming>Flow_1noi0ay</bpmn:incoming>
      <bpmn:outgoing>Flow_0i9h5sw</bpmn:outgoing>
      <bpmn:outgoing>Flow_0ule9dn</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="Activity_1wr0s0r" name="Service Task 2.1">
      <bpmn:incoming>Flow_0i9h5sw</bpmn:incoming>
      <bpmn:outgoing>Flow_1hvyo7b</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:task id="Activity_06pc14u" name="Task 1">
      <bpmn:incoming>Flow_1bewc4s</bpmn:incoming>
      <bpmn:outgoing>Flow_1noi0ay</bpmn:outgoing>
    </bpmn:task>
    <bpmn:intermediateCatchEvent id="Event_1wihmdr" name="timer catch intermediate 1">
      <bpmn:incoming>Flow_08z7uoy</bpmn:incoming>
      <bpmn:outgoing>Flow_0t8djvo</bpmn:outgoing>
      <bpmn:timerEventDefinition id="TimerEventDefinition_10x32k7" />
    </bpmn:intermediateCatchEvent>
    <bpmn:intermediateThrowEvent id="Event_1q818hp" name="message throw intermediate 1">
      <bpmn:incoming>Flow_0t8djvo</bpmn:incoming>
      <bpmn:outgoing>Flow_0g017tm</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_11kxj5k" />
    </bpmn:intermediateThrowEvent>
    <bpmn:parallelGateway id="Gateway_1hq21li" name="gateway 2">
      <bpmn:incoming>Flow_0g017tm</bpmn:incoming>
      <bpmn:incoming>Flow_1hvyo7b</bpmn:incoming>
      <bpmn:outgoing>Flow_09zytr1</bpmn:outgoing>
    </bpmn:parallelGateway>
    <bpmn:endEvent id="Event_14pg2n4" name="terminate end 1">
      <bpmn:incoming>Flow_0ule9dn</bpmn:incoming>
      <bpmn:terminateEventDefinition />
    </bpmn:endEvent>
    <bpmn:endEvent id="Event_0gj6ba4" name="end 2">
      <bpmn:incoming>Flow_09zytr1</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:startEvent id="Event_1s7095g" name="start 2">
      <bpmn:outgoing>Flow_1wwy4bv</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:startEvent id="StartEvent_0av7pgo" name="message start 1">
      <bpmn:outgoing>Flow_1ueepp9</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_17xfjtr" />
    </bpmn:startEvent>
    <bpmn:userTask id="Activity_1sn3x37" name="User Task 0">
      <bpmn:incoming>Flow_1ueepp9</bpmn:incoming>
      <bpmn:outgoing>Flow_1bewc4s</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Activity_0gsh2b6" name="User Task 3.1">
      <bpmn:incoming>Flow_1wwy4bv</bpmn:incoming>
      <bpmn:outgoing>Flow_08z7uoy</bpmn:outgoing>
    </bpmn:userTask>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_03068dc">
      <bpmndi:BPMNShape id="Participant_0nuvj8r_di" bpmnElement="Participant_0nuvj8r" isHorizontal="true">
        <dc:Bounds x="158" y="50" width="932" height="430" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_13kpaun_di" bpmnElement="Lane_13kpaun" isHorizontal="true">
        <dc:Bounds x="188" y="50" width="902" height="125" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_1dunul0_di" bpmnElement="Lane_1dunul0" isHorizontal="true">
        <dc:Bounds x="188" y="175" width="902" height="185" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_0xke7q1_di" bpmnElement="Lane_0xke7q1" isHorizontal="true">
        <dc:Bounds x="188" y="360" width="902" height="120" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0g017tm_di" bpmnElement="Flow_0g017tm">
        <di:waypoint x="738" y="420" />
        <di:waypoint x="870" y="420" />
        <di:waypoint x="870" y="295" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0t8djvo_di" bpmnElement="Flow_0t8djvo">
        <di:waypoint x="618" y="420" />
        <di:waypoint x="702" y="420" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1noi0ay_di" bpmnElement="Flow_1noi0ay">
        <di:waypoint x="650" y="110" />
        <di:waypoint x="695" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_09zytr1_di" bpmnElement="Flow_09zytr1">
        <di:waypoint x="895" y="270" />
        <di:waypoint x="982" y="270" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1hvyo7b_di" bpmnElement="Flow_1hvyo7b">
        <di:waypoint x="770" y="270" />
        <di:waypoint x="845" y="270" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ule9dn_di" bpmnElement="Flow_0ule9dn">
        <di:waypoint x="745" y="110" />
        <di:waypoint x="982" y="110" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="756" y="92" width="45" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0i9h5sw_di" bpmnElement="Flow_0i9h5sw">
        <di:waypoint x="720" y="135" />
        <di:waypoint x="720" y="230" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="730" y="143" width="40" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1bewc4s_di" bpmnElement="Flow_1bewc4s">
        <di:waypoint x="460" y="110" />
        <di:waypoint x="550" y="110" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="497" y="92" width="17" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ueepp9_di" bpmnElement="Flow_1ueepp9">
        <di:waypoint x="288" y="110" />
        <di:waypoint x="360" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1wwy4bv_di" bpmnElement="Flow_1wwy4bv">
        <di:waypoint x="278" y="420" />
        <di:waypoint x="360" y="420" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_08z7uoy_di" bpmnElement="Flow_08z7uoy">
        <di:waypoint x="460" y="420" />
        <di:waypoint x="582" y="420" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Gateway_05sspdt_di" bpmnElement="Gateway_05sspdt" isMarkerVisible="true">
        <dc:Bounds x="695" y="85" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="694" y="63" width="51" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0iznnsm_di" bpmnElement="Activity_1wr0s0r">
        <dc:Bounds x="670" y="230" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1u44j4q_di" bpmnElement="Activity_06pc14u">
        <dc:Bounds x="550" y="70" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1qthj5c_di" bpmnElement="Event_1wihmdr">
        <dc:Bounds x="582" y="402" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="565" y="445" width="70" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_14o73vn_di" bpmnElement="Event_1q818hp">
        <dc:Bounds x="702" y="402" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="683" y="445" width="75" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0m423t9_di" bpmnElement="Gateway_1hq21li">
        <dc:Bounds x="845" y="245" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="845" y="223" width="51" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_14pg2n4_di" bpmnElement="Event_14pg2n4">
        <dc:Bounds x="982" y="92" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="962" y="135" width="77" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0k2v5hp_di" bpmnElement="Event_0gj6ba4">
        <dc:Bounds x="982" y="252" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="986" y="295" width="28" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0q6nq79_di" bpmnElement="Event_1s7095g">
        <dc:Bounds x="242" y="402" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="245" y="445" width="31" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1kkb8ww_di" bpmnElement="StartEvent_0av7pgo">
        <dc:Bounds x="252" y="92" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="231" y="135" width="79" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ifu0xr_di" bpmnElement="Activity_1sn3x37">
        <dc:Bounds x="360" y="70" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1wcuws6_di" bpmnElement="Activity_0gsh2b6">
        <dc:Bounds x="360" y="380" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
}

function getCustomUserTaskIconBpmnDiagram() {
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

function getHacktoberfestBpmnDiagram(projectName) {
    return  `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="definition_1">
  <bpmn:collaboration id="collaboration_1">
    <bpmn:participant id="participant_1" name="Hacktoberfest participation" processRef="process_1" />
  </bpmn:collaboration>
  <bpmn:process id="process_1" isExecutable="false">
    <bpmn:startEvent id="start_event" name="Hacktoberfest starts on October, 1st">
      <bpmn:outgoing>sequence_flow_1</bpmn:outgoing>
      <bpmn:timerEventDefinition />
    </bpmn:startEvent>
    <bpmn:exclusiveGateway id="exclusive_gateway_1" name="Already registered on Hacktoberfest website ?" default="sequence_flow_2">
      <bpmn:incoming>sequence_flow_1</bpmn:incoming>
      <bpmn:outgoing>sequence_flow_2</bpmn:outgoing>
      <bpmn:outgoing>sequence_flow_4</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:userTask id="user_task_1" name="Register on https://hacktoberfest.&#10;digitalocean.com">
      <bpmn:incoming>sequence_flow_2</bpmn:incoming>
      <bpmn:outgoing>sequence_flow_3</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="exclusive_gateway_2">
      <bpmn:incoming>sequence_flow_3</bpmn:incoming>
      <bpmn:incoming>sequence_flow_4</bpmn:incoming>
      <bpmn:outgoing>sequence_flow_5</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:userTask id="user_task_2" name="Find an issue labeled &#39;hacktoberfest&#39; 🔍">
      <bpmn:incoming>sequence_flow_5</bpmn:incoming>
      <bpmn:incoming>sequence_flow_8</bpmn:incoming>
      <bpmn:outgoing>sequence_flow_6</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:callActivity id="call_activity" name="Contribute to ${projectName} 🔧">
      <bpmn:incoming>sequence_flow_6</bpmn:incoming>
      <bpmn:outgoing>sequence_flow_7</bpmn:outgoing>
    </bpmn:callActivity>
    <bpmn:exclusiveGateway id="exclusive_gateway_3" name="Is it your 4th contribution?" default="sequence_flow_8">
      <bpmn:incoming>sequence_flow_7</bpmn:incoming>
      <bpmn:outgoing>sequence_flow_8</bpmn:outgoing>
      <bpmn:outgoing>sequence_flow_9</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:userTask id="user_task_4" name="Win a limited edition T-shirt 🎉">
      <bpmn:incoming>sequence_flow_9</bpmn:incoming>
      <bpmn:outgoing>sequence_flow_10</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="user_task_5" name="Tweet how it was fun to contribute to ${projectName} 😃">
      <bpmn:incoming>sequence_flow_10</bpmn:incoming>
      <bpmn:outgoing>sequence_flow_11</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:endEvent id="end_event" name="Hacktoberfest finishes on October, 31st">
      <bpmn:incoming>sequence_flow_11</bpmn:incoming>
      <bpmn:terminateEventDefinition />
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="sequence_flow_11" sourceRef="user_task_5" targetRef="end_event" />
    <bpmn:sequenceFlow id="sequence_flow_10" sourceRef="user_task_4" targetRef="user_task_5" />
    <bpmn:sequenceFlow id="sequence_flow_9" name="Yes" sourceRef="exclusive_gateway_3" targetRef="user_task_4">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression" />
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="sequence_flow_8" name="No" sourceRef="exclusive_gateway_3" targetRef="user_task_2" />
    <bpmn:sequenceFlow id="sequence_flow_7" sourceRef="call_activity" targetRef="exclusive_gateway_3" />
    <bpmn:sequenceFlow id="sequence_flow_6" sourceRef="user_task_2" targetRef="call_activity" />
    <bpmn:sequenceFlow id="sequence_flow_5" sourceRef="exclusive_gateway_2" targetRef="user_task_2" />
    <bpmn:sequenceFlow id="sequence_flow_4" name="Yes" sourceRef="exclusive_gateway_1" targetRef="exclusive_gateway_2">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression" />
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="sequence_flow_3" sourceRef="user_task_1" targetRef="exclusive_gateway_2" />
    <bpmn:sequenceFlow id="sequence_flow_2" name="No" sourceRef="exclusive_gateway_1" targetRef="user_task_1" />
    <bpmn:sequenceFlow id="sequence_flow_1" sourceRef="start_event" targetRef="exclusive_gateway_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="collaboration_1">
      <bpmndi:BPMNShape id="shape_participant_1" bpmnElement="participant_1" isHorizontal="true">
        <dc:Bounds x="160" y="60" width="979" height="430" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="edge_sequence_flow_1" bpmnElement="sequence_flow_1">
        <di:waypoint x="268" y="210" />
        <di:waypoint x="375" y="210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_2" bpmnElement="sequence_flow_2">
        <di:waypoint x="400" y="185" />
        <di:waypoint x="400" y="119" />
        <di:waypoint x="470" y="119" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="372" y="150" width="15" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_3" bpmnElement="sequence_flow_3">
        <di:waypoint x="590" y="119" />
        <di:waypoint x="660" y="119" />
        <di:waypoint x="660" y="185" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_4" bpmnElement="sequence_flow_4">
        <di:waypoint x="425" y="210" />
        <di:waypoint x="635" y="210" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="521" y="223" width="18" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_5" bpmnElement="sequence_flow_5">
        <di:waypoint x="685" y="210" />
        <di:waypoint x="785" y="210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_6" bpmnElement="sequence_flow_6">
        <di:waypoint x="915" y="205" />
        <di:waypoint x="1050" y="205" />
        <di:waypoint x="1050" y="275" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_7" bpmnElement="sequence_flow_7">
        <di:waypoint x="1050" y="345" />
        <di:waypoint x="1050" y="410" />
        <di:waypoint x="870" y="410" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_8" bpmnElement="sequence_flow_8">
        <di:waypoint x="845" y="385" />
        <di:waypoint x="845" y="240" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="852" y="343" width="15" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_9" bpmnElement="sequence_flow_9">
        <di:waypoint x="820" y="410" />
        <di:waypoint x="715" y="410" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="764" y="388" width="18" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_10" bpmnElement="sequence_flow_10">
        <di:waypoint x="600" y="410" />
        <di:waypoint x="505" y="410" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_11" bpmnElement="sequence_flow_11">
        <di:waypoint x="355" y="410" />
        <di:waypoint x="268" y="410" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="shape_start_event" bpmnElement="start_event">
        <dc:Bounds x="232" y="192" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="204" y="235" width="87" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shape_exclusive_gateway_1" bpmnElement="exclusive_gateway_1" isMarkerVisible="true">
        <dc:Bounds x="375" y="185" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="355" y="242" width="90" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shape_user_task_1" bpmnElement="user_task_1">
        <dc:Bounds x="470" y="84" width="120" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shape_exclusive_gateway_2" bpmnElement="exclusive_gateway_2" isMarkerVisible="true">
        <dc:Bounds x="635" y="185" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shape_user_task_2" bpmnElement="user_task_2">
        <dc:Bounds x="785" y="170" width="130" height="70" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="795" y="195" width="110" height="45" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shape_call_activity" bpmnElement="call_activity">
        <dc:Bounds x="985" y="275" width="130" height="70" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="995" y="285" width="110" height="45" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shape_exclusive_gateway_3" bpmnElement="exclusive_gateway_3" isMarkerVisible="true">
        <dc:Bounds x="820" y="385" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="803" y="445" width="85" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shape_user_task_4" bpmnElement="user_task_4">
        <dc:Bounds x="600" y="370" width="115" height="70" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="610" y="395" width="95" height="45" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shape_user_task_5" bpmnElement="user_task_5">
        <dc:Bounds x="355" y="365" width="150" height="80" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="365" y="390" width="130" height="55" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shape_end_event" bpmnElement="end_event">
        <dc:Bounds x="232" y="387" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="216" y="430" width="68" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;
}

function getNavigationBpmnDiagram() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_18cog9y" targetNamespace="http://example.com/schema/bpmn">
  <bpmn:collaboration id="Collaboration_1eqpxip">
    <bpmn:participant id="Participant_03jhjm9" name="Pool 1" processRef="Process_01vn1wx" />
    <bpmn:participant id="Participant_0qu7iqv" name="Pool 2" processRef="Process_0dfjkzy" />
    <bpmn:messageFlow id="Flow_09jqd5k" sourceRef="Event_0nrt6xs" targetRef="Event_0a428ki" />
  </bpmn:collaboration>
  <bpmn:process id="Process_01vn1wx" isExecutable="false">
    <bpmn:laneSet id="LaneSet_1q051sw">
      <bpmn:lane id="Lane_0bazksy" name="Lane 1">
        <bpmn:flowNodeRef>StartEvent_1bfvqgx</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1bb0blk</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_01uveyz" name="Lane 2">
        <bpmn:flowNodeRef>Activity_0lw7k5q</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_0nrt6xs</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1ec3lfa</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>
    <bpmn:sequenceFlow id="Flow_09y15qv" sourceRef="StartEvent_1bfvqgx" targetRef="Activity_1bb0blk" />
    <bpmn:sequenceFlow id="Flow_1uzmwuw" sourceRef="Activity_0lw7k5q" targetRef="Activity_1ec3lfa" />
    <bpmn:sequenceFlow id="Flow_05ffp42" sourceRef="Activity_1bb0blk" targetRef="Activity_0lw7k5q" />
    <bpmn:startEvent id="StartEvent_1bfvqgx" name="start">
      <bpmn:outgoing>Flow_09y15qv</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_1bb0blk" name="Task 1">
      <bpmn:incoming>Flow_09y15qv</bpmn:incoming>
      <bpmn:outgoing>Flow_05ffp42</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Activity_0lw7k5q" name="Task 2">
      <bpmn:incoming>Flow_05ffp42</bpmn:incoming>
      <bpmn:outgoing>Flow_1uzmwuw</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="Event_0nrt6xs">
      <bpmn:incoming>Flow_1jv48ek</bpmn:incoming>
      <bpmn:messageEventDefinition id="MessageEventDefinition_02c3e55" />
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1jv48ek" sourceRef="Activity_1ec3lfa" targetRef="Event_0nrt6xs" />
    <bpmn:task id="Activity_1ec3lfa" name="Task 3">
      <bpmn:incoming>Flow_1uzmwuw</bpmn:incoming>
      <bpmn:outgoing>Flow_1jv48ek</bpmn:outgoing>
    </bpmn:task>
  </bpmn:process>
  <bpmn:process id="Process_0dfjkzy">
    <bpmn:startEvent id="Event_0a428ki">
      <bpmn:outgoing>Flow_0l3tbxg</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_0cyh03r" />
    </bpmn:startEvent>
    <bpmn:task id="Activity_0ur62d4" name="Do it!">
      <bpmn:incoming>Flow_0l3tbxg</bpmn:incoming>
      <bpmn:outgoing>Flow_1ijpizu</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="Event_0lv0w8p">
      <bpmn:incoming>Flow_1ijpizu</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0l3tbxg" sourceRef="Event_0a428ki" targetRef="Activity_0ur62d4" />
    <bpmn:sequenceFlow id="Flow_1ijpizu" sourceRef="Activity_0ur62d4" targetRef="Event_0lv0w8p" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_1eqpxip">
      <bpmndi:BPMNShape id="Participant_03jhjm9_di" bpmnElement="Participant_03jhjm9" isHorizontal="true">
        <dc:Bounds x="156" y="61" width="884" height="329" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_0bazksy_di" bpmnElement="Lane_0bazksy" isHorizontal="true">
        <dc:Bounds x="186" y="61" width="854" height="160" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_01uveyz_di" bpmnElement="Lane_01uveyz" isHorizontal="true">
        <dc:Bounds x="186" y="221" width="854" height="169" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_09y15qv_di" bpmnElement="Flow_09y15qv">
        <di:waypoint x="278" y="140" />
        <di:waypoint x="330" y="140" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1uzmwuw_di" bpmnElement="Flow_1uzmwuw">
        <di:waypoint x="610" y="310" />
        <di:waypoint x="700" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_05ffp42_di" bpmnElement="Flow_05ffp42">
        <di:waypoint x="430" y="140" />
        <di:waypoint x="470" y="140" />
        <di:waypoint x="470" y="310" />
        <di:waypoint x="510" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1jv48ek_di" bpmnElement="Flow_1jv48ek">
        <di:waypoint x="800" y="310" />
        <di:waypoint x="882" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1bfvqgx">
        <dc:Bounds x="242" y="122" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="249" y="165" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1bb0blk_di" bpmnElement="Activity_1bb0blk">
        <dc:Bounds x="330" y="100" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0lw7k5q_di" bpmnElement="Activity_0lw7k5q">
        <dc:Bounds x="510" y="270" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1bl10ng_di" bpmnElement="Event_0nrt6xs">
        <dc:Bounds x="882" y="292" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1ec3lfa_di" bpmnElement="Activity_1ec3lfa">
        <dc:Bounds x="700" y="270" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Participant_0qu7iqv_di" bpmnElement="Participant_0qu7iqv" isHorizontal="true">
        <dc:Bounds x="156" y="500" width="370" height="170" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0l3tbxg_di" bpmnElement="Flow_0l3tbxg">
        <di:waypoint x="248" y="590" />
        <di:waypoint x="300" y="590" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ijpizu_di" bpmnElement="Flow_1ijpizu">
        <di:waypoint x="400" y="590" />
        <di:waypoint x="452" y="590" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_14eqrjz_di" bpmnElement="Event_0a428ki">
        <dc:Bounds x="212" y="572" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ur62d4_di" bpmnElement="Activity_0ur62d4">
        <dc:Bounds x="300" y="550" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0lv0w8p_di" bpmnElement="Event_0lv0w8p">
        <dc:Bounds x="452" y="572" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_09jqd5k_di" bpmnElement="Flow_09jqd5k">
        <di:waypoint x="904" y="327" />
        <di:waypoint x="904" y="460" />
        <di:waypoint x="230" y="460" />
        <di:waypoint x="230" y="572" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
}

function getGettingStartedBpmnDiagram() {
    return  `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_01afj0d" targetNamespace="http://example.com/schema/bpmn">
  <bpmn:process id="Process_0yqq1lz" isExecutable="false">
    <bpmn:startEvent id="StartEvent_08hc3xj" name="Start coding">
      <bpmn:outgoing>Flow_1wkfbb0</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_1potg3p" name="Enjoy using &#39;BPMN Visualization&#39;">
      <bpmn:incoming>Flow_1wkfbb0</bpmn:incoming>
      <bpmn:outgoing>Flow_133a5kz</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1wkfbb0" sourceRef="StartEvent_08hc3xj" targetRef="Activity_1potg3p" />
    <bpmn:endEvent id="Event_05akz22" name="See you later!">
      <bpmn:incoming>Flow_133a5kz</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_133a5kz" sourceRef="Activity_1potg3p" targetRef="Event_05akz22" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0yqq1lz">
      <bpmndi:BPMNEdge id="Flow_1wkfbb0_di" bpmnElement="Flow_1wkfbb0">
        <di:waypoint x="192" y="99" />
        <di:waypoint x="250" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_133a5kz_di" bpmnElement="Flow_133a5kz">
        <di:waypoint x="350" y="99" />
        <di:waypoint x="412" y="99" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_08hc3xj">
        <dc:Bounds x="156" y="81" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="145" y="124" width="59" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1potg3p_di" bpmnElement="Activity_1potg3p">
        <dc:Bounds x="250" y="59" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_05akz22_di" bpmnElement="Event_05akz22">
        <dc:Bounds x="412" y="81" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="396" y="124" width="68" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
}
