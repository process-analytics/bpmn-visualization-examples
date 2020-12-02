// Inspired from 'Procurement Processes with Error Handling - Stencil Trisotech 3 pages.bpmn' of https://www.omg.org/cgi-bin/doc?dtc/10-06-02.zip
// Duplicated from examples/interaction/call_activity_with_modal_on_mouse_over
function getMainBpmnDiagram() {
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
function getCalledBpmnDiagram() {
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

// Main BPMN Container
const mainBpmnContainerElt = window.document.getElementById('main-bpmn-container');
const mainBpmnVisualization = new bpmnvisu.BpmnVisualization(mainBpmnContainerElt);
mainBpmnVisualization.load(getMainBpmnDiagram(), { fit: {type: 'Center'} });

// Secondary BPMN Container
const secondaryBpmnContainerElt = window.document.getElementById('secondary-bpmn-container');
const secondaryBpmnVisualization = new bpmnvisu.BpmnVisualization(secondaryBpmnContainerElt);


// Interaction
let secondaryBpmnDiagramIsAlreadyLoad = false;
const callActivityElt = mainBpmnVisualization.htmlElementRegistry.getBpmnHtmlElement('call_activity');
callActivityElt.classList.add('c-hand');
callActivityElt.onclick = () => {
    openTab('secondary');
}


function openTab(tabIndex) {
    // Activate corresponding tab & Deactivate others
    const tabItems = document.getElementsByClassName("tab-item");
    for (let i = 0; i < tabItems.length; i++) {
        tabItems.item(i).classList.remove('active');
    }
    document.getElementById(`${tabIndex}-tab`).classList.add('active');

    // Display corresponding BPMN container & Hide others
    const bpmnContainers = document.getElementsByClassName("bpmn-container");
    for (let i = 0; i < tabItems.length; i++) {
        bpmnContainers.item(i).classList.add('d-hide');
    }
    document.getElementById(`${tabIndex}-bpmn-container`).classList.remove('d-hide');

    // Load secondary BPMN diagram, if it's not already done
    if(tabIndex=='secondary' && !secondaryBpmnDiagramIsAlreadyLoad) {
        secondaryBpmnVisualization.load(getCalledBpmnDiagram(), { fit: {type: 'Center', margin: 10 } });
        secondaryBpmnDiagramIsAlreadyLoad = true;
    }
}
