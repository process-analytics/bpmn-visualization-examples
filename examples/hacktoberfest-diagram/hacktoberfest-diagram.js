import {
    BpmnVisualization,
    IconPainter, IconPainterProvider,
    ShapeBpmnElementKind,
    ShapeUtil,
    StyleConfigurator,
    StyleDefault
} from '../../demo/0.3.0/index.es.js';
import { newBpmnVisualization } from "../utils.js";

const bpmn = bpmnDiagram();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// default colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const bpmnVisualization = newBpmnVisualization('graphDefault');
bpmnVisualization.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom font + custom fill and stroke colors depending on BPMN elements for Light Hacktoberfest visualization
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const bleuArchiClair = '#F1F7FA';
const bleuClair = '#93C2DB';
const bleuMilieu = '#183d5d';
const bleuFonce = '#072540';

const roseClair = '#FF8AE2';
let roseFonce = '#9C4668';


// opacité 0.16

// opacité 0.24

StyleDefault.DEFAULT_STROKE_COLOR = bleuFonce;
StyleDefault.DEFAULT_FONT_COLOR = bleuMilieu;
StyleDefault.DEFAULT_FONT_FAMILY = 'Inter, Helvetica, sans-serif';

class BpmnVisualizationLightHacktoberfest extends BpmnVisualization {

    constructor(containerId) {
        super(window.document.getElementById(containerId));
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        // START EVENT
        let style = styleSheet.styles[ShapeBpmnElementKind.EVENT_START];
        style[mxConstants.STYLE_STROKECOLOR] = roseClair;

        // END EVENT
        style = styleSheet.styles[ShapeBpmnElementKind.EVENT_END];
        style[mxConstants.STYLE_STROKECOLOR] = roseFonce;
        style[mxConstants.STYLE_FILLCOLOR] = roseClair;
        style[mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_WEST;
        style[mxConstants.STYLE_GRADIENTCOLOR] = 'White';

        // USER TASK
        style = styleSheet.styles[ShapeBpmnElementKind.TASK_USER];
        style[mxConstants.STYLE_FILLCOLOR] = bleuArchiClair;

        // CALL ACTIVITY
        style = styleSheet.styles[ShapeBpmnElementKind.CALL_ACTIVITY];
        style[mxConstants.STYLE_FILLCOLOR] = bleuMilieu;
        style[mxConstants.STYLE_FONTCOLOR] = bleuClair;

        // POOL
        style = styleSheet.styles[ShapeBpmnElementKind.POOL];
        style[mxConstants.STYLE_FILLCOLOR] = bleuArchiClair;
        style[mxConstants.STYLE_FONTSIZE] = 16;
    }

}

class LightHacktoberfestIconPainter extends IconPainter {
    // START TIMER
    paintClockIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        c.setStrokeColor(roseFonce);
        super.paintClockIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };

    // EXCLUSIVE GATEWAY
    paintXCrossIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        icon.strokeColor = bleuClair;
        c.setStrokeColor(bleuMilieu);
        super.paintXCrossIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };

    // USER TASK
    paintUserIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        icon.strokeColor = bleuMilieu;
        super.paintUserIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };

    // CALL ACTIVITY
    paintExpandIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        c.setStrokeColor(bleuArchiClair);
        super.paintExpandIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };
}

IconPainterProvider.set(new LightHacktoberfestIconPainter());


const bpmnVisualizationLightHacktoberfest = new BpmnVisualizationLightHacktoberfest('graphLightHacktoberfest');
bpmnVisualizationLightHacktoberfest.load(bpmn);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom font + custom fill and stroke colors depending on BPMN elements for Dark Hacktoberfest visualization
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// opacité 0.16

// opacité 0.24

StyleDefault.DEFAULT_FILL_COLOR = bleuFonce;
StyleDefault.DEFAULT_STROKE_COLOR = bleuClair;
StyleDefault.DEFAULT_FONT_COLOR = bleuArchiClair;
StyleDefault.DEFAULT_FONT_FAMILY = 'Inter, Helvetica, sans-serif';

class BpmnVisualizationDarkHacktoberfest extends BpmnVisualization {

    constructor(containerId) {
        super(window.document.getElementById(containerId));
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        // START EVENT
        let style = styleSheet.styles[ShapeBpmnElementKind.EVENT_START];
        style[mxConstants.STYLE_STROKECOLOR] = roseClair;
        style[mxConstants.STYLE_FILLCOLOR] = '#ffe9fa';
       // style[mxConstants.STYLE_FILL_OPACITY] = 75;

        // END EVENT
        style = styleSheet.styles[ShapeBpmnElementKind.EVENT_END];
        style[mxConstants.STYLE_STROKECOLOR] = roseFonce;
        style[mxConstants.STYLE_FILLCOLOR] = '#ffe9fa';
        // style[mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_WEST;
        // style[mxConstants.STYLE_GRADIENTCOLOR] = '#ffdef7';

        // EXCLUSIVE GATEWAY
        style = styleSheet.styles[ShapeBpmnElementKind.GATEWAY_EXCLUSIVE];
        style[mxConstants.STYLE_FILLCOLOR] = bleuMilieu;

        // USER TASK
        style = styleSheet.styles[ShapeBpmnElementKind.TASK_USER];
        style[mxConstants.STYLE_FILLCOLOR] = '#355571';
       // style[mxConstants.STYLE_FILL_OPACITY] = 84;

        // CALL ACTIVITY
        style = styleSheet.styles[ShapeBpmnElementKind.CALL_ACTIVITY];
        style[mxConstants.STYLE_FILLCOLOR] = bleuArchiClair;
        style[mxConstants.STYLE_FONTCOLOR] = bleuMilieu;

        // POOL
        style = styleSheet.styles[ShapeBpmnElementKind.POOL];
        style[mxConstants.STYLE_SWIMLANE_FILLCOLOR] = bleuFonce;
        style[mxConstants.STYLE_FILLCOLOR] = bleuMilieu;
        style[mxConstants.STYLE_FONTSIZE] = 16;
    }

}

