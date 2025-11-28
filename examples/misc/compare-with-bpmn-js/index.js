// the rest of the code is in shared.js (shared with the kie-editors-standalone comparison example)

function getComparisonDiagram() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0" xmlns:color="http://www.omg.org/spec/BPMN/non-normative/color/1.0" id="Definitions_comparison" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_comparison" isExecutable="false">
    <bpmn:startEvent id="start" name="Order received">
      <bpmn:outgoing>flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:userTask id="task_review" name="Review order details and validate customer information">
      <bpmn:incoming>flow_1</bpmn:incoming>
      <bpmn:outgoing>flow_2</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="gw_decision" name="Order valid?">
      <bpmn:incoming>flow_2</bpmn:incoming>
      <bpmn:outgoing>flow_yes</bpmn:outgoing>
      <bpmn:outgoing>flow_no</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="task_process" name="Process payment">
      <bpmn:incoming>flow_yes</bpmn:incoming>
      <bpmn:outgoing>flow_3</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:userTask id="task_reject" name="Notify customer of rejection">
      <bpmn:incoming>flow_no</bpmn:incoming>
      <bpmn:outgoing>flow_4</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:serviceTask id="task_ship" name="Ship order to customer address">
      <bpmn:incoming>flow_3</bpmn:incoming>
      <bpmn:outgoing>flow_5</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:endEvent id="end_success" name="Order completed">
      <bpmn:incoming>flow_5</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:endEvent id="end_rejected" name="Order rejected">
      <bpmn:incoming>flow_4</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="flow_1" sourceRef="start" targetRef="task_review" />
    <bpmn:sequenceFlow id="flow_2" sourceRef="task_review" targetRef="gw_decision" />
    <bpmn:sequenceFlow id="flow_yes" name="Yes" sourceRef="gw_decision" targetRef="task_process" />
    <bpmn:sequenceFlow id="flow_no" name="No" sourceRef="gw_decision" targetRef="task_reject" />
    <bpmn:sequenceFlow id="flow_3" sourceRef="task_process" targetRef="task_ship" />
    <bpmn:sequenceFlow id="flow_4" sourceRef="task_reject" targetRef="end_rejected" />
    <bpmn:sequenceFlow id="flow_5" sourceRef="task_ship" targetRef="end_success" />
    <bpmn:textAnnotation id="annotation_1">
      <bpmn:text>Validation includes credit check</bpmn:text>
    </bpmn:textAnnotation>
    <bpmn:association id="assoc_1" sourceRef="task_review" targetRef="annotation_1" />
    <bpmn:group id="group_1" categoryValueRef="cat_val_1" />
  </bpmn:process>
  <bpmn:category id="cat_1">
    <bpmn:categoryValue id="cat_val_1" value="Order Processing" />
  </bpmn:category>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_comparison">
      <bpmndi:BPMNShape id="start_di" bpmnElement="start">
        <dc:Bounds x="152" y="192" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="133" y="235" width="74" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="task_review_di" bpmnElement="task_review" bioc:stroke="#1E88E5" bioc:fill="#BBDEFB" color:background-color="#BBDEFB" color:border-color="#1E88E5">
        <dc:Bounds x="240" y="170" width="100" height="80" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="245" y="175" width="90" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="gw_decision_di" bpmnElement="gw_decision" isMarkerVisible="true">
        <dc:Bounds x="395" y="185" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="389" y="161" width="62" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="task_process_di" bpmnElement="task_process" bioc:stroke="#43A047" bioc:fill="#C8E6C9" color:background-color="#C8E6C9" color:border-color="#43A047">
        <dc:Bounds x="500" y="170" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="task_reject_di" bpmnElement="task_reject" bioc:stroke="#E53935" bioc:fill="#FFCDD2" color:background-color="#FFCDD2" color:border-color="#E53935">
        <dc:Bounds x="500" y="290" width="100" height="80" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="505" y="295" width="90" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="task_ship_di" bpmnElement="task_ship" bioc:stroke="#43A047" bioc:fill="#C8E6C9" color:background-color="#C8E6C9" color:border-color="#43A047">
        <dc:Bounds x="660" y="170" width="100" height="80" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="665" y="175" width="90" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="end_success_di" bpmnElement="end_success">
        <dc:Bounds x="822" y="192" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="800" y="235" width="81" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="end_rejected_di" bpmnElement="end_rejected">
        <dc:Bounds x="662" y="312" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="645" y="355" width="71" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="flow_1_di" bpmnElement="flow_1">
        <di:waypoint x="188" y="210" />
        <di:waypoint x="240" y="210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="flow_2_di" bpmnElement="flow_2">
        <di:waypoint x="340" y="210" />
        <di:waypoint x="395" y="210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="flow_yes_di" bpmnElement="flow_yes">
        <di:waypoint x="445" y="210" />
        <di:waypoint x="500" y="210" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="464" y="192" width="18" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="flow_no_di" bpmnElement="flow_no">
        <di:waypoint x="420" y="235" />
        <di:waypoint x="420" y="330" />
        <di:waypoint x="500" y="330" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="428" y="280" width="15" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="flow_3_di" bpmnElement="flow_3">
        <di:waypoint x="600" y="210" />
        <di:waypoint x="660" y="210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="flow_4_di" bpmnElement="flow_4">
        <di:waypoint x="600" y="330" />
        <di:waypoint x="662" y="330" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="flow_5_di" bpmnElement="flow_5">
        <di:waypoint x="760" y="210" />
        <di:waypoint x="822" y="210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="annotation_1_di" bpmnElement="annotation_1">
        <dc:Bounds x="300" y="80" width="140" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="assoc_1_di" bpmnElement="assoc_1">
        <di:waypoint x="305" y="170" />
        <di:waypoint x="340" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="group_1_di" bpmnElement="group_1">
        <dc:Bounds x="215" y="60" width="680" height="320" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="515" y="67" width="83" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
}

class BpmnJSLibraryComparator extends LibraryComparator {
  #bpmnJsViewer;

  constructor(bpmnVisualizationContainerId, otherLibContainerId, state) {
    super(bpmnVisualizationContainerId, state);
    this._otherLibIdentifier = 'bpmn-js';
    this.#bpmnJsViewer = new BpmnJS({ container: `#${otherLibContainerId}` });
  }

  async _loadWithOtherLib(xml) {
    return this.#bpmnJsViewer.importXML(xml);
  }

  _setZoomLevelOtherLib() {
    const canvas = this.#bpmnJsViewer.get('canvas');
    if (this._state.fitView) {
      canvas.zoom('fit-viewport', 'auto');
    } else {
      canvas.zoom(1, null);
    }
    this._logOtherLib(`Zoom level set, fitView ${this._state.fitView}`);
  }
}


const state = {
  fitView: false,
  isUseBpmnVisualization: true,
  bpmnJsCompatMode: false,
}

const libraryComparator = new BpmnJSLibraryComparator('container-bpmn-visualization', 'container-bpmn-js', state);

const uiController = new UIController(state, libraryComparator, 'container-bpmn-visualization', 'container-bpmn-js');
uiController.configure();

libraryComparator.loadNewBpmn(getComparisonDiagram(), 'Built-in comparison diagram')
    .then(() => {
        document.getElementById('loading-info').classList.remove('hidden');
        document.querySelector('#loading-info > span').innerHTML = '<code>Built-in comparison diagram</code>';
    })
    .catch(err => {
        console.error('Failed to load built-in comparison diagram:', err);
    });
