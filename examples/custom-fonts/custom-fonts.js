const bpmn = bpmnDiagram();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// default colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const bpmnVisualization = new BpmnVisualization(window.document.getElementById('graph'));
bpmnVisualization.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom default font
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const originalDefaultFontFamily = StyleDefault.DEFAULT_FONT_FAMILY;
const originalDefaultFontSize = StyleDefault.DEFAULT_FONT_SIZE;
StyleDefault.DEFAULT_FONT_SIZE = '12';
StyleDefault.DEFAULT_FONT_FAMILY = 'Courier New,serif';

const originalConfigureCommonDefaultStyle = StyleConfigurator.prototype.configureCommonDefaultStyle;
StyleConfigurator.prototype.configureCommonDefaultStyle = function (style) {
    originalConfigureCommonDefaultStyle(style);
    style[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_ITALIC;
}

const bpmnVisualizationCustomDefaultFont = new BpmnVisualization(window.document.getElementById('graphCustomDefaultFont'));
bpmnVisualizationCustomDefaultFont.load(bpmn);

StyleDefault.DEFAULT_FONT_FAMILY = originalDefaultFontFamily;
StyleDefault.DEFAULT_FONT_SIZE = originalDefaultFontSize;
// restore StyleConfigurator defaults
StyleConfigurator.prototype.configureCommonDefaultStyle = originalConfigureCommonDefaultStyle;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom font depending on BPMN elements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class BpmnVisualizationCustomFonts extends BpmnVisualization {

    constructor(containerId) {
        super(window.document.getElementById(containerId));
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        const userTaskStyle = styleSheet.styles[ShapeBpmnElementKind.TASK_USER];
        userTaskStyle[mxConstants.STYLE_FONTFAMILY] = 'Courier New,serif';
        userTaskStyle[mxConstants.STYLE_FONTSIZE] = '14';
        userTaskStyle[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_BOLD + mxConstants.FONT_ITALIC;

        const poolStyle = styleSheet.styles[ShapeBpmnElementKind.POOL];
        poolStyle[mxConstants.STYLE_FONTFAMILY] = 'MS Gothic,Courier New,serif';
        poolStyle[mxConstants.STYLE_FONTSIZE] = '20';
        poolStyle[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_BOLD;
    }

}

const bpmnVisualizationCustomFonts = new BpmnVisualizationCustomFonts('graphCustomFonts');
bpmnVisualizationCustomFonts.load(bpmn);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BPMN
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function bpmnDiagram() {
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
