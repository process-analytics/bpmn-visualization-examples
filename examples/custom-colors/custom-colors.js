const bpmn = bpmnDiagram();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// default colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
bpmnVisu.load(bpmn);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom default font color
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const originalDefaultFontColor = StyleConstant.DEFAULT_FONT_COLOR;
StyleConstant.DEFAULT_FONT_COLOR = 'Cyan';
const bpmnVisualizationCustomDefaultFontColor = new BpmnVisu(window.document.getElementById('graphCustomFontColor'));
bpmnVisualizationCustomDefaultFontColor.load(bpmn);

// restore StyleConstant defaults
StyleConstant.DEFAULT_FONT_COLOR = originalDefaultFontColor;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom default fill and stroke colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const originalConfigureCommonDefaultStyle = StyleConfigurator.prototype.configureCommonDefaultStyle;
StyleConfigurator.prototype.configureCommonDefaultStyle = function (style) {
    originalConfigureCommonDefaultStyle(style);
    style[mxConstants.STYLE_FILLCOLOR] = 'LemonChiffon';
    style[mxConstants.STYLE_STROKECOLOR] = 'Orange';
}
// hack to ensure that the pool and lane label area fill color are kept untouched
const originalConfigureStyles = StyleConfigurator.prototype.configureStyles;
StyleConfigurator.prototype.configureStyles = function () {
    originalConfigureStyles.apply(this);
    [ShapeBpmnElementKind.LANE, ShapeBpmnElementKind.POOL].forEach(kind => {
        const style = this.graph.getStylesheet().styles[kind];
        style[mxConstants.STYLE_FILLCOLOR] = StyleConstant.DEFAULT_FILL_COLOR;
    });
}
const bpmnVisualizationCustomDefaultColor = new BpmnVisu(window.document.getElementById('graphCustomDefaultColors'));
bpmnVisualizationCustomDefaultColor.load(bpmn);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom fill and stroke colors depending on BPMN elements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class BpmnVisualizationCustomColors extends BpmnVisu {

    constructor(containerId) {
        super(window.document.getElementById(containerId));
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        ShapeUtil.topLevelBpmnEventKinds().forEach(kind => {
            const style = styleSheet.styles[kind];
            style[mxConstants.STYLE_FILLCOLOR] = 'Pink';
            style[mxConstants.STYLE_STROKECOLOR] = 'FireBrick';
        });

        ShapeUtil.taskKinds().forEach(kind => {
            const style = styleSheet.styles[kind];
            style[mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_EAST;
            style[mxConstants.STYLE_GRADIENTCOLOR] = 'White';
            style[mxConstants.STYLE_FILLCOLOR] = 'Lavender';
            style[mxConstants.STYLE_STROKECOLOR] = 'DarkBlue';
        });

        ShapeUtil.gatewayKinds().forEach(kind => {
            const style = styleSheet.styles[kind];
            style[mxConstants.STYLE_FILLCOLOR] = 'LightGoldenrodYellow';
            style[mxConstants.STYLE_STROKECOLOR] = 'DarkOrange';
        });

        const poolStyle = styleSheet.styles[ShapeBpmnElementKind.POOL];
        poolStyle[mxConstants.STYLE_FILLCOLOR] = 'PaleGreen';
        poolStyle[mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_SOUTH;
        poolStyle[mxConstants.STYLE_GRADIENTCOLOR] = 'White';
    }

}

// restore StyleConfigurator defaults
StyleConfigurator.prototype.configureCommonDefaultStyle = originalConfigureCommonDefaultStyle;
StyleConfigurator.prototype.configureStyles = originalConfigureStyles;


const bpmnVisualizationCustomColors = new BpmnVisualizationCustomColors('graphCustomColors');
bpmnVisualizationCustomColors.load(bpmn);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom font color for User Task
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class BpmnVisualizationCustomColorUserTask extends BpmnVisu {

    constructor(containerId) {
        super(window.document.getElementById(containerId));
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet
        const style = styleSheet.styles[ShapeBpmnElementKind.TASK_USER];
        style[mxConstants.STYLE_FONTCOLOR] = '#2b992a';
        style[mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_EAST;
        style[mxConstants.STYLE_GRADIENTCOLOR] = 'White';
        style[mxConstants.STYLE_FILLCOLOR] = 'Lavender';
        style[mxConstants.STYLE_STROKECOLOR] = '#2b992a';
   }
}

const bpmnVisualizationCustomFontColorUserTask = new BpmnVisualizationCustomColorUserTask('graphCustomFontColorUserTask');
bpmnVisualizationCustomFontColorUserTask.load(bpmn);

// restore StyleConfigurator defaults
StyleConfigurator.prototype.configureCommonDefaultStyle = originalConfigureCommonDefaultStyle;
StyleConfigurator.prototype.configureStyles = originalConfigureStyles;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BPMN
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function bpmnDiagram() {
    return  `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_12nbmjq" targetNamespace="http://example.bpmn.com/schema/bpmn">
  <bpmn:collaboration id="Collaboration_03068dc">
    <bpmn:participant id="Participant_0nuvj8r" name="Pool 1" processRef="Process_0vbjbkf" />
  </bpmn:collaboration>
  <bpmn:process id="Process_0vbjbkf" isExecutable="false">
    <bpmn:laneSet id="LaneSet_1e2wb07">
      <bpmn:lane id="Lane_0xke7q1" name="Lane 3">
        <bpmn:flowNodeRef>Activity_0gsh2b6</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_1s7095g</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_1wihmdr</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_1q818hp</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_1dunul0" name="Lane 2">
        <bpmn:flowNodeRef>Gateway_1hq21li</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1c0vze1</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1wr0s0r</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_0gj6ba4</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_13kpaun" name="Lane 1">
        <bpmn:flowNodeRef>Activity_1sn3x37</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_05sspdt</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_14pg2n4</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1s8cug0</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_06pc14u</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_19jjic7</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>StartEvent_0av7pgo</bpmn:flowNodeRef>
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
    <bpmn:userTask id="Activity_1s8cug0" name="User Task 1.1">
      <bpmn:incoming>Flow_0ule9dn</bpmn:incoming>
      <bpmn:outgoing>Flow_1ceafgv</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:parallelGateway id="Gateway_1hq21li" name="gateway 2">
      <bpmn:incoming>Flow_0sqwsrw</bpmn:incoming>
      <bpmn:incoming>Flow_0g017tm</bpmn:incoming>
      <bpmn:outgoing>Flow_09zytr1</bpmn:outgoing>
    </bpmn:parallelGateway>
    <bpmn:userTask id="Activity_1c0vze1" name="User Task 2.2">
      <bpmn:incoming>Flow_1hvyo7b</bpmn:incoming>
      <bpmn:outgoing>Flow_0sqwsrw</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Activity_0gsh2b6" name="User Task 3.1">
      <bpmn:incoming>Flow_1wwy4bv</bpmn:incoming>
      <bpmn:outgoing>Flow_08z7uoy</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:sequenceFlow id="Flow_08z7uoy" sourceRef="Activity_0gsh2b6" targetRef="Event_1wihmdr" />
    <bpmn:sequenceFlow id="Flow_1wwy4bv" sourceRef="Event_1s7095g" targetRef="Activity_0gsh2b6" />
    <bpmn:sequenceFlow id="Flow_1ueepp9" sourceRef="StartEvent_0av7pgo" targetRef="Activity_1sn3x37" />
    <bpmn:sequenceFlow id="Flow_1bewc4s" name="link" sourceRef="Activity_1sn3x37" targetRef="Activity_06pc14u" />
    <bpmn:sequenceFlow id="Flow_0i9h5sw" name="rejected" sourceRef="Gateway_05sspdt" targetRef="Activity_1wr0s0r" />
    <bpmn:sequenceFlow id="Flow_0ule9dn" name="accepted" sourceRef="Gateway_05sspdt" targetRef="Activity_1s8cug0" />
    <bpmn:sequenceFlow id="Flow_1ceafgv" sourceRef="Activity_1s8cug0" targetRef="Activity_19jjic7" />
    <bpmn:sequenceFlow id="Flow_1dmga1h" sourceRef="Activity_19jjic7" targetRef="Event_14pg2n4" />
    <bpmn:sequenceFlow id="Flow_1hvyo7b" sourceRef="Activity_1wr0s0r" targetRef="Activity_1c0vze1" />
    <bpmn:sequenceFlow id="Flow_09zytr1" sourceRef="Gateway_1hq21li" targetRef="Event_0gj6ba4" />
    <bpmn:sequenceFlow id="Flow_1noi0ay" sourceRef="Activity_06pc14u" targetRef="Gateway_05sspdt" />
    <bpmn:sequenceFlow id="Flow_0sqwsrw" sourceRef="Activity_1c0vze1" targetRef="Gateway_1hq21li" />
    <bpmn:task id="Activity_06pc14u" name="Task 1">
      <bpmn:incoming>Flow_1bewc4s</bpmn:incoming>
      <bpmn:outgoing>Flow_1noi0ay</bpmn:outgoing>
    </bpmn:task>
    <bpmn:serviceTask id="Activity_1wr0s0r" name="Service Task 2.1">
      <bpmn:incoming>Flow_0i9h5sw</bpmn:incoming>
      <bpmn:outgoing>Flow_1hvyo7b</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:serviceTask id="Activity_19jjic7" name="Service Task 1.2">
      <bpmn:incoming>Flow_1ceafgv</bpmn:incoming>
      <bpmn:outgoing>Flow_1dmga1h</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:endEvent id="Event_0gj6ba4" name="message end 2">
      <bpmn:incoming>Flow_09zytr1</bpmn:incoming>
      <bpmn:messageEventDefinition id="MessageEventDefinition_0kuujqg" />
    </bpmn:endEvent>
    <bpmn:startEvent id="StartEvent_0av7pgo" name="message start 1">
      <bpmn:outgoing>Flow_1ueepp9</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_17xfjtr" />
    </bpmn:startEvent>
    <bpmn:startEvent id="Event_1s7095g" name="start 2">
      <bpmn:outgoing>Flow_1wwy4bv</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_0t8djvo" sourceRef="Event_1wihmdr" targetRef="Event_1q818hp" />
    <bpmn:intermediateCatchEvent id="Event_1wihmdr" name="message catch intermediate 1">
      <bpmn:incoming>Flow_08z7uoy</bpmn:incoming>
      <bpmn:outgoing>Flow_0t8djvo</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_077j2qu" />
    </bpmn:intermediateCatchEvent>
    <bpmn:sequenceFlow id="Flow_0g017tm" sourceRef="Event_1q818hp" targetRef="Gateway_1hq21li" />
    <bpmn:intermediateThrowEvent id="Event_1q818hp" name="message throw intermediate 1">
      <bpmn:incoming>Flow_0t8djvo</bpmn:incoming>
      <bpmn:outgoing>Flow_0g017tm</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_11kxj5k" />
    </bpmn:intermediateThrowEvent>
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
      <bpmndi:BPMNEdge id="Flow_0sqwsrw_di" bpmnElement="Flow_0sqwsrw">
        <di:waypoint x="890" y="270" />
        <di:waypoint x="955" y="270" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1noi0ay_di" bpmnElement="Flow_1noi0ay">
        <di:waypoint x="600" y="110" />
        <di:waypoint x="675" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_09zytr1_di" bpmnElement="Flow_09zytr1">
        <di:waypoint x="1005" y="270" />
        <di:waypoint x="1042" y="270" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1hvyo7b_di" bpmnElement="Flow_1hvyo7b">
        <di:waypoint x="750" y="270" />
        <di:waypoint x="790" y="270" />
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
          <dc:Bounds x="735" y="92" width="46" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0i9h5sw_di" bpmnElement="Flow_0i9h5sw">
        <di:waypoint x="700" y="135" />
        <di:waypoint x="700" y="230" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="710" y="143" width="40" height="14" />
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
      <bpmndi:BPMNEdge id="Flow_1wwy4bv_di" bpmnElement="Flow_1wwy4bv">
        <di:waypoint x="330" y="420" />
        <di:waypoint x="462" y="420" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_08z7uoy_di" bpmnElement="Flow_08z7uoy">
        <di:waypoint x="562" y="420" />
        <di:waypoint x="632" y="420" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0t8djvo_di" bpmnElement="Flow_0t8djvo">
        <di:waypoint x="668" y="420" />
        <di:waypoint x="812" y="420" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0g017tm_di" bpmnElement="Flow_0g017tm">
        <di:waypoint x="848" y="420" />
        <di:waypoint x="980" y="420" />
        <di:waypoint x="980" y="295" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Activity_0ifu0xr_di" bpmnElement="Activity_1sn3x37">
        <dc:Bounds x="312" y="70" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_05sspdt_di" bpmnElement="Gateway_05sspdt" isMarkerVisible="true">
        <dc:Bounds x="675" y="85" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="673" y="63" width="53" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_14pg2n4_di" bpmnElement="Event_14pg2n4">
        <dc:Bounds x="1102" y="92" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1106" y="135" width="28" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0tufvfp_di" bpmnElement="Activity_1s8cug0">
        <dc:Bounds x="790" y="70" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0m423t9_di" bpmnElement="Gateway_1hq21li">
        <dc:Bounds x="955" y="245" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="954" y="223" width="53" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0jljuyk_di" bpmnElement="Activity_1c0vze1">
        <dc:Bounds x="790" y="230" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1wcuws6_di" bpmnElement="Activity_0gsh2b6">
        <dc:Bounds x="462" y="380" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1u44j4q_di" bpmnElement="Activity_06pc14u">
        <dc:Bounds x="500" y="70" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0iznnsm_di" bpmnElement="Activity_1wr0s0r">
        <dc:Bounds x="650" y="230" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_02k08fd_di" bpmnElement="Activity_19jjic7">
        <dc:Bounds x="940" y="70" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0bpyu2c_di" bpmnElement="Event_0gj6ba4">
        <dc:Bounds x="1042" y="252" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1022" y="295" width="76" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1kkb8ww_di" bpmnElement="StartEvent_0av7pgo">
        <dc:Bounds x="234" y="92" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="213" y="135" width="79" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0q6nq79_di" bpmnElement="Event_1s7095g">
        <dc:Bounds x="294" y="402" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="297" y="445" width="31" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_00seehq_di" bpmnElement="Event_1wihmdr">
        <dc:Bounds x="632" y="402" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="613" y="445" width="74" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_14o73vn_di" bpmnElement="Event_1q818hp">
        <dc:Bounds x="812" y="402" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="793" y="445" width="75" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
}