class DarkHacktoberfestIconPainter extends IconPainter {
    // START TIMER
    paintClockIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        c.setStrokeColor(roseFonce);
        super.paintClockIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };

    // EXCLUSIVE GATEWAY
    paintXCrossIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        icon.strokeColor = bleuArchiClair;
        super.paintXCrossIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };

    // USER TASK
    paintUserIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        icon.strokeColor = bleuArchiClair;
        super.paintUserIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };

    // CALL ACTIVITY
    paintExpandIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        c.setStrokeColor(bleuFonce);
        super.paintExpandIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };
}

IconPainterProvider.set(new DarkHacktoberfestIconPainter());


const bpmnVisualizationDarkHacktoberfest = new BpmnVisualizationDarkHacktoberfest('graphDarkHacktoberfest');
bpmnVisualizationDarkHacktoberfest.graph.getDefaultParent().setStyle(`${mxConstants.STYLE_FILLCOLOR} = ${bleuFonce}`) ;
bpmnVisualizationDarkHacktoberfest.load(bpmn);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BPMN
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function bpmnDiagram() {
    return  `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_14mbaax" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="7.3.0">
  <bpmn:collaboration id="collaboration_1">
    <bpmn:participant id="participant_1" processRef="process_1" name="Hacktoberfest participation"/>
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
    <bpmn:callActivity id="call_activity" name="Contribute to BPMN Visualization 🔧">
      <bpmn:incoming>sequence_flow_6</bpmn:incoming>
      <bpmn:outgoing>sequence_flow_7</bpmn:outgoing>
    </bpmn:callActivity>
    <bpmn:exclusiveGateway id="exclusive_gateway_3" name="Is it your your 5th contribution?" default="sequence_flow_8">
      <bpmn:incoming>sequence_flow_7</bpmn:incoming>
      <bpmn:outgoing>sequence_flow_8</bpmn:outgoing>
      <bpmn:outgoing>sequence_flow_9</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:userTask id="user_task_4" name="Win a limited edition T-shirt 🎉">
      <bpmn:incoming>sequence_flow_9</bpmn:incoming>
      <bpmn:outgoing>sequence_flow_10</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="user_task_5" name="Tweet how it was fun to contribute to BPMN Visualization 😃">
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
      <bpmndi:BPMNEdge id="edge_sequence_flow_4" bpmnElement="sequence_flow_4">
        <di:waypoint x="425" y="210" />
        <di:waypoint x="635" y="210" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="521" y="223" width="18" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_3" bpmnElement="sequence_flow_3">
        <di:waypoint x="590" y="119" />
        <di:waypoint x="660" y="119" />
        <di:waypoint x="660" y="185" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_2" bpmnElement="sequence_flow_2">
        <di:waypoint x="400" y="185" />
        <di:waypoint x="400" y="124" />
        <di:waypoint x="480" y="124" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="372" y="152" width="15" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_1" bpmnElement="sequence_flow_1">
        <di:waypoint x="268" y="210" />
        <di:waypoint x="375" y="210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_5" bpmnElement="sequence_flow_5">
        <di:waypoint x="685" y="210" />
        <di:waypoint x="780" y="210" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_8" bpmnElement="sequence_flow_8">
        <di:waypoint x="845" y="385" />
        <di:waypoint x="845" y="240" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="852" y="343" width="15" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_6" bpmnElement="sequence_flow_6">
        <di:waypoint x="910" y="210" />
        <di:waypoint x="1045" y="210" />
        <di:waypoint x="1045" y="275" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_7" bpmnElement="sequence_flow_7">
        <di:waypoint x="1045" y="345" />
        <di:waypoint x="1045" y="410" />
        <di:waypoint x="860" y="410" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge_sequence_flow_9" bpmnElement="sequence_flow_9">
        <di:waypoint x="815" y="410" />
        <di:waypoint x="712" y="410" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="760" y="388" width="18" height="14" />
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
      <bpmndi:BPMNShape id="shape_end_event" bpmnElement="end_event">
        <dc:Bounds x="232" y="387" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="216" y="430" width="68" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shape_user_task_1" bpmnElement="user_task_1">
        <dc:Bounds x="470" y="84" width="120" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shape_user_task_5" bpmnElement="user_task_5">
        <dc:Bounds x="355" y="365" width="150" height="80" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="365" y="390" width="130" height="55" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;
}