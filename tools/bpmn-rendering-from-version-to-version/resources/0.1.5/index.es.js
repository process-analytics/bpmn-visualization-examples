/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
  The real name of the field in the BPMN XSD
 */
var ShapeBpmnElementKind;
(function (ShapeBpmnElementKind) {
    ShapeBpmnElementKind["LANE"] = "lane";
    ShapeBpmnElementKind["POOL"] = "pool";
    ShapeBpmnElementKind["CALL_ACTIVITY"] = "callActivity";
    ShapeBpmnElementKind["SUB_PROCESS"] = "subProcess";
    ShapeBpmnElementKind["TASK"] = "task";
    ShapeBpmnElementKind["TASK_USER"] = "userTask";
    ShapeBpmnElementKind["TASK_SERVICE"] = "serviceTask";
    ShapeBpmnElementKind["TASK_RECEIVE"] = "receiveTask";
    // TODO: Uncomment corresponding test in test/unit/component/parser/json/BpmnJsonParser.sequenceFlow.default.test.ts
    // TODO: Uncomment corresponding test in test/unit/component/parser/json/BpmnJsonParser.sequenceFlow.conditional.test.ts
    // TASK_MANUAL = 'manualTask',
    // TODO: Uncomment corresponding test in test/unit/component/parser/json/BpmnJsonParser.sequenceFlow.default.test.ts
    // TODO: Uncomment corresponding test in test/unit/component/parser/json/BpmnJsonParser.sequenceFlow.conditional.test.ts
    // TASK_SCRIPT = 'scriptTask',
    // TODO: Uncomment corresponding test in test/unit/component/parser/json/BpmnJsonParser.sequenceFlow.default.test.ts
    // TODO: Uncomment corresponding test in test/unit/component/parser/json/BpmnJsonParser.sequenceFlow.conditional.test.ts
    // TASK_SEND = 'sendTask',
    // TODO: Uncomment corresponding test in test/unit/component/parser/json/BpmnJsonParser.sequenceFlow.default.test.ts
    // TODO: Uncomment corresponding test in test/unit/component/parser/json/BpmnJsonParser.sequenceFlow.conditional.test.ts
    // TASK_BUSINESS_RULE = 'businessRuleTask',
    ShapeBpmnElementKind["GATEWAY_PARALLEL"] = "parallelGateway";
    ShapeBpmnElementKind["GATEWAY_EXCLUSIVE"] = "exclusiveGateway";
    ShapeBpmnElementKind["GATEWAY_INCLUSIVE"] = "inclusiveGateway";
    // TODO: Uncomment corresponding test in test/unit/component/parser/json/BpmnJsonParser.sequenceFlow.default.test.ts
    // TODO: Uncomment corresponding test in test/unit/component/parser/json/BpmnJsonParser.sequenceFlow.conditional.test.ts
    // TODO : Uncomment corresponding line in src/model/bpmn/shape/ShapeUtil.ts
    // GATEWAY_COMPLEX = 'complexGateway',
    ShapeBpmnElementKind["EVENT_START"] = "startEvent";
    ShapeBpmnElementKind["EVENT_END"] = "endEvent";
    ShapeBpmnElementKind["EVENT_INTERMEDIATE_CATCH"] = "intermediateCatchEvent";
    ShapeBpmnElementKind["EVENT_INTERMEDIATE_THROW"] = "intermediateThrowEvent";
    ShapeBpmnElementKind["EVENT_BOUNDARY"] = "boundaryEvent";
})(ShapeBpmnElementKind || (ShapeBpmnElementKind = {}));

/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// TODO move to ShapeBpmnElementKind? and rename into ShapeBpmnElementKindUtil?
// TODO bpmnEventKinds currently hosted in ProcessConverter may be hosted here
class ShapeUtil {
    static filterKind(suffix, ignoreCase = false) {
        return Object.values(ShapeBpmnElementKind).filter(kind => {
            if (ignoreCase) {
                return kind.endsWith(suffix) || kind.toLowerCase().endsWith(suffix.toLowerCase());
            }
            return kind.endsWith(suffix);
        });
    }
    static isEvent(kind) {
        return this.EVENT_KINDS.includes(kind);
    }
    static isSubProcess(kind) {
        return ShapeBpmnElementKind.SUB_PROCESS === kind;
    }
    static isBoundaryEvent(kind) {
        return ShapeBpmnElementKind.EVENT_BOUNDARY === kind;
    }
    static canHaveNoneEvent(kind) {
        return ShapeBpmnElementKind.EVENT_INTERMEDIATE_THROW === kind || ShapeBpmnElementKind.EVENT_END === kind || ShapeBpmnElementKind.EVENT_START === kind;
    }
    static isActivity(kind) {
        return this.ACTIVITY_KINDS.includes(kind);
    }
    static isWithDefaultSequenceFlow(kind) {
        return this.FLOWNODE_WITH_DEFAULT_SEQUENCE_FLOW_KINDS.includes(kind);
    }
    // TODO should we clone the array to avoid modifications of this ref array by client code?
    // topLevelBpmnEventKinds to not mixed with the bpmnEventKinds that currently are the list of non None event subtypes
    static topLevelBpmnEventKinds() {
        return this.EVENT_KINDS;
    }
    static activityKinds() {
        return this.ACTIVITY_KINDS;
    }
    static taskKinds() {
        return this.TASK_KINDS;
    }
    static gatewayKinds() {
        return this.GATEWAY_KINDS;
    }
    static flowNodeKinds() {
        return Object.values(ShapeBpmnElementKind).filter(kind => {
            return kind != ShapeBpmnElementKind.LANE;
        });
    }
    static isPoolOrLane(kind) {
        return kind == ShapeBpmnElementKind.POOL || kind == ShapeBpmnElementKind.LANE;
    }
}
ShapeUtil.EVENT_KINDS = ShapeUtil.filterKind('Event');
ShapeUtil.GATEWAY_KINDS = ShapeUtil.filterKind('Gateway');
// TODO : To modify when we will support globalTask (They are not considered as Task in the BPMN Semantic)
ShapeUtil.TASK_KINDS = ShapeUtil.filterKind('Task', true);
ShapeUtil.ACTIVITY_KINDS = [...ShapeUtil.TASK_KINDS, ShapeBpmnElementKind.CALL_ACTIVITY, ShapeBpmnElementKind.SUB_PROCESS];
ShapeUtil.FLOWNODE_WITH_DEFAULT_SEQUENCE_FLOW_KINDS = [
    ...ShapeUtil.ACTIVITY_KINDS,
    ShapeBpmnElementKind.GATEWAY_EXCLUSIVE,
    ShapeBpmnElementKind.GATEWAY_INCLUSIVE,
];

/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var SequenceFlowKind;
(function (SequenceFlowKind) {
    SequenceFlowKind["NORMAL"] = "normal";
    SequenceFlowKind["DEFAULT"] = "default";
    SequenceFlowKind["CONDITIONAL_FROM_ACTIVITY"] = "conditional_from_activity";
    SequenceFlowKind["CONDITIONAL_FROM_GATEWAY"] = "conditional_from_gateway";
})(SequenceFlowKind || (SequenceFlowKind = {}));

var MarkerConstant;
(function (MarkerConstant) {
    MarkerConstant["ARROW_DASH"] = "bpmn.dash";
})(MarkerConstant || (MarkerConstant = {}));
class MarkerConfigurator {
    configureMarkers() {
        this.registerArrowDashMarker();
    }
    registerArrowDashMarker() {
        // This implementation is adapted from the draw.io BPMN 'dash' marker
        // https://github.com/jgraph/drawio/blob/f539f1ff362e76127dcc7e68b5a9d83dd7d4965c/src/main/webapp/js/mxgraph/Shapes.js#L2796
        const createMarker = (c, shape, type, pe, unitX, unitY, size, source, strokewidth) => {
            const nx = unitX * (size + strokewidth + 4);
            const ny = unitY * (size + strokewidth + 4);
            return function () {
                c.begin();
                c.moveTo(pe.x - nx / 2 - ny / 2, pe.y - ny / 2 + nx / 2);
                c.lineTo(pe.x + ny / 2 - (3 * nx) / 2, pe.y - (3 * ny) / 2 - nx / 2);
                c.stroke();
            };
        };
        mxMarker.addMarker(MarkerConstant.ARROW_DASH, createMarker);
    }
}

/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Base name of the EventDefinition fields in the BPMN XSD. In the xsd, the value is <enum_value>EventDefinition
 *
 * For instance, TERMINATE --> terminateEventDefinition
 */
var ShapeBpmnEventKind;
(function (ShapeBpmnEventKind) {
    ShapeBpmnEventKind["NONE"] = "none";
    ShapeBpmnEventKind["TERMINATE"] = "terminate";
    ShapeBpmnEventKind["CANCEL"] = "cancel";
    ShapeBpmnEventKind["COMPENSATION"] = "compensate";
    ShapeBpmnEventKind["CONDITIONAL"] = "conditional";
    ShapeBpmnEventKind["ERROR"] = "error";
    ShapeBpmnEventKind["ESCALATION"] = "escalation";
    ShapeBpmnEventKind["LINK"] = "link";
    ShapeBpmnEventKind["MESSAGE"] = "message";
    ShapeBpmnEventKind["SIGNAL"] = "signal";
    ShapeBpmnEventKind["TIMER"] = "timer";
})(ShapeBpmnEventKind || (ShapeBpmnEventKind = {}));
/**
 * List supported events in addition to the NONE event.
 *
 * Temporarily used until we support all events
 */
const supportedBpmnEventKinds = [ShapeBpmnEventKind.TERMINATE, ShapeBpmnEventKind.TIMER, ShapeBpmnEventKind.MESSAGE];

var StyleConstant;
(function (StyleConstant) {
    StyleConstant[StyleConstant["STROKE_WIDTH_THIN"] = 2] = "STROKE_WIDTH_THIN";
    StyleConstant[StyleConstant["STROKE_WIDTH_THICK"] = 5] = "STROKE_WIDTH_THICK";
    StyleConstant["BPMN_STYLE_EVENT_KIND"] = "bpmn.eventKind";
    StyleConstant["BPMN_STYLE_SUB_PROCESS_KIND"] = "bpmn.subProcessKind";
    StyleConstant["BPMN_STYLE_IS_INTERRUPTING"] = "bpmn.isInterrupting";
    StyleConstant["BPMN_STYLE_IS_EXPANDED"] = "bpmn.isExpanded";
    StyleConstant["DEFAULT_FILL_COLOR"] = "White";
    StyleConstant["DEFAULT_STROKE_COLOR"] = "Black";
    StyleConstant["DEFAULT_FONT_FAMILY"] = "Arial, Helvetica, sans-serif";
    StyleConstant[StyleConstant["DEFAULT_FONT_SIZE"] = 11] = "DEFAULT_FONT_SIZE";
    StyleConstant["DEFAULT_FONT_COLOR"] = "Black";
    StyleConstant[StyleConstant["DEFAULT_MARGIN"] = 0] = "DEFAULT_MARGIN";
    StyleConstant[StyleConstant["DEFAULT_DASHED"] = 0] = "DEFAULT_DASHED";
    StyleConstant[StyleConstant["DEFAULT_FIX_DASH"] = 0] = "DEFAULT_FIX_DASH";
    StyleConstant["DEFAULT_DASH_PATTERN"] = "3 3";
})(StyleConstant || (StyleConstant = {}));
/* eslint-disable @typescript-eslint/no-explicit-any */
class StyleUtils {
    static getFillColor(style) {
        return mxUtils.getValue(style, mxConstants.STYLE_FILLCOLOR, StyleConstant.DEFAULT_FILL_COLOR);
    }
    static getStrokeColor(style) {
        return mxUtils.getValue(style, mxConstants.STYLE_STROKECOLOR, StyleConstant.DEFAULT_STROKE_COLOR);
    }
    static getStrokeWidth(style) {
        return mxUtils.getValue(style, mxConstants.STYLE_STROKEWIDTH, StyleConstant.STROKE_WIDTH_THIN);
    }
    static getMargin(style) {
        return mxUtils.getValue(style, mxConstants.STYLE_MARGIN, StyleConstant.DEFAULT_MARGIN);
    }
    static isDashed(style) {
        return mxUtils.getValue(style, mxConstants.STYLE_DASHED, StyleConstant.DEFAULT_DASHED);
    }
    static getFixDash(style) {
        return mxUtils.getValue(style, mxConstants.STYLE_FIX_DASH, StyleConstant.DEFAULT_FIX_DASH);
    }
    static getDashPattern(style) {
        return mxUtils.getValue(style, mxConstants.STYLE_DASH_PATTERN, StyleConstant.DEFAULT_DASH_PATTERN);
    }
    static getBpmnEventKind(style) {
        return mxUtils.getValue(style, StyleConstant.BPMN_STYLE_EVENT_KIND, ShapeBpmnEventKind.NONE);
    }
    static getBpmnSubProcessKind(style) {
        return mxUtils.getValue(style, StyleConstant.BPMN_STYLE_SUB_PROCESS_KIND, undefined);
    }
    static getBpmnIsInterrupting(style) {
        return mxUtils.getValue(style, StyleConstant.BPMN_STYLE_IS_INTERRUPTING, undefined);
    }
    static getBpmnIsExpanded(style) {
        return mxUtils.getValue(style, StyleConstant.BPMN_STYLE_IS_EXPANDED, 'false');
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
class StyleConfigurator {
    constructor(graph) {
        this.graph = graph;
        this.specificEdgeStyles = new Map([
            [
                SequenceFlowKind.DEFAULT,
                (style) => {
                    style[mxConstants.STYLE_STARTARROW] = MarkerConstant.ARROW_DASH;
                },
            ],
            [
                SequenceFlowKind.CONDITIONAL_FROM_ACTIVITY,
                (style) => {
                    style[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_DIAMOND_THIN;
                    style[mxConstants.STYLE_STARTSIZE] = 18;
                    style[mxConstants.STYLE_STARTFILL] = 0;
                },
            ],
        ]);
    }
    configureStyles() {
        mxConstants.RECTANGLE_ROUNDING_FACTOR = 0.1;
        this.configureDefaultVertexStyle();
        this.configurePoolStyle();
        this.configureLaneStyle();
        this.configureActivitiesStyle();
        this.configureEventsStyle();
        this.configureGatewaysStyle();
        this.configureDefaultEdgeStyle();
        this.configureSequenceFlowsStyle();
    }
    getStylesheet() {
        return this.graph.getStylesheet();
    }
    getDefaultVertexStyle() {
        return this.getStylesheet().getDefaultVertexStyle();
    }
    getDefaultEdgeStyle() {
        return this.getStylesheet().getDefaultEdgeStyle();
    }
    cloneDefaultVertexStyle() {
        const defaultStyle = this.getDefaultVertexStyle();
        return mxUtils.clone(defaultStyle);
    }
    cloneDefaultEdgeStyle() {
        const defaultStyle = this.getDefaultEdgeStyle();
        return mxUtils.clone(defaultStyle);
    }
    putCellStyle(name, style) {
        this.getStylesheet().putCellStyle(name, style);
    }
    configureDefaultVertexStyle() {
        const style = this.getDefaultVertexStyle();
        this.configureCommonDefaultStyle(style);
    }
    configurePoolStyle() {
        const style = this.cloneDefaultVertexStyle();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_HORIZONTAL] = false;
        style[mxConstants.STYLE_FILLCOLOR] = '#d3d2d1';
        // TODO manage pool text area rendering
        // most of BPMN pool are ok when setting it to 30
        style[mxConstants.STYLE_STARTSIZE] = 30;
        this.graph.getStylesheet().putCellStyle(ShapeBpmnElementKind.POOL, style);
    }
    configureLaneStyle() {
        const style = this.cloneDefaultVertexStyle();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_HORIZONTAL] = false;
        style[mxConstants.STYLE_SWIMLANE_LINE] = 0; // hide the line between the title region and the content area
        this.graph.getStylesheet().putCellStyle(ShapeBpmnElementKind.LANE, style);
    }
    configureEventsStyle() {
        ShapeUtil.topLevelBpmnEventKinds().forEach(kind => {
            const style = this.cloneDefaultVertexStyle();
            style[mxConstants.STYLE_SHAPE] = kind;
            style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
            style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
            this.putCellStyle(kind, style);
        });
    }
    configureActivitiesStyle() {
        ShapeUtil.activityKinds().forEach(kind => {
            const style = this.cloneDefaultVertexStyle();
            style[mxConstants.STYLE_SHAPE] = kind;
            style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
            this.putCellStyle(kind, style);
        });
    }
    configureGatewaysStyle() {
        ShapeUtil.gatewayKinds().forEach(kind => {
            const style = this.cloneDefaultVertexStyle();
            style[mxConstants.STYLE_SHAPE] = kind;
            style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RhombusPerimeter;
            style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
            // Default positioning in case there is no BPMN LabelStyle
            style[mxConstants.STYLE_LABEL_POSITION] = mxConstants.ALIGN_LEFT;
            style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_TOP;
            this.putCellStyle(kind, style);
        });
    }
    configureDefaultEdgeStyle() {
        const style = this.getDefaultEdgeStyle();
        style[mxConstants.STYLE_EDGE] = mxConstants.EDGESTYLE_SEGMENT;
        style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_BLOCK_THIN;
        style[mxConstants.STYLE_ENDSIZE] = 12;
        style[mxConstants.STYLE_STROKEWIDTH] = 1.5;
        style[mxConstants.STYLE_ROUNDED] = 1;
        style[mxConstants.STYLE_ARCSIZE] = 5;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_BOTTOM;
        this.configureCommonDefaultStyle(style);
    }
    configureCommonDefaultStyle(style) {
        style[mxConstants.STYLE_FONTFAMILY] = StyleConstant.DEFAULT_FONT_FAMILY;
        style[mxConstants.STYLE_FONTSIZE] = StyleConstant.DEFAULT_FONT_SIZE;
        style[mxConstants.STYLE_FONTCOLOR] = StyleConstant.DEFAULT_FONT_COLOR;
        style[mxConstants.STYLE_FILLCOLOR] = StyleConstant.DEFAULT_FILL_COLOR;
        style[mxConstants.STYLE_STROKECOLOR] = StyleConstant.DEFAULT_STROKE_COLOR;
        style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = mxConstants.NONE;
        // only works with html labels (enabled by MxGraphConfigurator)
        style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
    }
    configureSequenceFlowsStyle() {
        Object.values(SequenceFlowKind).forEach(kind => {
            const style = this.cloneDefaultEdgeStyle();
            const updateEdgeStyle = this.specificEdgeStyles.get(kind) ||
                (() => {
                    // Do nothing
                });
            updateEdgeStyle(style);
            this.graph.getStylesheet().putCellStyle(kind, style);
        });
    }
}

/**
 * Scale dimensions passed to the method of the original {@link mxgraph.mxXmlCanvas2D}
 *
 * @example vanilla canvas calls when a scale factor must be applied to positions
 * const scaleFactor = 0.26;
 * c.moveTo(8 * scaleFactor, 39 * scaleFactor);
 * c.lineTo(12 * scaleFactor, 25 * scaleFactor);
 *
 * @example with `MxScaleFactorCanvas`
 * const canvas = new MxScaleFactorCanvas(c, 0.26);
 * canvas.moveTo(8, 39);
 * canvas.lineTo(12, 25);
 */
class MxScaleFactorCanvas {
    constructor(c, scaleFactor) {
        this.c = c;
        this.scaleFactor = scaleFactor;
    }
    arcTo(rx, ry, angle, largeArcFlag, sweepFlag, x, y) {
        this.c.arcTo(rx * this.scaleFactor, ry * this.scaleFactor, angle, largeArcFlag, sweepFlag, x * this.scaleFactor, y * this.scaleFactor);
    }
    begin() {
        this.c.begin();
    }
    close() {
        this.c.close();
    }
    curveTo(x1, y1, x2, y2, x3, y3) {
        this.c.curveTo(x1 * this.scaleFactor, y1 * this.scaleFactor, x2 * this.scaleFactor, y2 * this.scaleFactor, x3 * this.scaleFactor, y3 * this.scaleFactor);
    }
    fill() {
        this.c.fill();
    }
    fillAndStroke() {
        this.c.fillAndStroke();
    }
    lineTo(x, y) {
        this.c.lineTo(x * this.scaleFactor, y * this.scaleFactor);
    }
    moveTo(x, y) {
        this.c.moveTo(x * this.scaleFactor, y * this.scaleFactor);
    }
    rotate(theta, flipH, flipV, cx, cy) {
        this.c.rotate(theta, flipH, flipV, cx, cy);
    }
}
class MxCanvasUtil {
    static getConfiguredCanvas(canvas, parentWidth, parentHeight, iconOriginalSize, ratioFromParent) {
        const parentSize = Math.min(parentWidth, parentHeight);
        const scaleFactor = (parentSize / iconOriginalSize) * ratioFromParent;
        return new MxScaleFactorCanvas(canvas, scaleFactor);
    }
    /**
     * Moves canvas cursor to drawing starting point.
     * @param canvas
     * @param parentX
     * @param parentY
     * @param parentWidth
     * @param parentHeight
     * @param positionIndex - helps to define the position of the Icon relatively to top left corner
     */
    static translateToStartingIconPosition(canvas, parentX, parentY, parentWidth, parentHeight, positionIndex) {
        const xTranslation = parentX + parentWidth / positionIndex;
        const yTranslation = parentY + parentHeight / positionIndex;
        canvas.translate(xTranslation, yTranslation);
    }
    static translateIconToShapeCenter(c, shape, iconSize) {
        // Change the coordinate referential
        const insetW = (shape.w - iconSize.width) / 2;
        const insetH = (shape.h - iconSize.height) / 2;
        c.translate(shape.x + insetW, shape.y + insetH);
    }
}

/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class IconPainter {
    static buildPaintParameter(c, x, y, width, height, shape, ratioFromParent = 0.25, isFilled = false, iconStrokeWidth = 0) {
        const shapeStrokeWidth = shape.strokewidth || StyleUtils.getStrokeWidth(shape.style);
        const fillColor = shape.fill || StyleUtils.getFillColor(shape.style);
        const strokeColor = shape.stroke || StyleUtils.getStrokeColor(shape.style);
        const margin = StyleUtils.getMargin(shape.style);
        return {
            c,
            ratioFromParent,
            shape: { x, y, w: width, h: height, strokeWidth: shapeStrokeWidth },
            icon: { isFilled, fillColor, strokeColor, strokeWidth: iconStrokeWidth, margin },
        };
    }
    static calculateIconSize(initialIconSize, icon, shape, ratioFromParent) {
        // Calculate the icon size proportionally to the shape size
        // (the longest side of the icon has the same value of the same side of the shape)
        let iconWidthProportionalToShape;
        let iconHeightProportionalToShape;
        if (initialIconSize.height <= initialIconSize.width) {
            iconWidthProportionalToShape = shape.w;
            iconHeightProportionalToShape = (shape.w * initialIconSize.height) / initialIconSize.width;
        }
        else {
            iconWidthProportionalToShape = (shape.h * initialIconSize.width) / initialIconSize.height;
            iconHeightProportionalToShape = shape.h;
        }
        // Calculate icon size proportionally to the ratio define in the shape
        const inset = icon.strokeWidth ? (icon.strokeWidth - 1) * 2 : 0;
        const paintIconWidth = iconWidthProportionalToShape * ratioFromParent - inset;
        const paintIconHeight = iconHeightProportionalToShape * ratioFromParent - inset;
        return { width: paintIconWidth, height: paintIconHeight };
    }
    static updateCanvasStyle(canvas, { isFilled, strokeColor, fillColor, strokeWidth }) {
        if (isFilled) {
            // Choose dark color to fill the icon
            canvas.setFillColor(strokeColor);
        }
        else {
            // Choose light color to fill the icon
            canvas.setFillColor(fillColor);
        }
        canvas.setStrokeWidth(strokeWidth);
    }
    static paintEmptyIcon() {
        // empty by nature
    }
    // this implementation is adapted from the draw.io BPMN 'message' symbol
    // https://github.com/jgraph/drawio/blob/0e19be6b42755790a749af30450c78c0d83be765/src/main/webapp/shapes/bpmn/mxBpmnShape2.js#L465
    static paintEnvelopeIcon({ c, ratioFromParent, shape, icon }) {
        this.updateCanvasStyle(c, icon);
        const initialIconSize = { width: 485.41, height: 321.76 };
        const iconSize = this.calculateIconSize(initialIconSize, icon, shape, ratioFromParent);
        MxCanvasUtil.translateIconToShapeCenter(c, shape, iconSize);
        const w = iconSize.width;
        const h = iconSize.height;
        // Paint the envelope outline with dark color
        c.rect(0, 0, w, h);
        c.fillAndStroke();
        if (icon.isFilled) {
            // Choose light color for envelope closure
            c.setStrokeColor(icon.fillColor);
        }
        // Paint the envelope closure
        c.begin();
        // V line
        c.moveTo(0, 0);
        c.lineTo(w * 0.5, h * 0.6);
        c.lineTo(w, 0);
        // First bottom line
        c.moveTo(0, h);
        c.lineTo(w / 3, h * 0.45);
        // Second bottom line
        c.moveTo(w, h);
        c.lineTo((w * 2) / 3, h * 0.45);
        c.stroke();
    }
    // highly inspired from mxDoubleEllipse
    static paintCircleIcon({ c, ratioFromParent, shape, icon }) {
        this.updateCanvasStyle(c, icon);
        const initialIconSize = { width: shape.w, height: shape.h };
        const iconSize = this.calculateIconSize(initialIconSize, icon, shape, ratioFromParent);
        MxCanvasUtil.translateIconToShapeCenter(c, shape, iconSize);
        const w = iconSize.width;
        const h = iconSize.height;
        if (w > 0 && h > 0) {
            c.ellipse(0, 0, w, h);
        }
        if (icon.isFilled) {
            c.fillAndStroke();
        }
        else {
            c.stroke();
        }
    }
    // implementation adapted from https://www.flaticon.com/free-icon/clock_223404
    static paintClockIcon({ c, ratioFromParent, shape: { x, y, w, h }, icon }) {
        this.updateCanvasStyle(c, icon);
        const canvas = MxCanvasUtil.getConfiguredCanvas(c, w, h, 152, ratioFromParent);
        MxCanvasUtil.translateToStartingIconPosition(c, x, y, w, h, 5);
        canvas.begin();
        canvas.moveTo(184, 60);
        canvas.curveTo(188.4, 60, 192, 56.4, 192, 52);
        canvas.lineTo(192, 48);
        canvas.curveTo(192, 40, 188.4, 40, 184, 40);
        canvas.curveTo(179.6, 40, 176, 43.6, 176, 48);
        canvas.lineTo(176, 52);
        canvas.curveTo(176, 56.4, 179.6, 60, 184, 60);
        canvas.close();
        canvas.moveTo(184, 308);
        canvas.curveTo(179.6, 308, 176, 311.6, 176, 316);
        canvas.lineTo(176, 320);
        canvas.curveTo(176, 324.4, 179.6, 328, 184, 328);
        canvas.curveTo(188.4, 328, 192, 324.4, 192, 320);
        canvas.lineTo(192, 316);
        canvas.curveTo(192, 311.6, 188.4, 308, 184, 308);
        canvas.close();
        canvas.moveTo(52, 176);
        canvas.lineTo(48, 176);
        canvas.curveTo(43.6, 176, 40, 179.6, 40, 184);
        canvas.curveTo(40, 188.4, 43.6, 192, 48, 192);
        canvas.lineTo(52, 192);
        canvas.curveTo(56.4, 192, 69, 188.4, 60, 184);
        canvas.curveTo(60, 179.6, 56.4, 176, 52, 176);
        canvas.close();
        canvas.moveTo(320, 176);
        canvas.lineTo(316, 176);
        canvas.curveTo(311.6, 176, 308, 179.6, 308, 184);
        canvas.curveTo(308, 188.4, 311.6, 192, 316, 192);
        canvas.lineTo(320, 192);
        canvas.curveTo(324.4, 192, 328, 188.4, 328, 184);
        canvas.curveTo(328, 179.6, 324.4, 176, 320, 176);
        canvas.moveTo(93.6, 82.4);
        canvas.curveTo(90.4, 79.2, 85.6, 79.2, 82.4, 82.4);
        canvas.curveTo(79.2, 85.6, 79.2, 90.4, 82.4, 93.6);
        canvas.lineTo(85.2, 96.4);
        canvas.curveTo(86.8, 98, 88.8, 98.8, 90.8, 98.8);
        canvas.curveTo(92.8, 98.8, 94.4, 98, 96.4, 96.4);
        canvas.curveTo(99.6, 93.2, 99.6, 88.4, 96.4, 85.2);
        canvas.lineTo(93.6, 82.4);
        canvas.moveTo(85.2, 271.6);
        canvas.lineTo(82.4, 274.4);
        canvas.curveTo(79.2, 277.6, 79.2, 282.4, 82.4, 285.6);
        canvas.curveTo(84, 287.2, 86, 288, 88, 288);
        canvas.curveTo(90, 288, 92, 287.2, 93.6, 285.6);
        canvas.lineTo(96.4, 282.8);
        canvas.curveTo(99.6, 279.6, 99.6, 274.8, 96.4, 271.6);
        canvas.curveTo(93.2, 268.4, 88.4, 268.4, 85.2, 271.6);
        canvas.moveTo(274.4, 82.4);
        canvas.lineTo(271.6, 85.2);
        canvas.curveTo(268.4, 88.4, 268.4, 93.2, 271.6, 96.4);
        canvas.curveTo(273.298, 98, 275.2, 98.8, 277.2, 98.8);
        canvas.curveTo(279.2, 98.8, 281.2, 98, 282.8, 96.4);
        canvas.lineTo(285.6, 93.6);
        canvas.curveTo(288.8, 90.4, 288.8, 85.6, 285.6, 82.4);
        canvas.curveTo(282.4, 79.2, 277.6, 79.2, 274.4, 82.4);
        canvas.moveTo(192, 180.8);
        canvas.lineTo(192, 108);
        canvas.curveTo(192, 103.6, 188.4, 100, 184, 100);
        canvas.curveTo(179.6, 100, 176, 103.6, 176, 108);
        canvas.lineTo(176, 184);
        canvas.curveTo(176, 186, 176.8, 188, 178.4, 189.6);
        canvas.lineTo(266, 277.2);
        canvas.curveTo(267.6, 278.8, 269.6, 279.6, 271.6, 279.6);
        canvas.curveTo(273.6, 279.6, 275.6, 278.8, 277.2, 277.2);
        canvas.curveTo(280.4, 274, 280.4, 269.2, 277.2, 266);
        canvas.lineTo(192, 180.8);
        canvas.moveTo(184, 0);
        canvas.curveTo(82.4, 0, 0, 82.4, 0, 184);
        canvas.curveTo(0, 285.6, 82.4, 368, 184, 368);
        canvas.curveTo(285.6, 368, 368, 285.6, 368, 184);
        canvas.curveTo(368, 82.4, 285.6, 0, 184, 0);
        canvas.moveTo(184, 352);
        canvas.curveTo(91.2, 352, 16, 276.8, 16, 184);
        canvas.curveTo(16, 91.2, 91.2, 16, 184, 16);
        canvas.curveTo(276.8, 16, 352, 91.2, 352, 184);
        canvas.curveTo(352, 276.8, 276.8, 352, 184, 352);
        canvas.fillAndStroke();
    }
    static paintXCrossIcon({ c, ratioFromParent, shape: { x, y, w, h }, icon }) {
        this.updateCanvasStyle(c, Object.assign(Object.assign({}, icon), { isFilled: true }));
        const canvas = MxCanvasUtil.getConfiguredCanvas(c, w, h, 0.5, ratioFromParent);
        MxCanvasUtil.translateToStartingIconPosition(c, x, y, w, h, 4);
        IconPainter.drawCrossIcon(canvas);
        const xRotation = w / 4;
        const yRotation = h / 4;
        canvas.rotate(45, false, false, xRotation, yRotation);
        canvas.fillAndStroke();
    }
    static paintPlusCrossIcon({ c, ratioFromParent, shape: { x, y, w, h }, icon }) {
        this.updateCanvasStyle(c, Object.assign(Object.assign({}, icon), { isFilled: true }));
        const canvas = MxCanvasUtil.getConfiguredCanvas(c, w, h, 0.5, ratioFromParent);
        MxCanvasUtil.translateToStartingIconPosition(c, x, y, w, h, 4);
        IconPainter.drawCrossIcon(canvas);
        canvas.fillAndStroke();
    }
    static drawCrossIcon(canvas) {
        canvas.begin();
        canvas.moveTo(0.38, 0);
        canvas.lineTo(0.62, 0);
        canvas.lineTo(0.62, 0.38);
        canvas.lineTo(1, 0.38);
        canvas.lineTo(1, 0.62);
        canvas.lineTo(0.62, 0.62);
        canvas.lineTo(0.62, 1);
        canvas.lineTo(0.38, 1);
        canvas.lineTo(0.38, 0.62);
        canvas.lineTo(0, 0.62);
        canvas.lineTo(0, 0.38);
        canvas.lineTo(0.38, 0.38);
        canvas.close();
    }
    // implementation adapted from https://www.flaticon.com/free-icon/employees_554768
    // use https://github.com/process-analytics/mxgraph-svg2shape to generate the xml stencil and port it to code
    static paintWomanIcon({ c, ratioFromParent, shape: { x, y, w, h }, icon }) {
        this.updateCanvasStyle(c, Object.assign(Object.assign({}, icon), { isFilled: true }));
        // generated icon h="239.68" w="143.61"
        const canvas = MxCanvasUtil.getConfiguredCanvas(c, w, h, 239, ratioFromParent);
        MxCanvasUtil.translateToStartingIconPosition(c, x, y, w, h, 20);
        canvas.begin();
        canvas.moveTo(124.31, 150.29);
        canvas.lineTo(99.66, 141.03);
        canvas.arcTo(6.43, 6.43, 0, 0, 1, 95.51, 135.03);
        canvas.lineTo(95.51, 130.66);
        canvas.arcTo(47.75, 47.75, 0, 0, 0, 119.51, 89.25);
        canvas.lineTo(119.51, 71.25);
        canvas.arcTo(47.62, 47.62, 0, 0, 0, 101.18, 33.64);
        canvas.arcTo(29.35, 29.35, 0, 0, 0, 101.52, 29.14);
        canvas.arcTo(29.68, 29.68, 0, 0, 0, 42.17, 29.14);
        canvas.arcTo(29.24, 29.24, 0, 0, 0, 42.53, 33.63);
        canvas.arcTo(47.65, 47.65, 0, 0, 0, 24.14, 71.23);
        canvas.lineTo(24.14, 89.23);
        canvas.arcTo(47.7, 47.7, 0, 0, 0, 48.19, 130.63);
        canvas.lineTo(48.19, 135.03);
        canvas.arcTo(6.43, 6.43, 0, 0, 1, 44.03, 141.03);
        canvas.lineTo(19.31, 150.29);
        canvas.arcTo(29.81, 29.81, 0, 0, 0, 0.09, 178.03);
        canvas.lineTo(0.09, 233.51);
        canvas.arcTo(5.63, 5.63, 0, 1, 0, 11.34, 233.51);
        canvas.lineTo(11.34, 178.03);
        canvas.arcTo(18.19, 18.19, 0, 0, 1, 11.57, 175.17);
        canvas.lineTo(20.5, 184.11);
        canvas.arcTo(12.32, 12.32, 0, 0, 1, 24.14, 192.89);
        canvas.lineTo(24.14, 233.51);
        canvas.arcTo(5.63, 5.63, 0, 1, 0, 35.39, 233.51);
        canvas.lineTo(35.39, 192.93);
        canvas.arcTo(23.5, 23.5, 0, 0, 0, 28.46, 176.2);
        canvas.lineTo(17.04, 164.78);
        canvas.arcTo(18.34, 18.34, 0, 0, 1, 23.29, 160.78);
        canvas.lineTo(43.65, 153.15);
        canvas.lineTo(66.22, 175.72);
        canvas.lineTo(66.22, 233.51);
        canvas.arcTo(5.63, 5.63, 0, 1, 0, 77.47, 233.51);
        canvas.lineTo(77.47, 175.76);
        canvas.lineTo(100.04, 153.19);
        canvas.lineTo(120.4, 160.82);
        canvas.arcTo(18.39, 18.39, 0, 0, 1, 126.65, 164.82);
        canvas.lineTo(115.24, 176.24);
        canvas.arcTo(23.5, 23.5, 0, 0, 0, 108.31, 192.93);
        canvas.lineTo(108.31, 233.55);
        canvas.arcTo(5.63, 5.63, 0, 1, 0, 119.56, 233.55);
        canvas.lineTo(119.56, 192.93);
        canvas.arcTo(12.35, 12.35, 0, 0, 1, 123.19, 184.15);
        canvas.lineTo(132.13, 175.22);
        canvas.arcTo(18, 18, 0, 0, 1, 132.36, 178.08);
        canvas.lineTo(132.36, 233.56);
        canvas.arcTo(5.63, 5.63, 0, 0, 0, 143.61, 233.56);
        canvas.lineTo(143.61, 178.03);
        canvas.arcTo(29.81, 29.81, 0, 0, 0, 124.31, 150.29);
        canvas.close();
        canvas.moveTo(71.85, 10.72);
        canvas.arcTo(18.46, 18.46, 0, 0, 1, 90.17, 27.18);
        canvas.arcTo(47.68, 47.68, 0, 0, 0, 53.53, 27.18);
        canvas.arcTo(18.44, 18.44, 0, 0, 1, 71.85, 10.72);
        canvas.close();
        canvas.moveTo(35.39, 71.23);
        canvas.arcTo(36.46, 36.46, 0, 0, 1, 108.31, 71.23);
        canvas.lineTo(108.31, 77.4);
        canvas.curveTo(82.12, 75.4, 56.97, 60.55, 56.71, 60.4);
        canvas.arcTo(5.62, 5.62, 0, 0, 0, 48.78, 62.71);
        canvas.curveTo(46.24, 67.79, 40.45, 71.89, 35.39, 74.62);
        canvas.close();
        canvas.moveTo(35.39, 89.23);
        canvas.lineTo(35.39, 87.08);
        canvas.curveTo(40.55, 84.85, 49.73, 80.08, 55.67, 72.66);
        canvas.curveTo(64.83, 77.46, 85.92, 87.21, 108.31, 88.66);
        canvas.lineTo(108.31, 89.24);
        canvas.arcTo(36.46, 36.46, 0, 1, 1, 35.39, 89.24);
        canvas.close();
        canvas.moveTo(71.85, 165.45);
        canvas.lineTo(54.06, 147.69);
        canvas.arcTo(17.7, 17.7, 0, 0, 0, 59.43, 135.32);
        canvas.arcTo(47.57, 47.57, 0, 0, 0, 84.27, 135.32);
        canvas.arcTo(17.7, 17.7, 0, 0, 0, 89.64, 147.69);
        canvas.close();
        canvas.fill();
    }
    // this implementation is adapted from the draw.io BPMN 'Service Task' stencil
    // https://github.com/jgraph/drawio/blob/9394fb0f1430d2c869865827b2bbef5639f63478/src/main/webapp/stencils/bpmn.xml#L898
    static paintGearIcon({ c, ratioFromParent, shape: { x, y, w, h }, icon }) {
        this.updateCanvasStyle(c, icon);
        // icon coordinates fill a 100x100 rectangle (approximately: 90x90 + foreground translation)
        const canvas = MxCanvasUtil.getConfiguredCanvas(c, w, h, 100, ratioFromParent);
        MxCanvasUtil.translateToStartingIconPosition(c, x, y, w, h, 20);
        // background
        this.paintGearIconBackground(canvas);
        // foreground
        const foregroundTranslation = 14 * canvas.scaleFactor;
        c.translate(foregroundTranslation, foregroundTranslation);
        this.paintGearIconForeground(canvas);
    }
    static paintGearIconBackground(canvas) {
        canvas.begin();
        canvas.moveTo(2.06, 24.62);
        canvas.lineTo(10.17, 30.95);
        canvas.lineTo(9.29, 37.73);
        canvas.lineTo(0, 41.42);
        canvas.lineTo(2.95, 54.24);
        canvas.lineTo(13.41, 52.92);
        canvas.lineTo(17.39, 58.52);
        canvas.lineTo(13.56, 67.66);
        canvas.lineTo(24.47, 74.44);
        canvas.lineTo(30.81, 66.33);
        canvas.lineTo(37.88, 67.21);
        canvas.lineTo(41.57, 76.5);
        canvas.lineTo(54.24, 73.55);
        canvas.lineTo(53.06, 62.94);
        canvas.lineTo(58.52, 58.52);
        canvas.lineTo(67.21, 63.09);
        canvas.lineTo(74.58, 51.88);
        canvas.lineTo(66.03, 45.25);
        canvas.lineTo(66.92, 38.62);
        canvas.lineTo(76.5, 34.93);
        canvas.lineTo(73.7, 22.26);
        canvas.lineTo(62.64, 23.44);
        canvas.lineTo(58.81, 18.42);
        canvas.lineTo(62.79, 8.7);
        canvas.lineTo(51.74, 2.21);
        canvas.lineTo(44.81, 10.47);
        canvas.lineTo(38.03, 9.43);
        canvas.lineTo(33.75, 0);
        canvas.lineTo(21.52, 3.24);
        canvas.lineTo(22.7, 13.56);
        canvas.lineTo(18.13, 17.54);
        canvas.lineTo(8.7, 13.56);
        canvas.close();
        const arcStartX = 24.8;
        const arcStartY = 39;
        this.paintInnerCircle(canvas, arcStartX, arcStartY);
    }
    static paintGearIconForeground(canvas) {
        canvas.begin();
        canvas.moveTo(16.46, 41.42);
        canvas.lineTo(24.57, 47.75);
        canvas.lineTo(23.69, 54.53);
        canvas.lineTo(14.4, 58.22);
        canvas.lineTo(17.35, 71.04);
        canvas.lineTo(27.81, 69.72);
        canvas.lineTo(31.79, 75.32);
        canvas.lineTo(27.96, 84.46);
        canvas.lineTo(38.87, 91.24);
        canvas.lineTo(45.21, 83.13);
        canvas.lineTo(52.28, 84.01);
        canvas.lineTo(55.97, 93.3);
        canvas.lineTo(68.64, 90.35);
        canvas.lineTo(67.46, 79.74);
        canvas.lineTo(72.92, 75.32);
        canvas.lineTo(81.61, 79.89);
        canvas.lineTo(88.98, 68.68);
        canvas.lineTo(80.43, 62.05);
        canvas.lineTo(81.32, 55.42);
        canvas.lineTo(90.9, 51.73);
        canvas.lineTo(88.1, 39.06);
        canvas.lineTo(77.04, 40.24);
        canvas.lineTo(73.21, 35.22);
        canvas.lineTo(77.19, 25.5);
        canvas.lineTo(66.14, 19.01);
        canvas.lineTo(59.21, 27.27);
        canvas.lineTo(52.43, 26.23);
        canvas.lineTo(48.15, 16.8);
        canvas.lineTo(35.92, 20.04);
        canvas.lineTo(37.1, 30.36);
        canvas.lineTo(32.53, 34.34);
        canvas.lineTo(23.1, 30.36);
        canvas.close();
        const arcStartX = 39.2;
        const arcStartY = 55.8;
        this.paintInnerCircle(canvas, arcStartX, arcStartY);
        // fill the inner circle to mask the background
        canvas.begin();
        this.paintInnerCircle(canvas, arcStartX, arcStartY);
    }
    static paintInnerCircle(canvas, arcStartX, arcStartY) {
        const arcRay = 13.5;
        canvas.moveTo(arcStartX, arcStartY);
        canvas.arcTo(arcRay, arcRay, 0, 1, 1, arcStartX + 2 * arcRay, arcStartY);
        canvas.arcTo(arcRay, arcRay, 0, 0, 1, arcStartX, arcStartY);
        canvas.close();
        canvas.fillAndStroke();
    }
}

class EventShape extends mxEllipse {
    constructor(bounds, fill, stroke, strokewidth) {
        super(bounds, fill, stroke, strokewidth);
        // TODO: when all/more event types will be supported, we could move to a Record/MappedType
        this.iconPainters = new Map([
            [ShapeBpmnEventKind.MESSAGE, (paintParameter) => IconPainter.paintEnvelopeIcon(Object.assign(Object.assign({}, paintParameter), { ratioFromParent: 0.5 }))],
            [ShapeBpmnEventKind.TERMINATE, (paintParameter) => IconPainter.paintCircleIcon(Object.assign(Object.assign({}, paintParameter), { ratioFromParent: 0.6 }))],
            [ShapeBpmnEventKind.TIMER, (paintParameter) => IconPainter.paintClockIcon(paintParameter)],
        ]);
        this.withFilledIcon = false;
    }
    paintVertexShape(c, x, y, w, h) {
        // TODO: This will be removed after implementation of all supported events
        // this.markNonFullyRenderedEvents(c);
        const paintParameter = IconPainter.buildPaintParameter(c, x, y, w, h, this, 0.25, this.withFilledIcon);
        this.paintOuterShape(paintParameter);
        this.paintInnerShape(paintParameter);
    }
    // This will be removed after implementation of all supported events
    // private markNonFullyRenderedEvents(c: mxgraph.mxXmlCanvas2D): void {
    //   const eventKind = this.getBpmnEventKind();
    //   if (eventKind == ShapeBpmnEventKind.TIMER) {
    //     c.setFillColor('green');
    //     c.setFillAlpha(0.3);
    //   }
    // }
    paintOuterShape({ c, shape: { x, y, w, h } }) {
        super.paintVertexShape(c, x, y, w, h);
    }
    paintInnerShape(paintParameter) {
        const paintIcon = this.iconPainters.get(StyleUtils.getBpmnEventKind(this.style)) || (() => IconPainter.paintEmptyIcon());
        paintIcon(paintParameter);
    }
}
class StartEventShape extends EventShape {
    constructor(bounds, fill, stroke, strokewidth = StyleConstant.STROKE_WIDTH_THIN) {
        super(bounds, fill, stroke, strokewidth);
    }
}
class EndEventShape extends EventShape {
    constructor(bounds, fill, stroke, strokewidth = StyleConstant.STROKE_WIDTH_THICK) {
        super(bounds, fill, stroke, strokewidth);
        this.withFilledIcon = true;
    }
}
class IntermediateEventShape extends EventShape {
    constructor(bounds, fill, stroke, strokewidth = StyleConstant.STROKE_WIDTH_THIN) {
        super(bounds, fill, stroke, strokewidth);
    }
    // this implementation is adapted from the draw.io BPMN 'throwing' outlines
    // https://github.com/jgraph/drawio/blob/0e19be6b42755790a749af30450c78c0d83be765/src/main/webapp/shapes/bpmn/mxBpmnShape2.js#L431
    paintOuterShape({ c, shape: { x, y, w, h, strokeWidth } }) {
        c.ellipse(x, y, w, h);
        c.fillAndStroke();
        const inset = strokeWidth * 1.5;
        c.ellipse(w * 0.02 + inset + x, h * 0.02 + inset + y, w * 0.96 - 2 * inset, h * 0.96 - 2 * inset);
        c.stroke();
    }
}
class CatchIntermediateEventShape extends IntermediateEventShape {
    constructor(bounds, fill, stroke, strokewidth) {
        super(bounds, fill, stroke, strokewidth);
    }
}
class ThrowIntermediateEventShape extends IntermediateEventShape {
    constructor(bounds, fill, stroke, strokewidth) {
        super(bounds, fill, stroke, strokewidth);
        this.withFilledIcon = true;
    }
}
class BoundaryEventShape extends IntermediateEventShape {
    constructor(bounds, fill, stroke, strokewidth) {
        super(bounds, fill, stroke, strokewidth);
    }
    paintOuterShape(paintParameter) {
        const isInterrupting = StyleUtils.getBpmnIsInterrupting(this.style);
        if (isInterrupting === 'false') {
            paintParameter.c.setDashed(1, 0);
            paintParameter.c.setDashPattern('3 2');
        }
        super.paintOuterShape(paintParameter);
        paintParameter.c.setDashed(StyleUtils.isDashed(this.style), StyleUtils.getFixDash(this.style));
        paintParameter.c.setDashPattern(StyleUtils.getDashPattern(this.style));
    }
}

class GatewayShape extends mxRhombus {
    constructor(bounds, fill, stroke, strokewidth) {
        super(bounds, fill, stroke, strokewidth);
    }
    paintVertexShape(c, x, y, w, h) {
        const paintParameter = IconPainter.buildPaintParameter(c, x, y, w, h, this);
        this.paintOuterShape(paintParameter);
        this.paintInnerShape(paintParameter);
    }
    paintOuterShape({ c, shape: { x, y, w, h } }) {
        super.paintVertexShape(c, x, y, w, h);
    }
}
class ExclusiveGatewayShape extends GatewayShape {
    constructor(bounds, fill, stroke, strokewidth = StyleConstant.STROKE_WIDTH_THIN) {
        super(bounds, fill, stroke, strokewidth);
    }
    paintInnerShape(paintParameter) {
        IconPainter.paintXCrossIcon(paintParameter);
    }
}
class ParallelGatewayShape extends GatewayShape {
    constructor(bounds, fill, stroke, strokewidth = StyleConstant.STROKE_WIDTH_THIN) {
        super(bounds, fill, stroke, strokewidth);
    }
    paintInnerShape(paintParameter) {
        IconPainter.paintPlusCrossIcon(paintParameter);
    }
}
class InclusiveGatewayShape extends GatewayShape {
    constructor(bounds, fill, stroke, strokewidth = StyleConstant.STROKE_WIDTH_THIN) {
        super(bounds, fill, stroke, strokewidth);
    }
    paintInnerShape(paintParameter) {
        IconPainter.paintCircleIcon(Object.assign(Object.assign({}, paintParameter), { ratioFromParent: 0.62, icon: Object.assign(Object.assign({}, paintParameter.icon), { isFilled: false, strokeWidth: StyleConstant.STROKE_WIDTH_THICK.valueOf() }) }));
    }
}

/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Base name of the BPMN specification.
 */
var ShapeBpmnSubProcessKind;
(function (ShapeBpmnSubProcessKind) {
    ShapeBpmnSubProcessKind["EMBEDDED"] = "embedded";
    ShapeBpmnSubProcessKind["EVENT"] = "event";
    // TRANSACTION = 'transaction',
    // AD_HOC = 'ad_hoc',
})(ShapeBpmnSubProcessKind || (ShapeBpmnSubProcessKind = {}));

class BaseActivityShape extends mxRectangleShape {
    constructor(bounds, fill, stroke, strokewidth = StyleConstant.STROKE_WIDTH_THIN) {
        super(bounds, fill, stroke, strokewidth);
        // enforced by BPMN
        this.isRounded = true;
    }
}
class BaseTaskShape extends BaseActivityShape {
    constructor(bounds, fill, stroke, strokewidth) {
        super(bounds, fill, stroke, strokewidth);
    }
    paintForeground(c, x, y, w, h) {
        super.paintForeground(c, x, y, w, h);
        const paintParameter = IconPainter.buildPaintParameter(c, x, y, w, h, this);
        this.paintTaskIcon(paintParameter);
    }
}
class TaskShape extends BaseTaskShape {
    constructor(bounds, fill, stroke, strokewidth) {
        super(bounds, fill, stroke, strokewidth);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    paintTaskIcon(paintParameter) {
        // No symbol for the BPMN Task
        IconPainter.paintEmptyIcon();
    }
}
class ServiceTaskShape extends BaseTaskShape {
    constructor(bounds, fill, stroke, strokewidth) {
        super(bounds, fill, stroke, strokewidth);
    }
    paintTaskIcon(paintParameter) {
        IconPainter.paintGearIcon(paintParameter);
    }
}
class UserTaskShape extends BaseTaskShape {
    constructor(bounds, fill, stroke, strokewidth) {
        super(bounds, fill, stroke, strokewidth);
    }
    paintTaskIcon(paintParameter) {
        IconPainter.paintWomanIcon(paintParameter);
    }
}
class ReceiveTaskShape extends BaseTaskShape {
    constructor(bounds, fill, stroke, strokewidth) {
        super(bounds, fill, stroke, strokewidth);
        this.gradient = 'Salmon';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    paintTaskIcon(paintParameter) { }
}
class CallActivityShape extends BaseActivityShape {
    constructor(bounds, fill, stroke, strokewidth) {
        super(bounds, fill, stroke, strokewidth);
    }
    paintVertexShape(c, x, y, w, h) {
        c.setStrokeColor('#2C6DA3');
        c.setStrokeWidth(4);
        super.paintVertexShape(c, x, y, w, h);
    }
}
class SubProcessShape extends BaseActivityShape {
    constructor(bounds, fill, stroke, strokewidth) {
        super(bounds, fill, stroke, strokewidth);
    }
    paintVertexShape(c, x, y, w, h) {
        if (StyleUtils.getBpmnSubProcessKind(this.style) === ShapeBpmnSubProcessKind.EMBEDDED) {
            c.setFillColor('Lavender');
        }
        else {
            c.setFillColor('LightCyan');
        }
        if (StyleUtils.getBpmnIsExpanded(this.style) === 'true') {
            c.setStrokeColor('Chartreuse');
        }
        else {
            c.setStrokeColor('Fuchsia');
        }
        super.paintVertexShape(c, x, y, w, h);
    }
}

class ShapeConfigurator {
    configureShapes() {
        this.initMxShapePrototype(mxClient.IS_FF);
        this.registerShapes();
    }
    registerShapes() {
        // events
        mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_END, EndEventShape);
        mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_START, StartEventShape);
        mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_INTERMEDIATE_THROW, ThrowIntermediateEventShape);
        mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH, CatchIntermediateEventShape);
        mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_BOUNDARY, BoundaryEventShape);
        // gateways
        mxCellRenderer.registerShape(ShapeBpmnElementKind.GATEWAY_EXCLUSIVE, ExclusiveGatewayShape);
        mxCellRenderer.registerShape(ShapeBpmnElementKind.GATEWAY_INCLUSIVE, InclusiveGatewayShape);
        mxCellRenderer.registerShape(ShapeBpmnElementKind.GATEWAY_PARALLEL, ParallelGatewayShape);
        // activities
        mxCellRenderer.registerShape(ShapeBpmnElementKind.SUB_PROCESS, SubProcessShape);
        mxCellRenderer.registerShape(ShapeBpmnElementKind.CALL_ACTIVITY, CallActivityShape);
        // tasks
        mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK, TaskShape);
        mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK_SERVICE, ServiceTaskShape);
        mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK_USER, UserTaskShape);
        mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK_RECEIVE, ReceiveTaskShape);
    }
    initMxShapePrototype(isFF) {
        // this change is needed for adding the custom attributes that permits identification of the BPMN elements
        mxShape.prototype.createSvgCanvas = function () {
            const canvas = new mxSvgCanvas2D(this.node, false);
            canvas.strokeTolerance = this.pointerEvents ? this.svgStrokeTolerance : 0;
            canvas.pointerEventsValue = this.svgPointerEvents;
            canvas.blockImagePointerEvents = isFF;
            const off = this.getSvgScreenOffset();
            if (off != 0) {
                this.node.setAttribute('transform', 'translate(' + off + ',' + off + ')');
            }
            else {
                this.node.removeAttribute('transform');
            }
            // add attributes to be able to identify elements in DOM
            if (this.state && this.state.cell) {
                this.node.setAttribute('class', 'class-state-cell-style-' + this.state.cell.style);
                this.node.setAttribute('data-cell-id', this.state.cell.id);
            }
            //
            canvas.minStrokeWidth = this.minSvgStrokeWidth;
            if (!this.antiAlias) {
                // Rounds all numbers in the SVG output to integers
                canvas.format = function (value) {
                    return Math.round(parseFloat(value));
                };
            }
            return canvas;
        };
    }
}

class MxClientConfigurator {
    configureMxCodec() {
        mxCodec.prototype.decode = function (node, into) {
            // Check for the existance of global constructor, throw explicit Error if not
            if (node !== null && node.nodeType === mxConstants.NODETYPE_ELEMENT) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const ctor = window[node.nodeName];
                if (!ctor) {
                    throw new Error(`Missing constructor for ${node.nodeName}`);
                }
                const dec = mxCodecRegistry.getCodec(ctor);
                if (dec !== null) {
                    return dec.decode(this, node, into);
                }
                const obj = node.cloneNode(true);
                obj.removeAttribute('as');
                return obj;
            }
            return null;
        };
    }
}

/**
 * Configure the mxGraph graph that can be used by the lib
 * <ul>
 *     <li>styles
 *     <li>shapes
 *     <li>markers
 */
class MxGraphConfigurator {
    constructor(container) {
        this.graph = new mxGraph(container, new mxGraphModel());
        this.configureGraph();
        new StyleConfigurator(this.graph).configureStyles();
        new ShapeConfigurator().configureShapes();
        new MarkerConfigurator().configureMarkers();
        new MxClientConfigurator().configureMxCodec();
    }
    getGraph() {
        return this.graph;
    }
    configureGraph() {
        this.graph.setCellsLocked(true);
        this.graph.setCellsSelectable(false);
        this.graph.setEdgeLabelsMovable(false);
        this.graph.setHtmlLabels(true); // required for wrapping
        // To have the boundary event on the border of a task
        this.graph.setConstrainChildren(false);
        this.graph.setExtendParents(false);
        // Disable folding for container mxCell (pool, lane, sub process, call activity) because we don't need it.
        // This also prevents requesting unavailable images (see #185) as we don't override mxGraph folding default images.
        this.graph.foldingEnabled = false;
    }
}

class Shape {
    constructor(id, bpmnElement, bounds, label, isExpanded = false) {
        this.id = id;
        this.bpmnElement = bpmnElement;
        this.bounds = bounds;
        this.label = label;
        this.isExpanded = isExpanded;
    }
}

/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ShapeBpmnElement {
    constructor(id, name, kind, parentId, instantiate = false) {
        this.id = id;
        this.name = name;
        this.kind = kind;
        this.parentId = parentId;
        this.instantiate = instantiate;
    }
}
class ShapeBpmnEvent extends ShapeBpmnElement {
    constructor(id, name, elementKind, eventKind, parentId) {
        super(id, name, elementKind, parentId);
        this.eventKind = eventKind;
    }
}
class ShapeBpmnBoundaryEvent extends ShapeBpmnEvent {
    constructor(id, name, eventKind, parentId, isInterrupting = true) {
        super(id, name, ShapeBpmnElementKind.EVENT_BOUNDARY, eventKind, parentId);
        this.isInterrupting = isInterrupting;
    }
}
class ShapeBpmnSubProcess extends ShapeBpmnElement {
    constructor(id, name, subProcessKind, parentId) {
        super(id, name, ShapeBpmnElementKind.SUB_PROCESS, parentId);
        this.subProcessKind = subProcessKind;
    }
}
class Participant {
    constructor(id, name, processRef) {
        this.id = id;
        this.name = name;
        this.processRef = processRef;
    }
}

class CoordinatesTranslator {
    constructor(graph) {
        this.graph = graph;
    }
    /**
     * Compute an absolute coordinate in relative coordinates in the parent cell referential.
     * @param parent the cell to use for the new coordinate referential
     * @param absoluteCoordinate
     */
    computeRelativeCoordinates(parent, absoluteCoordinate) {
        const translateForRoot = this.getTranslateForRoot(parent);
        const relativeX = absoluteCoordinate.x + translateForRoot.x;
        const relativeY = absoluteCoordinate.y + translateForRoot.y;
        return new mxPoint(relativeX, relativeY);
    }
    // Returns the translation to be applied to a cell whose mxGeometry x and y values are expressed with absolute coordinates
    // (i.e related to the graph default parent) you want to assign as parent to the cell passed as argument of this function.
    // That way, you will be able to express the cell coordinates as relative to its parent cell.
    //
    // This implementation is taken from the example described in the documentation of mxgraph#getTranslateForRoot (4.1.1)
    // The translation is generally negative
    getTranslateForRoot(cell) {
        const model = this.graph.getModel();
        const offset = new mxPoint(0, 0);
        while (cell != null) {
            const geo = model.getGeometry(cell);
            if (geo != null) {
                offset.x -= geo.x;
                offset.y -= geo.y;
            }
            cell = model.getParent(cell);
        }
        return offset;
    }
    /**
     * Compute the center of the provided `mxCell` for absolute geometry: this is the center point of a segment whose edges
     * are the terminal points of the mxCell geometry points. Returns `undefined` if the 2 terminal points are not available.
     *
     * The center coordinates are given in the same referential as the `mxCell`, so relative to its parent.
     */
    computeEgeCenter(mxEdge) {
        const points = mxEdge.geometry.points;
        const p0 = points[0];
        const pe = points[points.length - 1];
        if (p0 != null && pe != null) {
            const dx = pe.x - p0.x;
            const dy = pe.y - p0.y;
            return new mxPoint(p0.x + dx / 2, p0.y + dy / 2);
        }
        return undefined;
    }
}

class MxGraphRenderer {
    constructor(graph, coordinatesTranslator) {
        this.graph = graph;
        this.coordinatesTranslator = coordinatesTranslator;
    }
    render(bpmnModel) {
        const model = this.graph.getModel();
        model.clear(); // ensure to remove manual changes or already loaded graphs
        model.beginUpdate();
        try {
            this.insertShapes(bpmnModel.pools);
            this.insertShapes(bpmnModel.lanes);
            this.insertShapes(bpmnModel.flowNodes.filter(shape => { var _a; return !ShapeUtil.isBoundaryEvent((_a = shape.bpmnElement) === null || _a === void 0 ? void 0 : _a.kind); }));
            this.insertShapes(bpmnModel.flowNodes.filter(shape => { var _a; return ShapeUtil.isBoundaryEvent((_a = shape.bpmnElement) === null || _a === void 0 ? void 0 : _a.kind); }));
            this.insertEdges(bpmnModel.edges);
        }
        finally {
            model.endUpdate();
        }
    }
    insertShapes(shapes) {
        shapes.forEach(shape => {
            this.insertShape(shape);
        });
    }
    getParent(bpmnElement) {
        const bpmnElementParent = this.getCell(bpmnElement.parentId);
        if (bpmnElementParent) {
            return bpmnElementParent;
        }
        if (!ShapeUtil.isBoundaryEvent(bpmnElement.kind)) {
            return this.graph.getDefaultParent();
        }
    }
    insertShape(shape) {
        var _a;
        const bpmnElement = shape.bpmnElement;
        if (bpmnElement) {
            const parent = this.getParent(bpmnElement);
            if (!parent) {
                // TODO error management
                console.warn('Not possible to insert shape %s: parent cell %s is not found', bpmnElement.id, bpmnElement.parentId);
                return;
            }
            const bounds = shape.bounds;
            let labelBounds = (_a = shape.label) === null || _a === void 0 ? void 0 : _a.bounds;
            // pool/lane label bounds are not managed for now (use hard coded values)
            labelBounds = ShapeUtil.isPoolOrLane(bpmnElement.kind) ? undefined : labelBounds;
            const style = this.computeStyle(shape, labelBounds);
            this.insertVertex(parent, bpmnElement.id, bpmnElement.name, bounds, labelBounds, style);
        }
    }
    computeStyle(bpmnCell, labelBounds) {
        var _a;
        const styleValues = new Map();
        const font = (_a = bpmnCell.label) === null || _a === void 0 ? void 0 : _a.font;
        if (font) {
            styleValues.set(mxConstants.STYLE_FONTFAMILY, font.name);
            styleValues.set(mxConstants.STYLE_FONTSIZE, font.size);
            styleValues.set(mxConstants.STYLE_FONTSTYLE, this.getFontStyleValue(font));
        }
        const bpmnElement = bpmnCell.bpmnElement;
        if (bpmnCell instanceof Shape) {
            if (bpmnElement instanceof ShapeBpmnEvent) {
                styleValues.set(StyleConstant.BPMN_STYLE_EVENT_KIND, bpmnElement.eventKind);
            }
            if (bpmnElement instanceof ShapeBpmnBoundaryEvent) {
                styleValues.set(StyleConstant.BPMN_STYLE_IS_INTERRUPTING, String(bpmnElement.isInterrupting));
            }
            if (bpmnElement instanceof ShapeBpmnSubProcess) {
                styleValues.set(StyleConstant.BPMN_STYLE_SUB_PROCESS_KIND, bpmnElement.subProcessKind);
                styleValues.set(StyleConstant.BPMN_STYLE_IS_EXPANDED, String(bpmnCell.isExpanded));
            }
        }
        if (labelBounds) {
            styleValues.set(mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.ALIGN_TOP);
            styleValues.set(mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER);
            if (bpmnCell instanceof Shape) {
                // arbitrarily increase width to relax too small bounds (for instance for reference diagrams from miwg-test-suite)
                styleValues.set(mxConstants.STYLE_LABEL_WIDTH, labelBounds.width + 1);
                // align settings
                styleValues.set(mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_TOP);
                styleValues.set(mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_LEFT);
            }
        }
        return [bpmnElement.kind] //
            .concat([...styleValues].filter(([, v]) => v).map(([key, value]) => key + '=' + value))
            .join(';');
    }
    getFontStyleValue(font) {
        let value = 0;
        if (font.isBold) {
            value += mxConstants.FONT_BOLD;
        }
        if (font.isItalic) {
            value += mxConstants.FONT_ITALIC;
        }
        if (font.isStrikeThrough) {
            value += mxConstants.FONT_STRIKETHROUGH;
        }
        if (font.isUnderline) {
            value += mxConstants.FONT_UNDERLINE;
        }
        return value;
    }
    insertEdges(edges) {
        edges.forEach(edge => {
            var _a;
            const bpmnElement = edge.bpmnElement;
            if (bpmnElement) {
                const parent = this.graph.getDefaultParent();
                const source = this.getCell(bpmnElement.sourceRefId);
                const target = this.getCell(bpmnElement.targetRefId);
                const labelBounds = (_a = edge.label) === null || _a === void 0 ? void 0 : _a.bounds;
                const style = this.computeStyle(edge, labelBounds);
                const mxEdge = this.graph.insertEdge(parent, bpmnElement.id, bpmnElement.name, source, target, style);
                this.insertWaypoints(edge.waypoints, mxEdge);
                if (labelBounds) {
                    mxEdge.geometry.width = labelBounds.width;
                    mxEdge.geometry.height = labelBounds.height;
                    const edgeCenterCoordinate = this.coordinatesTranslator.computeEgeCenter(mxEdge);
                    if (edgeCenterCoordinate) {
                        mxEdge.geometry.relative = false;
                        const labelBoundsRelativeCoordinateFromParent = this.coordinatesTranslator.computeRelativeCoordinates(mxEdge.parent, new mxPoint(labelBounds.x, labelBounds.y));
                        const relativeLabelX = labelBoundsRelativeCoordinateFromParent.x + labelBounds.width / 2 - edgeCenterCoordinate.x;
                        const relativeLabelY = labelBoundsRelativeCoordinateFromParent.y - edgeCenterCoordinate.y;
                        mxEdge.geometry.offset = new mxPoint(relativeLabelX, relativeLabelY);
                    }
                }
            }
        });
    }
    insertWaypoints(waypoints, mxEdge) {
        if (waypoints) {
            mxEdge.geometry.points = waypoints.map(waypoint => {
                return this.coordinatesTranslator.computeRelativeCoordinates(mxEdge.parent, new mxPoint(waypoint.x, waypoint.y));
            });
        }
    }
    getCell(id) {
        return this.graph.getModel().getCell(id);
    }
    insertVertex(parent, id, value, bounds, labelBounds, style) {
        const vertexCoordinates = this.coordinatesTranslator.computeRelativeCoordinates(parent, new mxPoint(bounds.x, bounds.y));
        const mxCell = this.graph.insertVertex(parent, id, value, vertexCoordinates.x, vertexCoordinates.y, bounds.width, bounds.height, style);
        if (labelBounds) {
            // label coordinates are relative in the cell referential coordinates
            const relativeLabelX = labelBounds.x - bounds.x;
            const relativeLabelY = labelBounds.y - bounds.y;
            mxCell.geometry.offset = new mxPoint(relativeLabelX, relativeLabelY);
        }
        return mxCell;
    }
}
function defaultMxGraphRenderer(graph) {
    return new MxGraphRenderer(graph, new CoordinatesTranslator(graph));
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var util = createCommonjsModule(function (module, exports) {

const nameStartChar = ':A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
const nameChar = nameStartChar + '\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
const nameRegexp = '[' + nameStartChar + '][' + nameChar + ']*';
const regexName = new RegExp('^' + nameRegexp + '$');

const getAllMatches = function(string, regex) {
  const matches = [];
  let match = regex.exec(string);
  while (match) {
    const allmatches = [];
    const len = match.length;
    for (let index = 0; index < len; index++) {
      allmatches.push(match[index]);
    }
    matches.push(allmatches);
    match = regex.exec(string);
  }
  return matches;
};

const isName = function(string) {
  const match = regexName.exec(string);
  return !(match === null || typeof match === 'undefined');
};

exports.isExist = function(v) {
  return typeof v !== 'undefined';
};

exports.isEmptyObject = function(obj) {
  return Object.keys(obj).length === 0;
};

/**
 * Copy all the properties of a into b.
 * @param {*} target
 * @param {*} a
 */
exports.merge = function(target, a, arrayMode) {
  if (a) {
    const keys = Object.keys(a); // will return an array of own properties
    const len = keys.length; //don't make it inline
    for (let i = 0; i < len; i++) {
      if(arrayMode === 'strict'){
        target[keys[i]] = [ a[keys[i]] ];
      }else{
        target[keys[i]] = a[keys[i]];
      }
    }
  }
};
/* exports.merge =function (b,a){
  return Object.assign(b,a);
} */

exports.getValue = function(v) {
  if (exports.isExist(v)) {
    return v;
  } else {
    return '';
  }
};

// const fakeCall = function(a) {return a;};
// const fakeCallNoReturn = function() {};

exports.buildOptions = function(options, defaultOptions, props) {
  var newOptions = {};
  if (!options) {
    return defaultOptions; //if there are not options
  }

  for (let i = 0; i < props.length; i++) {
    if (options[props[i]] !== undefined) {
      newOptions[props[i]] = options[props[i]];
    } else {
      newOptions[props[i]] = defaultOptions[props[i]];
    }
  }
  return newOptions;
};

exports.isName = isName;
exports.getAllMatches = getAllMatches;
exports.nameRegexp = nameRegexp;
});
var util_1 = util.isExist;
var util_2 = util.isEmptyObject;
var util_3 = util.merge;
var util_4 = util.getValue;
var util_5 = util.buildOptions;
var util_6 = util.isName;
var util_7 = util.getAllMatches;
var util_8 = util.nameRegexp;

const convertToJson = function(node, options) {
  const jObj = {};

  //when no child node or attr is present
  if ((!node.child || util.isEmptyObject(node.child)) && (!node.attrsMap || util.isEmptyObject(node.attrsMap))) {
    return util.isExist(node.val) ? node.val : '';
  } else {
    //otherwise create a textnode if node has some text
    if (util.isExist(node.val)) {
      if (!(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
        if(options.arrayMode === "strict"){
          jObj[options.textNodeName] = [ node.val ];
        }else{
          jObj[options.textNodeName] = node.val;
        }
      }
    }
  }

  util.merge(jObj, node.attrsMap, options.arrayMode);

  const keys = Object.keys(node.child);
  for (let index = 0; index < keys.length; index++) {
    var tagname = keys[index];
    if (node.child[tagname] && node.child[tagname].length > 1) {
      jObj[tagname] = [];
      for (var tag in node.child[tagname]) {
        jObj[tagname].push(convertToJson(node.child[tagname][tag], options));
      }
    } else {
      if(options.arrayMode === true){
        const result = convertToJson(node.child[tagname][0], options);
        if(typeof result === 'object')
          jObj[tagname] = [ result ];
        else
          jObj[tagname] = result;
      }else if(options.arrayMode === "strict"){
        jObj[tagname] = [convertToJson(node.child[tagname][0], options) ];
      }else{
        jObj[tagname] = convertToJson(node.child[tagname][0], options);
      }
    }
  }

  //add value
  return jObj;
};

var convertToJson_1 = convertToJson;

var node2json = {
	convertToJson: convertToJson_1
};

var xmlNode = function(tagname, parent, val) {
  this.tagname = tagname;
  this.parent = parent;
  this.child = {}; //child tags
  this.attrsMap = {}; //attributes map
  this.val = val; //text only
  this.addChild = function(child) {
    if (Array.isArray(this.child[child.tagname])) {
      //already presents
      this.child[child.tagname].push(child);
    } else {
      this.child[child.tagname] = [child];
    }
  };
};

const buildOptions = util.buildOptions;

const TagType = {OPENING: 1, CLOSING: 2, SELF: 3, CDATA: 4};
const regx =
  '<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)'
  .replace(/NAME/g, util.nameRegexp);

//const tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
//const tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");

//polyfill
if (!Number.parseInt && window.parseInt) {
  Number.parseInt = window.parseInt;
}
if (!Number.parseFloat && window.parseFloat) {
  Number.parseFloat = window.parseFloat;
}

const defaultOptions = {
  attributeNamePrefix: '@_',
  attrNodeName: false,
  textNodeName: '#text',
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: false, //a tag can have attributes without any value
  //ignoreRootElement : false,
  parseNodeValue: true,
  parseAttributeValue: false,
  arrayMode: false,
  trimValues: true, //Trim string values of tag and attributes
  cdataTagName: false,
  cdataPositionChar: '\\c',
  tagValueProcessor: function(a, tagName) {
    return a;
  },
  attrValueProcessor: function(a, attrName) {
    return a;
  },
  stopNodes: []
  //decodeStrict: false,
};

var defaultOptions_1 = defaultOptions;

const props = [
  'attributeNamePrefix',
  'attrNodeName',
  'textNodeName',
  'ignoreAttributes',
  'ignoreNameSpace',
  'allowBooleanAttributes',
  'parseNodeValue',
  'parseAttributeValue',
  'arrayMode',
  'trimValues',
  'cdataTagName',
  'cdataPositionChar',
  'tagValueProcessor',
  'attrValueProcessor',
  'parseTrueNumberOnly',
  'stopNodes'
];
var props_1 = props;

const getTraversalObj = function(xmlData, options) {
  options = buildOptions(options, defaultOptions, props);
  //xmlData = xmlData.replace(/\r?\n/g, " ");//make it single line
  xmlData = xmlData.replace(/<!--[\s\S]*?-->/g, ''); //Remove  comments

  const xmlObj = new xmlNode('!xml');
  let currentNode = xmlObj;

  const tagsRegx = new RegExp(regx, 'g');
  let tag = tagsRegx.exec(xmlData);
  let nextTag = tagsRegx.exec(xmlData);
  while (tag) {
    const tagType = checkForTagType(tag);

    if (tagType === TagType.CLOSING) {
      //add parsed data to parent node
      if (currentNode.parent && tag[12]) {
        currentNode.parent.val = util.getValue(currentNode.parent.val) + '' + processTagValue(tag, options, currentNode.parent.tagname);
      }
      if (options.stopNodes.length && options.stopNodes.includes(currentNode.tagname)) {
        currentNode.child = [];
        if (currentNode.attrsMap == undefined) { currentNode.attrsMap = {};}
        currentNode.val = xmlData.substr(currentNode.startIndex + 1, tag.index - currentNode.startIndex - 1);
      }
      currentNode = currentNode.parent;
    } else if (tagType === TagType.CDATA) {
      if (options.cdataTagName) {
        //add cdata node
        const childNode = new xmlNode(options.cdataTagName, currentNode, tag[3]);
        childNode.attrsMap = buildAttributesMap(tag[8], options);
        currentNode.addChild(childNode);
        //for backtracking
        currentNode.val = util.getValue(currentNode.val) + options.cdataPositionChar;
        //add rest value to parent node
        if (tag[12]) {
          currentNode.val += processTagValue(tag, options);
        }
      } else {
        currentNode.val = (currentNode.val || '') + (tag[3] || '') + processTagValue(tag, options);
      }
    } else if (tagType === TagType.SELF) {
      if (currentNode && tag[12]) {
        currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(tag, options);
      }

      const childNode = new xmlNode(options.ignoreNameSpace ? tag[7] : tag[5], currentNode, '');
      if (tag[8] && tag[8].length > 0) {
        tag[8] = tag[8].substr(0, tag[8].length - 1);
      }
      childNode.attrsMap = buildAttributesMap(tag[8], options);
      currentNode.addChild(childNode);
    } else {
      //TagType.OPENING
      const childNode = new xmlNode(
        options.ignoreNameSpace ? tag[7] : tag[5],
        currentNode,
        processTagValue(tag, options)
      );
      if (options.stopNodes.length && options.stopNodes.includes(childNode.tagname)) {
        childNode.startIndex=tag.index + tag[1].length;
      }
      childNode.attrsMap = buildAttributesMap(tag[8], options);
      currentNode.addChild(childNode);
      currentNode = childNode;
    }

    tag = nextTag;
    nextTag = tagsRegx.exec(xmlData);
  }

  return xmlObj;
};

function processTagValue(parsedTags, options, parentTagName) {
  const tagName = parsedTags[7] || parentTagName;
  let val = parsedTags[12];
  if (val) {
    if (options.trimValues) {
      val = val.trim();
    }
    val = options.tagValueProcessor(val, tagName);
    val = parseValue(val, options.parseNodeValue, options.parseTrueNumberOnly);
  }

  return val;
}

function checkForTagType(match) {
  if (match[4] === ']]>') {
    return TagType.CDATA;
  } else if (match[10] === '/') {
    return TagType.CLOSING;
  } else if (typeof match[8] !== 'undefined' && match[8].substr(match[8].length - 1) === '/') {
    return TagType.SELF;
  } else {
    return TagType.OPENING;
  }
}

function resolveNameSpace(tagname, options) {
  if (options.ignoreNameSpace) {
    const tags = tagname.split(':');
    const prefix = tagname.charAt(0) === '/' ? '/' : '';
    if (tags[0] === 'xmlns') {
      return '';
    }
    if (tags.length === 2) {
      tagname = prefix + tags[1];
    }
  }
  return tagname;
}

function parseValue(val, shouldParse, parseTrueNumberOnly) {
  if (shouldParse && typeof val === 'string') {
    let parsed;
    if (val.trim() === '' || isNaN(val)) {
      parsed = val === 'true' ? true : val === 'false' ? false : val;
    } else {
      if (val.indexOf('0x') !== -1) {
        //support hexa decimal
        parsed = Number.parseInt(val, 16);
      } else if (val.indexOf('.') !== -1) {
        parsed = Number.parseFloat(val);
        val = val.replace(/0+$/,"");
      } else {
        parsed = Number.parseInt(val, 10);
      }
      if (parseTrueNumberOnly) {
        parsed = String(parsed) === val ? parsed : val;
      }
    }
    return parsed;
  } else {
    if (util.isExist(val)) {
      return val;
    } else {
      return '';
    }
  }
}

//TODO: change regex to capture NS
//const attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");
const attrsRegx = new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])(.*?)\\3)?', 'g');

function buildAttributesMap(attrStr, options) {
  if (!options.ignoreAttributes && typeof attrStr === 'string') {
    attrStr = attrStr.replace(/\r?\n/g, ' ');
    //attrStr = attrStr || attrStr.trim();

    const matches = util.getAllMatches(attrStr, attrsRegx);
    const len = matches.length; //don't make it inline
    const attrs = {};
    for (let i = 0; i < len; i++) {
      const attrName = resolveNameSpace(matches[i][1], options);
      if (attrName.length) {
        if (matches[i][4] !== undefined) {
          if (options.trimValues) {
            matches[i][4] = matches[i][4].trim();
          }
          matches[i][4] = options.attrValueProcessor(matches[i][4], attrName);
          attrs[options.attributeNamePrefix + attrName] = parseValue(
            matches[i][4],
            options.parseAttributeValue,
            options.parseTrueNumberOnly
          );
        } else if (options.allowBooleanAttributes) {
          attrs[options.attributeNamePrefix + attrName] = true;
        }
      }
    }
    if (!Object.keys(attrs).length) {
      return;
    }
    if (options.attrNodeName) {
      const attrCollection = {};
      attrCollection[options.attrNodeName] = attrs;
      return attrCollection;
    }
    return attrs;
  }
}

var getTraversalObj_1 = getTraversalObj;

var xmlstr2xmlnode = {
	defaultOptions: defaultOptions_1,
	props: props_1,
	getTraversalObj: getTraversalObj_1
};

const defaultOptions$1 = {
  allowBooleanAttributes: false, //A tag can have attributes without any value
};

const props$1 = ['allowBooleanAttributes'];

//const tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");
var validate = function (xmlData, options) {
  options = util.buildOptions(options, defaultOptions$1, props$1);

  //xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
  //xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
  //xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE
  const tags = [];
  let tagFound = false;

  //indicates that the root tag has been closed (aka. depth 0 has been reached)
  let reachedRoot = false;

  if (xmlData[0] === '\ufeff') {
    // check for byte order mark (BOM)
    xmlData = xmlData.substr(1);
  }

  for (let i = 0; i < xmlData.length; i++) {
    if (xmlData[i] === '<') {
      //starting of tag
      //read until you reach to '>' avoiding any '>' in attribute value

      i++;
      if (xmlData[i] === '?') {
        i = readPI(xmlData, ++i);
        if (i.err) {
          return i;
        }
      } else if (xmlData[i] === '!') {
        i = readCommentAndCDATA(xmlData, i);
        continue;
      } else {
        let closingTag = false;
        if (xmlData[i] === '/') {
          //closing tag
          closingTag = true;
          i++;
        }
        //read tagname
        let tagName = '';
        for (
          ;
          i < xmlData.length &&
          xmlData[i] !== '>' &&
          xmlData[i] !== ' ' &&
          xmlData[i] !== '\t' &&
          xmlData[i] !== '\n' &&
          xmlData[i] !== '\r';
          i++
        ) {
          tagName += xmlData[i];
        }
        tagName = tagName.trim();
        //console.log(tagName);

        if (tagName[tagName.length - 1] === '/') {
          //self closing tag without attributes
          tagName = tagName.substring(0, tagName.length - 1);
          //continue;
          i--;
        }
        if (!validateTagName(tagName)) {
          let msg;
          if(tagName.trim().length === 0) {
            msg = "There is an unnecessary space between tag name and backward slash '</ ..'.";
          }else{
            msg = `Tag '${tagName}' is an invalid name.`;
          }
          return getErrorObject('InvalidTag', msg, getLineNumberForPosition(xmlData, i));
        }

        const result = readAttributeStr(xmlData, i);
        if (result === false) {
          return getErrorObject('InvalidAttr', `Attributes for '${tagName}' have open quote.`, getLineNumberForPosition(xmlData, i));
        }
        let attrStr = result.value;
        i = result.index;

        if (attrStr[attrStr.length - 1] === '/') {
          //self closing tag
          attrStr = attrStr.substring(0, attrStr.length - 1);
          const isValid = validateAttributeString(attrStr, options);
          if (isValid === true) {
            tagFound = true;
            //continue; //text may presents after self closing tag
          } else {
            //the result from the nested function returns the position of the error within the attribute
            //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
            //this gives us the absolute index in the entire xml, which we can use to find the line at last
            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
          }
        } else if (closingTag) {
          if (!result.tagClosed) {
            return getErrorObject('InvalidTag', `Closing tag '${tagName}' doesn't have proper closing.`, getLineNumberForPosition(xmlData, i));
          } else if (attrStr.trim().length > 0) {
            return getErrorObject('InvalidTag', `Closing tag '${tagName}' can't have attributes or invalid starting.`, getLineNumberForPosition(xmlData, i));
          } else {
            const otg = tags.pop();
            if (tagName !== otg) {
              return getErrorObject('InvalidTag', `Closing tag '${otg}' is expected inplace of '${tagName}'.`, getLineNumberForPosition(xmlData, i));
            }

            //when there are no more tags, we reached the root level.
            if(tags.length == 0)
            {
              reachedRoot = true;
            }
          }
        } else {
          const isValid = validateAttributeString(attrStr, options);
          if (isValid !== true) {
            //the result from the nested function returns the position of the error within the attribute
            //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
            //this gives us the absolute index in the entire xml, which we can use to find the line at last
            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
          }

          //if the root level has been reached before ...
          if(reachedRoot === true) {
              return getErrorObject('InvalidXml', 'Multiple possible root nodes found.', getLineNumberForPosition(xmlData, i));
          } else {
              tags.push(tagName);
          }
          tagFound = true;
        }

        //skip tag text value
        //It may include comments and CDATA value
        for (i++; i < xmlData.length; i++) {
          if (xmlData[i] === '<') {
            if (xmlData[i + 1] === '!') {
              //comment or CADATA
              i++;
              i = readCommentAndCDATA(xmlData, i);
              continue;
            } else {
              break;
            }
          } else if (xmlData[i] === '&') {
            const afterAmp = validateAmpersand(xmlData, i);
            if (afterAmp == -1)
              return getErrorObject('InvalidChar', `char '&' is not expected.`, getLineNumberForPosition(xmlData, i));
            i = afterAmp;
          }
        } //end of reading tag text value
        if (xmlData[i] === '<') {
          i--;
        }
      }
    } else {
      if (xmlData[i] === ' ' || xmlData[i] === '\t' || xmlData[i] === '\n' || xmlData[i] === '\r') {
        continue;
      }
      return getErrorObject('InvalidChar', `char '${xmlData[i]}' is not expected.`, getLineNumberForPosition(xmlData, i));
    }
  }

  if (!tagFound) {
    return getErrorObject('InvalidXml', 'Start tag expected.', 1);
  } else if (tags.length > 0) {
    return getErrorObject('InvalidXml', `Invalid '${JSON.stringify(tags, null, 4).replace(/\r?\n/g, '')}' found.`, 1);
  }

  return true;
};

/**
 * Read Processing insstructions and skip
 * @param {*} xmlData
 * @param {*} i
 */
function readPI(xmlData, i) {
  var start = i;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] == '?' || xmlData[i] == ' ') {
      //tagname
      var tagname = xmlData.substr(start, i - start);
      if (i > 5 && tagname === 'xml') {
        return getErrorObject('InvalidXml', 'XML declaration allowed only at the start of the document.', getLineNumberForPosition(xmlData, i));
      } else if (xmlData[i] == '?' && xmlData[i + 1] == '>') {
        //check if valid attribut string
        i++;
        break;
      } else {
        continue;
      }
    }
  }
  return i;
}

function readCommentAndCDATA(xmlData, i) {
  if (xmlData.length > i + 5 && xmlData[i + 1] === '-' && xmlData[i + 2] === '-') {
    //comment
    for (i += 3; i < xmlData.length; i++) {
      if (xmlData[i] === '-' && xmlData[i + 1] === '-' && xmlData[i + 2] === '>') {
        i += 2;
        break;
      }
    }
  } else if (
    xmlData.length > i + 8 &&
    xmlData[i + 1] === 'D' &&
    xmlData[i + 2] === 'O' &&
    xmlData[i + 3] === 'C' &&
    xmlData[i + 4] === 'T' &&
    xmlData[i + 5] === 'Y' &&
    xmlData[i + 6] === 'P' &&
    xmlData[i + 7] === 'E'
  ) {
    let angleBracketsCount = 1;
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === '<') {
        angleBracketsCount++;
      } else if (xmlData[i] === '>') {
        angleBracketsCount--;
        if (angleBracketsCount === 0) {
          break;
        }
      }
    }
  } else if (
    xmlData.length > i + 9 &&
    xmlData[i + 1] === '[' &&
    xmlData[i + 2] === 'C' &&
    xmlData[i + 3] === 'D' &&
    xmlData[i + 4] === 'A' &&
    xmlData[i + 5] === 'T' &&
    xmlData[i + 6] === 'A' &&
    xmlData[i + 7] === '['
  ) {
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === ']' && xmlData[i + 1] === ']' && xmlData[i + 2] === '>') {
        i += 2;
        break;
      }
    }
  }

  return i;
}

var doubleQuote = '"';
var singleQuote = "'";

/**
 * Keep reading xmlData until '<' is found outside the attribute value.
 * @param {string} xmlData
 * @param {number} i
 */
function readAttributeStr(xmlData, i) {
  let attrStr = '';
  let startChar = '';
  let tagClosed = false;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
      if (startChar === '') {
        startChar = xmlData[i];
      } else if (startChar !== xmlData[i]) {
        //if vaue is enclosed with double quote then single quotes are allowed inside the value and vice versa
        continue;
      } else {
        startChar = '';
      }
    } else if (xmlData[i] === '>') {
      if (startChar === '') {
        tagClosed = true;
        break;
      }
    }
    attrStr += xmlData[i];
  }
  if (startChar !== '') {
    return false;
  }

  return { value: attrStr, index: i, tagClosed: tagClosed };
}

/**
 * Select all the attributes whether valid or invalid.
 */
const validAttrStrRegxp = new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?', 'g');

//attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""

function validateAttributeString(attrStr, options) {
  //console.log("start:"+attrStr+":end");

  //if(attrStr.trim().length === 0) return true; //empty string

  const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
  const attrNames = {};

  for (let i = 0; i < matches.length; i++) {
    if (matches[i][1].length === 0) {
      //nospace before attribute name: a="sd"b="saf"
      return getErrorObject('InvalidAttr', `Attribute '${matches[i][2]}' has no space in starting.`, getPositionFromMatch(attrStr, matches[i][0]))
    } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
      //independent attribute: ab
      return getErrorObject('InvalidAttr', `boolean attribute '${matches[i][2]}' is not allowed.`, getPositionFromMatch(attrStr, matches[i][0]));
    }
    /* else if(matches[i][6] === undefined){//attribute without value: ab=
                    return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                } */
    const attrName = matches[i][2];
    if (!validateAttrName(attrName)) {
      return getErrorObject('InvalidAttr', `Attribute '${attrName}' is an invalid name.`, getPositionFromMatch(attrStr, matches[i][0]));
    }
    if (!attrNames.hasOwnProperty(attrName)) {
      //check for duplicate attribute.
      attrNames[attrName] = 1;
    } else {
      return getErrorObject('InvalidAttr', `Attribute '${attrName}' is repeated.`, getPositionFromMatch(attrStr, matches[i][0]));
    }
  }

  return true;
}

function validateNumberAmpersand(xmlData, i) {
  let re = /\d/;
  if (xmlData[i] === 'x') {
    i++;
    re = /[\da-fA-F]/;
  }
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === ';')
      return i;
    if (!xmlData[i].match(re))
      break;
  }
  return -1;
}

function validateAmpersand(xmlData, i) {
  // https://www.w3.org/TR/xml/#dt-charref
  i++;
  if (xmlData[i] === ';')
    return -1;
  if (xmlData[i] === '#') {
    i++;
    return validateNumberAmpersand(xmlData, i);
  }
  let count = 0;
  for (; i < xmlData.length; i++, count++) {
    if (xmlData[i].match(/\w/) && count < 20)
      continue;
    if (xmlData[i] === ';')
      break;
    return -1;
  }
  return i;
}

function getErrorObject(code, message, lineNumber) {
  return {
    err: {
      code: code,
      msg: message,
      line: lineNumber,
    },
  };
}

function validateAttrName(attrName) {
  return util.isName(attrName);
}

//const startsWithXML = new RegExp("^[Xx][Mm][Ll]");
//  startsWith = /^([a-zA-Z]|_)[\w.\-_:]*/;

function validateTagName(tagname) {
  /*if(util.doesMatch(tagname,startsWithXML)) return false;
    else*/
  //return !tagname.toLowerCase().startsWith("xml") || !util.doesNotMatch(tagname, regxTagName);
  return util.isName(tagname);
}

//this function returns the line number for the character at the given index
function getLineNumberForPosition(xmlData, index) {
  var lines = xmlData.substring(0, index).split(/\r?\n/);
  return lines.length;
}

//this function returns the position of the last character of match within attrStr
function getPositionFromMatch(attrStr, match) {
  return attrStr.indexOf(match) + match.length;
}

var validator = {
	validate: validate
};

const char = function(a) {
  return String.fromCharCode(a);
};

const chars = {
  nilChar: char(176),
  missingChar: char(201),
  nilPremitive: char(175),
  missingPremitive: char(200),

  emptyChar: char(178),
  emptyValue: char(177), //empty Premitive

  boundryChar: char(179),

  objStart: char(198),
  arrStart: char(204),
  arrayEnd: char(185),
};

const charsArr = [
  chars.nilChar,
  chars.nilPremitive,
  chars.missingChar,
  chars.missingPremitive,
  chars.boundryChar,
  chars.emptyChar,
  chars.emptyValue,
  chars.arrayEnd,
  chars.objStart,
  chars.arrStart,
];

const _e = function(node, e_schema, options) {
  if (typeof e_schema === 'string') {
    //premitive
    if (node && node[0] && node[0].val !== undefined) {
      return getValue(node[0].val);
    } else {
      return getValue(node);
    }
  } else {
    const hasValidData = hasData(node);
    if (hasValidData === true) {
      let str = '';
      if (Array.isArray(e_schema)) {
        //attributes can't be repeated. hence check in children tags only
        str += chars.arrStart;
        const itemSchema = e_schema[0];
        //var itemSchemaType = itemSchema;
        const arr_len = node.length;

        if (typeof itemSchema === 'string') {
          for (let arr_i = 0; arr_i < arr_len; arr_i++) {
            const r = getValue(node[arr_i].val);
            str = processValue(str, r);
          }
        } else {
          for (let arr_i = 0; arr_i < arr_len; arr_i++) {
            const r = _e(node[arr_i], itemSchema, options);
            str = processValue(str, r);
          }
        }
        str += chars.arrayEnd; //indicates that next item is not array item
      } else {
        //object
        str += chars.objStart;
        const keys = Object.keys(e_schema);
        if (Array.isArray(node)) {
          node = node[0];
        }
        for (let i in keys) {
          const key = keys[i];
          //a property defined in schema can be present either in attrsMap or children tags
          //options.textNodeName will not present in both maps, take it's value from val
          //options.attrNodeName will be present in attrsMap
          let r;
          if (!options.ignoreAttributes && node.attrsMap && node.attrsMap[key]) {
            r = _e(node.attrsMap[key], e_schema[key], options);
          } else if (key === options.textNodeName) {
            r = _e(node.val, e_schema[key], options);
          } else {
            r = _e(node.child[key], e_schema[key], options);
          }
          str = processValue(str, r);
        }
      }
      return str;
    } else {
      return hasValidData;
    }
  }
};

const getValue = function(a /*, type*/) {
  switch (a) {
    case undefined:
      return chars.missingPremitive;
    case null:
      return chars.nilPremitive;
    case '':
      return chars.emptyValue;
    default:
      return a;
  }
};

const processValue = function(str, r) {
  if (!isAppChar(r[0]) && !isAppChar(str[str.length - 1])) {
    str += chars.boundryChar;
  }
  return str + r;
};

const isAppChar = function(ch) {
  return charsArr.indexOf(ch) !== -1;
};

function hasData(jObj) {
  if (jObj === undefined) {
    return chars.missingChar;
  } else if (jObj === null) {
    return chars.nilChar;
  } else if (
    jObj.child &&
    Object.keys(jObj.child).length === 0 &&
    (!jObj.attrsMap || Object.keys(jObj.attrsMap).length === 0)
  ) {
    return chars.emptyChar;
  } else {
    return true;
  }
}


const buildOptions$1 = util.buildOptions;

const convert2nimn = function(node, e_schema, options) {
  options = buildOptions$1(options, xmlstr2xmlnode.defaultOptions, xmlstr2xmlnode.props);
  return _e(node, e_schema, options);
};

var convert2nimn_1 = convert2nimn;

var nimndata = {
	convert2nimn: convert2nimn_1
};

const buildOptions$2 = util.buildOptions;


//TODO: do it later
const convertToJsonString = function(node, options) {
  options = buildOptions$2(options, xmlstr2xmlnode.defaultOptions, xmlstr2xmlnode.props);

  options.indentBy = options.indentBy || '';
  return _cToJsonStr(node, options);
};

const _cToJsonStr = function(node, options, level) {
  let jObj = '{';

  //traver through all the children
  const keys = Object.keys(node.child);

  for (let index = 0; index < keys.length; index++) {
    var tagname = keys[index];
    if (node.child[tagname] && node.child[tagname].length > 1) {
      jObj += '"' + tagname + '" : [ ';
      for (var tag in node.child[tagname]) {
        jObj += _cToJsonStr(node.child[tagname][tag], options) + ' , ';
      }
      jObj = jObj.substr(0, jObj.length - 1) + ' ] '; //remove extra comma in last
    } else {
      jObj += '"' + tagname + '" : ' + _cToJsonStr(node.child[tagname][0], options) + ' ,';
    }
  }
  util.merge(jObj, node.attrsMap);
  //add attrsMap as new children
  if (util.isEmptyObject(jObj)) {
    return util.isExist(node.val) ? node.val : '';
  } else {
    if (util.isExist(node.val)) {
      if (!(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
        jObj += '"' + options.textNodeName + '" : ' + stringval(node.val);
      }
    }
  }
  //add value
  if (jObj[jObj.length - 1] === ',') {
    jObj = jObj.substr(0, jObj.length - 2);
  }
  return jObj + '}';
};

function stringval(v) {
  if (v === true || v === false || !isNaN(v)) {
    return v;
  } else {
    return '"' + v + '"';
  }
}

var convertToJsonString_1 = convertToJsonString;

var node2json_str = {
	convertToJsonString: convertToJsonString_1
};

//parse Empty Node as self closing node
const buildOptions$3 = util.buildOptions;

const defaultOptions$2 = {
  attributeNamePrefix: '@_',
  attrNodeName: false,
  textNodeName: '#text',
  ignoreAttributes: true,
  cdataTagName: false,
  cdataPositionChar: '\\c',
  format: false,
  indentBy: '  ',
  supressEmptyNode: false,
  tagValueProcessor: function(a) {
    return a;
  },
  attrValueProcessor: function(a) {
    return a;
  },
};

const props$2 = [
  'attributeNamePrefix',
  'attrNodeName',
  'textNodeName',
  'ignoreAttributes',
  'cdataTagName',
  'cdataPositionChar',
  'format',
  'indentBy',
  'supressEmptyNode',
  'tagValueProcessor',
  'attrValueProcessor',
];

function Parser(options) {
  this.options = buildOptions$3(options, defaultOptions$2, props$2);
  if (this.options.ignoreAttributes || this.options.attrNodeName) {
    this.isAttribute = function(/*a*/) {
      return false;
    };
  } else {
    this.attrPrefixLen = this.options.attributeNamePrefix.length;
    this.isAttribute = isAttribute;
  }
  if (this.options.cdataTagName) {
    this.isCDATA = isCDATA;
  } else {
    this.isCDATA = function(/*a*/) {
      return false;
    };
  }
  this.replaceCDATAstr = replaceCDATAstr;
  this.replaceCDATAarr = replaceCDATAarr;

  if (this.options.format) {
    this.indentate = indentate;
    this.tagEndChar = '>\n';
    this.newLine = '\n';
  } else {
    this.indentate = function() {
      return '';
    };
    this.tagEndChar = '>';
    this.newLine = '';
  }

  if (this.options.supressEmptyNode) {
    this.buildTextNode = buildEmptyTextNode;
    this.buildObjNode = buildEmptyObjNode;
  } else {
    this.buildTextNode = buildTextValNode;
    this.buildObjNode = buildObjectNode;
  }

  this.buildTextValNode = buildTextValNode;
  this.buildObjectNode = buildObjectNode;
}

Parser.prototype.parse = function(jObj) {
  return this.j2x(jObj, 0).val;
};

Parser.prototype.j2x = function(jObj, level) {
  let attrStr = '';
  let val = '';
  const keys = Object.keys(jObj);
  const len = keys.length;
  for (let i = 0; i < len; i++) {
    const key = keys[i];
    if (typeof jObj[key] === 'undefined') ; else if (jObj[key] === null) {
      val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
    } else if (jObj[key] instanceof Date) {
      val += this.buildTextNode(jObj[key], key, '', level);
    } else if (typeof jObj[key] !== 'object') {
      //premitive type
      const attr = this.isAttribute(key);
      if (attr) {
        attrStr += ' ' + attr + '="' + this.options.attrValueProcessor('' + jObj[key]) + '"';
      } else if (this.isCDATA(key)) {
        if (jObj[this.options.textNodeName]) {
          val += this.replaceCDATAstr(jObj[this.options.textNodeName], jObj[key]);
        } else {
          val += this.replaceCDATAstr('', jObj[key]);
        }
      } else {
        //tag value
        if (key === this.options.textNodeName) {
          if (jObj[this.options.cdataTagName]) ; else {
            val += this.options.tagValueProcessor('' + jObj[key]);
          }
        } else {
          val += this.buildTextNode(jObj[key], key, '', level);
        }
      }
    } else if (Array.isArray(jObj[key])) {
      //repeated nodes
      if (this.isCDATA(key)) {
        val += this.indentate(level);
        if (jObj[this.options.textNodeName]) {
          val += this.replaceCDATAarr(jObj[this.options.textNodeName], jObj[key]);
        } else {
          val += this.replaceCDATAarr('', jObj[key]);
        }
      } else {
        //nested nodes
        const arrLen = jObj[key].length;
        for (let j = 0; j < arrLen; j++) {
          const item = jObj[key][j];
          if (typeof item === 'undefined') ; else if (item === null) {
            val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
          } else if (typeof item === 'object') {
            const result = this.j2x(item, level + 1);
            val += this.buildObjNode(result.val, key, result.attrStr, level);
          } else {
            val += this.buildTextNode(item, key, '', level);
          }
        }
      }
    } else {
      //nested node
      if (this.options.attrNodeName && key === this.options.attrNodeName) {
        const Ks = Object.keys(jObj[key]);
        const L = Ks.length;
        for (let j = 0; j < L; j++) {
          attrStr += ' ' + Ks[j] + '="' + this.options.attrValueProcessor('' + jObj[key][Ks[j]]) + '"';
        }
      } else {
        const result = this.j2x(jObj[key], level + 1);
        val += this.buildObjNode(result.val, key, result.attrStr, level);
      }
    }
  }
  return {attrStr: attrStr, val: val};
};

function replaceCDATAstr(str, cdata) {
  str = this.options.tagValueProcessor('' + str);
  if (this.options.cdataPositionChar === '' || str === '') {
    return str + '<![CDATA[' + cdata + ']]' + this.tagEndChar;
  } else {
    return str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata + ']]' + this.tagEndChar);
  }
}

function replaceCDATAarr(str, cdata) {
  str = this.options.tagValueProcessor('' + str);
  if (this.options.cdataPositionChar === '' || str === '') {
    return str + '<![CDATA[' + cdata.join(']]><![CDATA[') + ']]' + this.tagEndChar;
  } else {
    for (let v in cdata) {
      str = str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata[v] + ']]>');
    }
    return str + this.newLine;
  }
}

function buildObjectNode(val, key, attrStr, level) {
  if (attrStr && !val.includes('<')) {
    return (
      this.indentate(level) +
      '<' +
      key +
      attrStr +
      '>' +
      val +
      //+ this.newLine
      // + this.indentate(level)
      '</' +
      key +
      this.tagEndChar
    );
  } else {
    return (
      this.indentate(level) +
      '<' +
      key +
      attrStr +
      this.tagEndChar +
      val +
      //+ this.newLine
      this.indentate(level) +
      '</' +
      key +
      this.tagEndChar
    );
  }
}

function buildEmptyObjNode(val, key, attrStr, level) {
  if (val !== '') {
    return this.buildObjectNode(val, key, attrStr, level);
  } else {
    return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar;
    //+ this.newLine
  }
}

function buildTextValNode(val, key, attrStr, level) {
  return (
    this.indentate(level) +
    '<' +
    key +
    attrStr +
    '>' +
    this.options.tagValueProcessor(val) +
    '</' +
    key +
    this.tagEndChar
  );
}

function buildEmptyTextNode(val, key, attrStr, level) {
  if (val !== '') {
    return this.buildTextValNode(val, key, attrStr, level);
  } else {
    return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar;
  }
}

function indentate(level) {
  return this.options.indentBy.repeat(level);
}

function isAttribute(name /*, options*/) {
  if (name.startsWith(this.options.attributeNamePrefix)) {
    return name.substr(this.attrPrefixLen);
  } else {
    return false;
  }
}

function isCDATA(name) {
  return name === this.options.cdataTagName;
}

//formatting
//indentation
//\n after each closing or self closing tag

var json2xml = Parser;

var parser = createCommonjsModule(function (module, exports) {



const x2xmlnode = xmlstr2xmlnode;
const buildOptions = util.buildOptions;


exports.parse = function(xmlData, options, validationOption) {
  if( validationOption){
    if(validationOption === true) validationOption = {};
    
    const result = validator.validate(xmlData, validationOption);
    if (result !== true) {
      throw Error( result.err.msg)
    }
  }
  options = buildOptions(options, x2xmlnode.defaultOptions, x2xmlnode.props);
  return node2json.convertToJson(xmlstr2xmlnode.getTraversalObj(xmlData, options), options);
};
exports.convertTonimn = nimndata.convert2nimn;
exports.getTraversalObj = xmlstr2xmlnode.getTraversalObj;
exports.convertToJson = node2json.convertToJson;
exports.convertToJsonString = node2json_str.convertToJsonString;
exports.validate = validator.validate;
exports.j2xParser = json2xml;
exports.parseToNimn = function(xmlData, schema, options) {
  return exports.convertTonimn(exports.getTraversalObj(xmlData, options), schema, options);
};
});
var parser_1 = parser.parse;
var parser_2 = parser.convertTonimn;
var parser_3 = parser.getTraversalObj;
var parser_4 = parser.convertToJson;
var parser_5 = parser.convertToJsonString;
var parser_6 = parser.validate;
var parser_7 = parser.j2xParser;
var parser_8 = parser.parseToNimn;

var Aacute = "Á";
var aacute = "á";
var Abreve = "Ă";
var abreve = "ă";
var ac = "∾";
var acd = "∿";
var acE = "∾̳";
var Acirc = "Â";
var acirc = "â";
var acute = "´";
var Acy = "А";
var acy = "а";
var AElig = "Æ";
var aelig = "æ";
var af = "⁡";
var Afr = "𝔄";
var afr = "𝔞";
var Agrave = "À";
var agrave = "à";
var alefsym = "ℵ";
var aleph = "ℵ";
var Alpha = "Α";
var alpha = "α";
var Amacr = "Ā";
var amacr = "ā";
var amalg = "⨿";
var amp = "&";
var AMP = "&";
var andand = "⩕";
var And = "⩓";
var and = "∧";
var andd = "⩜";
var andslope = "⩘";
var andv = "⩚";
var ang = "∠";
var ange = "⦤";
var angle = "∠";
var angmsdaa = "⦨";
var angmsdab = "⦩";
var angmsdac = "⦪";
var angmsdad = "⦫";
var angmsdae = "⦬";
var angmsdaf = "⦭";
var angmsdag = "⦮";
var angmsdah = "⦯";
var angmsd = "∡";
var angrt = "∟";
var angrtvb = "⊾";
var angrtvbd = "⦝";
var angsph = "∢";
var angst = "Å";
var angzarr = "⍼";
var Aogon = "Ą";
var aogon = "ą";
var Aopf = "𝔸";
var aopf = "𝕒";
var apacir = "⩯";
var ap = "≈";
var apE = "⩰";
var ape = "≊";
var apid = "≋";
var apos = "'";
var ApplyFunction = "⁡";
var approx = "≈";
var approxeq = "≊";
var Aring = "Å";
var aring = "å";
var Ascr = "𝒜";
var ascr = "𝒶";
var Assign = "≔";
var ast = "*";
var asymp = "≈";
var asympeq = "≍";
var Atilde = "Ã";
var atilde = "ã";
var Auml = "Ä";
var auml = "ä";
var awconint = "∳";
var awint = "⨑";
var backcong = "≌";
var backepsilon = "϶";
var backprime = "‵";
var backsim = "∽";
var backsimeq = "⋍";
var Backslash = "∖";
var Barv = "⫧";
var barvee = "⊽";
var barwed = "⌅";
var Barwed = "⌆";
var barwedge = "⌅";
var bbrk = "⎵";
var bbrktbrk = "⎶";
var bcong = "≌";
var Bcy = "Б";
var bcy = "б";
var bdquo = "„";
var becaus = "∵";
var because = "∵";
var Because = "∵";
var bemptyv = "⦰";
var bepsi = "϶";
var bernou = "ℬ";
var Bernoullis = "ℬ";
var Beta = "Β";
var beta = "β";
var beth = "ℶ";
var between = "≬";
var Bfr = "𝔅";
var bfr = "𝔟";
var bigcap = "⋂";
var bigcirc = "◯";
var bigcup = "⋃";
var bigodot = "⨀";
var bigoplus = "⨁";
var bigotimes = "⨂";
var bigsqcup = "⨆";
var bigstar = "★";
var bigtriangledown = "▽";
var bigtriangleup = "△";
var biguplus = "⨄";
var bigvee = "⋁";
var bigwedge = "⋀";
var bkarow = "⤍";
var blacklozenge = "⧫";
var blacksquare = "▪";
var blacktriangle = "▴";
var blacktriangledown = "▾";
var blacktriangleleft = "◂";
var blacktriangleright = "▸";
var blank = "␣";
var blk12 = "▒";
var blk14 = "░";
var blk34 = "▓";
var block = "█";
var bne = "=⃥";
var bnequiv = "≡⃥";
var bNot = "⫭";
var bnot = "⌐";
var Bopf = "𝔹";
var bopf = "𝕓";
var bot = "⊥";
var bottom = "⊥";
var bowtie = "⋈";
var boxbox = "⧉";
var boxdl = "┐";
var boxdL = "╕";
var boxDl = "╖";
var boxDL = "╗";
var boxdr = "┌";
var boxdR = "╒";
var boxDr = "╓";
var boxDR = "╔";
var boxh = "─";
var boxH = "═";
var boxhd = "┬";
var boxHd = "╤";
var boxhD = "╥";
var boxHD = "╦";
var boxhu = "┴";
var boxHu = "╧";
var boxhU = "╨";
var boxHU = "╩";
var boxminus = "⊟";
var boxplus = "⊞";
var boxtimes = "⊠";
var boxul = "┘";
var boxuL = "╛";
var boxUl = "╜";
var boxUL = "╝";
var boxur = "└";
var boxuR = "╘";
var boxUr = "╙";
var boxUR = "╚";
var boxv = "│";
var boxV = "║";
var boxvh = "┼";
var boxvH = "╪";
var boxVh = "╫";
var boxVH = "╬";
var boxvl = "┤";
var boxvL = "╡";
var boxVl = "╢";
var boxVL = "╣";
var boxvr = "├";
var boxvR = "╞";
var boxVr = "╟";
var boxVR = "╠";
var bprime = "‵";
var breve = "˘";
var Breve = "˘";
var brvbar = "¦";
var bscr = "𝒷";
var Bscr = "ℬ";
var bsemi = "⁏";
var bsim = "∽";
var bsime = "⋍";
var bsolb = "⧅";
var bsol = "\\";
var bsolhsub = "⟈";
var bull = "•";
var bullet = "•";
var bump = "≎";
var bumpE = "⪮";
var bumpe = "≏";
var Bumpeq = "≎";
var bumpeq = "≏";
var Cacute = "Ć";
var cacute = "ć";
var capand = "⩄";
var capbrcup = "⩉";
var capcap = "⩋";
var cap = "∩";
var Cap = "⋒";
var capcup = "⩇";
var capdot = "⩀";
var CapitalDifferentialD = "ⅅ";
var caps = "∩︀";
var caret = "⁁";
var caron = "ˇ";
var Cayleys = "ℭ";
var ccaps = "⩍";
var Ccaron = "Č";
var ccaron = "č";
var Ccedil = "Ç";
var ccedil = "ç";
var Ccirc = "Ĉ";
var ccirc = "ĉ";
var Cconint = "∰";
var ccups = "⩌";
var ccupssm = "⩐";
var Cdot = "Ċ";
var cdot = "ċ";
var cedil = "¸";
var Cedilla = "¸";
var cemptyv = "⦲";
var cent = "¢";
var centerdot = "·";
var CenterDot = "·";
var cfr = "𝔠";
var Cfr = "ℭ";
var CHcy = "Ч";
var chcy = "ч";
var check = "✓";
var checkmark = "✓";
var Chi = "Χ";
var chi = "χ";
var circ = "ˆ";
var circeq = "≗";
var circlearrowleft = "↺";
var circlearrowright = "↻";
var circledast = "⊛";
var circledcirc = "⊚";
var circleddash = "⊝";
var CircleDot = "⊙";
var circledR = "®";
var circledS = "Ⓢ";
var CircleMinus = "⊖";
var CirclePlus = "⊕";
var CircleTimes = "⊗";
var cir = "○";
var cirE = "⧃";
var cire = "≗";
var cirfnint = "⨐";
var cirmid = "⫯";
var cirscir = "⧂";
var ClockwiseContourIntegral = "∲";
var CloseCurlyDoubleQuote = "”";
var CloseCurlyQuote = "’";
var clubs = "♣";
var clubsuit = "♣";
var colon = ":";
var Colon = "∷";
var Colone = "⩴";
var colone = "≔";
var coloneq = "≔";
var comma = ",";
var commat = "@";
var comp = "∁";
var compfn = "∘";
var complement = "∁";
var complexes = "ℂ";
var cong = "≅";
var congdot = "⩭";
var Congruent = "≡";
var conint = "∮";
var Conint = "∯";
var ContourIntegral = "∮";
var copf = "𝕔";
var Copf = "ℂ";
var coprod = "∐";
var Coproduct = "∐";
var copy = "©";
var COPY = "©";
var copysr = "℗";
var CounterClockwiseContourIntegral = "∳";
var crarr = "↵";
var cross = "✗";
var Cross = "⨯";
var Cscr = "𝒞";
var cscr = "𝒸";
var csub = "⫏";
var csube = "⫑";
var csup = "⫐";
var csupe = "⫒";
var ctdot = "⋯";
var cudarrl = "⤸";
var cudarrr = "⤵";
var cuepr = "⋞";
var cuesc = "⋟";
var cularr = "↶";
var cularrp = "⤽";
var cupbrcap = "⩈";
var cupcap = "⩆";
var CupCap = "≍";
var cup = "∪";
var Cup = "⋓";
var cupcup = "⩊";
var cupdot = "⊍";
var cupor = "⩅";
var cups = "∪︀";
var curarr = "↷";
var curarrm = "⤼";
var curlyeqprec = "⋞";
var curlyeqsucc = "⋟";
var curlyvee = "⋎";
var curlywedge = "⋏";
var curren = "¤";
var curvearrowleft = "↶";
var curvearrowright = "↷";
var cuvee = "⋎";
var cuwed = "⋏";
var cwconint = "∲";
var cwint = "∱";
var cylcty = "⌭";
var dagger = "†";
var Dagger = "‡";
var daleth = "ℸ";
var darr = "↓";
var Darr = "↡";
var dArr = "⇓";
var dash = "‐";
var Dashv = "⫤";
var dashv = "⊣";
var dbkarow = "⤏";
var dblac = "˝";
var Dcaron = "Ď";
var dcaron = "ď";
var Dcy = "Д";
var dcy = "д";
var ddagger = "‡";
var ddarr = "⇊";
var DD = "ⅅ";
var dd = "ⅆ";
var DDotrahd = "⤑";
var ddotseq = "⩷";
var deg = "°";
var Del = "∇";
var Delta = "Δ";
var delta = "δ";
var demptyv = "⦱";
var dfisht = "⥿";
var Dfr = "𝔇";
var dfr = "𝔡";
var dHar = "⥥";
var dharl = "⇃";
var dharr = "⇂";
var DiacriticalAcute = "´";
var DiacriticalDot = "˙";
var DiacriticalDoubleAcute = "˝";
var DiacriticalGrave = "`";
var DiacriticalTilde = "˜";
var diam = "⋄";
var diamond = "⋄";
var Diamond = "⋄";
var diamondsuit = "♦";
var diams = "♦";
var die = "¨";
var DifferentialD = "ⅆ";
var digamma = "ϝ";
var disin = "⋲";
var div = "÷";
var divide = "÷";
var divideontimes = "⋇";
var divonx = "⋇";
var DJcy = "Ђ";
var djcy = "ђ";
var dlcorn = "⌞";
var dlcrop = "⌍";
var dollar = "$";
var Dopf = "𝔻";
var dopf = "𝕕";
var Dot = "¨";
var dot = "˙";
var DotDot = "⃜";
var doteq = "≐";
var doteqdot = "≑";
var DotEqual = "≐";
var dotminus = "∸";
var dotplus = "∔";
var dotsquare = "⊡";
var doublebarwedge = "⌆";
var DoubleContourIntegral = "∯";
var DoubleDot = "¨";
var DoubleDownArrow = "⇓";
var DoubleLeftArrow = "⇐";
var DoubleLeftRightArrow = "⇔";
var DoubleLeftTee = "⫤";
var DoubleLongLeftArrow = "⟸";
var DoubleLongLeftRightArrow = "⟺";
var DoubleLongRightArrow = "⟹";
var DoubleRightArrow = "⇒";
var DoubleRightTee = "⊨";
var DoubleUpArrow = "⇑";
var DoubleUpDownArrow = "⇕";
var DoubleVerticalBar = "∥";
var DownArrowBar = "⤓";
var downarrow = "↓";
var DownArrow = "↓";
var Downarrow = "⇓";
var DownArrowUpArrow = "⇵";
var DownBreve = "̑";
var downdownarrows = "⇊";
var downharpoonleft = "⇃";
var downharpoonright = "⇂";
var DownLeftRightVector = "⥐";
var DownLeftTeeVector = "⥞";
var DownLeftVectorBar = "⥖";
var DownLeftVector = "↽";
var DownRightTeeVector = "⥟";
var DownRightVectorBar = "⥗";
var DownRightVector = "⇁";
var DownTeeArrow = "↧";
var DownTee = "⊤";
var drbkarow = "⤐";
var drcorn = "⌟";
var drcrop = "⌌";
var Dscr = "𝒟";
var dscr = "𝒹";
var DScy = "Ѕ";
var dscy = "ѕ";
var dsol = "⧶";
var Dstrok = "Đ";
var dstrok = "đ";
var dtdot = "⋱";
var dtri = "▿";
var dtrif = "▾";
var duarr = "⇵";
var duhar = "⥯";
var dwangle = "⦦";
var DZcy = "Џ";
var dzcy = "џ";
var dzigrarr = "⟿";
var Eacute = "É";
var eacute = "é";
var easter = "⩮";
var Ecaron = "Ě";
var ecaron = "ě";
var Ecirc = "Ê";
var ecirc = "ê";
var ecir = "≖";
var ecolon = "≕";
var Ecy = "Э";
var ecy = "э";
var eDDot = "⩷";
var Edot = "Ė";
var edot = "ė";
var eDot = "≑";
var ee = "ⅇ";
var efDot = "≒";
var Efr = "𝔈";
var efr = "𝔢";
var eg = "⪚";
var Egrave = "È";
var egrave = "è";
var egs = "⪖";
var egsdot = "⪘";
var el = "⪙";
var Element = "∈";
var elinters = "⏧";
var ell = "ℓ";
var els = "⪕";
var elsdot = "⪗";
var Emacr = "Ē";
var emacr = "ē";
var empty = "∅";
var emptyset = "∅";
var EmptySmallSquare = "◻";
var emptyv = "∅";
var EmptyVerySmallSquare = "▫";
var emsp13 = " ";
var emsp14 = " ";
var emsp = " ";
var ENG = "Ŋ";
var eng = "ŋ";
var ensp = " ";
var Eogon = "Ę";
var eogon = "ę";
var Eopf = "𝔼";
var eopf = "𝕖";
var epar = "⋕";
var eparsl = "⧣";
var eplus = "⩱";
var epsi = "ε";
var Epsilon = "Ε";
var epsilon = "ε";
var epsiv = "ϵ";
var eqcirc = "≖";
var eqcolon = "≕";
var eqsim = "≂";
var eqslantgtr = "⪖";
var eqslantless = "⪕";
var Equal = "⩵";
var equals = "=";
var EqualTilde = "≂";
var equest = "≟";
var Equilibrium = "⇌";
var equiv = "≡";
var equivDD = "⩸";
var eqvparsl = "⧥";
var erarr = "⥱";
var erDot = "≓";
var escr = "ℯ";
var Escr = "ℰ";
var esdot = "≐";
var Esim = "⩳";
var esim = "≂";
var Eta = "Η";
var eta = "η";
var ETH = "Ð";
var eth = "ð";
var Euml = "Ë";
var euml = "ë";
var euro = "€";
var excl = "!";
var exist = "∃";
var Exists = "∃";
var expectation = "ℰ";
var exponentiale = "ⅇ";
var ExponentialE = "ⅇ";
var fallingdotseq = "≒";
var Fcy = "Ф";
var fcy = "ф";
var female = "♀";
var ffilig = "ﬃ";
var fflig = "ﬀ";
var ffllig = "ﬄ";
var Ffr = "𝔉";
var ffr = "𝔣";
var filig = "ﬁ";
var FilledSmallSquare = "◼";
var FilledVerySmallSquare = "▪";
var fjlig = "fj";
var flat = "♭";
var fllig = "ﬂ";
var fltns = "▱";
var fnof = "ƒ";
var Fopf = "𝔽";
var fopf = "𝕗";
var forall = "∀";
var ForAll = "∀";
var fork = "⋔";
var forkv = "⫙";
var Fouriertrf = "ℱ";
var fpartint = "⨍";
var frac12 = "½";
var frac13 = "⅓";
var frac14 = "¼";
var frac15 = "⅕";
var frac16 = "⅙";
var frac18 = "⅛";
var frac23 = "⅔";
var frac25 = "⅖";
var frac34 = "¾";
var frac35 = "⅗";
var frac38 = "⅜";
var frac45 = "⅘";
var frac56 = "⅚";
var frac58 = "⅝";
var frac78 = "⅞";
var frasl = "⁄";
var frown = "⌢";
var fscr = "𝒻";
var Fscr = "ℱ";
var gacute = "ǵ";
var Gamma = "Γ";
var gamma = "γ";
var Gammad = "Ϝ";
var gammad = "ϝ";
var gap = "⪆";
var Gbreve = "Ğ";
var gbreve = "ğ";
var Gcedil = "Ģ";
var Gcirc = "Ĝ";
var gcirc = "ĝ";
var Gcy = "Г";
var gcy = "г";
var Gdot = "Ġ";
var gdot = "ġ";
var ge = "≥";
var gE = "≧";
var gEl = "⪌";
var gel = "⋛";
var geq = "≥";
var geqq = "≧";
var geqslant = "⩾";
var gescc = "⪩";
var ges = "⩾";
var gesdot = "⪀";
var gesdoto = "⪂";
var gesdotol = "⪄";
var gesl = "⋛︀";
var gesles = "⪔";
var Gfr = "𝔊";
var gfr = "𝔤";
var gg = "≫";
var Gg = "⋙";
var ggg = "⋙";
var gimel = "ℷ";
var GJcy = "Ѓ";
var gjcy = "ѓ";
var gla = "⪥";
var gl = "≷";
var glE = "⪒";
var glj = "⪤";
var gnap = "⪊";
var gnapprox = "⪊";
var gne = "⪈";
var gnE = "≩";
var gneq = "⪈";
var gneqq = "≩";
var gnsim = "⋧";
var Gopf = "𝔾";
var gopf = "𝕘";
var grave = "`";
var GreaterEqual = "≥";
var GreaterEqualLess = "⋛";
var GreaterFullEqual = "≧";
var GreaterGreater = "⪢";
var GreaterLess = "≷";
var GreaterSlantEqual = "⩾";
var GreaterTilde = "≳";
var Gscr = "𝒢";
var gscr = "ℊ";
var gsim = "≳";
var gsime = "⪎";
var gsiml = "⪐";
var gtcc = "⪧";
var gtcir = "⩺";
var gt = ">";
var GT = ">";
var Gt = "≫";
var gtdot = "⋗";
var gtlPar = "⦕";
var gtquest = "⩼";
var gtrapprox = "⪆";
var gtrarr = "⥸";
var gtrdot = "⋗";
var gtreqless = "⋛";
var gtreqqless = "⪌";
var gtrless = "≷";
var gtrsim = "≳";
var gvertneqq = "≩︀";
var gvnE = "≩︀";
var Hacek = "ˇ";
var hairsp = " ";
var half = "½";
var hamilt = "ℋ";
var HARDcy = "Ъ";
var hardcy = "ъ";
var harrcir = "⥈";
var harr = "↔";
var hArr = "⇔";
var harrw = "↭";
var Hat = "^";
var hbar = "ℏ";
var Hcirc = "Ĥ";
var hcirc = "ĥ";
var hearts = "♥";
var heartsuit = "♥";
var hellip = "…";
var hercon = "⊹";
var hfr = "𝔥";
var Hfr = "ℌ";
var HilbertSpace = "ℋ";
var hksearow = "⤥";
var hkswarow = "⤦";
var hoarr = "⇿";
var homtht = "∻";
var hookleftarrow = "↩";
var hookrightarrow = "↪";
var hopf = "𝕙";
var Hopf = "ℍ";
var horbar = "―";
var HorizontalLine = "─";
var hscr = "𝒽";
var Hscr = "ℋ";
var hslash = "ℏ";
var Hstrok = "Ħ";
var hstrok = "ħ";
var HumpDownHump = "≎";
var HumpEqual = "≏";
var hybull = "⁃";
var hyphen = "‐";
var Iacute = "Í";
var iacute = "í";
var ic = "⁣";
var Icirc = "Î";
var icirc = "î";
var Icy = "И";
var icy = "и";
var Idot = "İ";
var IEcy = "Е";
var iecy = "е";
var iexcl = "¡";
var iff = "⇔";
var ifr = "𝔦";
var Ifr = "ℑ";
var Igrave = "Ì";
var igrave = "ì";
var ii = "ⅈ";
var iiiint = "⨌";
var iiint = "∭";
var iinfin = "⧜";
var iiota = "℩";
var IJlig = "Ĳ";
var ijlig = "ĳ";
var Imacr = "Ī";
var imacr = "ī";
var image = "ℑ";
var ImaginaryI = "ⅈ";
var imagline = "ℐ";
var imagpart = "ℑ";
var imath = "ı";
var Im = "ℑ";
var imof = "⊷";
var imped = "Ƶ";
var Implies = "⇒";
var incare = "℅";
var infin = "∞";
var infintie = "⧝";
var inodot = "ı";
var intcal = "⊺";
var int = "∫";
var Int = "∬";
var integers = "ℤ";
var Integral = "∫";
var intercal = "⊺";
var Intersection = "⋂";
var intlarhk = "⨗";
var intprod = "⨼";
var InvisibleComma = "⁣";
var InvisibleTimes = "⁢";
var IOcy = "Ё";
var iocy = "ё";
var Iogon = "Į";
var iogon = "į";
var Iopf = "𝕀";
var iopf = "𝕚";
var Iota = "Ι";
var iota = "ι";
var iprod = "⨼";
var iquest = "¿";
var iscr = "𝒾";
var Iscr = "ℐ";
var isin = "∈";
var isindot = "⋵";
var isinE = "⋹";
var isins = "⋴";
var isinsv = "⋳";
var isinv = "∈";
var it = "⁢";
var Itilde = "Ĩ";
var itilde = "ĩ";
var Iukcy = "І";
var iukcy = "і";
var Iuml = "Ï";
var iuml = "ï";
var Jcirc = "Ĵ";
var jcirc = "ĵ";
var Jcy = "Й";
var jcy = "й";
var Jfr = "𝔍";
var jfr = "𝔧";
var jmath = "ȷ";
var Jopf = "𝕁";
var jopf = "𝕛";
var Jscr = "𝒥";
var jscr = "𝒿";
var Jsercy = "Ј";
var jsercy = "ј";
var Jukcy = "Є";
var jukcy = "є";
var Kappa = "Κ";
var kappa = "κ";
var kappav = "ϰ";
var Kcedil = "Ķ";
var kcedil = "ķ";
var Kcy = "К";
var kcy = "к";
var Kfr = "𝔎";
var kfr = "𝔨";
var kgreen = "ĸ";
var KHcy = "Х";
var khcy = "х";
var KJcy = "Ќ";
var kjcy = "ќ";
var Kopf = "𝕂";
var kopf = "𝕜";
var Kscr = "𝒦";
var kscr = "𝓀";
var lAarr = "⇚";
var Lacute = "Ĺ";
var lacute = "ĺ";
var laemptyv = "⦴";
var lagran = "ℒ";
var Lambda = "Λ";
var lambda = "λ";
var lang = "⟨";
var Lang = "⟪";
var langd = "⦑";
var langle = "⟨";
var lap = "⪅";
var Laplacetrf = "ℒ";
var laquo = "«";
var larrb = "⇤";
var larrbfs = "⤟";
var larr = "←";
var Larr = "↞";
var lArr = "⇐";
var larrfs = "⤝";
var larrhk = "↩";
var larrlp = "↫";
var larrpl = "⤹";
var larrsim = "⥳";
var larrtl = "↢";
var latail = "⤙";
var lAtail = "⤛";
var lat = "⪫";
var late = "⪭";
var lates = "⪭︀";
var lbarr = "⤌";
var lBarr = "⤎";
var lbbrk = "❲";
var lbrace = "{";
var lbrack = "[";
var lbrke = "⦋";
var lbrksld = "⦏";
var lbrkslu = "⦍";
var Lcaron = "Ľ";
var lcaron = "ľ";
var Lcedil = "Ļ";
var lcedil = "ļ";
var lceil = "⌈";
var lcub = "{";
var Lcy = "Л";
var lcy = "л";
var ldca = "⤶";
var ldquo = "“";
var ldquor = "„";
var ldrdhar = "⥧";
var ldrushar = "⥋";
var ldsh = "↲";
var le = "≤";
var lE = "≦";
var LeftAngleBracket = "⟨";
var LeftArrowBar = "⇤";
var leftarrow = "←";
var LeftArrow = "←";
var Leftarrow = "⇐";
var LeftArrowRightArrow = "⇆";
var leftarrowtail = "↢";
var LeftCeiling = "⌈";
var LeftDoubleBracket = "⟦";
var LeftDownTeeVector = "⥡";
var LeftDownVectorBar = "⥙";
var LeftDownVector = "⇃";
var LeftFloor = "⌊";
var leftharpoondown = "↽";
var leftharpoonup = "↼";
var leftleftarrows = "⇇";
var leftrightarrow = "↔";
var LeftRightArrow = "↔";
var Leftrightarrow = "⇔";
var leftrightarrows = "⇆";
var leftrightharpoons = "⇋";
var leftrightsquigarrow = "↭";
var LeftRightVector = "⥎";
var LeftTeeArrow = "↤";
var LeftTee = "⊣";
var LeftTeeVector = "⥚";
var leftthreetimes = "⋋";
var LeftTriangleBar = "⧏";
var LeftTriangle = "⊲";
var LeftTriangleEqual = "⊴";
var LeftUpDownVector = "⥑";
var LeftUpTeeVector = "⥠";
var LeftUpVectorBar = "⥘";
var LeftUpVector = "↿";
var LeftVectorBar = "⥒";
var LeftVector = "↼";
var lEg = "⪋";
var leg = "⋚";
var leq = "≤";
var leqq = "≦";
var leqslant = "⩽";
var lescc = "⪨";
var les = "⩽";
var lesdot = "⩿";
var lesdoto = "⪁";
var lesdotor = "⪃";
var lesg = "⋚︀";
var lesges = "⪓";
var lessapprox = "⪅";
var lessdot = "⋖";
var lesseqgtr = "⋚";
var lesseqqgtr = "⪋";
var LessEqualGreater = "⋚";
var LessFullEqual = "≦";
var LessGreater = "≶";
var lessgtr = "≶";
var LessLess = "⪡";
var lesssim = "≲";
var LessSlantEqual = "⩽";
var LessTilde = "≲";
var lfisht = "⥼";
var lfloor = "⌊";
var Lfr = "𝔏";
var lfr = "𝔩";
var lg = "≶";
var lgE = "⪑";
var lHar = "⥢";
var lhard = "↽";
var lharu = "↼";
var lharul = "⥪";
var lhblk = "▄";
var LJcy = "Љ";
var ljcy = "љ";
var llarr = "⇇";
var ll = "≪";
var Ll = "⋘";
var llcorner = "⌞";
var Lleftarrow = "⇚";
var llhard = "⥫";
var lltri = "◺";
var Lmidot = "Ŀ";
var lmidot = "ŀ";
var lmoustache = "⎰";
var lmoust = "⎰";
var lnap = "⪉";
var lnapprox = "⪉";
var lne = "⪇";
var lnE = "≨";
var lneq = "⪇";
var lneqq = "≨";
var lnsim = "⋦";
var loang = "⟬";
var loarr = "⇽";
var lobrk = "⟦";
var longleftarrow = "⟵";
var LongLeftArrow = "⟵";
var Longleftarrow = "⟸";
var longleftrightarrow = "⟷";
var LongLeftRightArrow = "⟷";
var Longleftrightarrow = "⟺";
var longmapsto = "⟼";
var longrightarrow = "⟶";
var LongRightArrow = "⟶";
var Longrightarrow = "⟹";
var looparrowleft = "↫";
var looparrowright = "↬";
var lopar = "⦅";
var Lopf = "𝕃";
var lopf = "𝕝";
var loplus = "⨭";
var lotimes = "⨴";
var lowast = "∗";
var lowbar = "_";
var LowerLeftArrow = "↙";
var LowerRightArrow = "↘";
var loz = "◊";
var lozenge = "◊";
var lozf = "⧫";
var lpar = "(";
var lparlt = "⦓";
var lrarr = "⇆";
var lrcorner = "⌟";
var lrhar = "⇋";
var lrhard = "⥭";
var lrm = "‎";
var lrtri = "⊿";
var lsaquo = "‹";
var lscr = "𝓁";
var Lscr = "ℒ";
var lsh = "↰";
var Lsh = "↰";
var lsim = "≲";
var lsime = "⪍";
var lsimg = "⪏";
var lsqb = "[";
var lsquo = "‘";
var lsquor = "‚";
var Lstrok = "Ł";
var lstrok = "ł";
var ltcc = "⪦";
var ltcir = "⩹";
var lt = "<";
var LT = "<";
var Lt = "≪";
var ltdot = "⋖";
var lthree = "⋋";
var ltimes = "⋉";
var ltlarr = "⥶";
var ltquest = "⩻";
var ltri = "◃";
var ltrie = "⊴";
var ltrif = "◂";
var ltrPar = "⦖";
var lurdshar = "⥊";
var luruhar = "⥦";
var lvertneqq = "≨︀";
var lvnE = "≨︀";
var macr = "¯";
var male = "♂";
var malt = "✠";
var maltese = "✠";
var map = "↦";
var mapsto = "↦";
var mapstodown = "↧";
var mapstoleft = "↤";
var mapstoup = "↥";
var marker = "▮";
var mcomma = "⨩";
var Mcy = "М";
var mcy = "м";
var mdash = "—";
var mDDot = "∺";
var measuredangle = "∡";
var MediumSpace = " ";
var Mellintrf = "ℳ";
var Mfr = "𝔐";
var mfr = "𝔪";
var mho = "℧";
var micro = "µ";
var midast = "*";
var midcir = "⫰";
var mid = "∣";
var middot = "·";
var minusb = "⊟";
var minus = "−";
var minusd = "∸";
var minusdu = "⨪";
var MinusPlus = "∓";
var mlcp = "⫛";
var mldr = "…";
var mnplus = "∓";
var models = "⊧";
var Mopf = "𝕄";
var mopf = "𝕞";
var mp = "∓";
var mscr = "𝓂";
var Mscr = "ℳ";
var mstpos = "∾";
var Mu = "Μ";
var mu = "μ";
var multimap = "⊸";
var mumap = "⊸";
var nabla = "∇";
var Nacute = "Ń";
var nacute = "ń";
var nang = "∠⃒";
var nap = "≉";
var napE = "⩰̸";
var napid = "≋̸";
var napos = "ŉ";
var napprox = "≉";
var natural = "♮";
var naturals = "ℕ";
var natur = "♮";
var nbsp = " ";
var nbump = "≎̸";
var nbumpe = "≏̸";
var ncap = "⩃";
var Ncaron = "Ň";
var ncaron = "ň";
var Ncedil = "Ņ";
var ncedil = "ņ";
var ncong = "≇";
var ncongdot = "⩭̸";
var ncup = "⩂";
var Ncy = "Н";
var ncy = "н";
var ndash = "–";
var nearhk = "⤤";
var nearr = "↗";
var neArr = "⇗";
var nearrow = "↗";
var ne = "≠";
var nedot = "≐̸";
var NegativeMediumSpace = "​";
var NegativeThickSpace = "​";
var NegativeThinSpace = "​";
var NegativeVeryThinSpace = "​";
var nequiv = "≢";
var nesear = "⤨";
var nesim = "≂̸";
var NestedGreaterGreater = "≫";
var NestedLessLess = "≪";
var NewLine = "\n";
var nexist = "∄";
var nexists = "∄";
var Nfr = "𝔑";
var nfr = "𝔫";
var ngE = "≧̸";
var nge = "≱";
var ngeq = "≱";
var ngeqq = "≧̸";
var ngeqslant = "⩾̸";
var nges = "⩾̸";
var nGg = "⋙̸";
var ngsim = "≵";
var nGt = "≫⃒";
var ngt = "≯";
var ngtr = "≯";
var nGtv = "≫̸";
var nharr = "↮";
var nhArr = "⇎";
var nhpar = "⫲";
var ni = "∋";
var nis = "⋼";
var nisd = "⋺";
var niv = "∋";
var NJcy = "Њ";
var njcy = "њ";
var nlarr = "↚";
var nlArr = "⇍";
var nldr = "‥";
var nlE = "≦̸";
var nle = "≰";
var nleftarrow = "↚";
var nLeftarrow = "⇍";
var nleftrightarrow = "↮";
var nLeftrightarrow = "⇎";
var nleq = "≰";
var nleqq = "≦̸";
var nleqslant = "⩽̸";
var nles = "⩽̸";
var nless = "≮";
var nLl = "⋘̸";
var nlsim = "≴";
var nLt = "≪⃒";
var nlt = "≮";
var nltri = "⋪";
var nltrie = "⋬";
var nLtv = "≪̸";
var nmid = "∤";
var NoBreak = "⁠";
var NonBreakingSpace = " ";
var nopf = "𝕟";
var Nopf = "ℕ";
var Not = "⫬";
var not = "¬";
var NotCongruent = "≢";
var NotCupCap = "≭";
var NotDoubleVerticalBar = "∦";
var NotElement = "∉";
var NotEqual = "≠";
var NotEqualTilde = "≂̸";
var NotExists = "∄";
var NotGreater = "≯";
var NotGreaterEqual = "≱";
var NotGreaterFullEqual = "≧̸";
var NotGreaterGreater = "≫̸";
var NotGreaterLess = "≹";
var NotGreaterSlantEqual = "⩾̸";
var NotGreaterTilde = "≵";
var NotHumpDownHump = "≎̸";
var NotHumpEqual = "≏̸";
var notin = "∉";
var notindot = "⋵̸";
var notinE = "⋹̸";
var notinva = "∉";
var notinvb = "⋷";
var notinvc = "⋶";
var NotLeftTriangleBar = "⧏̸";
var NotLeftTriangle = "⋪";
var NotLeftTriangleEqual = "⋬";
var NotLess = "≮";
var NotLessEqual = "≰";
var NotLessGreater = "≸";
var NotLessLess = "≪̸";
var NotLessSlantEqual = "⩽̸";
var NotLessTilde = "≴";
var NotNestedGreaterGreater = "⪢̸";
var NotNestedLessLess = "⪡̸";
var notni = "∌";
var notniva = "∌";
var notnivb = "⋾";
var notnivc = "⋽";
var NotPrecedes = "⊀";
var NotPrecedesEqual = "⪯̸";
var NotPrecedesSlantEqual = "⋠";
var NotReverseElement = "∌";
var NotRightTriangleBar = "⧐̸";
var NotRightTriangle = "⋫";
var NotRightTriangleEqual = "⋭";
var NotSquareSubset = "⊏̸";
var NotSquareSubsetEqual = "⋢";
var NotSquareSuperset = "⊐̸";
var NotSquareSupersetEqual = "⋣";
var NotSubset = "⊂⃒";
var NotSubsetEqual = "⊈";
var NotSucceeds = "⊁";
var NotSucceedsEqual = "⪰̸";
var NotSucceedsSlantEqual = "⋡";
var NotSucceedsTilde = "≿̸";
var NotSuperset = "⊃⃒";
var NotSupersetEqual = "⊉";
var NotTilde = "≁";
var NotTildeEqual = "≄";
var NotTildeFullEqual = "≇";
var NotTildeTilde = "≉";
var NotVerticalBar = "∤";
var nparallel = "∦";
var npar = "∦";
var nparsl = "⫽⃥";
var npart = "∂̸";
var npolint = "⨔";
var npr = "⊀";
var nprcue = "⋠";
var nprec = "⊀";
var npreceq = "⪯̸";
var npre = "⪯̸";
var nrarrc = "⤳̸";
var nrarr = "↛";
var nrArr = "⇏";
var nrarrw = "↝̸";
var nrightarrow = "↛";
var nRightarrow = "⇏";
var nrtri = "⋫";
var nrtrie = "⋭";
var nsc = "⊁";
var nsccue = "⋡";
var nsce = "⪰̸";
var Nscr = "𝒩";
var nscr = "𝓃";
var nshortmid = "∤";
var nshortparallel = "∦";
var nsim = "≁";
var nsime = "≄";
var nsimeq = "≄";
var nsmid = "∤";
var nspar = "∦";
var nsqsube = "⋢";
var nsqsupe = "⋣";
var nsub = "⊄";
var nsubE = "⫅̸";
var nsube = "⊈";
var nsubset = "⊂⃒";
var nsubseteq = "⊈";
var nsubseteqq = "⫅̸";
var nsucc = "⊁";
var nsucceq = "⪰̸";
var nsup = "⊅";
var nsupE = "⫆̸";
var nsupe = "⊉";
var nsupset = "⊃⃒";
var nsupseteq = "⊉";
var nsupseteqq = "⫆̸";
var ntgl = "≹";
var Ntilde = "Ñ";
var ntilde = "ñ";
var ntlg = "≸";
var ntriangleleft = "⋪";
var ntrianglelefteq = "⋬";
var ntriangleright = "⋫";
var ntrianglerighteq = "⋭";
var Nu = "Ν";
var nu = "ν";
var num = "#";
var numero = "№";
var numsp = " ";
var nvap = "≍⃒";
var nvdash = "⊬";
var nvDash = "⊭";
var nVdash = "⊮";
var nVDash = "⊯";
var nvge = "≥⃒";
var nvgt = ">⃒";
var nvHarr = "⤄";
var nvinfin = "⧞";
var nvlArr = "⤂";
var nvle = "≤⃒";
var nvlt = "<⃒";
var nvltrie = "⊴⃒";
var nvrArr = "⤃";
var nvrtrie = "⊵⃒";
var nvsim = "∼⃒";
var nwarhk = "⤣";
var nwarr = "↖";
var nwArr = "⇖";
var nwarrow = "↖";
var nwnear = "⤧";
var Oacute = "Ó";
var oacute = "ó";
var oast = "⊛";
var Ocirc = "Ô";
var ocirc = "ô";
var ocir = "⊚";
var Ocy = "О";
var ocy = "о";
var odash = "⊝";
var Odblac = "Ő";
var odblac = "ő";
var odiv = "⨸";
var odot = "⊙";
var odsold = "⦼";
var OElig = "Œ";
var oelig = "œ";
var ofcir = "⦿";
var Ofr = "𝔒";
var ofr = "𝔬";
var ogon = "˛";
var Ograve = "Ò";
var ograve = "ò";
var ogt = "⧁";
var ohbar = "⦵";
var ohm = "Ω";
var oint = "∮";
var olarr = "↺";
var olcir = "⦾";
var olcross = "⦻";
var oline = "‾";
var olt = "⧀";
var Omacr = "Ō";
var omacr = "ō";
var Omega = "Ω";
var omega = "ω";
var Omicron = "Ο";
var omicron = "ο";
var omid = "⦶";
var ominus = "⊖";
var Oopf = "𝕆";
var oopf = "𝕠";
var opar = "⦷";
var OpenCurlyDoubleQuote = "“";
var OpenCurlyQuote = "‘";
var operp = "⦹";
var oplus = "⊕";
var orarr = "↻";
var Or = "⩔";
var or = "∨";
var ord = "⩝";
var order = "ℴ";
var orderof = "ℴ";
var ordf = "ª";
var ordm = "º";
var origof = "⊶";
var oror = "⩖";
var orslope = "⩗";
var orv = "⩛";
var oS = "Ⓢ";
var Oscr = "𝒪";
var oscr = "ℴ";
var Oslash = "Ø";
var oslash = "ø";
var osol = "⊘";
var Otilde = "Õ";
var otilde = "õ";
var otimesas = "⨶";
var Otimes = "⨷";
var otimes = "⊗";
var Ouml = "Ö";
var ouml = "ö";
var ovbar = "⌽";
var OverBar = "‾";
var OverBrace = "⏞";
var OverBracket = "⎴";
var OverParenthesis = "⏜";
var para = "¶";
var parallel = "∥";
var par = "∥";
var parsim = "⫳";
var parsl = "⫽";
var part = "∂";
var PartialD = "∂";
var Pcy = "П";
var pcy = "п";
var percnt = "%";
var period = ".";
var permil = "‰";
var perp = "⊥";
var pertenk = "‱";
var Pfr = "𝔓";
var pfr = "𝔭";
var Phi = "Φ";
var phi = "φ";
var phiv = "ϕ";
var phmmat = "ℳ";
var phone = "☎";
var Pi = "Π";
var pi = "π";
var pitchfork = "⋔";
var piv = "ϖ";
var planck = "ℏ";
var planckh = "ℎ";
var plankv = "ℏ";
var plusacir = "⨣";
var plusb = "⊞";
var pluscir = "⨢";
var plus = "+";
var plusdo = "∔";
var plusdu = "⨥";
var pluse = "⩲";
var PlusMinus = "±";
var plusmn = "±";
var plussim = "⨦";
var plustwo = "⨧";
var pm = "±";
var Poincareplane = "ℌ";
var pointint = "⨕";
var popf = "𝕡";
var Popf = "ℙ";
var pound = "£";
var prap = "⪷";
var Pr = "⪻";
var pr = "≺";
var prcue = "≼";
var precapprox = "⪷";
var prec = "≺";
var preccurlyeq = "≼";
var Precedes = "≺";
var PrecedesEqual = "⪯";
var PrecedesSlantEqual = "≼";
var PrecedesTilde = "≾";
var preceq = "⪯";
var precnapprox = "⪹";
var precneqq = "⪵";
var precnsim = "⋨";
var pre = "⪯";
var prE = "⪳";
var precsim = "≾";
var prime = "′";
var Prime = "″";
var primes = "ℙ";
var prnap = "⪹";
var prnE = "⪵";
var prnsim = "⋨";
var prod = "∏";
var Product = "∏";
var profalar = "⌮";
var profline = "⌒";
var profsurf = "⌓";
var prop = "∝";
var Proportional = "∝";
var Proportion = "∷";
var propto = "∝";
var prsim = "≾";
var prurel = "⊰";
var Pscr = "𝒫";
var pscr = "𝓅";
var Psi = "Ψ";
var psi = "ψ";
var puncsp = " ";
var Qfr = "𝔔";
var qfr = "𝔮";
var qint = "⨌";
var qopf = "𝕢";
var Qopf = "ℚ";
var qprime = "⁗";
var Qscr = "𝒬";
var qscr = "𝓆";
var quaternions = "ℍ";
var quatint = "⨖";
var quest = "?";
var questeq = "≟";
var quot = "\"";
var QUOT = "\"";
var rAarr = "⇛";
var race = "∽̱";
var Racute = "Ŕ";
var racute = "ŕ";
var radic = "√";
var raemptyv = "⦳";
var rang = "⟩";
var Rang = "⟫";
var rangd = "⦒";
var range = "⦥";
var rangle = "⟩";
var raquo = "»";
var rarrap = "⥵";
var rarrb = "⇥";
var rarrbfs = "⤠";
var rarrc = "⤳";
var rarr = "→";
var Rarr = "↠";
var rArr = "⇒";
var rarrfs = "⤞";
var rarrhk = "↪";
var rarrlp = "↬";
var rarrpl = "⥅";
var rarrsim = "⥴";
var Rarrtl = "⤖";
var rarrtl = "↣";
var rarrw = "↝";
var ratail = "⤚";
var rAtail = "⤜";
var ratio = "∶";
var rationals = "ℚ";
var rbarr = "⤍";
var rBarr = "⤏";
var RBarr = "⤐";
var rbbrk = "❳";
var rbrace = "}";
var rbrack = "]";
var rbrke = "⦌";
var rbrksld = "⦎";
var rbrkslu = "⦐";
var Rcaron = "Ř";
var rcaron = "ř";
var Rcedil = "Ŗ";
var rcedil = "ŗ";
var rceil = "⌉";
var rcub = "}";
var Rcy = "Р";
var rcy = "р";
var rdca = "⤷";
var rdldhar = "⥩";
var rdquo = "”";
var rdquor = "”";
var rdsh = "↳";
var real = "ℜ";
var realine = "ℛ";
var realpart = "ℜ";
var reals = "ℝ";
var Re = "ℜ";
var rect = "▭";
var reg = "®";
var REG = "®";
var ReverseElement = "∋";
var ReverseEquilibrium = "⇋";
var ReverseUpEquilibrium = "⥯";
var rfisht = "⥽";
var rfloor = "⌋";
var rfr = "𝔯";
var Rfr = "ℜ";
var rHar = "⥤";
var rhard = "⇁";
var rharu = "⇀";
var rharul = "⥬";
var Rho = "Ρ";
var rho = "ρ";
var rhov = "ϱ";
var RightAngleBracket = "⟩";
var RightArrowBar = "⇥";
var rightarrow = "→";
var RightArrow = "→";
var Rightarrow = "⇒";
var RightArrowLeftArrow = "⇄";
var rightarrowtail = "↣";
var RightCeiling = "⌉";
var RightDoubleBracket = "⟧";
var RightDownTeeVector = "⥝";
var RightDownVectorBar = "⥕";
var RightDownVector = "⇂";
var RightFloor = "⌋";
var rightharpoondown = "⇁";
var rightharpoonup = "⇀";
var rightleftarrows = "⇄";
var rightleftharpoons = "⇌";
var rightrightarrows = "⇉";
var rightsquigarrow = "↝";
var RightTeeArrow = "↦";
var RightTee = "⊢";
var RightTeeVector = "⥛";
var rightthreetimes = "⋌";
var RightTriangleBar = "⧐";
var RightTriangle = "⊳";
var RightTriangleEqual = "⊵";
var RightUpDownVector = "⥏";
var RightUpTeeVector = "⥜";
var RightUpVectorBar = "⥔";
var RightUpVector = "↾";
var RightVectorBar = "⥓";
var RightVector = "⇀";
var ring = "˚";
var risingdotseq = "≓";
var rlarr = "⇄";
var rlhar = "⇌";
var rlm = "‏";
var rmoustache = "⎱";
var rmoust = "⎱";
var rnmid = "⫮";
var roang = "⟭";
var roarr = "⇾";
var robrk = "⟧";
var ropar = "⦆";
var ropf = "𝕣";
var Ropf = "ℝ";
var roplus = "⨮";
var rotimes = "⨵";
var RoundImplies = "⥰";
var rpar = ")";
var rpargt = "⦔";
var rppolint = "⨒";
var rrarr = "⇉";
var Rrightarrow = "⇛";
var rsaquo = "›";
var rscr = "𝓇";
var Rscr = "ℛ";
var rsh = "↱";
var Rsh = "↱";
var rsqb = "]";
var rsquo = "’";
var rsquor = "’";
var rthree = "⋌";
var rtimes = "⋊";
var rtri = "▹";
var rtrie = "⊵";
var rtrif = "▸";
var rtriltri = "⧎";
var RuleDelayed = "⧴";
var ruluhar = "⥨";
var rx = "℞";
var Sacute = "Ś";
var sacute = "ś";
var sbquo = "‚";
var scap = "⪸";
var Scaron = "Š";
var scaron = "š";
var Sc = "⪼";
var sc = "≻";
var sccue = "≽";
var sce = "⪰";
var scE = "⪴";
var Scedil = "Ş";
var scedil = "ş";
var Scirc = "Ŝ";
var scirc = "ŝ";
var scnap = "⪺";
var scnE = "⪶";
var scnsim = "⋩";
var scpolint = "⨓";
var scsim = "≿";
var Scy = "С";
var scy = "с";
var sdotb = "⊡";
var sdot = "⋅";
var sdote = "⩦";
var searhk = "⤥";
var searr = "↘";
var seArr = "⇘";
var searrow = "↘";
var sect = "§";
var semi = ";";
var seswar = "⤩";
var setminus = "∖";
var setmn = "∖";
var sext = "✶";
var Sfr = "𝔖";
var sfr = "𝔰";
var sfrown = "⌢";
var sharp = "♯";
var SHCHcy = "Щ";
var shchcy = "щ";
var SHcy = "Ш";
var shcy = "ш";
var ShortDownArrow = "↓";
var ShortLeftArrow = "←";
var shortmid = "∣";
var shortparallel = "∥";
var ShortRightArrow = "→";
var ShortUpArrow = "↑";
var shy = "­";
var Sigma = "Σ";
var sigma = "σ";
var sigmaf = "ς";
var sigmav = "ς";
var sim = "∼";
var simdot = "⩪";
var sime = "≃";
var simeq = "≃";
var simg = "⪞";
var simgE = "⪠";
var siml = "⪝";
var simlE = "⪟";
var simne = "≆";
var simplus = "⨤";
var simrarr = "⥲";
var slarr = "←";
var SmallCircle = "∘";
var smallsetminus = "∖";
var smashp = "⨳";
var smeparsl = "⧤";
var smid = "∣";
var smile = "⌣";
var smt = "⪪";
var smte = "⪬";
var smtes = "⪬︀";
var SOFTcy = "Ь";
var softcy = "ь";
var solbar = "⌿";
var solb = "⧄";
var sol = "/";
var Sopf = "𝕊";
var sopf = "𝕤";
var spades = "♠";
var spadesuit = "♠";
var spar = "∥";
var sqcap = "⊓";
var sqcaps = "⊓︀";
var sqcup = "⊔";
var sqcups = "⊔︀";
var Sqrt = "√";
var sqsub = "⊏";
var sqsube = "⊑";
var sqsubset = "⊏";
var sqsubseteq = "⊑";
var sqsup = "⊐";
var sqsupe = "⊒";
var sqsupset = "⊐";
var sqsupseteq = "⊒";
var square = "□";
var Square = "□";
var SquareIntersection = "⊓";
var SquareSubset = "⊏";
var SquareSubsetEqual = "⊑";
var SquareSuperset = "⊐";
var SquareSupersetEqual = "⊒";
var SquareUnion = "⊔";
var squarf = "▪";
var squ = "□";
var squf = "▪";
var srarr = "→";
var Sscr = "𝒮";
var sscr = "𝓈";
var ssetmn = "∖";
var ssmile = "⌣";
var sstarf = "⋆";
var Star = "⋆";
var star = "☆";
var starf = "★";
var straightepsilon = "ϵ";
var straightphi = "ϕ";
var strns = "¯";
var sub = "⊂";
var Sub = "⋐";
var subdot = "⪽";
var subE = "⫅";
var sube = "⊆";
var subedot = "⫃";
var submult = "⫁";
var subnE = "⫋";
var subne = "⊊";
var subplus = "⪿";
var subrarr = "⥹";
var subset = "⊂";
var Subset = "⋐";
var subseteq = "⊆";
var subseteqq = "⫅";
var SubsetEqual = "⊆";
var subsetneq = "⊊";
var subsetneqq = "⫋";
var subsim = "⫇";
var subsub = "⫕";
var subsup = "⫓";
var succapprox = "⪸";
var succ = "≻";
var succcurlyeq = "≽";
var Succeeds = "≻";
var SucceedsEqual = "⪰";
var SucceedsSlantEqual = "≽";
var SucceedsTilde = "≿";
var succeq = "⪰";
var succnapprox = "⪺";
var succneqq = "⪶";
var succnsim = "⋩";
var succsim = "≿";
var SuchThat = "∋";
var sum = "∑";
var Sum = "∑";
var sung = "♪";
var sup1 = "¹";
var sup2 = "²";
var sup3 = "³";
var sup = "⊃";
var Sup = "⋑";
var supdot = "⪾";
var supdsub = "⫘";
var supE = "⫆";
var supe = "⊇";
var supedot = "⫄";
var Superset = "⊃";
var SupersetEqual = "⊇";
var suphsol = "⟉";
var suphsub = "⫗";
var suplarr = "⥻";
var supmult = "⫂";
var supnE = "⫌";
var supne = "⊋";
var supplus = "⫀";
var supset = "⊃";
var Supset = "⋑";
var supseteq = "⊇";
var supseteqq = "⫆";
var supsetneq = "⊋";
var supsetneqq = "⫌";
var supsim = "⫈";
var supsub = "⫔";
var supsup = "⫖";
var swarhk = "⤦";
var swarr = "↙";
var swArr = "⇙";
var swarrow = "↙";
var swnwar = "⤪";
var szlig = "ß";
var Tab = "\t";
var target = "⌖";
var Tau = "Τ";
var tau = "τ";
var tbrk = "⎴";
var Tcaron = "Ť";
var tcaron = "ť";
var Tcedil = "Ţ";
var tcedil = "ţ";
var Tcy = "Т";
var tcy = "т";
var tdot = "⃛";
var telrec = "⌕";
var Tfr = "𝔗";
var tfr = "𝔱";
var there4 = "∴";
var therefore = "∴";
var Therefore = "∴";
var Theta = "Θ";
var theta = "θ";
var thetasym = "ϑ";
var thetav = "ϑ";
var thickapprox = "≈";
var thicksim = "∼";
var ThickSpace = "  ";
var ThinSpace = " ";
var thinsp = " ";
var thkap = "≈";
var thksim = "∼";
var THORN = "Þ";
var thorn = "þ";
var tilde = "˜";
var Tilde = "∼";
var TildeEqual = "≃";
var TildeFullEqual = "≅";
var TildeTilde = "≈";
var timesbar = "⨱";
var timesb = "⊠";
var times = "×";
var timesd = "⨰";
var tint = "∭";
var toea = "⤨";
var topbot = "⌶";
var topcir = "⫱";
var top = "⊤";
var Topf = "𝕋";
var topf = "𝕥";
var topfork = "⫚";
var tosa = "⤩";
var tprime = "‴";
var trade = "™";
var TRADE = "™";
var triangle = "▵";
var triangledown = "▿";
var triangleleft = "◃";
var trianglelefteq = "⊴";
var triangleq = "≜";
var triangleright = "▹";
var trianglerighteq = "⊵";
var tridot = "◬";
var trie = "≜";
var triminus = "⨺";
var TripleDot = "⃛";
var triplus = "⨹";
var trisb = "⧍";
var tritime = "⨻";
var trpezium = "⏢";
var Tscr = "𝒯";
var tscr = "𝓉";
var TScy = "Ц";
var tscy = "ц";
var TSHcy = "Ћ";
var tshcy = "ћ";
var Tstrok = "Ŧ";
var tstrok = "ŧ";
var twixt = "≬";
var twoheadleftarrow = "↞";
var twoheadrightarrow = "↠";
var Uacute = "Ú";
var uacute = "ú";
var uarr = "↑";
var Uarr = "↟";
var uArr = "⇑";
var Uarrocir = "⥉";
var Ubrcy = "Ў";
var ubrcy = "ў";
var Ubreve = "Ŭ";
var ubreve = "ŭ";
var Ucirc = "Û";
var ucirc = "û";
var Ucy = "У";
var ucy = "у";
var udarr = "⇅";
var Udblac = "Ű";
var udblac = "ű";
var udhar = "⥮";
var ufisht = "⥾";
var Ufr = "𝔘";
var ufr = "𝔲";
var Ugrave = "Ù";
var ugrave = "ù";
var uHar = "⥣";
var uharl = "↿";
var uharr = "↾";
var uhblk = "▀";
var ulcorn = "⌜";
var ulcorner = "⌜";
var ulcrop = "⌏";
var ultri = "◸";
var Umacr = "Ū";
var umacr = "ū";
var uml = "¨";
var UnderBar = "_";
var UnderBrace = "⏟";
var UnderBracket = "⎵";
var UnderParenthesis = "⏝";
var Union = "⋃";
var UnionPlus = "⊎";
var Uogon = "Ų";
var uogon = "ų";
var Uopf = "𝕌";
var uopf = "𝕦";
var UpArrowBar = "⤒";
var uparrow = "↑";
var UpArrow = "↑";
var Uparrow = "⇑";
var UpArrowDownArrow = "⇅";
var updownarrow = "↕";
var UpDownArrow = "↕";
var Updownarrow = "⇕";
var UpEquilibrium = "⥮";
var upharpoonleft = "↿";
var upharpoonright = "↾";
var uplus = "⊎";
var UpperLeftArrow = "↖";
var UpperRightArrow = "↗";
var upsi = "υ";
var Upsi = "ϒ";
var upsih = "ϒ";
var Upsilon = "Υ";
var upsilon = "υ";
var UpTeeArrow = "↥";
var UpTee = "⊥";
var upuparrows = "⇈";
var urcorn = "⌝";
var urcorner = "⌝";
var urcrop = "⌎";
var Uring = "Ů";
var uring = "ů";
var urtri = "◹";
var Uscr = "𝒰";
var uscr = "𝓊";
var utdot = "⋰";
var Utilde = "Ũ";
var utilde = "ũ";
var utri = "▵";
var utrif = "▴";
var uuarr = "⇈";
var Uuml = "Ü";
var uuml = "ü";
var uwangle = "⦧";
var vangrt = "⦜";
var varepsilon = "ϵ";
var varkappa = "ϰ";
var varnothing = "∅";
var varphi = "ϕ";
var varpi = "ϖ";
var varpropto = "∝";
var varr = "↕";
var vArr = "⇕";
var varrho = "ϱ";
var varsigma = "ς";
var varsubsetneq = "⊊︀";
var varsubsetneqq = "⫋︀";
var varsupsetneq = "⊋︀";
var varsupsetneqq = "⫌︀";
var vartheta = "ϑ";
var vartriangleleft = "⊲";
var vartriangleright = "⊳";
var vBar = "⫨";
var Vbar = "⫫";
var vBarv = "⫩";
var Vcy = "В";
var vcy = "в";
var vdash = "⊢";
var vDash = "⊨";
var Vdash = "⊩";
var VDash = "⊫";
var Vdashl = "⫦";
var veebar = "⊻";
var vee = "∨";
var Vee = "⋁";
var veeeq = "≚";
var vellip = "⋮";
var verbar = "|";
var Verbar = "‖";
var vert = "|";
var Vert = "‖";
var VerticalBar = "∣";
var VerticalLine = "|";
var VerticalSeparator = "❘";
var VerticalTilde = "≀";
var VeryThinSpace = " ";
var Vfr = "𝔙";
var vfr = "𝔳";
var vltri = "⊲";
var vnsub = "⊂⃒";
var vnsup = "⊃⃒";
var Vopf = "𝕍";
var vopf = "𝕧";
var vprop = "∝";
var vrtri = "⊳";
var Vscr = "𝒱";
var vscr = "𝓋";
var vsubnE = "⫋︀";
var vsubne = "⊊︀";
var vsupnE = "⫌︀";
var vsupne = "⊋︀";
var Vvdash = "⊪";
var vzigzag = "⦚";
var Wcirc = "Ŵ";
var wcirc = "ŵ";
var wedbar = "⩟";
var wedge = "∧";
var Wedge = "⋀";
var wedgeq = "≙";
var weierp = "℘";
var Wfr = "𝔚";
var wfr = "𝔴";
var Wopf = "𝕎";
var wopf = "𝕨";
var wp = "℘";
var wr = "≀";
var wreath = "≀";
var Wscr = "𝒲";
var wscr = "𝓌";
var xcap = "⋂";
var xcirc = "◯";
var xcup = "⋃";
var xdtri = "▽";
var Xfr = "𝔛";
var xfr = "𝔵";
var xharr = "⟷";
var xhArr = "⟺";
var Xi = "Ξ";
var xi = "ξ";
var xlarr = "⟵";
var xlArr = "⟸";
var xmap = "⟼";
var xnis = "⋻";
var xodot = "⨀";
var Xopf = "𝕏";
var xopf = "𝕩";
var xoplus = "⨁";
var xotime = "⨂";
var xrarr = "⟶";
var xrArr = "⟹";
var Xscr = "𝒳";
var xscr = "𝓍";
var xsqcup = "⨆";
var xuplus = "⨄";
var xutri = "△";
var xvee = "⋁";
var xwedge = "⋀";
var Yacute = "Ý";
var yacute = "ý";
var YAcy = "Я";
var yacy = "я";
var Ycirc = "Ŷ";
var ycirc = "ŷ";
var Ycy = "Ы";
var ycy = "ы";
var yen = "¥";
var Yfr = "𝔜";
var yfr = "𝔶";
var YIcy = "Ї";
var yicy = "ї";
var Yopf = "𝕐";
var yopf = "𝕪";
var Yscr = "𝒴";
var yscr = "𝓎";
var YUcy = "Ю";
var yucy = "ю";
var yuml = "ÿ";
var Yuml = "Ÿ";
var Zacute = "Ź";
var zacute = "ź";
var Zcaron = "Ž";
var zcaron = "ž";
var Zcy = "З";
var zcy = "з";
var Zdot = "Ż";
var zdot = "ż";
var zeetrf = "ℨ";
var ZeroWidthSpace = "​";
var Zeta = "Ζ";
var zeta = "ζ";
var zfr = "𝔷";
var Zfr = "ℨ";
var ZHcy = "Ж";
var zhcy = "ж";
var zigrarr = "⇝";
var zopf = "𝕫";
var Zopf = "ℤ";
var Zscr = "𝒵";
var zscr = "𝓏";
var zwj = "‍";
var zwnj = "‌";
var entities = {
	Aacute: Aacute,
	aacute: aacute,
	Abreve: Abreve,
	abreve: abreve,
	ac: ac,
	acd: acd,
	acE: acE,
	Acirc: Acirc,
	acirc: acirc,
	acute: acute,
	Acy: Acy,
	acy: acy,
	AElig: AElig,
	aelig: aelig,
	af: af,
	Afr: Afr,
	afr: afr,
	Agrave: Agrave,
	agrave: agrave,
	alefsym: alefsym,
	aleph: aleph,
	Alpha: Alpha,
	alpha: alpha,
	Amacr: Amacr,
	amacr: amacr,
	amalg: amalg,
	amp: amp,
	AMP: AMP,
	andand: andand,
	And: And,
	and: and,
	andd: andd,
	andslope: andslope,
	andv: andv,
	ang: ang,
	ange: ange,
	angle: angle,
	angmsdaa: angmsdaa,
	angmsdab: angmsdab,
	angmsdac: angmsdac,
	angmsdad: angmsdad,
	angmsdae: angmsdae,
	angmsdaf: angmsdaf,
	angmsdag: angmsdag,
	angmsdah: angmsdah,
	angmsd: angmsd,
	angrt: angrt,
	angrtvb: angrtvb,
	angrtvbd: angrtvbd,
	angsph: angsph,
	angst: angst,
	angzarr: angzarr,
	Aogon: Aogon,
	aogon: aogon,
	Aopf: Aopf,
	aopf: aopf,
	apacir: apacir,
	ap: ap,
	apE: apE,
	ape: ape,
	apid: apid,
	apos: apos,
	ApplyFunction: ApplyFunction,
	approx: approx,
	approxeq: approxeq,
	Aring: Aring,
	aring: aring,
	Ascr: Ascr,
	ascr: ascr,
	Assign: Assign,
	ast: ast,
	asymp: asymp,
	asympeq: asympeq,
	Atilde: Atilde,
	atilde: atilde,
	Auml: Auml,
	auml: auml,
	awconint: awconint,
	awint: awint,
	backcong: backcong,
	backepsilon: backepsilon,
	backprime: backprime,
	backsim: backsim,
	backsimeq: backsimeq,
	Backslash: Backslash,
	Barv: Barv,
	barvee: barvee,
	barwed: barwed,
	Barwed: Barwed,
	barwedge: barwedge,
	bbrk: bbrk,
	bbrktbrk: bbrktbrk,
	bcong: bcong,
	Bcy: Bcy,
	bcy: bcy,
	bdquo: bdquo,
	becaus: becaus,
	because: because,
	Because: Because,
	bemptyv: bemptyv,
	bepsi: bepsi,
	bernou: bernou,
	Bernoullis: Bernoullis,
	Beta: Beta,
	beta: beta,
	beth: beth,
	between: between,
	Bfr: Bfr,
	bfr: bfr,
	bigcap: bigcap,
	bigcirc: bigcirc,
	bigcup: bigcup,
	bigodot: bigodot,
	bigoplus: bigoplus,
	bigotimes: bigotimes,
	bigsqcup: bigsqcup,
	bigstar: bigstar,
	bigtriangledown: bigtriangledown,
	bigtriangleup: bigtriangleup,
	biguplus: biguplus,
	bigvee: bigvee,
	bigwedge: bigwedge,
	bkarow: bkarow,
	blacklozenge: blacklozenge,
	blacksquare: blacksquare,
	blacktriangle: blacktriangle,
	blacktriangledown: blacktriangledown,
	blacktriangleleft: blacktriangleleft,
	blacktriangleright: blacktriangleright,
	blank: blank,
	blk12: blk12,
	blk14: blk14,
	blk34: blk34,
	block: block,
	bne: bne,
	bnequiv: bnequiv,
	bNot: bNot,
	bnot: bnot,
	Bopf: Bopf,
	bopf: bopf,
	bot: bot,
	bottom: bottom,
	bowtie: bowtie,
	boxbox: boxbox,
	boxdl: boxdl,
	boxdL: boxdL,
	boxDl: boxDl,
	boxDL: boxDL,
	boxdr: boxdr,
	boxdR: boxdR,
	boxDr: boxDr,
	boxDR: boxDR,
	boxh: boxh,
	boxH: boxH,
	boxhd: boxhd,
	boxHd: boxHd,
	boxhD: boxhD,
	boxHD: boxHD,
	boxhu: boxhu,
	boxHu: boxHu,
	boxhU: boxhU,
	boxHU: boxHU,
	boxminus: boxminus,
	boxplus: boxplus,
	boxtimes: boxtimes,
	boxul: boxul,
	boxuL: boxuL,
	boxUl: boxUl,
	boxUL: boxUL,
	boxur: boxur,
	boxuR: boxuR,
	boxUr: boxUr,
	boxUR: boxUR,
	boxv: boxv,
	boxV: boxV,
	boxvh: boxvh,
	boxvH: boxvH,
	boxVh: boxVh,
	boxVH: boxVH,
	boxvl: boxvl,
	boxvL: boxvL,
	boxVl: boxVl,
	boxVL: boxVL,
	boxvr: boxvr,
	boxvR: boxvR,
	boxVr: boxVr,
	boxVR: boxVR,
	bprime: bprime,
	breve: breve,
	Breve: Breve,
	brvbar: brvbar,
	bscr: bscr,
	Bscr: Bscr,
	bsemi: bsemi,
	bsim: bsim,
	bsime: bsime,
	bsolb: bsolb,
	bsol: bsol,
	bsolhsub: bsolhsub,
	bull: bull,
	bullet: bullet,
	bump: bump,
	bumpE: bumpE,
	bumpe: bumpe,
	Bumpeq: Bumpeq,
	bumpeq: bumpeq,
	Cacute: Cacute,
	cacute: cacute,
	capand: capand,
	capbrcup: capbrcup,
	capcap: capcap,
	cap: cap,
	Cap: Cap,
	capcup: capcup,
	capdot: capdot,
	CapitalDifferentialD: CapitalDifferentialD,
	caps: caps,
	caret: caret,
	caron: caron,
	Cayleys: Cayleys,
	ccaps: ccaps,
	Ccaron: Ccaron,
	ccaron: ccaron,
	Ccedil: Ccedil,
	ccedil: ccedil,
	Ccirc: Ccirc,
	ccirc: ccirc,
	Cconint: Cconint,
	ccups: ccups,
	ccupssm: ccupssm,
	Cdot: Cdot,
	cdot: cdot,
	cedil: cedil,
	Cedilla: Cedilla,
	cemptyv: cemptyv,
	cent: cent,
	centerdot: centerdot,
	CenterDot: CenterDot,
	cfr: cfr,
	Cfr: Cfr,
	CHcy: CHcy,
	chcy: chcy,
	check: check,
	checkmark: checkmark,
	Chi: Chi,
	chi: chi,
	circ: circ,
	circeq: circeq,
	circlearrowleft: circlearrowleft,
	circlearrowright: circlearrowright,
	circledast: circledast,
	circledcirc: circledcirc,
	circleddash: circleddash,
	CircleDot: CircleDot,
	circledR: circledR,
	circledS: circledS,
	CircleMinus: CircleMinus,
	CirclePlus: CirclePlus,
	CircleTimes: CircleTimes,
	cir: cir,
	cirE: cirE,
	cire: cire,
	cirfnint: cirfnint,
	cirmid: cirmid,
	cirscir: cirscir,
	ClockwiseContourIntegral: ClockwiseContourIntegral,
	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
	CloseCurlyQuote: CloseCurlyQuote,
	clubs: clubs,
	clubsuit: clubsuit,
	colon: colon,
	Colon: Colon,
	Colone: Colone,
	colone: colone,
	coloneq: coloneq,
	comma: comma,
	commat: commat,
	comp: comp,
	compfn: compfn,
	complement: complement,
	complexes: complexes,
	cong: cong,
	congdot: congdot,
	Congruent: Congruent,
	conint: conint,
	Conint: Conint,
	ContourIntegral: ContourIntegral,
	copf: copf,
	Copf: Copf,
	coprod: coprod,
	Coproduct: Coproduct,
	copy: copy,
	COPY: COPY,
	copysr: copysr,
	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
	crarr: crarr,
	cross: cross,
	Cross: Cross,
	Cscr: Cscr,
	cscr: cscr,
	csub: csub,
	csube: csube,
	csup: csup,
	csupe: csupe,
	ctdot: ctdot,
	cudarrl: cudarrl,
	cudarrr: cudarrr,
	cuepr: cuepr,
	cuesc: cuesc,
	cularr: cularr,
	cularrp: cularrp,
	cupbrcap: cupbrcap,
	cupcap: cupcap,
	CupCap: CupCap,
	cup: cup,
	Cup: Cup,
	cupcup: cupcup,
	cupdot: cupdot,
	cupor: cupor,
	cups: cups,
	curarr: curarr,
	curarrm: curarrm,
	curlyeqprec: curlyeqprec,
	curlyeqsucc: curlyeqsucc,
	curlyvee: curlyvee,
	curlywedge: curlywedge,
	curren: curren,
	curvearrowleft: curvearrowleft,
	curvearrowright: curvearrowright,
	cuvee: cuvee,
	cuwed: cuwed,
	cwconint: cwconint,
	cwint: cwint,
	cylcty: cylcty,
	dagger: dagger,
	Dagger: Dagger,
	daleth: daleth,
	darr: darr,
	Darr: Darr,
	dArr: dArr,
	dash: dash,
	Dashv: Dashv,
	dashv: dashv,
	dbkarow: dbkarow,
	dblac: dblac,
	Dcaron: Dcaron,
	dcaron: dcaron,
	Dcy: Dcy,
	dcy: dcy,
	ddagger: ddagger,
	ddarr: ddarr,
	DD: DD,
	dd: dd,
	DDotrahd: DDotrahd,
	ddotseq: ddotseq,
	deg: deg,
	Del: Del,
	Delta: Delta,
	delta: delta,
	demptyv: demptyv,
	dfisht: dfisht,
	Dfr: Dfr,
	dfr: dfr,
	dHar: dHar,
	dharl: dharl,
	dharr: dharr,
	DiacriticalAcute: DiacriticalAcute,
	DiacriticalDot: DiacriticalDot,
	DiacriticalDoubleAcute: DiacriticalDoubleAcute,
	DiacriticalGrave: DiacriticalGrave,
	DiacriticalTilde: DiacriticalTilde,
	diam: diam,
	diamond: diamond,
	Diamond: Diamond,
	diamondsuit: diamondsuit,
	diams: diams,
	die: die,
	DifferentialD: DifferentialD,
	digamma: digamma,
	disin: disin,
	div: div,
	divide: divide,
	divideontimes: divideontimes,
	divonx: divonx,
	DJcy: DJcy,
	djcy: djcy,
	dlcorn: dlcorn,
	dlcrop: dlcrop,
	dollar: dollar,
	Dopf: Dopf,
	dopf: dopf,
	Dot: Dot,
	dot: dot,
	DotDot: DotDot,
	doteq: doteq,
	doteqdot: doteqdot,
	DotEqual: DotEqual,
	dotminus: dotminus,
	dotplus: dotplus,
	dotsquare: dotsquare,
	doublebarwedge: doublebarwedge,
	DoubleContourIntegral: DoubleContourIntegral,
	DoubleDot: DoubleDot,
	DoubleDownArrow: DoubleDownArrow,
	DoubleLeftArrow: DoubleLeftArrow,
	DoubleLeftRightArrow: DoubleLeftRightArrow,
	DoubleLeftTee: DoubleLeftTee,
	DoubleLongLeftArrow: DoubleLongLeftArrow,
	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
	DoubleLongRightArrow: DoubleLongRightArrow,
	DoubleRightArrow: DoubleRightArrow,
	DoubleRightTee: DoubleRightTee,
	DoubleUpArrow: DoubleUpArrow,
	DoubleUpDownArrow: DoubleUpDownArrow,
	DoubleVerticalBar: DoubleVerticalBar,
	DownArrowBar: DownArrowBar,
	downarrow: downarrow,
	DownArrow: DownArrow,
	Downarrow: Downarrow,
	DownArrowUpArrow: DownArrowUpArrow,
	DownBreve: DownBreve,
	downdownarrows: downdownarrows,
	downharpoonleft: downharpoonleft,
	downharpoonright: downharpoonright,
	DownLeftRightVector: DownLeftRightVector,
	DownLeftTeeVector: DownLeftTeeVector,
	DownLeftVectorBar: DownLeftVectorBar,
	DownLeftVector: DownLeftVector,
	DownRightTeeVector: DownRightTeeVector,
	DownRightVectorBar: DownRightVectorBar,
	DownRightVector: DownRightVector,
	DownTeeArrow: DownTeeArrow,
	DownTee: DownTee,
	drbkarow: drbkarow,
	drcorn: drcorn,
	drcrop: drcrop,
	Dscr: Dscr,
	dscr: dscr,
	DScy: DScy,
	dscy: dscy,
	dsol: dsol,
	Dstrok: Dstrok,
	dstrok: dstrok,
	dtdot: dtdot,
	dtri: dtri,
	dtrif: dtrif,
	duarr: duarr,
	duhar: duhar,
	dwangle: dwangle,
	DZcy: DZcy,
	dzcy: dzcy,
	dzigrarr: dzigrarr,
	Eacute: Eacute,
	eacute: eacute,
	easter: easter,
	Ecaron: Ecaron,
	ecaron: ecaron,
	Ecirc: Ecirc,
	ecirc: ecirc,
	ecir: ecir,
	ecolon: ecolon,
	Ecy: Ecy,
	ecy: ecy,
	eDDot: eDDot,
	Edot: Edot,
	edot: edot,
	eDot: eDot,
	ee: ee,
	efDot: efDot,
	Efr: Efr,
	efr: efr,
	eg: eg,
	Egrave: Egrave,
	egrave: egrave,
	egs: egs,
	egsdot: egsdot,
	el: el,
	Element: Element,
	elinters: elinters,
	ell: ell,
	els: els,
	elsdot: elsdot,
	Emacr: Emacr,
	emacr: emacr,
	empty: empty,
	emptyset: emptyset,
	EmptySmallSquare: EmptySmallSquare,
	emptyv: emptyv,
	EmptyVerySmallSquare: EmptyVerySmallSquare,
	emsp13: emsp13,
	emsp14: emsp14,
	emsp: emsp,
	ENG: ENG,
	eng: eng,
	ensp: ensp,
	Eogon: Eogon,
	eogon: eogon,
	Eopf: Eopf,
	eopf: eopf,
	epar: epar,
	eparsl: eparsl,
	eplus: eplus,
	epsi: epsi,
	Epsilon: Epsilon,
	epsilon: epsilon,
	epsiv: epsiv,
	eqcirc: eqcirc,
	eqcolon: eqcolon,
	eqsim: eqsim,
	eqslantgtr: eqslantgtr,
	eqslantless: eqslantless,
	Equal: Equal,
	equals: equals,
	EqualTilde: EqualTilde,
	equest: equest,
	Equilibrium: Equilibrium,
	equiv: equiv,
	equivDD: equivDD,
	eqvparsl: eqvparsl,
	erarr: erarr,
	erDot: erDot,
	escr: escr,
	Escr: Escr,
	esdot: esdot,
	Esim: Esim,
	esim: esim,
	Eta: Eta,
	eta: eta,
	ETH: ETH,
	eth: eth,
	Euml: Euml,
	euml: euml,
	euro: euro,
	excl: excl,
	exist: exist,
	Exists: Exists,
	expectation: expectation,
	exponentiale: exponentiale,
	ExponentialE: ExponentialE,
	fallingdotseq: fallingdotseq,
	Fcy: Fcy,
	fcy: fcy,
	female: female,
	ffilig: ffilig,
	fflig: fflig,
	ffllig: ffllig,
	Ffr: Ffr,
	ffr: ffr,
	filig: filig,
	FilledSmallSquare: FilledSmallSquare,
	FilledVerySmallSquare: FilledVerySmallSquare,
	fjlig: fjlig,
	flat: flat,
	fllig: fllig,
	fltns: fltns,
	fnof: fnof,
	Fopf: Fopf,
	fopf: fopf,
	forall: forall,
	ForAll: ForAll,
	fork: fork,
	forkv: forkv,
	Fouriertrf: Fouriertrf,
	fpartint: fpartint,
	frac12: frac12,
	frac13: frac13,
	frac14: frac14,
	frac15: frac15,
	frac16: frac16,
	frac18: frac18,
	frac23: frac23,
	frac25: frac25,
	frac34: frac34,
	frac35: frac35,
	frac38: frac38,
	frac45: frac45,
	frac56: frac56,
	frac58: frac58,
	frac78: frac78,
	frasl: frasl,
	frown: frown,
	fscr: fscr,
	Fscr: Fscr,
	gacute: gacute,
	Gamma: Gamma,
	gamma: gamma,
	Gammad: Gammad,
	gammad: gammad,
	gap: gap,
	Gbreve: Gbreve,
	gbreve: gbreve,
	Gcedil: Gcedil,
	Gcirc: Gcirc,
	gcirc: gcirc,
	Gcy: Gcy,
	gcy: gcy,
	Gdot: Gdot,
	gdot: gdot,
	ge: ge,
	gE: gE,
	gEl: gEl,
	gel: gel,
	geq: geq,
	geqq: geqq,
	geqslant: geqslant,
	gescc: gescc,
	ges: ges,
	gesdot: gesdot,
	gesdoto: gesdoto,
	gesdotol: gesdotol,
	gesl: gesl,
	gesles: gesles,
	Gfr: Gfr,
	gfr: gfr,
	gg: gg,
	Gg: Gg,
	ggg: ggg,
	gimel: gimel,
	GJcy: GJcy,
	gjcy: gjcy,
	gla: gla,
	gl: gl,
	glE: glE,
	glj: glj,
	gnap: gnap,
	gnapprox: gnapprox,
	gne: gne,
	gnE: gnE,
	gneq: gneq,
	gneqq: gneqq,
	gnsim: gnsim,
	Gopf: Gopf,
	gopf: gopf,
	grave: grave,
	GreaterEqual: GreaterEqual,
	GreaterEqualLess: GreaterEqualLess,
	GreaterFullEqual: GreaterFullEqual,
	GreaterGreater: GreaterGreater,
	GreaterLess: GreaterLess,
	GreaterSlantEqual: GreaterSlantEqual,
	GreaterTilde: GreaterTilde,
	Gscr: Gscr,
	gscr: gscr,
	gsim: gsim,
	gsime: gsime,
	gsiml: gsiml,
	gtcc: gtcc,
	gtcir: gtcir,
	gt: gt,
	GT: GT,
	Gt: Gt,
	gtdot: gtdot,
	gtlPar: gtlPar,
	gtquest: gtquest,
	gtrapprox: gtrapprox,
	gtrarr: gtrarr,
	gtrdot: gtrdot,
	gtreqless: gtreqless,
	gtreqqless: gtreqqless,
	gtrless: gtrless,
	gtrsim: gtrsim,
	gvertneqq: gvertneqq,
	gvnE: gvnE,
	Hacek: Hacek,
	hairsp: hairsp,
	half: half,
	hamilt: hamilt,
	HARDcy: HARDcy,
	hardcy: hardcy,
	harrcir: harrcir,
	harr: harr,
	hArr: hArr,
	harrw: harrw,
	Hat: Hat,
	hbar: hbar,
	Hcirc: Hcirc,
	hcirc: hcirc,
	hearts: hearts,
	heartsuit: heartsuit,
	hellip: hellip,
	hercon: hercon,
	hfr: hfr,
	Hfr: Hfr,
	HilbertSpace: HilbertSpace,
	hksearow: hksearow,
	hkswarow: hkswarow,
	hoarr: hoarr,
	homtht: homtht,
	hookleftarrow: hookleftarrow,
	hookrightarrow: hookrightarrow,
	hopf: hopf,
	Hopf: Hopf,
	horbar: horbar,
	HorizontalLine: HorizontalLine,
	hscr: hscr,
	Hscr: Hscr,
	hslash: hslash,
	Hstrok: Hstrok,
	hstrok: hstrok,
	HumpDownHump: HumpDownHump,
	HumpEqual: HumpEqual,
	hybull: hybull,
	hyphen: hyphen,
	Iacute: Iacute,
	iacute: iacute,
	ic: ic,
	Icirc: Icirc,
	icirc: icirc,
	Icy: Icy,
	icy: icy,
	Idot: Idot,
	IEcy: IEcy,
	iecy: iecy,
	iexcl: iexcl,
	iff: iff,
	ifr: ifr,
	Ifr: Ifr,
	Igrave: Igrave,
	igrave: igrave,
	ii: ii,
	iiiint: iiiint,
	iiint: iiint,
	iinfin: iinfin,
	iiota: iiota,
	IJlig: IJlig,
	ijlig: ijlig,
	Imacr: Imacr,
	imacr: imacr,
	image: image,
	ImaginaryI: ImaginaryI,
	imagline: imagline,
	imagpart: imagpart,
	imath: imath,
	Im: Im,
	imof: imof,
	imped: imped,
	Implies: Implies,
	incare: incare,
	"in": "∈",
	infin: infin,
	infintie: infintie,
	inodot: inodot,
	intcal: intcal,
	int: int,
	Int: Int,
	integers: integers,
	Integral: Integral,
	intercal: intercal,
	Intersection: Intersection,
	intlarhk: intlarhk,
	intprod: intprod,
	InvisibleComma: InvisibleComma,
	InvisibleTimes: InvisibleTimes,
	IOcy: IOcy,
	iocy: iocy,
	Iogon: Iogon,
	iogon: iogon,
	Iopf: Iopf,
	iopf: iopf,
	Iota: Iota,
	iota: iota,
	iprod: iprod,
	iquest: iquest,
	iscr: iscr,
	Iscr: Iscr,
	isin: isin,
	isindot: isindot,
	isinE: isinE,
	isins: isins,
	isinsv: isinsv,
	isinv: isinv,
	it: it,
	Itilde: Itilde,
	itilde: itilde,
	Iukcy: Iukcy,
	iukcy: iukcy,
	Iuml: Iuml,
	iuml: iuml,
	Jcirc: Jcirc,
	jcirc: jcirc,
	Jcy: Jcy,
	jcy: jcy,
	Jfr: Jfr,
	jfr: jfr,
	jmath: jmath,
	Jopf: Jopf,
	jopf: jopf,
	Jscr: Jscr,
	jscr: jscr,
	Jsercy: Jsercy,
	jsercy: jsercy,
	Jukcy: Jukcy,
	jukcy: jukcy,
	Kappa: Kappa,
	kappa: kappa,
	kappav: kappav,
	Kcedil: Kcedil,
	kcedil: kcedil,
	Kcy: Kcy,
	kcy: kcy,
	Kfr: Kfr,
	kfr: kfr,
	kgreen: kgreen,
	KHcy: KHcy,
	khcy: khcy,
	KJcy: KJcy,
	kjcy: kjcy,
	Kopf: Kopf,
	kopf: kopf,
	Kscr: Kscr,
	kscr: kscr,
	lAarr: lAarr,
	Lacute: Lacute,
	lacute: lacute,
	laemptyv: laemptyv,
	lagran: lagran,
	Lambda: Lambda,
	lambda: lambda,
	lang: lang,
	Lang: Lang,
	langd: langd,
	langle: langle,
	lap: lap,
	Laplacetrf: Laplacetrf,
	laquo: laquo,
	larrb: larrb,
	larrbfs: larrbfs,
	larr: larr,
	Larr: Larr,
	lArr: lArr,
	larrfs: larrfs,
	larrhk: larrhk,
	larrlp: larrlp,
	larrpl: larrpl,
	larrsim: larrsim,
	larrtl: larrtl,
	latail: latail,
	lAtail: lAtail,
	lat: lat,
	late: late,
	lates: lates,
	lbarr: lbarr,
	lBarr: lBarr,
	lbbrk: lbbrk,
	lbrace: lbrace,
	lbrack: lbrack,
	lbrke: lbrke,
	lbrksld: lbrksld,
	lbrkslu: lbrkslu,
	Lcaron: Lcaron,
	lcaron: lcaron,
	Lcedil: Lcedil,
	lcedil: lcedil,
	lceil: lceil,
	lcub: lcub,
	Lcy: Lcy,
	lcy: lcy,
	ldca: ldca,
	ldquo: ldquo,
	ldquor: ldquor,
	ldrdhar: ldrdhar,
	ldrushar: ldrushar,
	ldsh: ldsh,
	le: le,
	lE: lE,
	LeftAngleBracket: LeftAngleBracket,
	LeftArrowBar: LeftArrowBar,
	leftarrow: leftarrow,
	LeftArrow: LeftArrow,
	Leftarrow: Leftarrow,
	LeftArrowRightArrow: LeftArrowRightArrow,
	leftarrowtail: leftarrowtail,
	LeftCeiling: LeftCeiling,
	LeftDoubleBracket: LeftDoubleBracket,
	LeftDownTeeVector: LeftDownTeeVector,
	LeftDownVectorBar: LeftDownVectorBar,
	LeftDownVector: LeftDownVector,
	LeftFloor: LeftFloor,
	leftharpoondown: leftharpoondown,
	leftharpoonup: leftharpoonup,
	leftleftarrows: leftleftarrows,
	leftrightarrow: leftrightarrow,
	LeftRightArrow: LeftRightArrow,
	Leftrightarrow: Leftrightarrow,
	leftrightarrows: leftrightarrows,
	leftrightharpoons: leftrightharpoons,
	leftrightsquigarrow: leftrightsquigarrow,
	LeftRightVector: LeftRightVector,
	LeftTeeArrow: LeftTeeArrow,
	LeftTee: LeftTee,
	LeftTeeVector: LeftTeeVector,
	leftthreetimes: leftthreetimes,
	LeftTriangleBar: LeftTriangleBar,
	LeftTriangle: LeftTriangle,
	LeftTriangleEqual: LeftTriangleEqual,
	LeftUpDownVector: LeftUpDownVector,
	LeftUpTeeVector: LeftUpTeeVector,
	LeftUpVectorBar: LeftUpVectorBar,
	LeftUpVector: LeftUpVector,
	LeftVectorBar: LeftVectorBar,
	LeftVector: LeftVector,
	lEg: lEg,
	leg: leg,
	leq: leq,
	leqq: leqq,
	leqslant: leqslant,
	lescc: lescc,
	les: les,
	lesdot: lesdot,
	lesdoto: lesdoto,
	lesdotor: lesdotor,
	lesg: lesg,
	lesges: lesges,
	lessapprox: lessapprox,
	lessdot: lessdot,
	lesseqgtr: lesseqgtr,
	lesseqqgtr: lesseqqgtr,
	LessEqualGreater: LessEqualGreater,
	LessFullEqual: LessFullEqual,
	LessGreater: LessGreater,
	lessgtr: lessgtr,
	LessLess: LessLess,
	lesssim: lesssim,
	LessSlantEqual: LessSlantEqual,
	LessTilde: LessTilde,
	lfisht: lfisht,
	lfloor: lfloor,
	Lfr: Lfr,
	lfr: lfr,
	lg: lg,
	lgE: lgE,
	lHar: lHar,
	lhard: lhard,
	lharu: lharu,
	lharul: lharul,
	lhblk: lhblk,
	LJcy: LJcy,
	ljcy: ljcy,
	llarr: llarr,
	ll: ll,
	Ll: Ll,
	llcorner: llcorner,
	Lleftarrow: Lleftarrow,
	llhard: llhard,
	lltri: lltri,
	Lmidot: Lmidot,
	lmidot: lmidot,
	lmoustache: lmoustache,
	lmoust: lmoust,
	lnap: lnap,
	lnapprox: lnapprox,
	lne: lne,
	lnE: lnE,
	lneq: lneq,
	lneqq: lneqq,
	lnsim: lnsim,
	loang: loang,
	loarr: loarr,
	lobrk: lobrk,
	longleftarrow: longleftarrow,
	LongLeftArrow: LongLeftArrow,
	Longleftarrow: Longleftarrow,
	longleftrightarrow: longleftrightarrow,
	LongLeftRightArrow: LongLeftRightArrow,
	Longleftrightarrow: Longleftrightarrow,
	longmapsto: longmapsto,
	longrightarrow: longrightarrow,
	LongRightArrow: LongRightArrow,
	Longrightarrow: Longrightarrow,
	looparrowleft: looparrowleft,
	looparrowright: looparrowright,
	lopar: lopar,
	Lopf: Lopf,
	lopf: lopf,
	loplus: loplus,
	lotimes: lotimes,
	lowast: lowast,
	lowbar: lowbar,
	LowerLeftArrow: LowerLeftArrow,
	LowerRightArrow: LowerRightArrow,
	loz: loz,
	lozenge: lozenge,
	lozf: lozf,
	lpar: lpar,
	lparlt: lparlt,
	lrarr: lrarr,
	lrcorner: lrcorner,
	lrhar: lrhar,
	lrhard: lrhard,
	lrm: lrm,
	lrtri: lrtri,
	lsaquo: lsaquo,
	lscr: lscr,
	Lscr: Lscr,
	lsh: lsh,
	Lsh: Lsh,
	lsim: lsim,
	lsime: lsime,
	lsimg: lsimg,
	lsqb: lsqb,
	lsquo: lsquo,
	lsquor: lsquor,
	Lstrok: Lstrok,
	lstrok: lstrok,
	ltcc: ltcc,
	ltcir: ltcir,
	lt: lt,
	LT: LT,
	Lt: Lt,
	ltdot: ltdot,
	lthree: lthree,
	ltimes: ltimes,
	ltlarr: ltlarr,
	ltquest: ltquest,
	ltri: ltri,
	ltrie: ltrie,
	ltrif: ltrif,
	ltrPar: ltrPar,
	lurdshar: lurdshar,
	luruhar: luruhar,
	lvertneqq: lvertneqq,
	lvnE: lvnE,
	macr: macr,
	male: male,
	malt: malt,
	maltese: maltese,
	"Map": "⤅",
	map: map,
	mapsto: mapsto,
	mapstodown: mapstodown,
	mapstoleft: mapstoleft,
	mapstoup: mapstoup,
	marker: marker,
	mcomma: mcomma,
	Mcy: Mcy,
	mcy: mcy,
	mdash: mdash,
	mDDot: mDDot,
	measuredangle: measuredangle,
	MediumSpace: MediumSpace,
	Mellintrf: Mellintrf,
	Mfr: Mfr,
	mfr: mfr,
	mho: mho,
	micro: micro,
	midast: midast,
	midcir: midcir,
	mid: mid,
	middot: middot,
	minusb: minusb,
	minus: minus,
	minusd: minusd,
	minusdu: minusdu,
	MinusPlus: MinusPlus,
	mlcp: mlcp,
	mldr: mldr,
	mnplus: mnplus,
	models: models,
	Mopf: Mopf,
	mopf: mopf,
	mp: mp,
	mscr: mscr,
	Mscr: Mscr,
	mstpos: mstpos,
	Mu: Mu,
	mu: mu,
	multimap: multimap,
	mumap: mumap,
	nabla: nabla,
	Nacute: Nacute,
	nacute: nacute,
	nang: nang,
	nap: nap,
	napE: napE,
	napid: napid,
	napos: napos,
	napprox: napprox,
	natural: natural,
	naturals: naturals,
	natur: natur,
	nbsp: nbsp,
	nbump: nbump,
	nbumpe: nbumpe,
	ncap: ncap,
	Ncaron: Ncaron,
	ncaron: ncaron,
	Ncedil: Ncedil,
	ncedil: ncedil,
	ncong: ncong,
	ncongdot: ncongdot,
	ncup: ncup,
	Ncy: Ncy,
	ncy: ncy,
	ndash: ndash,
	nearhk: nearhk,
	nearr: nearr,
	neArr: neArr,
	nearrow: nearrow,
	ne: ne,
	nedot: nedot,
	NegativeMediumSpace: NegativeMediumSpace,
	NegativeThickSpace: NegativeThickSpace,
	NegativeThinSpace: NegativeThinSpace,
	NegativeVeryThinSpace: NegativeVeryThinSpace,
	nequiv: nequiv,
	nesear: nesear,
	nesim: nesim,
	NestedGreaterGreater: NestedGreaterGreater,
	NestedLessLess: NestedLessLess,
	NewLine: NewLine,
	nexist: nexist,
	nexists: nexists,
	Nfr: Nfr,
	nfr: nfr,
	ngE: ngE,
	nge: nge,
	ngeq: ngeq,
	ngeqq: ngeqq,
	ngeqslant: ngeqslant,
	nges: nges,
	nGg: nGg,
	ngsim: ngsim,
	nGt: nGt,
	ngt: ngt,
	ngtr: ngtr,
	nGtv: nGtv,
	nharr: nharr,
	nhArr: nhArr,
	nhpar: nhpar,
	ni: ni,
	nis: nis,
	nisd: nisd,
	niv: niv,
	NJcy: NJcy,
	njcy: njcy,
	nlarr: nlarr,
	nlArr: nlArr,
	nldr: nldr,
	nlE: nlE,
	nle: nle,
	nleftarrow: nleftarrow,
	nLeftarrow: nLeftarrow,
	nleftrightarrow: nleftrightarrow,
	nLeftrightarrow: nLeftrightarrow,
	nleq: nleq,
	nleqq: nleqq,
	nleqslant: nleqslant,
	nles: nles,
	nless: nless,
	nLl: nLl,
	nlsim: nlsim,
	nLt: nLt,
	nlt: nlt,
	nltri: nltri,
	nltrie: nltrie,
	nLtv: nLtv,
	nmid: nmid,
	NoBreak: NoBreak,
	NonBreakingSpace: NonBreakingSpace,
	nopf: nopf,
	Nopf: Nopf,
	Not: Not,
	not: not,
	NotCongruent: NotCongruent,
	NotCupCap: NotCupCap,
	NotDoubleVerticalBar: NotDoubleVerticalBar,
	NotElement: NotElement,
	NotEqual: NotEqual,
	NotEqualTilde: NotEqualTilde,
	NotExists: NotExists,
	NotGreater: NotGreater,
	NotGreaterEqual: NotGreaterEqual,
	NotGreaterFullEqual: NotGreaterFullEqual,
	NotGreaterGreater: NotGreaterGreater,
	NotGreaterLess: NotGreaterLess,
	NotGreaterSlantEqual: NotGreaterSlantEqual,
	NotGreaterTilde: NotGreaterTilde,
	NotHumpDownHump: NotHumpDownHump,
	NotHumpEqual: NotHumpEqual,
	notin: notin,
	notindot: notindot,
	notinE: notinE,
	notinva: notinva,
	notinvb: notinvb,
	notinvc: notinvc,
	NotLeftTriangleBar: NotLeftTriangleBar,
	NotLeftTriangle: NotLeftTriangle,
	NotLeftTriangleEqual: NotLeftTriangleEqual,
	NotLess: NotLess,
	NotLessEqual: NotLessEqual,
	NotLessGreater: NotLessGreater,
	NotLessLess: NotLessLess,
	NotLessSlantEqual: NotLessSlantEqual,
	NotLessTilde: NotLessTilde,
	NotNestedGreaterGreater: NotNestedGreaterGreater,
	NotNestedLessLess: NotNestedLessLess,
	notni: notni,
	notniva: notniva,
	notnivb: notnivb,
	notnivc: notnivc,
	NotPrecedes: NotPrecedes,
	NotPrecedesEqual: NotPrecedesEqual,
	NotPrecedesSlantEqual: NotPrecedesSlantEqual,
	NotReverseElement: NotReverseElement,
	NotRightTriangleBar: NotRightTriangleBar,
	NotRightTriangle: NotRightTriangle,
	NotRightTriangleEqual: NotRightTriangleEqual,
	NotSquareSubset: NotSquareSubset,
	NotSquareSubsetEqual: NotSquareSubsetEqual,
	NotSquareSuperset: NotSquareSuperset,
	NotSquareSupersetEqual: NotSquareSupersetEqual,
	NotSubset: NotSubset,
	NotSubsetEqual: NotSubsetEqual,
	NotSucceeds: NotSucceeds,
	NotSucceedsEqual: NotSucceedsEqual,
	NotSucceedsSlantEqual: NotSucceedsSlantEqual,
	NotSucceedsTilde: NotSucceedsTilde,
	NotSuperset: NotSuperset,
	NotSupersetEqual: NotSupersetEqual,
	NotTilde: NotTilde,
	NotTildeEqual: NotTildeEqual,
	NotTildeFullEqual: NotTildeFullEqual,
	NotTildeTilde: NotTildeTilde,
	NotVerticalBar: NotVerticalBar,
	nparallel: nparallel,
	npar: npar,
	nparsl: nparsl,
	npart: npart,
	npolint: npolint,
	npr: npr,
	nprcue: nprcue,
	nprec: nprec,
	npreceq: npreceq,
	npre: npre,
	nrarrc: nrarrc,
	nrarr: nrarr,
	nrArr: nrArr,
	nrarrw: nrarrw,
	nrightarrow: nrightarrow,
	nRightarrow: nRightarrow,
	nrtri: nrtri,
	nrtrie: nrtrie,
	nsc: nsc,
	nsccue: nsccue,
	nsce: nsce,
	Nscr: Nscr,
	nscr: nscr,
	nshortmid: nshortmid,
	nshortparallel: nshortparallel,
	nsim: nsim,
	nsime: nsime,
	nsimeq: nsimeq,
	nsmid: nsmid,
	nspar: nspar,
	nsqsube: nsqsube,
	nsqsupe: nsqsupe,
	nsub: nsub,
	nsubE: nsubE,
	nsube: nsube,
	nsubset: nsubset,
	nsubseteq: nsubseteq,
	nsubseteqq: nsubseteqq,
	nsucc: nsucc,
	nsucceq: nsucceq,
	nsup: nsup,
	nsupE: nsupE,
	nsupe: nsupe,
	nsupset: nsupset,
	nsupseteq: nsupseteq,
	nsupseteqq: nsupseteqq,
	ntgl: ntgl,
	Ntilde: Ntilde,
	ntilde: ntilde,
	ntlg: ntlg,
	ntriangleleft: ntriangleleft,
	ntrianglelefteq: ntrianglelefteq,
	ntriangleright: ntriangleright,
	ntrianglerighteq: ntrianglerighteq,
	Nu: Nu,
	nu: nu,
	num: num,
	numero: numero,
	numsp: numsp,
	nvap: nvap,
	nvdash: nvdash,
	nvDash: nvDash,
	nVdash: nVdash,
	nVDash: nVDash,
	nvge: nvge,
	nvgt: nvgt,
	nvHarr: nvHarr,
	nvinfin: nvinfin,
	nvlArr: nvlArr,
	nvle: nvle,
	nvlt: nvlt,
	nvltrie: nvltrie,
	nvrArr: nvrArr,
	nvrtrie: nvrtrie,
	nvsim: nvsim,
	nwarhk: nwarhk,
	nwarr: nwarr,
	nwArr: nwArr,
	nwarrow: nwarrow,
	nwnear: nwnear,
	Oacute: Oacute,
	oacute: oacute,
	oast: oast,
	Ocirc: Ocirc,
	ocirc: ocirc,
	ocir: ocir,
	Ocy: Ocy,
	ocy: ocy,
	odash: odash,
	Odblac: Odblac,
	odblac: odblac,
	odiv: odiv,
	odot: odot,
	odsold: odsold,
	OElig: OElig,
	oelig: oelig,
	ofcir: ofcir,
	Ofr: Ofr,
	ofr: ofr,
	ogon: ogon,
	Ograve: Ograve,
	ograve: ograve,
	ogt: ogt,
	ohbar: ohbar,
	ohm: ohm,
	oint: oint,
	olarr: olarr,
	olcir: olcir,
	olcross: olcross,
	oline: oline,
	olt: olt,
	Omacr: Omacr,
	omacr: omacr,
	Omega: Omega,
	omega: omega,
	Omicron: Omicron,
	omicron: omicron,
	omid: omid,
	ominus: ominus,
	Oopf: Oopf,
	oopf: oopf,
	opar: opar,
	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
	OpenCurlyQuote: OpenCurlyQuote,
	operp: operp,
	oplus: oplus,
	orarr: orarr,
	Or: Or,
	or: or,
	ord: ord,
	order: order,
	orderof: orderof,
	ordf: ordf,
	ordm: ordm,
	origof: origof,
	oror: oror,
	orslope: orslope,
	orv: orv,
	oS: oS,
	Oscr: Oscr,
	oscr: oscr,
	Oslash: Oslash,
	oslash: oslash,
	osol: osol,
	Otilde: Otilde,
	otilde: otilde,
	otimesas: otimesas,
	Otimes: Otimes,
	otimes: otimes,
	Ouml: Ouml,
	ouml: ouml,
	ovbar: ovbar,
	OverBar: OverBar,
	OverBrace: OverBrace,
	OverBracket: OverBracket,
	OverParenthesis: OverParenthesis,
	para: para,
	parallel: parallel,
	par: par,
	parsim: parsim,
	parsl: parsl,
	part: part,
	PartialD: PartialD,
	Pcy: Pcy,
	pcy: pcy,
	percnt: percnt,
	period: period,
	permil: permil,
	perp: perp,
	pertenk: pertenk,
	Pfr: Pfr,
	pfr: pfr,
	Phi: Phi,
	phi: phi,
	phiv: phiv,
	phmmat: phmmat,
	phone: phone,
	Pi: Pi,
	pi: pi,
	pitchfork: pitchfork,
	piv: piv,
	planck: planck,
	planckh: planckh,
	plankv: plankv,
	plusacir: plusacir,
	plusb: plusb,
	pluscir: pluscir,
	plus: plus,
	plusdo: plusdo,
	plusdu: plusdu,
	pluse: pluse,
	PlusMinus: PlusMinus,
	plusmn: plusmn,
	plussim: plussim,
	plustwo: plustwo,
	pm: pm,
	Poincareplane: Poincareplane,
	pointint: pointint,
	popf: popf,
	Popf: Popf,
	pound: pound,
	prap: prap,
	Pr: Pr,
	pr: pr,
	prcue: prcue,
	precapprox: precapprox,
	prec: prec,
	preccurlyeq: preccurlyeq,
	Precedes: Precedes,
	PrecedesEqual: PrecedesEqual,
	PrecedesSlantEqual: PrecedesSlantEqual,
	PrecedesTilde: PrecedesTilde,
	preceq: preceq,
	precnapprox: precnapprox,
	precneqq: precneqq,
	precnsim: precnsim,
	pre: pre,
	prE: prE,
	precsim: precsim,
	prime: prime,
	Prime: Prime,
	primes: primes,
	prnap: prnap,
	prnE: prnE,
	prnsim: prnsim,
	prod: prod,
	Product: Product,
	profalar: profalar,
	profline: profline,
	profsurf: profsurf,
	prop: prop,
	Proportional: Proportional,
	Proportion: Proportion,
	propto: propto,
	prsim: prsim,
	prurel: prurel,
	Pscr: Pscr,
	pscr: pscr,
	Psi: Psi,
	psi: psi,
	puncsp: puncsp,
	Qfr: Qfr,
	qfr: qfr,
	qint: qint,
	qopf: qopf,
	Qopf: Qopf,
	qprime: qprime,
	Qscr: Qscr,
	qscr: qscr,
	quaternions: quaternions,
	quatint: quatint,
	quest: quest,
	questeq: questeq,
	quot: quot,
	QUOT: QUOT,
	rAarr: rAarr,
	race: race,
	Racute: Racute,
	racute: racute,
	radic: radic,
	raemptyv: raemptyv,
	rang: rang,
	Rang: Rang,
	rangd: rangd,
	range: range,
	rangle: rangle,
	raquo: raquo,
	rarrap: rarrap,
	rarrb: rarrb,
	rarrbfs: rarrbfs,
	rarrc: rarrc,
	rarr: rarr,
	Rarr: Rarr,
	rArr: rArr,
	rarrfs: rarrfs,
	rarrhk: rarrhk,
	rarrlp: rarrlp,
	rarrpl: rarrpl,
	rarrsim: rarrsim,
	Rarrtl: Rarrtl,
	rarrtl: rarrtl,
	rarrw: rarrw,
	ratail: ratail,
	rAtail: rAtail,
	ratio: ratio,
	rationals: rationals,
	rbarr: rbarr,
	rBarr: rBarr,
	RBarr: RBarr,
	rbbrk: rbbrk,
	rbrace: rbrace,
	rbrack: rbrack,
	rbrke: rbrke,
	rbrksld: rbrksld,
	rbrkslu: rbrkslu,
	Rcaron: Rcaron,
	rcaron: rcaron,
	Rcedil: Rcedil,
	rcedil: rcedil,
	rceil: rceil,
	rcub: rcub,
	Rcy: Rcy,
	rcy: rcy,
	rdca: rdca,
	rdldhar: rdldhar,
	rdquo: rdquo,
	rdquor: rdquor,
	rdsh: rdsh,
	real: real,
	realine: realine,
	realpart: realpart,
	reals: reals,
	Re: Re,
	rect: rect,
	reg: reg,
	REG: REG,
	ReverseElement: ReverseElement,
	ReverseEquilibrium: ReverseEquilibrium,
	ReverseUpEquilibrium: ReverseUpEquilibrium,
	rfisht: rfisht,
	rfloor: rfloor,
	rfr: rfr,
	Rfr: Rfr,
	rHar: rHar,
	rhard: rhard,
	rharu: rharu,
	rharul: rharul,
	Rho: Rho,
	rho: rho,
	rhov: rhov,
	RightAngleBracket: RightAngleBracket,
	RightArrowBar: RightArrowBar,
	rightarrow: rightarrow,
	RightArrow: RightArrow,
	Rightarrow: Rightarrow,
	RightArrowLeftArrow: RightArrowLeftArrow,
	rightarrowtail: rightarrowtail,
	RightCeiling: RightCeiling,
	RightDoubleBracket: RightDoubleBracket,
	RightDownTeeVector: RightDownTeeVector,
	RightDownVectorBar: RightDownVectorBar,
	RightDownVector: RightDownVector,
	RightFloor: RightFloor,
	rightharpoondown: rightharpoondown,
	rightharpoonup: rightharpoonup,
	rightleftarrows: rightleftarrows,
	rightleftharpoons: rightleftharpoons,
	rightrightarrows: rightrightarrows,
	rightsquigarrow: rightsquigarrow,
	RightTeeArrow: RightTeeArrow,
	RightTee: RightTee,
	RightTeeVector: RightTeeVector,
	rightthreetimes: rightthreetimes,
	RightTriangleBar: RightTriangleBar,
	RightTriangle: RightTriangle,
	RightTriangleEqual: RightTriangleEqual,
	RightUpDownVector: RightUpDownVector,
	RightUpTeeVector: RightUpTeeVector,
	RightUpVectorBar: RightUpVectorBar,
	RightUpVector: RightUpVector,
	RightVectorBar: RightVectorBar,
	RightVector: RightVector,
	ring: ring,
	risingdotseq: risingdotseq,
	rlarr: rlarr,
	rlhar: rlhar,
	rlm: rlm,
	rmoustache: rmoustache,
	rmoust: rmoust,
	rnmid: rnmid,
	roang: roang,
	roarr: roarr,
	robrk: robrk,
	ropar: ropar,
	ropf: ropf,
	Ropf: Ropf,
	roplus: roplus,
	rotimes: rotimes,
	RoundImplies: RoundImplies,
	rpar: rpar,
	rpargt: rpargt,
	rppolint: rppolint,
	rrarr: rrarr,
	Rrightarrow: Rrightarrow,
	rsaquo: rsaquo,
	rscr: rscr,
	Rscr: Rscr,
	rsh: rsh,
	Rsh: Rsh,
	rsqb: rsqb,
	rsquo: rsquo,
	rsquor: rsquor,
	rthree: rthree,
	rtimes: rtimes,
	rtri: rtri,
	rtrie: rtrie,
	rtrif: rtrif,
	rtriltri: rtriltri,
	RuleDelayed: RuleDelayed,
	ruluhar: ruluhar,
	rx: rx,
	Sacute: Sacute,
	sacute: sacute,
	sbquo: sbquo,
	scap: scap,
	Scaron: Scaron,
	scaron: scaron,
	Sc: Sc,
	sc: sc,
	sccue: sccue,
	sce: sce,
	scE: scE,
	Scedil: Scedil,
	scedil: scedil,
	Scirc: Scirc,
	scirc: scirc,
	scnap: scnap,
	scnE: scnE,
	scnsim: scnsim,
	scpolint: scpolint,
	scsim: scsim,
	Scy: Scy,
	scy: scy,
	sdotb: sdotb,
	sdot: sdot,
	sdote: sdote,
	searhk: searhk,
	searr: searr,
	seArr: seArr,
	searrow: searrow,
	sect: sect,
	semi: semi,
	seswar: seswar,
	setminus: setminus,
	setmn: setmn,
	sext: sext,
	Sfr: Sfr,
	sfr: sfr,
	sfrown: sfrown,
	sharp: sharp,
	SHCHcy: SHCHcy,
	shchcy: shchcy,
	SHcy: SHcy,
	shcy: shcy,
	ShortDownArrow: ShortDownArrow,
	ShortLeftArrow: ShortLeftArrow,
	shortmid: shortmid,
	shortparallel: shortparallel,
	ShortRightArrow: ShortRightArrow,
	ShortUpArrow: ShortUpArrow,
	shy: shy,
	Sigma: Sigma,
	sigma: sigma,
	sigmaf: sigmaf,
	sigmav: sigmav,
	sim: sim,
	simdot: simdot,
	sime: sime,
	simeq: simeq,
	simg: simg,
	simgE: simgE,
	siml: siml,
	simlE: simlE,
	simne: simne,
	simplus: simplus,
	simrarr: simrarr,
	slarr: slarr,
	SmallCircle: SmallCircle,
	smallsetminus: smallsetminus,
	smashp: smashp,
	smeparsl: smeparsl,
	smid: smid,
	smile: smile,
	smt: smt,
	smte: smte,
	smtes: smtes,
	SOFTcy: SOFTcy,
	softcy: softcy,
	solbar: solbar,
	solb: solb,
	sol: sol,
	Sopf: Sopf,
	sopf: sopf,
	spades: spades,
	spadesuit: spadesuit,
	spar: spar,
	sqcap: sqcap,
	sqcaps: sqcaps,
	sqcup: sqcup,
	sqcups: sqcups,
	Sqrt: Sqrt,
	sqsub: sqsub,
	sqsube: sqsube,
	sqsubset: sqsubset,
	sqsubseteq: sqsubseteq,
	sqsup: sqsup,
	sqsupe: sqsupe,
	sqsupset: sqsupset,
	sqsupseteq: sqsupseteq,
	square: square,
	Square: Square,
	SquareIntersection: SquareIntersection,
	SquareSubset: SquareSubset,
	SquareSubsetEqual: SquareSubsetEqual,
	SquareSuperset: SquareSuperset,
	SquareSupersetEqual: SquareSupersetEqual,
	SquareUnion: SquareUnion,
	squarf: squarf,
	squ: squ,
	squf: squf,
	srarr: srarr,
	Sscr: Sscr,
	sscr: sscr,
	ssetmn: ssetmn,
	ssmile: ssmile,
	sstarf: sstarf,
	Star: Star,
	star: star,
	starf: starf,
	straightepsilon: straightepsilon,
	straightphi: straightphi,
	strns: strns,
	sub: sub,
	Sub: Sub,
	subdot: subdot,
	subE: subE,
	sube: sube,
	subedot: subedot,
	submult: submult,
	subnE: subnE,
	subne: subne,
	subplus: subplus,
	subrarr: subrarr,
	subset: subset,
	Subset: Subset,
	subseteq: subseteq,
	subseteqq: subseteqq,
	SubsetEqual: SubsetEqual,
	subsetneq: subsetneq,
	subsetneqq: subsetneqq,
	subsim: subsim,
	subsub: subsub,
	subsup: subsup,
	succapprox: succapprox,
	succ: succ,
	succcurlyeq: succcurlyeq,
	Succeeds: Succeeds,
	SucceedsEqual: SucceedsEqual,
	SucceedsSlantEqual: SucceedsSlantEqual,
	SucceedsTilde: SucceedsTilde,
	succeq: succeq,
	succnapprox: succnapprox,
	succneqq: succneqq,
	succnsim: succnsim,
	succsim: succsim,
	SuchThat: SuchThat,
	sum: sum,
	Sum: Sum,
	sung: sung,
	sup1: sup1,
	sup2: sup2,
	sup3: sup3,
	sup: sup,
	Sup: Sup,
	supdot: supdot,
	supdsub: supdsub,
	supE: supE,
	supe: supe,
	supedot: supedot,
	Superset: Superset,
	SupersetEqual: SupersetEqual,
	suphsol: suphsol,
	suphsub: suphsub,
	suplarr: suplarr,
	supmult: supmult,
	supnE: supnE,
	supne: supne,
	supplus: supplus,
	supset: supset,
	Supset: Supset,
	supseteq: supseteq,
	supseteqq: supseteqq,
	supsetneq: supsetneq,
	supsetneqq: supsetneqq,
	supsim: supsim,
	supsub: supsub,
	supsup: supsup,
	swarhk: swarhk,
	swarr: swarr,
	swArr: swArr,
	swarrow: swarrow,
	swnwar: swnwar,
	szlig: szlig,
	Tab: Tab,
	target: target,
	Tau: Tau,
	tau: tau,
	tbrk: tbrk,
	Tcaron: Tcaron,
	tcaron: tcaron,
	Tcedil: Tcedil,
	tcedil: tcedil,
	Tcy: Tcy,
	tcy: tcy,
	tdot: tdot,
	telrec: telrec,
	Tfr: Tfr,
	tfr: tfr,
	there4: there4,
	therefore: therefore,
	Therefore: Therefore,
	Theta: Theta,
	theta: theta,
	thetasym: thetasym,
	thetav: thetav,
	thickapprox: thickapprox,
	thicksim: thicksim,
	ThickSpace: ThickSpace,
	ThinSpace: ThinSpace,
	thinsp: thinsp,
	thkap: thkap,
	thksim: thksim,
	THORN: THORN,
	thorn: thorn,
	tilde: tilde,
	Tilde: Tilde,
	TildeEqual: TildeEqual,
	TildeFullEqual: TildeFullEqual,
	TildeTilde: TildeTilde,
	timesbar: timesbar,
	timesb: timesb,
	times: times,
	timesd: timesd,
	tint: tint,
	toea: toea,
	topbot: topbot,
	topcir: topcir,
	top: top,
	Topf: Topf,
	topf: topf,
	topfork: topfork,
	tosa: tosa,
	tprime: tprime,
	trade: trade,
	TRADE: TRADE,
	triangle: triangle,
	triangledown: triangledown,
	triangleleft: triangleleft,
	trianglelefteq: trianglelefteq,
	triangleq: triangleq,
	triangleright: triangleright,
	trianglerighteq: trianglerighteq,
	tridot: tridot,
	trie: trie,
	triminus: triminus,
	TripleDot: TripleDot,
	triplus: triplus,
	trisb: trisb,
	tritime: tritime,
	trpezium: trpezium,
	Tscr: Tscr,
	tscr: tscr,
	TScy: TScy,
	tscy: tscy,
	TSHcy: TSHcy,
	tshcy: tshcy,
	Tstrok: Tstrok,
	tstrok: tstrok,
	twixt: twixt,
	twoheadleftarrow: twoheadleftarrow,
	twoheadrightarrow: twoheadrightarrow,
	Uacute: Uacute,
	uacute: uacute,
	uarr: uarr,
	Uarr: Uarr,
	uArr: uArr,
	Uarrocir: Uarrocir,
	Ubrcy: Ubrcy,
	ubrcy: ubrcy,
	Ubreve: Ubreve,
	ubreve: ubreve,
	Ucirc: Ucirc,
	ucirc: ucirc,
	Ucy: Ucy,
	ucy: ucy,
	udarr: udarr,
	Udblac: Udblac,
	udblac: udblac,
	udhar: udhar,
	ufisht: ufisht,
	Ufr: Ufr,
	ufr: ufr,
	Ugrave: Ugrave,
	ugrave: ugrave,
	uHar: uHar,
	uharl: uharl,
	uharr: uharr,
	uhblk: uhblk,
	ulcorn: ulcorn,
	ulcorner: ulcorner,
	ulcrop: ulcrop,
	ultri: ultri,
	Umacr: Umacr,
	umacr: umacr,
	uml: uml,
	UnderBar: UnderBar,
	UnderBrace: UnderBrace,
	UnderBracket: UnderBracket,
	UnderParenthesis: UnderParenthesis,
	Union: Union,
	UnionPlus: UnionPlus,
	Uogon: Uogon,
	uogon: uogon,
	Uopf: Uopf,
	uopf: uopf,
	UpArrowBar: UpArrowBar,
	uparrow: uparrow,
	UpArrow: UpArrow,
	Uparrow: Uparrow,
	UpArrowDownArrow: UpArrowDownArrow,
	updownarrow: updownarrow,
	UpDownArrow: UpDownArrow,
	Updownarrow: Updownarrow,
	UpEquilibrium: UpEquilibrium,
	upharpoonleft: upharpoonleft,
	upharpoonright: upharpoonright,
	uplus: uplus,
	UpperLeftArrow: UpperLeftArrow,
	UpperRightArrow: UpperRightArrow,
	upsi: upsi,
	Upsi: Upsi,
	upsih: upsih,
	Upsilon: Upsilon,
	upsilon: upsilon,
	UpTeeArrow: UpTeeArrow,
	UpTee: UpTee,
	upuparrows: upuparrows,
	urcorn: urcorn,
	urcorner: urcorner,
	urcrop: urcrop,
	Uring: Uring,
	uring: uring,
	urtri: urtri,
	Uscr: Uscr,
	uscr: uscr,
	utdot: utdot,
	Utilde: Utilde,
	utilde: utilde,
	utri: utri,
	utrif: utrif,
	uuarr: uuarr,
	Uuml: Uuml,
	uuml: uuml,
	uwangle: uwangle,
	vangrt: vangrt,
	varepsilon: varepsilon,
	varkappa: varkappa,
	varnothing: varnothing,
	varphi: varphi,
	varpi: varpi,
	varpropto: varpropto,
	varr: varr,
	vArr: vArr,
	varrho: varrho,
	varsigma: varsigma,
	varsubsetneq: varsubsetneq,
	varsubsetneqq: varsubsetneqq,
	varsupsetneq: varsupsetneq,
	varsupsetneqq: varsupsetneqq,
	vartheta: vartheta,
	vartriangleleft: vartriangleleft,
	vartriangleright: vartriangleright,
	vBar: vBar,
	Vbar: Vbar,
	vBarv: vBarv,
	Vcy: Vcy,
	vcy: vcy,
	vdash: vdash,
	vDash: vDash,
	Vdash: Vdash,
	VDash: VDash,
	Vdashl: Vdashl,
	veebar: veebar,
	vee: vee,
	Vee: Vee,
	veeeq: veeeq,
	vellip: vellip,
	verbar: verbar,
	Verbar: Verbar,
	vert: vert,
	Vert: Vert,
	VerticalBar: VerticalBar,
	VerticalLine: VerticalLine,
	VerticalSeparator: VerticalSeparator,
	VerticalTilde: VerticalTilde,
	VeryThinSpace: VeryThinSpace,
	Vfr: Vfr,
	vfr: vfr,
	vltri: vltri,
	vnsub: vnsub,
	vnsup: vnsup,
	Vopf: Vopf,
	vopf: vopf,
	vprop: vprop,
	vrtri: vrtri,
	Vscr: Vscr,
	vscr: vscr,
	vsubnE: vsubnE,
	vsubne: vsubne,
	vsupnE: vsupnE,
	vsupne: vsupne,
	Vvdash: Vvdash,
	vzigzag: vzigzag,
	Wcirc: Wcirc,
	wcirc: wcirc,
	wedbar: wedbar,
	wedge: wedge,
	Wedge: Wedge,
	wedgeq: wedgeq,
	weierp: weierp,
	Wfr: Wfr,
	wfr: wfr,
	Wopf: Wopf,
	wopf: wopf,
	wp: wp,
	wr: wr,
	wreath: wreath,
	Wscr: Wscr,
	wscr: wscr,
	xcap: xcap,
	xcirc: xcirc,
	xcup: xcup,
	xdtri: xdtri,
	Xfr: Xfr,
	xfr: xfr,
	xharr: xharr,
	xhArr: xhArr,
	Xi: Xi,
	xi: xi,
	xlarr: xlarr,
	xlArr: xlArr,
	xmap: xmap,
	xnis: xnis,
	xodot: xodot,
	Xopf: Xopf,
	xopf: xopf,
	xoplus: xoplus,
	xotime: xotime,
	xrarr: xrarr,
	xrArr: xrArr,
	Xscr: Xscr,
	xscr: xscr,
	xsqcup: xsqcup,
	xuplus: xuplus,
	xutri: xutri,
	xvee: xvee,
	xwedge: xwedge,
	Yacute: Yacute,
	yacute: yacute,
	YAcy: YAcy,
	yacy: yacy,
	Ycirc: Ycirc,
	ycirc: ycirc,
	Ycy: Ycy,
	ycy: ycy,
	yen: yen,
	Yfr: Yfr,
	yfr: yfr,
	YIcy: YIcy,
	yicy: yicy,
	Yopf: Yopf,
	yopf: yopf,
	Yscr: Yscr,
	yscr: yscr,
	YUcy: YUcy,
	yucy: yucy,
	yuml: yuml,
	Yuml: Yuml,
	Zacute: Zacute,
	zacute: zacute,
	Zcaron: Zcaron,
	zcaron: zcaron,
	Zcy: Zcy,
	zcy: zcy,
	Zdot: Zdot,
	zdot: zdot,
	zeetrf: zeetrf,
	ZeroWidthSpace: ZeroWidthSpace,
	Zeta: Zeta,
	zeta: zeta,
	zfr: zfr,
	Zfr: Zfr,
	ZHcy: ZHcy,
	zhcy: zhcy,
	zigrarr: zigrarr,
	zopf: zopf,
	Zopf: Zopf,
	Zscr: Zscr,
	zscr: zscr,
	zwj: zwj,
	zwnj: zwnj
};

var entities$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Aacute: Aacute,
  aacute: aacute,
  Abreve: Abreve,
  abreve: abreve,
  ac: ac,
  acd: acd,
  acE: acE,
  Acirc: Acirc,
  acirc: acirc,
  acute: acute,
  Acy: Acy,
  acy: acy,
  AElig: AElig,
  aelig: aelig,
  af: af,
  Afr: Afr,
  afr: afr,
  Agrave: Agrave,
  agrave: agrave,
  alefsym: alefsym,
  aleph: aleph,
  Alpha: Alpha,
  alpha: alpha,
  Amacr: Amacr,
  amacr: amacr,
  amalg: amalg,
  amp: amp,
  AMP: AMP,
  andand: andand,
  And: And,
  and: and,
  andd: andd,
  andslope: andslope,
  andv: andv,
  ang: ang,
  ange: ange,
  angle: angle,
  angmsdaa: angmsdaa,
  angmsdab: angmsdab,
  angmsdac: angmsdac,
  angmsdad: angmsdad,
  angmsdae: angmsdae,
  angmsdaf: angmsdaf,
  angmsdag: angmsdag,
  angmsdah: angmsdah,
  angmsd: angmsd,
  angrt: angrt,
  angrtvb: angrtvb,
  angrtvbd: angrtvbd,
  angsph: angsph,
  angst: angst,
  angzarr: angzarr,
  Aogon: Aogon,
  aogon: aogon,
  Aopf: Aopf,
  aopf: aopf,
  apacir: apacir,
  ap: ap,
  apE: apE,
  ape: ape,
  apid: apid,
  apos: apos,
  ApplyFunction: ApplyFunction,
  approx: approx,
  approxeq: approxeq,
  Aring: Aring,
  aring: aring,
  Ascr: Ascr,
  ascr: ascr,
  Assign: Assign,
  ast: ast,
  asymp: asymp,
  asympeq: asympeq,
  Atilde: Atilde,
  atilde: atilde,
  Auml: Auml,
  auml: auml,
  awconint: awconint,
  awint: awint,
  backcong: backcong,
  backepsilon: backepsilon,
  backprime: backprime,
  backsim: backsim,
  backsimeq: backsimeq,
  Backslash: Backslash,
  Barv: Barv,
  barvee: barvee,
  barwed: barwed,
  Barwed: Barwed,
  barwedge: barwedge,
  bbrk: bbrk,
  bbrktbrk: bbrktbrk,
  bcong: bcong,
  Bcy: Bcy,
  bcy: bcy,
  bdquo: bdquo,
  becaus: becaus,
  because: because,
  Because: Because,
  bemptyv: bemptyv,
  bepsi: bepsi,
  bernou: bernou,
  Bernoullis: Bernoullis,
  Beta: Beta,
  beta: beta,
  beth: beth,
  between: between,
  Bfr: Bfr,
  bfr: bfr,
  bigcap: bigcap,
  bigcirc: bigcirc,
  bigcup: bigcup,
  bigodot: bigodot,
  bigoplus: bigoplus,
  bigotimes: bigotimes,
  bigsqcup: bigsqcup,
  bigstar: bigstar,
  bigtriangledown: bigtriangledown,
  bigtriangleup: bigtriangleup,
  biguplus: biguplus,
  bigvee: bigvee,
  bigwedge: bigwedge,
  bkarow: bkarow,
  blacklozenge: blacklozenge,
  blacksquare: blacksquare,
  blacktriangle: blacktriangle,
  blacktriangledown: blacktriangledown,
  blacktriangleleft: blacktriangleleft,
  blacktriangleright: blacktriangleright,
  blank: blank,
  blk12: blk12,
  blk14: blk14,
  blk34: blk34,
  block: block,
  bne: bne,
  bnequiv: bnequiv,
  bNot: bNot,
  bnot: bnot,
  Bopf: Bopf,
  bopf: bopf,
  bot: bot,
  bottom: bottom,
  bowtie: bowtie,
  boxbox: boxbox,
  boxdl: boxdl,
  boxdL: boxdL,
  boxDl: boxDl,
  boxDL: boxDL,
  boxdr: boxdr,
  boxdR: boxdR,
  boxDr: boxDr,
  boxDR: boxDR,
  boxh: boxh,
  boxH: boxH,
  boxhd: boxhd,
  boxHd: boxHd,
  boxhD: boxhD,
  boxHD: boxHD,
  boxhu: boxhu,
  boxHu: boxHu,
  boxhU: boxhU,
  boxHU: boxHU,
  boxminus: boxminus,
  boxplus: boxplus,
  boxtimes: boxtimes,
  boxul: boxul,
  boxuL: boxuL,
  boxUl: boxUl,
  boxUL: boxUL,
  boxur: boxur,
  boxuR: boxuR,
  boxUr: boxUr,
  boxUR: boxUR,
  boxv: boxv,
  boxV: boxV,
  boxvh: boxvh,
  boxvH: boxvH,
  boxVh: boxVh,
  boxVH: boxVH,
  boxvl: boxvl,
  boxvL: boxvL,
  boxVl: boxVl,
  boxVL: boxVL,
  boxvr: boxvr,
  boxvR: boxvR,
  boxVr: boxVr,
  boxVR: boxVR,
  bprime: bprime,
  breve: breve,
  Breve: Breve,
  brvbar: brvbar,
  bscr: bscr,
  Bscr: Bscr,
  bsemi: bsemi,
  bsim: bsim,
  bsime: bsime,
  bsolb: bsolb,
  bsol: bsol,
  bsolhsub: bsolhsub,
  bull: bull,
  bullet: bullet,
  bump: bump,
  bumpE: bumpE,
  bumpe: bumpe,
  Bumpeq: Bumpeq,
  bumpeq: bumpeq,
  Cacute: Cacute,
  cacute: cacute,
  capand: capand,
  capbrcup: capbrcup,
  capcap: capcap,
  cap: cap,
  Cap: Cap,
  capcup: capcup,
  capdot: capdot,
  CapitalDifferentialD: CapitalDifferentialD,
  caps: caps,
  caret: caret,
  caron: caron,
  Cayleys: Cayleys,
  ccaps: ccaps,
  Ccaron: Ccaron,
  ccaron: ccaron,
  Ccedil: Ccedil,
  ccedil: ccedil,
  Ccirc: Ccirc,
  ccirc: ccirc,
  Cconint: Cconint,
  ccups: ccups,
  ccupssm: ccupssm,
  Cdot: Cdot,
  cdot: cdot,
  cedil: cedil,
  Cedilla: Cedilla,
  cemptyv: cemptyv,
  cent: cent,
  centerdot: centerdot,
  CenterDot: CenterDot,
  cfr: cfr,
  Cfr: Cfr,
  CHcy: CHcy,
  chcy: chcy,
  check: check,
  checkmark: checkmark,
  Chi: Chi,
  chi: chi,
  circ: circ,
  circeq: circeq,
  circlearrowleft: circlearrowleft,
  circlearrowright: circlearrowright,
  circledast: circledast,
  circledcirc: circledcirc,
  circleddash: circleddash,
  CircleDot: CircleDot,
  circledR: circledR,
  circledS: circledS,
  CircleMinus: CircleMinus,
  CirclePlus: CirclePlus,
  CircleTimes: CircleTimes,
  cir: cir,
  cirE: cirE,
  cire: cire,
  cirfnint: cirfnint,
  cirmid: cirmid,
  cirscir: cirscir,
  ClockwiseContourIntegral: ClockwiseContourIntegral,
  CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
  CloseCurlyQuote: CloseCurlyQuote,
  clubs: clubs,
  clubsuit: clubsuit,
  colon: colon,
  Colon: Colon,
  Colone: Colone,
  colone: colone,
  coloneq: coloneq,
  comma: comma,
  commat: commat,
  comp: comp,
  compfn: compfn,
  complement: complement,
  complexes: complexes,
  cong: cong,
  congdot: congdot,
  Congruent: Congruent,
  conint: conint,
  Conint: Conint,
  ContourIntegral: ContourIntegral,
  copf: copf,
  Copf: Copf,
  coprod: coprod,
  Coproduct: Coproduct,
  copy: copy,
  COPY: COPY,
  copysr: copysr,
  CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
  crarr: crarr,
  cross: cross,
  Cross: Cross,
  Cscr: Cscr,
  cscr: cscr,
  csub: csub,
  csube: csube,
  csup: csup,
  csupe: csupe,
  ctdot: ctdot,
  cudarrl: cudarrl,
  cudarrr: cudarrr,
  cuepr: cuepr,
  cuesc: cuesc,
  cularr: cularr,
  cularrp: cularrp,
  cupbrcap: cupbrcap,
  cupcap: cupcap,
  CupCap: CupCap,
  cup: cup,
  Cup: Cup,
  cupcup: cupcup,
  cupdot: cupdot,
  cupor: cupor,
  cups: cups,
  curarr: curarr,
  curarrm: curarrm,
  curlyeqprec: curlyeqprec,
  curlyeqsucc: curlyeqsucc,
  curlyvee: curlyvee,
  curlywedge: curlywedge,
  curren: curren,
  curvearrowleft: curvearrowleft,
  curvearrowright: curvearrowright,
  cuvee: cuvee,
  cuwed: cuwed,
  cwconint: cwconint,
  cwint: cwint,
  cylcty: cylcty,
  dagger: dagger,
  Dagger: Dagger,
  daleth: daleth,
  darr: darr,
  Darr: Darr,
  dArr: dArr,
  dash: dash,
  Dashv: Dashv,
  dashv: dashv,
  dbkarow: dbkarow,
  dblac: dblac,
  Dcaron: Dcaron,
  dcaron: dcaron,
  Dcy: Dcy,
  dcy: dcy,
  ddagger: ddagger,
  ddarr: ddarr,
  DD: DD,
  dd: dd,
  DDotrahd: DDotrahd,
  ddotseq: ddotseq,
  deg: deg,
  Del: Del,
  Delta: Delta,
  delta: delta,
  demptyv: demptyv,
  dfisht: dfisht,
  Dfr: Dfr,
  dfr: dfr,
  dHar: dHar,
  dharl: dharl,
  dharr: dharr,
  DiacriticalAcute: DiacriticalAcute,
  DiacriticalDot: DiacriticalDot,
  DiacriticalDoubleAcute: DiacriticalDoubleAcute,
  DiacriticalGrave: DiacriticalGrave,
  DiacriticalTilde: DiacriticalTilde,
  diam: diam,
  diamond: diamond,
  Diamond: Diamond,
  diamondsuit: diamondsuit,
  diams: diams,
  die: die,
  DifferentialD: DifferentialD,
  digamma: digamma,
  disin: disin,
  div: div,
  divide: divide,
  divideontimes: divideontimes,
  divonx: divonx,
  DJcy: DJcy,
  djcy: djcy,
  dlcorn: dlcorn,
  dlcrop: dlcrop,
  dollar: dollar,
  Dopf: Dopf,
  dopf: dopf,
  Dot: Dot,
  dot: dot,
  DotDot: DotDot,
  doteq: doteq,
  doteqdot: doteqdot,
  DotEqual: DotEqual,
  dotminus: dotminus,
  dotplus: dotplus,
  dotsquare: dotsquare,
  doublebarwedge: doublebarwedge,
  DoubleContourIntegral: DoubleContourIntegral,
  DoubleDot: DoubleDot,
  DoubleDownArrow: DoubleDownArrow,
  DoubleLeftArrow: DoubleLeftArrow,
  DoubleLeftRightArrow: DoubleLeftRightArrow,
  DoubleLeftTee: DoubleLeftTee,
  DoubleLongLeftArrow: DoubleLongLeftArrow,
  DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
  DoubleLongRightArrow: DoubleLongRightArrow,
  DoubleRightArrow: DoubleRightArrow,
  DoubleRightTee: DoubleRightTee,
  DoubleUpArrow: DoubleUpArrow,
  DoubleUpDownArrow: DoubleUpDownArrow,
  DoubleVerticalBar: DoubleVerticalBar,
  DownArrowBar: DownArrowBar,
  downarrow: downarrow,
  DownArrow: DownArrow,
  Downarrow: Downarrow,
  DownArrowUpArrow: DownArrowUpArrow,
  DownBreve: DownBreve,
  downdownarrows: downdownarrows,
  downharpoonleft: downharpoonleft,
  downharpoonright: downharpoonright,
  DownLeftRightVector: DownLeftRightVector,
  DownLeftTeeVector: DownLeftTeeVector,
  DownLeftVectorBar: DownLeftVectorBar,
  DownLeftVector: DownLeftVector,
  DownRightTeeVector: DownRightTeeVector,
  DownRightVectorBar: DownRightVectorBar,
  DownRightVector: DownRightVector,
  DownTeeArrow: DownTeeArrow,
  DownTee: DownTee,
  drbkarow: drbkarow,
  drcorn: drcorn,
  drcrop: drcrop,
  Dscr: Dscr,
  dscr: dscr,
  DScy: DScy,
  dscy: dscy,
  dsol: dsol,
  Dstrok: Dstrok,
  dstrok: dstrok,
  dtdot: dtdot,
  dtri: dtri,
  dtrif: dtrif,
  duarr: duarr,
  duhar: duhar,
  dwangle: dwangle,
  DZcy: DZcy,
  dzcy: dzcy,
  dzigrarr: dzigrarr,
  Eacute: Eacute,
  eacute: eacute,
  easter: easter,
  Ecaron: Ecaron,
  ecaron: ecaron,
  Ecirc: Ecirc,
  ecirc: ecirc,
  ecir: ecir,
  ecolon: ecolon,
  Ecy: Ecy,
  ecy: ecy,
  eDDot: eDDot,
  Edot: Edot,
  edot: edot,
  eDot: eDot,
  ee: ee,
  efDot: efDot,
  Efr: Efr,
  efr: efr,
  eg: eg,
  Egrave: Egrave,
  egrave: egrave,
  egs: egs,
  egsdot: egsdot,
  el: el,
  Element: Element,
  elinters: elinters,
  ell: ell,
  els: els,
  elsdot: elsdot,
  Emacr: Emacr,
  emacr: emacr,
  empty: empty,
  emptyset: emptyset,
  EmptySmallSquare: EmptySmallSquare,
  emptyv: emptyv,
  EmptyVerySmallSquare: EmptyVerySmallSquare,
  emsp13: emsp13,
  emsp14: emsp14,
  emsp: emsp,
  ENG: ENG,
  eng: eng,
  ensp: ensp,
  Eogon: Eogon,
  eogon: eogon,
  Eopf: Eopf,
  eopf: eopf,
  epar: epar,
  eparsl: eparsl,
  eplus: eplus,
  epsi: epsi,
  Epsilon: Epsilon,
  epsilon: epsilon,
  epsiv: epsiv,
  eqcirc: eqcirc,
  eqcolon: eqcolon,
  eqsim: eqsim,
  eqslantgtr: eqslantgtr,
  eqslantless: eqslantless,
  Equal: Equal,
  equals: equals,
  EqualTilde: EqualTilde,
  equest: equest,
  Equilibrium: Equilibrium,
  equiv: equiv,
  equivDD: equivDD,
  eqvparsl: eqvparsl,
  erarr: erarr,
  erDot: erDot,
  escr: escr,
  Escr: Escr,
  esdot: esdot,
  Esim: Esim,
  esim: esim,
  Eta: Eta,
  eta: eta,
  ETH: ETH,
  eth: eth,
  Euml: Euml,
  euml: euml,
  euro: euro,
  excl: excl,
  exist: exist,
  Exists: Exists,
  expectation: expectation,
  exponentiale: exponentiale,
  ExponentialE: ExponentialE,
  fallingdotseq: fallingdotseq,
  Fcy: Fcy,
  fcy: fcy,
  female: female,
  ffilig: ffilig,
  fflig: fflig,
  ffllig: ffllig,
  Ffr: Ffr,
  ffr: ffr,
  filig: filig,
  FilledSmallSquare: FilledSmallSquare,
  FilledVerySmallSquare: FilledVerySmallSquare,
  fjlig: fjlig,
  flat: flat,
  fllig: fllig,
  fltns: fltns,
  fnof: fnof,
  Fopf: Fopf,
  fopf: fopf,
  forall: forall,
  ForAll: ForAll,
  fork: fork,
  forkv: forkv,
  Fouriertrf: Fouriertrf,
  fpartint: fpartint,
  frac12: frac12,
  frac13: frac13,
  frac14: frac14,
  frac15: frac15,
  frac16: frac16,
  frac18: frac18,
  frac23: frac23,
  frac25: frac25,
  frac34: frac34,
  frac35: frac35,
  frac38: frac38,
  frac45: frac45,
  frac56: frac56,
  frac58: frac58,
  frac78: frac78,
  frasl: frasl,
  frown: frown,
  fscr: fscr,
  Fscr: Fscr,
  gacute: gacute,
  Gamma: Gamma,
  gamma: gamma,
  Gammad: Gammad,
  gammad: gammad,
  gap: gap,
  Gbreve: Gbreve,
  gbreve: gbreve,
  Gcedil: Gcedil,
  Gcirc: Gcirc,
  gcirc: gcirc,
  Gcy: Gcy,
  gcy: gcy,
  Gdot: Gdot,
  gdot: gdot,
  ge: ge,
  gE: gE,
  gEl: gEl,
  gel: gel,
  geq: geq,
  geqq: geqq,
  geqslant: geqslant,
  gescc: gescc,
  ges: ges,
  gesdot: gesdot,
  gesdoto: gesdoto,
  gesdotol: gesdotol,
  gesl: gesl,
  gesles: gesles,
  Gfr: Gfr,
  gfr: gfr,
  gg: gg,
  Gg: Gg,
  ggg: ggg,
  gimel: gimel,
  GJcy: GJcy,
  gjcy: gjcy,
  gla: gla,
  gl: gl,
  glE: glE,
  glj: glj,
  gnap: gnap,
  gnapprox: gnapprox,
  gne: gne,
  gnE: gnE,
  gneq: gneq,
  gneqq: gneqq,
  gnsim: gnsim,
  Gopf: Gopf,
  gopf: gopf,
  grave: grave,
  GreaterEqual: GreaterEqual,
  GreaterEqualLess: GreaterEqualLess,
  GreaterFullEqual: GreaterFullEqual,
  GreaterGreater: GreaterGreater,
  GreaterLess: GreaterLess,
  GreaterSlantEqual: GreaterSlantEqual,
  GreaterTilde: GreaterTilde,
  Gscr: Gscr,
  gscr: gscr,
  gsim: gsim,
  gsime: gsime,
  gsiml: gsiml,
  gtcc: gtcc,
  gtcir: gtcir,
  gt: gt,
  GT: GT,
  Gt: Gt,
  gtdot: gtdot,
  gtlPar: gtlPar,
  gtquest: gtquest,
  gtrapprox: gtrapprox,
  gtrarr: gtrarr,
  gtrdot: gtrdot,
  gtreqless: gtreqless,
  gtreqqless: gtreqqless,
  gtrless: gtrless,
  gtrsim: gtrsim,
  gvertneqq: gvertneqq,
  gvnE: gvnE,
  Hacek: Hacek,
  hairsp: hairsp,
  half: half,
  hamilt: hamilt,
  HARDcy: HARDcy,
  hardcy: hardcy,
  harrcir: harrcir,
  harr: harr,
  hArr: hArr,
  harrw: harrw,
  Hat: Hat,
  hbar: hbar,
  Hcirc: Hcirc,
  hcirc: hcirc,
  hearts: hearts,
  heartsuit: heartsuit,
  hellip: hellip,
  hercon: hercon,
  hfr: hfr,
  Hfr: Hfr,
  HilbertSpace: HilbertSpace,
  hksearow: hksearow,
  hkswarow: hkswarow,
  hoarr: hoarr,
  homtht: homtht,
  hookleftarrow: hookleftarrow,
  hookrightarrow: hookrightarrow,
  hopf: hopf,
  Hopf: Hopf,
  horbar: horbar,
  HorizontalLine: HorizontalLine,
  hscr: hscr,
  Hscr: Hscr,
  hslash: hslash,
  Hstrok: Hstrok,
  hstrok: hstrok,
  HumpDownHump: HumpDownHump,
  HumpEqual: HumpEqual,
  hybull: hybull,
  hyphen: hyphen,
  Iacute: Iacute,
  iacute: iacute,
  ic: ic,
  Icirc: Icirc,
  icirc: icirc,
  Icy: Icy,
  icy: icy,
  Idot: Idot,
  IEcy: IEcy,
  iecy: iecy,
  iexcl: iexcl,
  iff: iff,
  ifr: ifr,
  Ifr: Ifr,
  Igrave: Igrave,
  igrave: igrave,
  ii: ii,
  iiiint: iiiint,
  iiint: iiint,
  iinfin: iinfin,
  iiota: iiota,
  IJlig: IJlig,
  ijlig: ijlig,
  Imacr: Imacr,
  imacr: imacr,
  image: image,
  ImaginaryI: ImaginaryI,
  imagline: imagline,
  imagpart: imagpart,
  imath: imath,
  Im: Im,
  imof: imof,
  imped: imped,
  Implies: Implies,
  incare: incare,
  infin: infin,
  infintie: infintie,
  inodot: inodot,
  intcal: intcal,
  int: int,
  Int: Int,
  integers: integers,
  Integral: Integral,
  intercal: intercal,
  Intersection: Intersection,
  intlarhk: intlarhk,
  intprod: intprod,
  InvisibleComma: InvisibleComma,
  InvisibleTimes: InvisibleTimes,
  IOcy: IOcy,
  iocy: iocy,
  Iogon: Iogon,
  iogon: iogon,
  Iopf: Iopf,
  iopf: iopf,
  Iota: Iota,
  iota: iota,
  iprod: iprod,
  iquest: iquest,
  iscr: iscr,
  Iscr: Iscr,
  isin: isin,
  isindot: isindot,
  isinE: isinE,
  isins: isins,
  isinsv: isinsv,
  isinv: isinv,
  it: it,
  Itilde: Itilde,
  itilde: itilde,
  Iukcy: Iukcy,
  iukcy: iukcy,
  Iuml: Iuml,
  iuml: iuml,
  Jcirc: Jcirc,
  jcirc: jcirc,
  Jcy: Jcy,
  jcy: jcy,
  Jfr: Jfr,
  jfr: jfr,
  jmath: jmath,
  Jopf: Jopf,
  jopf: jopf,
  Jscr: Jscr,
  jscr: jscr,
  Jsercy: Jsercy,
  jsercy: jsercy,
  Jukcy: Jukcy,
  jukcy: jukcy,
  Kappa: Kappa,
  kappa: kappa,
  kappav: kappav,
  Kcedil: Kcedil,
  kcedil: kcedil,
  Kcy: Kcy,
  kcy: kcy,
  Kfr: Kfr,
  kfr: kfr,
  kgreen: kgreen,
  KHcy: KHcy,
  khcy: khcy,
  KJcy: KJcy,
  kjcy: kjcy,
  Kopf: Kopf,
  kopf: kopf,
  Kscr: Kscr,
  kscr: kscr,
  lAarr: lAarr,
  Lacute: Lacute,
  lacute: lacute,
  laemptyv: laemptyv,
  lagran: lagran,
  Lambda: Lambda,
  lambda: lambda,
  lang: lang,
  Lang: Lang,
  langd: langd,
  langle: langle,
  lap: lap,
  Laplacetrf: Laplacetrf,
  laquo: laquo,
  larrb: larrb,
  larrbfs: larrbfs,
  larr: larr,
  Larr: Larr,
  lArr: lArr,
  larrfs: larrfs,
  larrhk: larrhk,
  larrlp: larrlp,
  larrpl: larrpl,
  larrsim: larrsim,
  larrtl: larrtl,
  latail: latail,
  lAtail: lAtail,
  lat: lat,
  late: late,
  lates: lates,
  lbarr: lbarr,
  lBarr: lBarr,
  lbbrk: lbbrk,
  lbrace: lbrace,
  lbrack: lbrack,
  lbrke: lbrke,
  lbrksld: lbrksld,
  lbrkslu: lbrkslu,
  Lcaron: Lcaron,
  lcaron: lcaron,
  Lcedil: Lcedil,
  lcedil: lcedil,
  lceil: lceil,
  lcub: lcub,
  Lcy: Lcy,
  lcy: lcy,
  ldca: ldca,
  ldquo: ldquo,
  ldquor: ldquor,
  ldrdhar: ldrdhar,
  ldrushar: ldrushar,
  ldsh: ldsh,
  le: le,
  lE: lE,
  LeftAngleBracket: LeftAngleBracket,
  LeftArrowBar: LeftArrowBar,
  leftarrow: leftarrow,
  LeftArrow: LeftArrow,
  Leftarrow: Leftarrow,
  LeftArrowRightArrow: LeftArrowRightArrow,
  leftarrowtail: leftarrowtail,
  LeftCeiling: LeftCeiling,
  LeftDoubleBracket: LeftDoubleBracket,
  LeftDownTeeVector: LeftDownTeeVector,
  LeftDownVectorBar: LeftDownVectorBar,
  LeftDownVector: LeftDownVector,
  LeftFloor: LeftFloor,
  leftharpoondown: leftharpoondown,
  leftharpoonup: leftharpoonup,
  leftleftarrows: leftleftarrows,
  leftrightarrow: leftrightarrow,
  LeftRightArrow: LeftRightArrow,
  Leftrightarrow: Leftrightarrow,
  leftrightarrows: leftrightarrows,
  leftrightharpoons: leftrightharpoons,
  leftrightsquigarrow: leftrightsquigarrow,
  LeftRightVector: LeftRightVector,
  LeftTeeArrow: LeftTeeArrow,
  LeftTee: LeftTee,
  LeftTeeVector: LeftTeeVector,
  leftthreetimes: leftthreetimes,
  LeftTriangleBar: LeftTriangleBar,
  LeftTriangle: LeftTriangle,
  LeftTriangleEqual: LeftTriangleEqual,
  LeftUpDownVector: LeftUpDownVector,
  LeftUpTeeVector: LeftUpTeeVector,
  LeftUpVectorBar: LeftUpVectorBar,
  LeftUpVector: LeftUpVector,
  LeftVectorBar: LeftVectorBar,
  LeftVector: LeftVector,
  lEg: lEg,
  leg: leg,
  leq: leq,
  leqq: leqq,
  leqslant: leqslant,
  lescc: lescc,
  les: les,
  lesdot: lesdot,
  lesdoto: lesdoto,
  lesdotor: lesdotor,
  lesg: lesg,
  lesges: lesges,
  lessapprox: lessapprox,
  lessdot: lessdot,
  lesseqgtr: lesseqgtr,
  lesseqqgtr: lesseqqgtr,
  LessEqualGreater: LessEqualGreater,
  LessFullEqual: LessFullEqual,
  LessGreater: LessGreater,
  lessgtr: lessgtr,
  LessLess: LessLess,
  lesssim: lesssim,
  LessSlantEqual: LessSlantEqual,
  LessTilde: LessTilde,
  lfisht: lfisht,
  lfloor: lfloor,
  Lfr: Lfr,
  lfr: lfr,
  lg: lg,
  lgE: lgE,
  lHar: lHar,
  lhard: lhard,
  lharu: lharu,
  lharul: lharul,
  lhblk: lhblk,
  LJcy: LJcy,
  ljcy: ljcy,
  llarr: llarr,
  ll: ll,
  Ll: Ll,
  llcorner: llcorner,
  Lleftarrow: Lleftarrow,
  llhard: llhard,
  lltri: lltri,
  Lmidot: Lmidot,
  lmidot: lmidot,
  lmoustache: lmoustache,
  lmoust: lmoust,
  lnap: lnap,
  lnapprox: lnapprox,
  lne: lne,
  lnE: lnE,
  lneq: lneq,
  lneqq: lneqq,
  lnsim: lnsim,
  loang: loang,
  loarr: loarr,
  lobrk: lobrk,
  longleftarrow: longleftarrow,
  LongLeftArrow: LongLeftArrow,
  Longleftarrow: Longleftarrow,
  longleftrightarrow: longleftrightarrow,
  LongLeftRightArrow: LongLeftRightArrow,
  Longleftrightarrow: Longleftrightarrow,
  longmapsto: longmapsto,
  longrightarrow: longrightarrow,
  LongRightArrow: LongRightArrow,
  Longrightarrow: Longrightarrow,
  looparrowleft: looparrowleft,
  looparrowright: looparrowright,
  lopar: lopar,
  Lopf: Lopf,
  lopf: lopf,
  loplus: loplus,
  lotimes: lotimes,
  lowast: lowast,
  lowbar: lowbar,
  LowerLeftArrow: LowerLeftArrow,
  LowerRightArrow: LowerRightArrow,
  loz: loz,
  lozenge: lozenge,
  lozf: lozf,
  lpar: lpar,
  lparlt: lparlt,
  lrarr: lrarr,
  lrcorner: lrcorner,
  lrhar: lrhar,
  lrhard: lrhard,
  lrm: lrm,
  lrtri: lrtri,
  lsaquo: lsaquo,
  lscr: lscr,
  Lscr: Lscr,
  lsh: lsh,
  Lsh: Lsh,
  lsim: lsim,
  lsime: lsime,
  lsimg: lsimg,
  lsqb: lsqb,
  lsquo: lsquo,
  lsquor: lsquor,
  Lstrok: Lstrok,
  lstrok: lstrok,
  ltcc: ltcc,
  ltcir: ltcir,
  lt: lt,
  LT: LT,
  Lt: Lt,
  ltdot: ltdot,
  lthree: lthree,
  ltimes: ltimes,
  ltlarr: ltlarr,
  ltquest: ltquest,
  ltri: ltri,
  ltrie: ltrie,
  ltrif: ltrif,
  ltrPar: ltrPar,
  lurdshar: lurdshar,
  luruhar: luruhar,
  lvertneqq: lvertneqq,
  lvnE: lvnE,
  macr: macr,
  male: male,
  malt: malt,
  maltese: maltese,
  map: map,
  mapsto: mapsto,
  mapstodown: mapstodown,
  mapstoleft: mapstoleft,
  mapstoup: mapstoup,
  marker: marker,
  mcomma: mcomma,
  Mcy: Mcy,
  mcy: mcy,
  mdash: mdash,
  mDDot: mDDot,
  measuredangle: measuredangle,
  MediumSpace: MediumSpace,
  Mellintrf: Mellintrf,
  Mfr: Mfr,
  mfr: mfr,
  mho: mho,
  micro: micro,
  midast: midast,
  midcir: midcir,
  mid: mid,
  middot: middot,
  minusb: minusb,
  minus: minus,
  minusd: minusd,
  minusdu: minusdu,
  MinusPlus: MinusPlus,
  mlcp: mlcp,
  mldr: mldr,
  mnplus: mnplus,
  models: models,
  Mopf: Mopf,
  mopf: mopf,
  mp: mp,
  mscr: mscr,
  Mscr: Mscr,
  mstpos: mstpos,
  Mu: Mu,
  mu: mu,
  multimap: multimap,
  mumap: mumap,
  nabla: nabla,
  Nacute: Nacute,
  nacute: nacute,
  nang: nang,
  nap: nap,
  napE: napE,
  napid: napid,
  napos: napos,
  napprox: napprox,
  natural: natural,
  naturals: naturals,
  natur: natur,
  nbsp: nbsp,
  nbump: nbump,
  nbumpe: nbumpe,
  ncap: ncap,
  Ncaron: Ncaron,
  ncaron: ncaron,
  Ncedil: Ncedil,
  ncedil: ncedil,
  ncong: ncong,
  ncongdot: ncongdot,
  ncup: ncup,
  Ncy: Ncy,
  ncy: ncy,
  ndash: ndash,
  nearhk: nearhk,
  nearr: nearr,
  neArr: neArr,
  nearrow: nearrow,
  ne: ne,
  nedot: nedot,
  NegativeMediumSpace: NegativeMediumSpace,
  NegativeThickSpace: NegativeThickSpace,
  NegativeThinSpace: NegativeThinSpace,
  NegativeVeryThinSpace: NegativeVeryThinSpace,
  nequiv: nequiv,
  nesear: nesear,
  nesim: nesim,
  NestedGreaterGreater: NestedGreaterGreater,
  NestedLessLess: NestedLessLess,
  NewLine: NewLine,
  nexist: nexist,
  nexists: nexists,
  Nfr: Nfr,
  nfr: nfr,
  ngE: ngE,
  nge: nge,
  ngeq: ngeq,
  ngeqq: ngeqq,
  ngeqslant: ngeqslant,
  nges: nges,
  nGg: nGg,
  ngsim: ngsim,
  nGt: nGt,
  ngt: ngt,
  ngtr: ngtr,
  nGtv: nGtv,
  nharr: nharr,
  nhArr: nhArr,
  nhpar: nhpar,
  ni: ni,
  nis: nis,
  nisd: nisd,
  niv: niv,
  NJcy: NJcy,
  njcy: njcy,
  nlarr: nlarr,
  nlArr: nlArr,
  nldr: nldr,
  nlE: nlE,
  nle: nle,
  nleftarrow: nleftarrow,
  nLeftarrow: nLeftarrow,
  nleftrightarrow: nleftrightarrow,
  nLeftrightarrow: nLeftrightarrow,
  nleq: nleq,
  nleqq: nleqq,
  nleqslant: nleqslant,
  nles: nles,
  nless: nless,
  nLl: nLl,
  nlsim: nlsim,
  nLt: nLt,
  nlt: nlt,
  nltri: nltri,
  nltrie: nltrie,
  nLtv: nLtv,
  nmid: nmid,
  NoBreak: NoBreak,
  NonBreakingSpace: NonBreakingSpace,
  nopf: nopf,
  Nopf: Nopf,
  Not: Not,
  not: not,
  NotCongruent: NotCongruent,
  NotCupCap: NotCupCap,
  NotDoubleVerticalBar: NotDoubleVerticalBar,
  NotElement: NotElement,
  NotEqual: NotEqual,
  NotEqualTilde: NotEqualTilde,
  NotExists: NotExists,
  NotGreater: NotGreater,
  NotGreaterEqual: NotGreaterEqual,
  NotGreaterFullEqual: NotGreaterFullEqual,
  NotGreaterGreater: NotGreaterGreater,
  NotGreaterLess: NotGreaterLess,
  NotGreaterSlantEqual: NotGreaterSlantEqual,
  NotGreaterTilde: NotGreaterTilde,
  NotHumpDownHump: NotHumpDownHump,
  NotHumpEqual: NotHumpEqual,
  notin: notin,
  notindot: notindot,
  notinE: notinE,
  notinva: notinva,
  notinvb: notinvb,
  notinvc: notinvc,
  NotLeftTriangleBar: NotLeftTriangleBar,
  NotLeftTriangle: NotLeftTriangle,
  NotLeftTriangleEqual: NotLeftTriangleEqual,
  NotLess: NotLess,
  NotLessEqual: NotLessEqual,
  NotLessGreater: NotLessGreater,
  NotLessLess: NotLessLess,
  NotLessSlantEqual: NotLessSlantEqual,
  NotLessTilde: NotLessTilde,
  NotNestedGreaterGreater: NotNestedGreaterGreater,
  NotNestedLessLess: NotNestedLessLess,
  notni: notni,
  notniva: notniva,
  notnivb: notnivb,
  notnivc: notnivc,
  NotPrecedes: NotPrecedes,
  NotPrecedesEqual: NotPrecedesEqual,
  NotPrecedesSlantEqual: NotPrecedesSlantEqual,
  NotReverseElement: NotReverseElement,
  NotRightTriangleBar: NotRightTriangleBar,
  NotRightTriangle: NotRightTriangle,
  NotRightTriangleEqual: NotRightTriangleEqual,
  NotSquareSubset: NotSquareSubset,
  NotSquareSubsetEqual: NotSquareSubsetEqual,
  NotSquareSuperset: NotSquareSuperset,
  NotSquareSupersetEqual: NotSquareSupersetEqual,
  NotSubset: NotSubset,
  NotSubsetEqual: NotSubsetEqual,
  NotSucceeds: NotSucceeds,
  NotSucceedsEqual: NotSucceedsEqual,
  NotSucceedsSlantEqual: NotSucceedsSlantEqual,
  NotSucceedsTilde: NotSucceedsTilde,
  NotSuperset: NotSuperset,
  NotSupersetEqual: NotSupersetEqual,
  NotTilde: NotTilde,
  NotTildeEqual: NotTildeEqual,
  NotTildeFullEqual: NotTildeFullEqual,
  NotTildeTilde: NotTildeTilde,
  NotVerticalBar: NotVerticalBar,
  nparallel: nparallel,
  npar: npar,
  nparsl: nparsl,
  npart: npart,
  npolint: npolint,
  npr: npr,
  nprcue: nprcue,
  nprec: nprec,
  npreceq: npreceq,
  npre: npre,
  nrarrc: nrarrc,
  nrarr: nrarr,
  nrArr: nrArr,
  nrarrw: nrarrw,
  nrightarrow: nrightarrow,
  nRightarrow: nRightarrow,
  nrtri: nrtri,
  nrtrie: nrtrie,
  nsc: nsc,
  nsccue: nsccue,
  nsce: nsce,
  Nscr: Nscr,
  nscr: nscr,
  nshortmid: nshortmid,
  nshortparallel: nshortparallel,
  nsim: nsim,
  nsime: nsime,
  nsimeq: nsimeq,
  nsmid: nsmid,
  nspar: nspar,
  nsqsube: nsqsube,
  nsqsupe: nsqsupe,
  nsub: nsub,
  nsubE: nsubE,
  nsube: nsube,
  nsubset: nsubset,
  nsubseteq: nsubseteq,
  nsubseteqq: nsubseteqq,
  nsucc: nsucc,
  nsucceq: nsucceq,
  nsup: nsup,
  nsupE: nsupE,
  nsupe: nsupe,
  nsupset: nsupset,
  nsupseteq: nsupseteq,
  nsupseteqq: nsupseteqq,
  ntgl: ntgl,
  Ntilde: Ntilde,
  ntilde: ntilde,
  ntlg: ntlg,
  ntriangleleft: ntriangleleft,
  ntrianglelefteq: ntrianglelefteq,
  ntriangleright: ntriangleright,
  ntrianglerighteq: ntrianglerighteq,
  Nu: Nu,
  nu: nu,
  num: num,
  numero: numero,
  numsp: numsp,
  nvap: nvap,
  nvdash: nvdash,
  nvDash: nvDash,
  nVdash: nVdash,
  nVDash: nVDash,
  nvge: nvge,
  nvgt: nvgt,
  nvHarr: nvHarr,
  nvinfin: nvinfin,
  nvlArr: nvlArr,
  nvle: nvle,
  nvlt: nvlt,
  nvltrie: nvltrie,
  nvrArr: nvrArr,
  nvrtrie: nvrtrie,
  nvsim: nvsim,
  nwarhk: nwarhk,
  nwarr: nwarr,
  nwArr: nwArr,
  nwarrow: nwarrow,
  nwnear: nwnear,
  Oacute: Oacute,
  oacute: oacute,
  oast: oast,
  Ocirc: Ocirc,
  ocirc: ocirc,
  ocir: ocir,
  Ocy: Ocy,
  ocy: ocy,
  odash: odash,
  Odblac: Odblac,
  odblac: odblac,
  odiv: odiv,
  odot: odot,
  odsold: odsold,
  OElig: OElig,
  oelig: oelig,
  ofcir: ofcir,
  Ofr: Ofr,
  ofr: ofr,
  ogon: ogon,
  Ograve: Ograve,
  ograve: ograve,
  ogt: ogt,
  ohbar: ohbar,
  ohm: ohm,
  oint: oint,
  olarr: olarr,
  olcir: olcir,
  olcross: olcross,
  oline: oline,
  olt: olt,
  Omacr: Omacr,
  omacr: omacr,
  Omega: Omega,
  omega: omega,
  Omicron: Omicron,
  omicron: omicron,
  omid: omid,
  ominus: ominus,
  Oopf: Oopf,
  oopf: oopf,
  opar: opar,
  OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
  OpenCurlyQuote: OpenCurlyQuote,
  operp: operp,
  oplus: oplus,
  orarr: orarr,
  Or: Or,
  or: or,
  ord: ord,
  order: order,
  orderof: orderof,
  ordf: ordf,
  ordm: ordm,
  origof: origof,
  oror: oror,
  orslope: orslope,
  orv: orv,
  oS: oS,
  Oscr: Oscr,
  oscr: oscr,
  Oslash: Oslash,
  oslash: oslash,
  osol: osol,
  Otilde: Otilde,
  otilde: otilde,
  otimesas: otimesas,
  Otimes: Otimes,
  otimes: otimes,
  Ouml: Ouml,
  ouml: ouml,
  ovbar: ovbar,
  OverBar: OverBar,
  OverBrace: OverBrace,
  OverBracket: OverBracket,
  OverParenthesis: OverParenthesis,
  para: para,
  parallel: parallel,
  par: par,
  parsim: parsim,
  parsl: parsl,
  part: part,
  PartialD: PartialD,
  Pcy: Pcy,
  pcy: pcy,
  percnt: percnt,
  period: period,
  permil: permil,
  perp: perp,
  pertenk: pertenk,
  Pfr: Pfr,
  pfr: pfr,
  Phi: Phi,
  phi: phi,
  phiv: phiv,
  phmmat: phmmat,
  phone: phone,
  Pi: Pi,
  pi: pi,
  pitchfork: pitchfork,
  piv: piv,
  planck: planck,
  planckh: planckh,
  plankv: plankv,
  plusacir: plusacir,
  plusb: plusb,
  pluscir: pluscir,
  plus: plus,
  plusdo: plusdo,
  plusdu: plusdu,
  pluse: pluse,
  PlusMinus: PlusMinus,
  plusmn: plusmn,
  plussim: plussim,
  plustwo: plustwo,
  pm: pm,
  Poincareplane: Poincareplane,
  pointint: pointint,
  popf: popf,
  Popf: Popf,
  pound: pound,
  prap: prap,
  Pr: Pr,
  pr: pr,
  prcue: prcue,
  precapprox: precapprox,
  prec: prec,
  preccurlyeq: preccurlyeq,
  Precedes: Precedes,
  PrecedesEqual: PrecedesEqual,
  PrecedesSlantEqual: PrecedesSlantEqual,
  PrecedesTilde: PrecedesTilde,
  preceq: preceq,
  precnapprox: precnapprox,
  precneqq: precneqq,
  precnsim: precnsim,
  pre: pre,
  prE: prE,
  precsim: precsim,
  prime: prime,
  Prime: Prime,
  primes: primes,
  prnap: prnap,
  prnE: prnE,
  prnsim: prnsim,
  prod: prod,
  Product: Product,
  profalar: profalar,
  profline: profline,
  profsurf: profsurf,
  prop: prop,
  Proportional: Proportional,
  Proportion: Proportion,
  propto: propto,
  prsim: prsim,
  prurel: prurel,
  Pscr: Pscr,
  pscr: pscr,
  Psi: Psi,
  psi: psi,
  puncsp: puncsp,
  Qfr: Qfr,
  qfr: qfr,
  qint: qint,
  qopf: qopf,
  Qopf: Qopf,
  qprime: qprime,
  Qscr: Qscr,
  qscr: qscr,
  quaternions: quaternions,
  quatint: quatint,
  quest: quest,
  questeq: questeq,
  quot: quot,
  QUOT: QUOT,
  rAarr: rAarr,
  race: race,
  Racute: Racute,
  racute: racute,
  radic: radic,
  raemptyv: raemptyv,
  rang: rang,
  Rang: Rang,
  rangd: rangd,
  range: range,
  rangle: rangle,
  raquo: raquo,
  rarrap: rarrap,
  rarrb: rarrb,
  rarrbfs: rarrbfs,
  rarrc: rarrc,
  rarr: rarr,
  Rarr: Rarr,
  rArr: rArr,
  rarrfs: rarrfs,
  rarrhk: rarrhk,
  rarrlp: rarrlp,
  rarrpl: rarrpl,
  rarrsim: rarrsim,
  Rarrtl: Rarrtl,
  rarrtl: rarrtl,
  rarrw: rarrw,
  ratail: ratail,
  rAtail: rAtail,
  ratio: ratio,
  rationals: rationals,
  rbarr: rbarr,
  rBarr: rBarr,
  RBarr: RBarr,
  rbbrk: rbbrk,
  rbrace: rbrace,
  rbrack: rbrack,
  rbrke: rbrke,
  rbrksld: rbrksld,
  rbrkslu: rbrkslu,
  Rcaron: Rcaron,
  rcaron: rcaron,
  Rcedil: Rcedil,
  rcedil: rcedil,
  rceil: rceil,
  rcub: rcub,
  Rcy: Rcy,
  rcy: rcy,
  rdca: rdca,
  rdldhar: rdldhar,
  rdquo: rdquo,
  rdquor: rdquor,
  rdsh: rdsh,
  real: real,
  realine: realine,
  realpart: realpart,
  reals: reals,
  Re: Re,
  rect: rect,
  reg: reg,
  REG: REG,
  ReverseElement: ReverseElement,
  ReverseEquilibrium: ReverseEquilibrium,
  ReverseUpEquilibrium: ReverseUpEquilibrium,
  rfisht: rfisht,
  rfloor: rfloor,
  rfr: rfr,
  Rfr: Rfr,
  rHar: rHar,
  rhard: rhard,
  rharu: rharu,
  rharul: rharul,
  Rho: Rho,
  rho: rho,
  rhov: rhov,
  RightAngleBracket: RightAngleBracket,
  RightArrowBar: RightArrowBar,
  rightarrow: rightarrow,
  RightArrow: RightArrow,
  Rightarrow: Rightarrow,
  RightArrowLeftArrow: RightArrowLeftArrow,
  rightarrowtail: rightarrowtail,
  RightCeiling: RightCeiling,
  RightDoubleBracket: RightDoubleBracket,
  RightDownTeeVector: RightDownTeeVector,
  RightDownVectorBar: RightDownVectorBar,
  RightDownVector: RightDownVector,
  RightFloor: RightFloor,
  rightharpoondown: rightharpoondown,
  rightharpoonup: rightharpoonup,
  rightleftarrows: rightleftarrows,
  rightleftharpoons: rightleftharpoons,
  rightrightarrows: rightrightarrows,
  rightsquigarrow: rightsquigarrow,
  RightTeeArrow: RightTeeArrow,
  RightTee: RightTee,
  RightTeeVector: RightTeeVector,
  rightthreetimes: rightthreetimes,
  RightTriangleBar: RightTriangleBar,
  RightTriangle: RightTriangle,
  RightTriangleEqual: RightTriangleEqual,
  RightUpDownVector: RightUpDownVector,
  RightUpTeeVector: RightUpTeeVector,
  RightUpVectorBar: RightUpVectorBar,
  RightUpVector: RightUpVector,
  RightVectorBar: RightVectorBar,
  RightVector: RightVector,
  ring: ring,
  risingdotseq: risingdotseq,
  rlarr: rlarr,
  rlhar: rlhar,
  rlm: rlm,
  rmoustache: rmoustache,
  rmoust: rmoust,
  rnmid: rnmid,
  roang: roang,
  roarr: roarr,
  robrk: robrk,
  ropar: ropar,
  ropf: ropf,
  Ropf: Ropf,
  roplus: roplus,
  rotimes: rotimes,
  RoundImplies: RoundImplies,
  rpar: rpar,
  rpargt: rpargt,
  rppolint: rppolint,
  rrarr: rrarr,
  Rrightarrow: Rrightarrow,
  rsaquo: rsaquo,
  rscr: rscr,
  Rscr: Rscr,
  rsh: rsh,
  Rsh: Rsh,
  rsqb: rsqb,
  rsquo: rsquo,
  rsquor: rsquor,
  rthree: rthree,
  rtimes: rtimes,
  rtri: rtri,
  rtrie: rtrie,
  rtrif: rtrif,
  rtriltri: rtriltri,
  RuleDelayed: RuleDelayed,
  ruluhar: ruluhar,
  rx: rx,
  Sacute: Sacute,
  sacute: sacute,
  sbquo: sbquo,
  scap: scap,
  Scaron: Scaron,
  scaron: scaron,
  Sc: Sc,
  sc: sc,
  sccue: sccue,
  sce: sce,
  scE: scE,
  Scedil: Scedil,
  scedil: scedil,
  Scirc: Scirc,
  scirc: scirc,
  scnap: scnap,
  scnE: scnE,
  scnsim: scnsim,
  scpolint: scpolint,
  scsim: scsim,
  Scy: Scy,
  scy: scy,
  sdotb: sdotb,
  sdot: sdot,
  sdote: sdote,
  searhk: searhk,
  searr: searr,
  seArr: seArr,
  searrow: searrow,
  sect: sect,
  semi: semi,
  seswar: seswar,
  setminus: setminus,
  setmn: setmn,
  sext: sext,
  Sfr: Sfr,
  sfr: sfr,
  sfrown: sfrown,
  sharp: sharp,
  SHCHcy: SHCHcy,
  shchcy: shchcy,
  SHcy: SHcy,
  shcy: shcy,
  ShortDownArrow: ShortDownArrow,
  ShortLeftArrow: ShortLeftArrow,
  shortmid: shortmid,
  shortparallel: shortparallel,
  ShortRightArrow: ShortRightArrow,
  ShortUpArrow: ShortUpArrow,
  shy: shy,
  Sigma: Sigma,
  sigma: sigma,
  sigmaf: sigmaf,
  sigmav: sigmav,
  sim: sim,
  simdot: simdot,
  sime: sime,
  simeq: simeq,
  simg: simg,
  simgE: simgE,
  siml: siml,
  simlE: simlE,
  simne: simne,
  simplus: simplus,
  simrarr: simrarr,
  slarr: slarr,
  SmallCircle: SmallCircle,
  smallsetminus: smallsetminus,
  smashp: smashp,
  smeparsl: smeparsl,
  smid: smid,
  smile: smile,
  smt: smt,
  smte: smte,
  smtes: smtes,
  SOFTcy: SOFTcy,
  softcy: softcy,
  solbar: solbar,
  solb: solb,
  sol: sol,
  Sopf: Sopf,
  sopf: sopf,
  spades: spades,
  spadesuit: spadesuit,
  spar: spar,
  sqcap: sqcap,
  sqcaps: sqcaps,
  sqcup: sqcup,
  sqcups: sqcups,
  Sqrt: Sqrt,
  sqsub: sqsub,
  sqsube: sqsube,
  sqsubset: sqsubset,
  sqsubseteq: sqsubseteq,
  sqsup: sqsup,
  sqsupe: sqsupe,
  sqsupset: sqsupset,
  sqsupseteq: sqsupseteq,
  square: square,
  Square: Square,
  SquareIntersection: SquareIntersection,
  SquareSubset: SquareSubset,
  SquareSubsetEqual: SquareSubsetEqual,
  SquareSuperset: SquareSuperset,
  SquareSupersetEqual: SquareSupersetEqual,
  SquareUnion: SquareUnion,
  squarf: squarf,
  squ: squ,
  squf: squf,
  srarr: srarr,
  Sscr: Sscr,
  sscr: sscr,
  ssetmn: ssetmn,
  ssmile: ssmile,
  sstarf: sstarf,
  Star: Star,
  star: star,
  starf: starf,
  straightepsilon: straightepsilon,
  straightphi: straightphi,
  strns: strns,
  sub: sub,
  Sub: Sub,
  subdot: subdot,
  subE: subE,
  sube: sube,
  subedot: subedot,
  submult: submult,
  subnE: subnE,
  subne: subne,
  subplus: subplus,
  subrarr: subrarr,
  subset: subset,
  Subset: Subset,
  subseteq: subseteq,
  subseteqq: subseteqq,
  SubsetEqual: SubsetEqual,
  subsetneq: subsetneq,
  subsetneqq: subsetneqq,
  subsim: subsim,
  subsub: subsub,
  subsup: subsup,
  succapprox: succapprox,
  succ: succ,
  succcurlyeq: succcurlyeq,
  Succeeds: Succeeds,
  SucceedsEqual: SucceedsEqual,
  SucceedsSlantEqual: SucceedsSlantEqual,
  SucceedsTilde: SucceedsTilde,
  succeq: succeq,
  succnapprox: succnapprox,
  succneqq: succneqq,
  succnsim: succnsim,
  succsim: succsim,
  SuchThat: SuchThat,
  sum: sum,
  Sum: Sum,
  sung: sung,
  sup1: sup1,
  sup2: sup2,
  sup3: sup3,
  sup: sup,
  Sup: Sup,
  supdot: supdot,
  supdsub: supdsub,
  supE: supE,
  supe: supe,
  supedot: supedot,
  Superset: Superset,
  SupersetEqual: SupersetEqual,
  suphsol: suphsol,
  suphsub: suphsub,
  suplarr: suplarr,
  supmult: supmult,
  supnE: supnE,
  supne: supne,
  supplus: supplus,
  supset: supset,
  Supset: Supset,
  supseteq: supseteq,
  supseteqq: supseteqq,
  supsetneq: supsetneq,
  supsetneqq: supsetneqq,
  supsim: supsim,
  supsub: supsub,
  supsup: supsup,
  swarhk: swarhk,
  swarr: swarr,
  swArr: swArr,
  swarrow: swarrow,
  swnwar: swnwar,
  szlig: szlig,
  Tab: Tab,
  target: target,
  Tau: Tau,
  tau: tau,
  tbrk: tbrk,
  Tcaron: Tcaron,
  tcaron: tcaron,
  Tcedil: Tcedil,
  tcedil: tcedil,
  Tcy: Tcy,
  tcy: tcy,
  tdot: tdot,
  telrec: telrec,
  Tfr: Tfr,
  tfr: tfr,
  there4: there4,
  therefore: therefore,
  Therefore: Therefore,
  Theta: Theta,
  theta: theta,
  thetasym: thetasym,
  thetav: thetav,
  thickapprox: thickapprox,
  thicksim: thicksim,
  ThickSpace: ThickSpace,
  ThinSpace: ThinSpace,
  thinsp: thinsp,
  thkap: thkap,
  thksim: thksim,
  THORN: THORN,
  thorn: thorn,
  tilde: tilde,
  Tilde: Tilde,
  TildeEqual: TildeEqual,
  TildeFullEqual: TildeFullEqual,
  TildeTilde: TildeTilde,
  timesbar: timesbar,
  timesb: timesb,
  times: times,
  timesd: timesd,
  tint: tint,
  toea: toea,
  topbot: topbot,
  topcir: topcir,
  top: top,
  Topf: Topf,
  topf: topf,
  topfork: topfork,
  tosa: tosa,
  tprime: tprime,
  trade: trade,
  TRADE: TRADE,
  triangle: triangle,
  triangledown: triangledown,
  triangleleft: triangleleft,
  trianglelefteq: trianglelefteq,
  triangleq: triangleq,
  triangleright: triangleright,
  trianglerighteq: trianglerighteq,
  tridot: tridot,
  trie: trie,
  triminus: triminus,
  TripleDot: TripleDot,
  triplus: triplus,
  trisb: trisb,
  tritime: tritime,
  trpezium: trpezium,
  Tscr: Tscr,
  tscr: tscr,
  TScy: TScy,
  tscy: tscy,
  TSHcy: TSHcy,
  tshcy: tshcy,
  Tstrok: Tstrok,
  tstrok: tstrok,
  twixt: twixt,
  twoheadleftarrow: twoheadleftarrow,
  twoheadrightarrow: twoheadrightarrow,
  Uacute: Uacute,
  uacute: uacute,
  uarr: uarr,
  Uarr: Uarr,
  uArr: uArr,
  Uarrocir: Uarrocir,
  Ubrcy: Ubrcy,
  ubrcy: ubrcy,
  Ubreve: Ubreve,
  ubreve: ubreve,
  Ucirc: Ucirc,
  ucirc: ucirc,
  Ucy: Ucy,
  ucy: ucy,
  udarr: udarr,
  Udblac: Udblac,
  udblac: udblac,
  udhar: udhar,
  ufisht: ufisht,
  Ufr: Ufr,
  ufr: ufr,
  Ugrave: Ugrave,
  ugrave: ugrave,
  uHar: uHar,
  uharl: uharl,
  uharr: uharr,
  uhblk: uhblk,
  ulcorn: ulcorn,
  ulcorner: ulcorner,
  ulcrop: ulcrop,
  ultri: ultri,
  Umacr: Umacr,
  umacr: umacr,
  uml: uml,
  UnderBar: UnderBar,
  UnderBrace: UnderBrace,
  UnderBracket: UnderBracket,
  UnderParenthesis: UnderParenthesis,
  Union: Union,
  UnionPlus: UnionPlus,
  Uogon: Uogon,
  uogon: uogon,
  Uopf: Uopf,
  uopf: uopf,
  UpArrowBar: UpArrowBar,
  uparrow: uparrow,
  UpArrow: UpArrow,
  Uparrow: Uparrow,
  UpArrowDownArrow: UpArrowDownArrow,
  updownarrow: updownarrow,
  UpDownArrow: UpDownArrow,
  Updownarrow: Updownarrow,
  UpEquilibrium: UpEquilibrium,
  upharpoonleft: upharpoonleft,
  upharpoonright: upharpoonright,
  uplus: uplus,
  UpperLeftArrow: UpperLeftArrow,
  UpperRightArrow: UpperRightArrow,
  upsi: upsi,
  Upsi: Upsi,
  upsih: upsih,
  Upsilon: Upsilon,
  upsilon: upsilon,
  UpTeeArrow: UpTeeArrow,
  UpTee: UpTee,
  upuparrows: upuparrows,
  urcorn: urcorn,
  urcorner: urcorner,
  urcrop: urcrop,
  Uring: Uring,
  uring: uring,
  urtri: urtri,
  Uscr: Uscr,
  uscr: uscr,
  utdot: utdot,
  Utilde: Utilde,
  utilde: utilde,
  utri: utri,
  utrif: utrif,
  uuarr: uuarr,
  Uuml: Uuml,
  uuml: uuml,
  uwangle: uwangle,
  vangrt: vangrt,
  varepsilon: varepsilon,
  varkappa: varkappa,
  varnothing: varnothing,
  varphi: varphi,
  varpi: varpi,
  varpropto: varpropto,
  varr: varr,
  vArr: vArr,
  varrho: varrho,
  varsigma: varsigma,
  varsubsetneq: varsubsetneq,
  varsubsetneqq: varsubsetneqq,
  varsupsetneq: varsupsetneq,
  varsupsetneqq: varsupsetneqq,
  vartheta: vartheta,
  vartriangleleft: vartriangleleft,
  vartriangleright: vartriangleright,
  vBar: vBar,
  Vbar: Vbar,
  vBarv: vBarv,
  Vcy: Vcy,
  vcy: vcy,
  vdash: vdash,
  vDash: vDash,
  Vdash: Vdash,
  VDash: VDash,
  Vdashl: Vdashl,
  veebar: veebar,
  vee: vee,
  Vee: Vee,
  veeeq: veeeq,
  vellip: vellip,
  verbar: verbar,
  Verbar: Verbar,
  vert: vert,
  Vert: Vert,
  VerticalBar: VerticalBar,
  VerticalLine: VerticalLine,
  VerticalSeparator: VerticalSeparator,
  VerticalTilde: VerticalTilde,
  VeryThinSpace: VeryThinSpace,
  Vfr: Vfr,
  vfr: vfr,
  vltri: vltri,
  vnsub: vnsub,
  vnsup: vnsup,
  Vopf: Vopf,
  vopf: vopf,
  vprop: vprop,
  vrtri: vrtri,
  Vscr: Vscr,
  vscr: vscr,
  vsubnE: vsubnE,
  vsubne: vsubne,
  vsupnE: vsupnE,
  vsupne: vsupne,
  Vvdash: Vvdash,
  vzigzag: vzigzag,
  Wcirc: Wcirc,
  wcirc: wcirc,
  wedbar: wedbar,
  wedge: wedge,
  Wedge: Wedge,
  wedgeq: wedgeq,
  weierp: weierp,
  Wfr: Wfr,
  wfr: wfr,
  Wopf: Wopf,
  wopf: wopf,
  wp: wp,
  wr: wr,
  wreath: wreath,
  Wscr: Wscr,
  wscr: wscr,
  xcap: xcap,
  xcirc: xcirc,
  xcup: xcup,
  xdtri: xdtri,
  Xfr: Xfr,
  xfr: xfr,
  xharr: xharr,
  xhArr: xhArr,
  Xi: Xi,
  xi: xi,
  xlarr: xlarr,
  xlArr: xlArr,
  xmap: xmap,
  xnis: xnis,
  xodot: xodot,
  Xopf: Xopf,
  xopf: xopf,
  xoplus: xoplus,
  xotime: xotime,
  xrarr: xrarr,
  xrArr: xrArr,
  Xscr: Xscr,
  xscr: xscr,
  xsqcup: xsqcup,
  xuplus: xuplus,
  xutri: xutri,
  xvee: xvee,
  xwedge: xwedge,
  Yacute: Yacute,
  yacute: yacute,
  YAcy: YAcy,
  yacy: yacy,
  Ycirc: Ycirc,
  ycirc: ycirc,
  Ycy: Ycy,
  ycy: ycy,
  yen: yen,
  Yfr: Yfr,
  yfr: yfr,
  YIcy: YIcy,
  yicy: yicy,
  Yopf: Yopf,
  yopf: yopf,
  Yscr: Yscr,
  yscr: yscr,
  YUcy: YUcy,
  yucy: yucy,
  yuml: yuml,
  Yuml: Yuml,
  Zacute: Zacute,
  zacute: zacute,
  Zcaron: Zcaron,
  zcaron: zcaron,
  Zcy: Zcy,
  zcy: zcy,
  Zdot: Zdot,
  zdot: zdot,
  zeetrf: zeetrf,
  ZeroWidthSpace: ZeroWidthSpace,
  Zeta: Zeta,
  zeta: zeta,
  zfr: zfr,
  Zfr: Zfr,
  ZHcy: ZHcy,
  zhcy: zhcy,
  zigrarr: zigrarr,
  zopf: zopf,
  Zopf: Zopf,
  Zscr: Zscr,
  zscr: zscr,
  zwj: zwj,
  zwnj: zwnj,
  'default': entities
});

var Aacute$1 = "Á";
var aacute$1 = "á";
var Acirc$1 = "Â";
var acirc$1 = "â";
var acute$1 = "´";
var AElig$1 = "Æ";
var aelig$1 = "æ";
var Agrave$1 = "À";
var agrave$1 = "à";
var amp$1 = "&";
var AMP$1 = "&";
var Aring$1 = "Å";
var aring$1 = "å";
var Atilde$1 = "Ã";
var atilde$1 = "ã";
var Auml$1 = "Ä";
var auml$1 = "ä";
var brvbar$1 = "¦";
var Ccedil$1 = "Ç";
var ccedil$1 = "ç";
var cedil$1 = "¸";
var cent$1 = "¢";
var copy$1 = "©";
var COPY$1 = "©";
var curren$1 = "¤";
var deg$1 = "°";
var divide$1 = "÷";
var Eacute$1 = "É";
var eacute$1 = "é";
var Ecirc$1 = "Ê";
var ecirc$1 = "ê";
var Egrave$1 = "È";
var egrave$1 = "è";
var ETH$1 = "Ð";
var eth$1 = "ð";
var Euml$1 = "Ë";
var euml$1 = "ë";
var frac12$1 = "½";
var frac14$1 = "¼";
var frac34$1 = "¾";
var gt$1 = ">";
var GT$1 = ">";
var Iacute$1 = "Í";
var iacute$1 = "í";
var Icirc$1 = "Î";
var icirc$1 = "î";
var iexcl$1 = "¡";
var Igrave$1 = "Ì";
var igrave$1 = "ì";
var iquest$1 = "¿";
var Iuml$1 = "Ï";
var iuml$1 = "ï";
var laquo$1 = "«";
var lt$1 = "<";
var LT$1 = "<";
var macr$1 = "¯";
var micro$1 = "µ";
var middot$1 = "·";
var nbsp$1 = " ";
var not$1 = "¬";
var Ntilde$1 = "Ñ";
var ntilde$1 = "ñ";
var Oacute$1 = "Ó";
var oacute$1 = "ó";
var Ocirc$1 = "Ô";
var ocirc$1 = "ô";
var Ograve$1 = "Ò";
var ograve$1 = "ò";
var ordf$1 = "ª";
var ordm$1 = "º";
var Oslash$1 = "Ø";
var oslash$1 = "ø";
var Otilde$1 = "Õ";
var otilde$1 = "õ";
var Ouml$1 = "Ö";
var ouml$1 = "ö";
var para$1 = "¶";
var plusmn$1 = "±";
var pound$1 = "£";
var quot$1 = "\"";
var QUOT$1 = "\"";
var raquo$1 = "»";
var reg$1 = "®";
var REG$1 = "®";
var sect$1 = "§";
var shy$1 = "­";
var sup1$1 = "¹";
var sup2$1 = "²";
var sup3$1 = "³";
var szlig$1 = "ß";
var THORN$1 = "Þ";
var thorn$1 = "þ";
var times$1 = "×";
var Uacute$1 = "Ú";
var uacute$1 = "ú";
var Ucirc$1 = "Û";
var ucirc$1 = "û";
var Ugrave$1 = "Ù";
var ugrave$1 = "ù";
var uml$1 = "¨";
var Uuml$1 = "Ü";
var uuml$1 = "ü";
var Yacute$1 = "Ý";
var yacute$1 = "ý";
var yen$1 = "¥";
var yuml$1 = "ÿ";
var legacy = {
	Aacute: Aacute$1,
	aacute: aacute$1,
	Acirc: Acirc$1,
	acirc: acirc$1,
	acute: acute$1,
	AElig: AElig$1,
	aelig: aelig$1,
	Agrave: Agrave$1,
	agrave: agrave$1,
	amp: amp$1,
	AMP: AMP$1,
	Aring: Aring$1,
	aring: aring$1,
	Atilde: Atilde$1,
	atilde: atilde$1,
	Auml: Auml$1,
	auml: auml$1,
	brvbar: brvbar$1,
	Ccedil: Ccedil$1,
	ccedil: ccedil$1,
	cedil: cedil$1,
	cent: cent$1,
	copy: copy$1,
	COPY: COPY$1,
	curren: curren$1,
	deg: deg$1,
	divide: divide$1,
	Eacute: Eacute$1,
	eacute: eacute$1,
	Ecirc: Ecirc$1,
	ecirc: ecirc$1,
	Egrave: Egrave$1,
	egrave: egrave$1,
	ETH: ETH$1,
	eth: eth$1,
	Euml: Euml$1,
	euml: euml$1,
	frac12: frac12$1,
	frac14: frac14$1,
	frac34: frac34$1,
	gt: gt$1,
	GT: GT$1,
	Iacute: Iacute$1,
	iacute: iacute$1,
	Icirc: Icirc$1,
	icirc: icirc$1,
	iexcl: iexcl$1,
	Igrave: Igrave$1,
	igrave: igrave$1,
	iquest: iquest$1,
	Iuml: Iuml$1,
	iuml: iuml$1,
	laquo: laquo$1,
	lt: lt$1,
	LT: LT$1,
	macr: macr$1,
	micro: micro$1,
	middot: middot$1,
	nbsp: nbsp$1,
	not: not$1,
	Ntilde: Ntilde$1,
	ntilde: ntilde$1,
	Oacute: Oacute$1,
	oacute: oacute$1,
	Ocirc: Ocirc$1,
	ocirc: ocirc$1,
	Ograve: Ograve$1,
	ograve: ograve$1,
	ordf: ordf$1,
	ordm: ordm$1,
	Oslash: Oslash$1,
	oslash: oslash$1,
	Otilde: Otilde$1,
	otilde: otilde$1,
	Ouml: Ouml$1,
	ouml: ouml$1,
	para: para$1,
	plusmn: plusmn$1,
	pound: pound$1,
	quot: quot$1,
	QUOT: QUOT$1,
	raquo: raquo$1,
	reg: reg$1,
	REG: REG$1,
	sect: sect$1,
	shy: shy$1,
	sup1: sup1$1,
	sup2: sup2$1,
	sup3: sup3$1,
	szlig: szlig$1,
	THORN: THORN$1,
	thorn: thorn$1,
	times: times$1,
	Uacute: Uacute$1,
	uacute: uacute$1,
	Ucirc: Ucirc$1,
	ucirc: ucirc$1,
	Ugrave: Ugrave$1,
	ugrave: ugrave$1,
	uml: uml$1,
	Uuml: Uuml$1,
	uuml: uuml$1,
	Yacute: Yacute$1,
	yacute: yacute$1,
	yen: yen$1,
	yuml: yuml$1
};

var legacy$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Aacute: Aacute$1,
  aacute: aacute$1,
  Acirc: Acirc$1,
  acirc: acirc$1,
  acute: acute$1,
  AElig: AElig$1,
  aelig: aelig$1,
  Agrave: Agrave$1,
  agrave: agrave$1,
  amp: amp$1,
  AMP: AMP$1,
  Aring: Aring$1,
  aring: aring$1,
  Atilde: Atilde$1,
  atilde: atilde$1,
  Auml: Auml$1,
  auml: auml$1,
  brvbar: brvbar$1,
  Ccedil: Ccedil$1,
  ccedil: ccedil$1,
  cedil: cedil$1,
  cent: cent$1,
  copy: copy$1,
  COPY: COPY$1,
  curren: curren$1,
  deg: deg$1,
  divide: divide$1,
  Eacute: Eacute$1,
  eacute: eacute$1,
  Ecirc: Ecirc$1,
  ecirc: ecirc$1,
  Egrave: Egrave$1,
  egrave: egrave$1,
  ETH: ETH$1,
  eth: eth$1,
  Euml: Euml$1,
  euml: euml$1,
  frac12: frac12$1,
  frac14: frac14$1,
  frac34: frac34$1,
  gt: gt$1,
  GT: GT$1,
  Iacute: Iacute$1,
  iacute: iacute$1,
  Icirc: Icirc$1,
  icirc: icirc$1,
  iexcl: iexcl$1,
  Igrave: Igrave$1,
  igrave: igrave$1,
  iquest: iquest$1,
  Iuml: Iuml$1,
  iuml: iuml$1,
  laquo: laquo$1,
  lt: lt$1,
  LT: LT$1,
  macr: macr$1,
  micro: micro$1,
  middot: middot$1,
  nbsp: nbsp$1,
  not: not$1,
  Ntilde: Ntilde$1,
  ntilde: ntilde$1,
  Oacute: Oacute$1,
  oacute: oacute$1,
  Ocirc: Ocirc$1,
  ocirc: ocirc$1,
  Ograve: Ograve$1,
  ograve: ograve$1,
  ordf: ordf$1,
  ordm: ordm$1,
  Oslash: Oslash$1,
  oslash: oslash$1,
  Otilde: Otilde$1,
  otilde: otilde$1,
  Ouml: Ouml$1,
  ouml: ouml$1,
  para: para$1,
  plusmn: plusmn$1,
  pound: pound$1,
  quot: quot$1,
  QUOT: QUOT$1,
  raquo: raquo$1,
  reg: reg$1,
  REG: REG$1,
  sect: sect$1,
  shy: shy$1,
  sup1: sup1$1,
  sup2: sup2$1,
  sup3: sup3$1,
  szlig: szlig$1,
  THORN: THORN$1,
  thorn: thorn$1,
  times: times$1,
  Uacute: Uacute$1,
  uacute: uacute$1,
  Ucirc: Ucirc$1,
  ucirc: ucirc$1,
  Ugrave: Ugrave$1,
  ugrave: ugrave$1,
  uml: uml$1,
  Uuml: Uuml$1,
  uuml: uuml$1,
  Yacute: Yacute$1,
  yacute: yacute$1,
  yen: yen$1,
  yuml: yuml$1,
  'default': legacy
});

var amp$2 = "&";
var apos$1 = "'";
var gt$2 = ">";
var lt$2 = "<";
var quot$2 = "\"";
var xml = {
	amp: amp$2,
	apos: apos$1,
	gt: gt$2,
	lt: lt$2,
	quot: quot$2
};

var xml$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  amp: amp$2,
  apos: apos$1,
  gt: gt$2,
  lt: lt$2,
  quot: quot$2,
  'default': xml
});

var decode = {
	"0": 65533,
	"128": 8364,
	"130": 8218,
	"131": 402,
	"132": 8222,
	"133": 8230,
	"134": 8224,
	"135": 8225,
	"136": 710,
	"137": 8240,
	"138": 352,
	"139": 8249,
	"140": 338,
	"142": 381,
	"145": 8216,
	"146": 8217,
	"147": 8220,
	"148": 8221,
	"149": 8226,
	"150": 8211,
	"151": 8212,
	"152": 732,
	"153": 8482,
	"154": 353,
	"155": 8250,
	"156": 339,
	"158": 382,
	"159": 376
};

var decode$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': decode
});

var require$$0 = getCjsExportFromNamespace(decode$1);

var decode_codepoint = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decode_json_1 = __importDefault(require$$0);
// modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
function decodeCodePoint(codePoint) {
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return "\uFFFD";
    }
    if (codePoint in decode_json_1.default) {
        // @ts-ignore
        codePoint = decode_json_1.default[codePoint];
    }
    var output = "";
    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }
    output += String.fromCharCode(codePoint);
    return output;
}
exports.default = decodeCodePoint;
});

unwrapExports(decode_codepoint);

var require$$1 = getCjsExportFromNamespace(entities$1);

var require$$1$1 = getCjsExportFromNamespace(legacy$1);

var require$$0$1 = getCjsExportFromNamespace(xml$1);

var decode$2 = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var entities_json_1 = __importDefault(require$$1);
var legacy_json_1 = __importDefault(require$$1$1);
var xml_json_1 = __importDefault(require$$0$1);
var decode_codepoint_1 = __importDefault(decode_codepoint);
exports.decodeXML = getStrictDecoder(xml_json_1.default);
exports.decodeHTMLStrict = getStrictDecoder(entities_json_1.default);
function getStrictDecoder(map) {
    var keys = Object.keys(map).join("|");
    var replace = getReplacer(map);
    keys += "|#[xX][\\da-fA-F]+|#\\d+";
    var re = new RegExp("&(?:" + keys + ");", "g");
    return function (str) { return String(str).replace(re, replace); };
}
var sorter = function (a, b) { return (a < b ? 1 : -1); };
exports.decodeHTML = (function () {
    var legacy = Object.keys(legacy_json_1.default).sort(sorter);
    var keys = Object.keys(entities_json_1.default).sort(sorter);
    for (var i = 0, j = 0; i < keys.length; i++) {
        if (legacy[j] === keys[i]) {
            keys[i] += ";?";
            j++;
        }
        else {
            keys[i] += ";";
        }
    }
    var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g");
    var replace = getReplacer(entities_json_1.default);
    function replacer(str) {
        if (str.substr(-1) !== ";")
            str += ";";
        return replace(str);
    }
    //TODO consider creating a merged map
    return function (str) {
        return String(str).replace(re, replacer);
    };
})();
function getReplacer(map) {
    return function replace(str) {
        if (str.charAt(1) === "#") {
            if (str.charAt(2) === "X" || str.charAt(2) === "x") {
                return decode_codepoint_1.default(parseInt(str.substr(3), 16));
            }
            return decode_codepoint_1.default(parseInt(str.substr(2), 10));
        }
        return map[str.slice(1, -1)];
    };
}
});

unwrapExports(decode$2);
var decode_1 = decode$2.decodeXML;
var decode_2 = decode$2.decodeHTMLStrict;
var decode_3 = decode$2.decodeHTML;

var encode = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xml_json_1 = __importDefault(require$$0$1);
var inverseXML = getInverseObj(xml_json_1.default);
var xmlReplacer = getInverseReplacer(inverseXML);
exports.encodeXML = getInverse(inverseXML, xmlReplacer);
var entities_json_1 = __importDefault(require$$1);
var inverseHTML = getInverseObj(entities_json_1.default);
var htmlReplacer = getInverseReplacer(inverseHTML);
exports.encodeHTML = getInverse(inverseHTML, htmlReplacer);
function getInverseObj(obj) {
    return Object.keys(obj)
        .sort()
        .reduce(function (inverse, name) {
        inverse[obj[name]] = "&" + name + ";";
        return inverse;
    }, {});
}
function getInverseReplacer(inverse) {
    var single = [];
    var multiple = [];
    Object.keys(inverse).forEach(function (k) {
        return k.length === 1
            ? // Add value to single array
                single.push("\\" + k)
            : // Add value to multiple array
                multiple.push(k);
    });
    //TODO add ranges
    multiple.unshift("[" + single.join("") + "]");
    return new RegExp(multiple.join("|"), "g");
}
var reNonASCII = /[^\0-\x7F]/g;
var reAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
function singleCharReplacer(c) {
    return "&#x" + c
        .charCodeAt(0)
        .toString(16)
        .toUpperCase() + ";";
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function astralReplacer(c, _) {
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    var high = c.charCodeAt(0);
    var low = c.charCodeAt(1);
    var codePoint = (high - 0xd800) * 0x400 + low - 0xdc00 + 0x10000;
    return "&#x" + codePoint.toString(16).toUpperCase() + ";";
}
function getInverse(inverse, re) {
    return function (data) {
        return data
            .replace(re, function (name) { return inverse[name]; })
            .replace(reAstralSymbols, astralReplacer)
            .replace(reNonASCII, singleCharReplacer);
    };
}
var reXmlChars = getInverseReplacer(inverseXML);
function escape(data) {
    return data
        .replace(reXmlChars, singleCharReplacer)
        .replace(reAstralSymbols, astralReplacer)
        .replace(reNonASCII, singleCharReplacer);
}
exports.escape = escape;
});

unwrapExports(encode);
var encode_1 = encode.encodeXML;
var encode_2 = encode.encodeHTML;
var encode_3 = encode.escape;

var lib = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


function decode(data, level) {
    return (!level || level <= 0 ? decode$2.decodeXML : decode$2.decodeHTML)(data);
}
exports.decode = decode;
function decodeStrict(data, level) {
    return (!level || level <= 0 ? decode$2.decodeXML : decode$2.decodeHTMLStrict)(data);
}
exports.decodeStrict = decodeStrict;
function encode$1(data, level) {
    return (!level || level <= 0 ? encode.encodeXML : encode.encodeHTML)(data);
}
exports.encode = encode$1;
var encode_2 = encode;
exports.encodeXML = encode_2.encodeXML;
exports.encodeHTML = encode_2.encodeHTML;
exports.escape = encode_2.escape;
// Legacy aliases
exports.encodeHTML4 = encode_2.encodeHTML;
exports.encodeHTML5 = encode_2.encodeHTML;
var decode_2 = decode$2;
exports.decodeXML = decode_2.decodeXML;
exports.decodeHTML = decode_2.decodeHTML;
exports.decodeHTMLStrict = decode_2.decodeHTMLStrict;
// Legacy aliases
exports.decodeHTML4 = decode_2.decodeHTML;
exports.decodeHTML5 = decode_2.decodeHTML;
exports.decodeHTML4Strict = decode_2.decodeHTMLStrict;
exports.decodeHTML5Strict = decode_2.decodeHTMLStrict;
exports.decodeXMLStrict = decode_2.decodeXML;
});

unwrapExports(lib);
var lib_1 = lib.decode;
var lib_2 = lib.decodeStrict;
var lib_3 = lib.encode;
var lib_4 = lib.encodeXML;
var lib_5 = lib.encodeHTML;
var lib_6 = lib.escape;
var lib_7 = lib.encodeHTML4;
var lib_8 = lib.encodeHTML5;
var lib_9 = lib.decodeXML;
var lib_10 = lib.decodeHTML;
var lib_11 = lib.decodeHTMLStrict;
var lib_12 = lib.decodeHTML4;
var lib_13 = lib.decodeHTML5;
var lib_14 = lib.decodeHTML4Strict;
var lib_15 = lib.decodeHTML5Strict;
var lib_16 = lib.decodeXMLStrict;

/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Parse bpmn xml source
 */
class BpmnXmlParser {
    constructor() {
        this.options = {
            attributeNamePrefix: '',
            ignoreNameSpace: true,
            ignoreAttributes: false,
            parseAttributeValue: true,
            attrValueProcessor: (val) => {
                return lib_9(val);
            },
        };
    }
    // disable eslint as it comes from 3rd party
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parse(xml) {
        return parser_1(xml, this.options);
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var jsonConvertEnums = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enum for the operation mode of a JsonConvert instance.
 *
 * The values should be used as follows:
 * - DISABLE: json2typescript will be disabled, no type checking or mapping is done
 * - ENABLE: json2typescript is enabled, but only errors are logged
 * - LOGGING: json2typescript is enabled and detailed information is logged
 *
 * @author Andreas Aeschlimann, DHlab, University of Basel, Switzerland
 * @see https://www.npmjs.com/package/json2typescript full documentation
 */
var OperationMode;
(function (OperationMode) {
    OperationMode[OperationMode["DISABLE"] = 0] = "DISABLE";
    OperationMode[OperationMode["ENABLE"] = 1] = "ENABLE";
    OperationMode[OperationMode["LOGGING"] = 2] = "LOGGING";
})(OperationMode = exports.OperationMode || (exports.OperationMode = {}));
/**
 * Enum for the property matching mode of a JsonConvert instance.
 *
 * The values should be used as follows:
 * - CASE_STRICT: JSON properties need to match exactly the names in the decorators
 * - CASE_INSENSITIVE: JSON properties need to match names in the decorators, but names they are not case sensitive
 *
 * @author Andreas Aeschlimann, DHlab, University of Basel, Switzerland
 * @see https://www.npmjs.com/package/json2typescript full documentation
 */
var PropertyMatchingRule;
(function (PropertyMatchingRule) {
    PropertyMatchingRule[PropertyMatchingRule["CASE_STRICT"] = 1] = "CASE_STRICT";
    PropertyMatchingRule[PropertyMatchingRule["CASE_INSENSITIVE"] = 2] = "CASE_INSENSITIVE";
})(PropertyMatchingRule = exports.PropertyMatchingRule || (exports.PropertyMatchingRule = {}));
/**
 * Enum for the value checking mode of a JsonConvert instance.
 *
 * The values should be used as follows:
 * - ALLOW_NULL: all given values in the JSON are allowed to be null
 * - ALLOW_OBJECT_NULL: objects in the JSON are allowed to be null, primitive types are not allowed to be null
 * - DISALLOW_NULL: no null values are tolerated in the JSON
 *
 * @author Andreas Aeschlimann, DHlab, University of Basel, Switzerland
 * @see https://www.npmjs.com/package/json2typescript full documentation
 */
var ValueCheckingMode;
(function (ValueCheckingMode) {
    ValueCheckingMode[ValueCheckingMode["ALLOW_NULL"] = 1] = "ALLOW_NULL";
    ValueCheckingMode[ValueCheckingMode["ALLOW_OBJECT_NULL"] = 2] = "ALLOW_OBJECT_NULL";
    ValueCheckingMode[ValueCheckingMode["DISALLOW_NULL"] = 3] = "DISALLOW_NULL";
})(ValueCheckingMode = exports.ValueCheckingMode || (exports.ValueCheckingMode = {}));

});

unwrapExports(jsonConvertEnums);
var jsonConvertEnums_1 = jsonConvertEnums.OperationMode;
var jsonConvertEnums_2 = jsonConvertEnums.PropertyMatchingRule;
var jsonConvertEnums_3 = jsonConvertEnums.ValueCheckingMode;

var jsonConvertOptions = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal constants.
 */
var Settings = /** @class */ (function () {
    function Settings() {
    }
    Settings.MAPPING_PROPERTY = "__jsonconvert__mapping__";
    Settings.MAPPER_PROPERTY = "__jsonconvert__mapper__";
    Settings.CLASS_IDENTIFIER = "__jsonconvert__class_identifier__";
    return Settings;
}());
exports.Settings = Settings;
/**
 * Internal mapping options for a property.
 */
var MappingOptions = /** @class */ (function () {
    function MappingOptions() {
        this.classPropertyName = "";
        this.jsonPropertyName = "";
        this.expectedJsonType = undefined;
        this.isOptional = false;
        this.customConverter = null;
    }
    return MappingOptions;
}());
exports.MappingOptions = MappingOptions;

});

unwrapExports(jsonConvertOptions);
var jsonConvertOptions_1 = jsonConvertOptions.Settings;
var jsonConvertOptions_2 = jsonConvertOptions.MappingOptions;

var any = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Virtual any type for the property decorator.
 */
var Any = /** @class */ (function () {
    function Any() {
    }
    return Any;
}());
exports.Any = Any;

});

unwrapExports(any);
var any_1 = any.Any;

var jsonConvert = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



/**
 * Offers a simple API for mapping JSON objects to TypeScript/JavaScript classes and vice versa.
 *
 * @author Andreas Aeschlimann, DHlab, University of Basel, Switzerland
 * @see https://www.npmjs.com/package/json2typescript full documentation on NPM
 */
var JsonConvert = /** @class */ (function () {
    /////////////////
    // CONSTRUCTOR //
    /////////////////
    /**
     * Constructor.
     *
     * To learn more about the params, check the documentation of the equally named class properties.
     *
     * @param operationMode optional param (default: OperationMode.ENABLE)
     * @param valueCheckingMode optional param (default: ValueCheckingMode.ALLOW_OBJECT_NULL)
     * @param ignorePrimitiveChecks optional param (default: false)
     * @param propertyMatchingRule optional param (default: PropertyMatchingRule.CASE_STRICT)
     */
    function JsonConvert(operationMode, valueCheckingMode, ignorePrimitiveChecks, propertyMatchingRule) {
        ////////////////
        // PROPERTIES //
        ////////////////
        /**
         * Determines how the JsonConvert class instance should operate.
         *
         * You may assign three different values:
         * - OperationMode.DISABLE: json2typescript will be disabled, no type checking or mapping is done
         * - OperationMode.ENABLE: json2typescript is enabled, but only errors are logged
         * - OperationMode.LOGGING: json2typescript is enabled and detailed information is logged
         */
        this._operationMode = jsonConvertEnums.OperationMode.ENABLE;
        /**
         * Determines which types are allowed to be null.
         *
         * You may assign three different values:
         * - ValueCheckingMode.ALLOW_NULL: all given values in the JSON are allowed to be null
         * - ValueCheckingMode.ALLOW_OBJECT_NULL: objects in the JSON are allowed to be null, primitive types are not allowed to be null
         * - ValueCheckingMode.DISALLOW_NULL: no null values are tolerated in the JSON
         */
        this._valueCheckingMode = jsonConvertEnums.ValueCheckingMode.ALLOW_OBJECT_NULL;
        /**
         * Determines whether primitive types should be checked.
         * If true, it will be allowed to assign primitive to other primitive types.
         */
        this._ignorePrimitiveChecks = false;
        /**
         * Determines the rule of how JSON properties shall be matched with class properties during deserialization.
         *
         * You may assign the following values:
         * - PropertyMatchingRule.CASE_STRICT: JSON properties need to match exactly the names in the decorators
         * - PropertyMatchingRule.CASE_INSENSITIVE: JSON properties need to match names in the decorators, but names they are not case sensitive
         */
        this._propertyMatchingRule = jsonConvertEnums.PropertyMatchingRule.CASE_STRICT;
        if (operationMode !== undefined && operationMode in jsonConvertEnums.OperationMode)
            this.operationMode = operationMode;
        if (valueCheckingMode !== undefined && valueCheckingMode in jsonConvertEnums.ValueCheckingMode)
            this.valueCheckingMode = valueCheckingMode;
        if (ignorePrimitiveChecks !== undefined)
            this.ignorePrimitiveChecks = ignorePrimitiveChecks;
        if (propertyMatchingRule !== undefined)
            this.propertyMatchingRule = propertyMatchingRule;
    }
    Object.defineProperty(JsonConvert.prototype, "operationMode", {
        /**
         * Determines how the JsonConvert class instance should operate.
         *
         * You may assign three different values:
         * - OperationMode.DISABLE: json2typescript will be disabled, no type checking or mapping is done
         * - OperationMode.ENABLE: json2typescript is enabled, but only errors are logged
         * - OperationMode.LOGGING: json2typescript is enabled and detailed information is logged
         * @returns {number}
         */
        get: function () {
            return this._operationMode;
        },
        /**
         * Determines how the JsonConvert class instance should operate.
         *
         * You may assign three different values:
         * - OperationMode.DISABLE: json2typescript will be disabled, no type checking or mapping is done
         * - OperationMode.ENABLE: json2typescript is enabled, but only errors are logged
         * - OperationMode.LOGGING: json2typescript is enabled and detailed information is logged
         * @param value
         */
        set: function (value) {
            if (value in jsonConvertEnums.OperationMode)
                this._operationMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonConvert.prototype, "valueCheckingMode", {
        /**
         * Determines which types are allowed to be null.
         *
         * You may assign three different values:
         * - ValueCheckingMode.ALLOW_NULL: all given values in the JSON are allowed to be null
         * - ValueCheckingMode.ALLOW_OBJECT_NULL: objects in the JSON are allowed to be null, primitive types are not allowed to be null
         * - ValueCheckingMode.DISALLOW_NULL: no null values are tolerated in the JSON
         *
         * @returns {number}
         */
        get: function () {
            return this._valueCheckingMode;
        },
        /**
         * Determines which types are allowed to be null.
         *
         * You may assign three different values:
         * - ValueCheckingMode.ALLOW_NULL: all given values in the JSON are allowed to be null
         * - ValueCheckingMode.ALLOW_OBJECT_NULL: objects in the JSON are allowed to be null, primitive types are not allowed to be null
         * - ValueCheckingMode.DISALLOW_NULL: no null values are tolerated in the JSON
         *
         * @param value
         */
        set: function (value) {
            if (value in jsonConvertEnums.ValueCheckingMode)
                this._valueCheckingMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonConvert.prototype, "ignorePrimitiveChecks", {
        /**
         * Determines whether primitive types should be checked.
         * If true, it will be allowed to assign primitive to other primitive types.
         *
         * @returns {boolean}
         */
        get: function () {
            return this._ignorePrimitiveChecks;
        },
        /**
         * Determines whether primitive types should be checked.
         * If true, it will be allowed to assign primitive to other primitive types.
         *
         * @param value
         */
        set: function (value) {
            this._ignorePrimitiveChecks = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonConvert.prototype, "propertyMatchingRule", {
        /**
         * Determines the rule of how JSON properties shall be matched with class properties during deserialization.
         *
         * You may assign the following values:
         * - PropertyMatchingRule.CASE_STRICT: JSON properties need to match exactly the names in the decorators
         * - PropertyMatchingRule.CASE_INSENSITIVE: JSON properties need to match names in the decorators, but names they are not case sensitive
         * @returns {number}
         */
        get: function () {
            return this._propertyMatchingRule;
        },
        /**
         * Determines the rule of how JSON properties shall be matched with class properties during deserialization.
         *
         * You may assign the following values:
         * - PropertyMatchingRule.CASE_STRICT: JSON properties need to match exactly the names in the decorators
         * - PropertyMatchingRule.CASE_INSENSITIVE: JSON properties need to match names in the decorators, but names they are not case sensitive
         * @param value
         */
        set: function (value) {
            if (value in jsonConvertEnums.PropertyMatchingRule)
                this._propertyMatchingRule = value;
        },
        enumerable: true,
        configurable: true
    });
    ////////////////////
    // PUBLIC METHODS //
    ////////////////////
    /**
     * Tries to serialize a TypeScript object or array of objects to JSON.
     *
     * @param data object or array of objects
     *
     * @returns the JSON object
     *
     * @throws an Error in case of failure
     *
     * @author Andreas Aeschlimann, DHlab, University of Basel, Switzerland
     * @see https://www.npmjs.com/package/json2typescript full documentation
     */
    JsonConvert.prototype.serialize = function (data) {
        if (this.operationMode === jsonConvertEnums.OperationMode.DISABLE) {
            return data;
        }
        // Call the appropriate method depending on the type
        if (data instanceof Array) {
            return this.serializeArray(data);
        }
        else if (typeof data === "object") { // careful: an array is an object in TypeScript!
            return this.serializeObject(data);
        }
        else {
            throw new Error("Fatal error in JsonConvert. " +
                "Passed parameter data in JsonConvert.serialize() is not in valid format (object or array)." +
                "\n");
        }
    };
    /**
     * Tries to serialize a TypeScript object to a JSON object.
     *
     * @param instance TypeScript instance
     *
     * @returns the JSON object
     *
     * @throws an Error in case of failure
     *
     * @author Andreas Aeschlimann, DHlab, University of Basel, Switzerland
     * @see https://www.npmjs.com/package/json2typescript full documentation
     */
    JsonConvert.prototype.serializeObject = function (instance) {
        if (this.operationMode === jsonConvertEnums.OperationMode.DISABLE) {
            return instance;
        }
        // Check if the passed type is allowed
        if (instance === undefined) {
            throw new Error("Fatal error in JsonConvert. " +
                "Passed parameter instance in JsonConvert.serializeObject() is undefined. This is not a valid JSON format." +
                "\n");
        }
        else if (instance === null) {
            if (this.valueCheckingMode === jsonConvertEnums.ValueCheckingMode.DISALLOW_NULL) {
                throw new Error("Fatal error in JsonConvert. " +
                    "Passed parameter instance in JsonConvert.serializeObject() is undefined. You have specified to disallow null values." +
                    "\n");
            }
            else {
                return instance;
            }
        }
        else if (typeof (instance) !== "object" || instance instanceof Array) {
            throw new Error("Fatal error in JsonConvert. " +
                "Passed parameter instance in JsonConvert.serializeObject() is not of type object." +
                "\n");
        }
        // Now serialize and return the plain object
        if (this.operationMode === jsonConvertEnums.OperationMode.LOGGING) {
            console.log("----------");
            console.log("Receiving JavaScript instance:");
            console.log(instance);
        }
        var jsonObject = {};
        // Loop through all initialized class properties
        for (var _i = 0, _a = Object.keys(instance); _i < _a.length; _i++) {
            var propertyKey = _a[_i];
            this.serializeObject_loopProperty(instance, propertyKey, jsonObject);
        }
        if (this.operationMode === jsonConvertEnums.OperationMode.LOGGING) {
            console.log("Returning JSON object:");
            console.log(jsonObject);
            console.log("----------");
        }
        return jsonObject;
    };
    /**
     * Tries to serialize a TypeScript array to a JSON array.
     *
     * @param instanceArray array of TypeScript instances
     *
     * @returns the JSON array
     *
     * @throws an Error in case of failure
     *
     * @author Andreas Aeschlimann, DHlab, University of Basel, Switzerland
     * @see https://www.npmjs.com/package/json2typescript full documentation
     */
    JsonConvert.prototype.serializeArray = function (instanceArray) {
        if (this.operationMode === jsonConvertEnums.OperationMode.DISABLE) {
            return instanceArray;
        }
        // Check if the passed type is allowed
        if (instanceArray === undefined) {
            throw new Error("Fatal error in JsonConvert. " +
                "Passed parameter instanceArray in JsonConvert.serializeArray() is undefined. This is not a valid JSON format." +
                "\n");
        }
        else if (instanceArray === null) {
            if (this.valueCheckingMode === jsonConvertEnums.ValueCheckingMode.DISALLOW_NULL) {
                throw new Error("Fatal error in JsonConvert. " +
                    "Passed parameter instanceArray in JsonConvert.serializeArray() is undefined. You have specified to disallow null values." +
                    "\n");
            }
            else {
                return instanceArray;
            }
        }
        else if (typeof (instanceArray) !== "object" || instanceArray instanceof Array === false) {
            throw new Error("Fatal error in JsonConvert. " +
                "Passed parameter instanceArray in JsonConvert.serializeArray() is not of type array." +
                "\n");
        }
        // Now serialize and return the plain object
        if (this.operationMode === jsonConvertEnums.OperationMode.LOGGING) {
            console.log("----------");
            console.log("Receiving JavaScript array:");
            console.log(instanceArray);
        }
        var jsonArray = [];
        // Loop through all array elements
        for (var _i = 0, _a = instanceArray; _i < _a.length; _i++) {
            var classInstance = _a[_i];
            jsonArray.push(this.serializeObject(classInstance));
        }
        if (this.operationMode === jsonConvertEnums.OperationMode.LOGGING) {
            console.log("Returning JSON array:");
            console.log(jsonArray);
            console.log("----------");
        }
        return jsonArray;
    };
    /**
     * Tries to deserialize given JSON to a TypeScript object or array of objects.
     *
     * @param json the JSON as object or array
     * @param classReference the class reference
     *
     * @returns the deserialized data (TypeScript instance or array of TypeScript instances)
     *
     * @throws an Error in case of failure
     *
     * @author Andreas Aeschlimann, DHlab, University of Basel, Switzerland
     * @see https://www.npmjs.com/package/json2typescript full documentation
     */
    JsonConvert.prototype.deserialize = function (json, classReference) {
        if (this.operationMode === jsonConvertEnums.OperationMode.DISABLE) {
            return json;
        }
        // Call the appropriate method depending on the type
        if (json instanceof Array) {
            return this.deserializeArray(json, classReference);
        }
        else if (typeof json === "object") { // careful: an array is an object in TypeScript!
            return this.deserializeObject(json, classReference);
        }
        else {
            throw new Error("Fatal error in JsonConvert. " +
                "Passed parameter json in JsonConvert.deserialize() is not in valid JSON format (object or array)." +
                "\n");
        }
    };
    /**
     * Tries to deserialize a JSON object to a TypeScript object.
     *
     * @param jsonObject the JSON object
     * @param classReference the class reference
     *
     * @returns the deserialized TypeScript instance
     *
     * @throws an Error in case of failure
     *
     * @author Andreas Aeschlimann, DHlab, University of Basel, Switzerland
     * @see https://www.npmjs.com/package/json2typescript full documentation
     */
    JsonConvert.prototype.deserializeObject = function (jsonObject, classReference) {
        if (this.operationMode === jsonConvertEnums.OperationMode.DISABLE) {
            return jsonObject;
        }
        // Check if the passed type is allowed
        if (jsonObject === undefined) {
            throw new Error("Fatal error in JsonConvert. " +
                "Passed parameter jsonObject in JsonConvert.deserializeObject() is undefined. This is not a valid JSON format." +
                "\n");
        }
        else if (jsonObject === null) {
            if (this.valueCheckingMode === jsonConvertEnums.ValueCheckingMode.DISALLOW_NULL) {
                throw new Error("Fatal error in JsonConvert. " +
                    "Passed parameter jsonObject in JsonConvert.deserializeObject() is undefined. You have specified to disallow null values." +
                    "\n");
            }
            else {
                return jsonObject;
            }
        }
        else if (typeof (jsonObject) !== "object" || jsonObject instanceof Array) {
            throw new Error("Fatal error in JsonConvert. " +
                "Passed parameter jsonObject in JsonConvert.deserializeObject() is not of type object." +
                "\n");
        }
        // Now deserialize and return the instance
        if (this.operationMode === jsonConvertEnums.OperationMode.LOGGING) {
            console.log("----------");
            console.log("Receiving JSON object:");
            console.log(jsonObject);
        }
        var instance = new classReference();
        // Loop through all initialized class properties
        for (var _i = 0, _a = Object.keys(instance); _i < _a.length; _i++) {
            var propertyKey = _a[_i];
            this.deserializeObject_loopProperty(instance, propertyKey, jsonObject);
        }
        if (this.operationMode === jsonConvertEnums.OperationMode.LOGGING) {
            console.log("Returning CLASS instance:");
            console.log(instance);
            console.log("----------");
        }
        return instance;
    };
    /**
     * Tries to deserialize a JSON array to a TypeScript array.
     *
     * @param jsonArray the JSON array
     * @param classReference the object class
     *
     * @returns the deserialized array of TypeScript instances
     *
     * @throws an Error in case of failure
     *
     * @author Andreas Aeschlimann, DHlab, University of Basel, Switzerland
     * @see https://www.npmjs.com/package/json2typescript full documentation
     */
    JsonConvert.prototype.deserializeArray = function (jsonArray, classReference) {
        if (this.operationMode === jsonConvertEnums.OperationMode.DISABLE) {
            return jsonArray;
        }
        // Check if the passed type is allowed
        if (jsonArray === undefined) {
            throw new Error("Fatal error in JsonConvert. " +
                "Passed parameter jsonArray in JsonConvert.deserializeObject() is undefined. This is not a valid JSON format." +
                "\n");
        }
        else if (jsonArray === null) {
            if (this.valueCheckingMode === jsonConvertEnums.ValueCheckingMode.DISALLOW_NULL) {
                throw new Error("Fatal error in JsonConvert. " +
                    "Passed parameter jsonArray in JsonConvert.deserializeObject() is undefined. You have specified to disallow null values." +
                    "\n");
            }
            else {
                return jsonArray;
            }
        }
        else if (typeof (jsonArray) !== "object" || jsonArray instanceof Array === false) {
            throw new Error("Fatal error in JsonConvert. " +
                "Passed parameter jsonArray in JsonConvert.deserializeArray() is not of type array." +
                "\n");
        }
        // Now deserialize and return the array
        if (this.operationMode === jsonConvertEnums.OperationMode.DISABLE) {
            return jsonArray;
        }
        if (this.operationMode === jsonConvertEnums.OperationMode.LOGGING) {
            console.log("----------");
            console.log("Receiving JSON array:");
            console.log(jsonArray);
        }
        var array = [];
        // Loop through all array elements
        for (var _i = 0, jsonArray_1 = jsonArray; _i < jsonArray_1.length; _i++) {
            var jsonObject = jsonArray_1[_i];
            array.push(this.deserializeObject(jsonObject, classReference));
        }
        if (this.operationMode === jsonConvertEnums.OperationMode.LOGGING) {
            console.log("Returning array of CLASS instances:");
            console.log(array);
            console.log("----------");
        }
        return array;
    };
    /////////////////////
    // PRIVATE METHODS //
    /////////////////////
    /**
     * Tries to find the JSON mapping for a given class property and finally assign the value.
     *
     * @param instance the instance of the class
     * @param classPropertyName the property name
     * @param json the JSON object
     *
     * @throws throws an Error in case of failure
     */
    JsonConvert.prototype.serializeObject_loopProperty = function (instance, classPropertyName, json) {
        // Check if a JSON-object mapping is possible for a property
        var mappingOptions = this.getClassPropertyMappingOptions(instance, classPropertyName);
        if (mappingOptions === null) {
            return;
        }
        // Get expected and real values
        var jsonPropertyName = mappingOptions.jsonPropertyName;
        var expectedJsonType = mappingOptions.expectedJsonType;
        var isOptional = mappingOptions.isOptional;
        var customConverter = mappingOptions.customConverter;
        var classInstancePropertyValue = instance[classPropertyName];
        // Check if the class property value exists
        if (typeof (classInstancePropertyValue) === "undefined") {
            if (isOptional)
                return;
            throw new Error("Fatal error in JsonConvert. " +
                "Failed to map the JavaScript instance of class \"" + instance[jsonConvertOptions.Settings.CLASS_IDENTIFIER] + "\" to JSON because the defined class property \"" + classPropertyName + "\" does not exist or is not defined:\n\n" +
                "\tClass property: \n\t\t" + classPropertyName + "\n\n" +
                "\tJSON property: \n\t\t" + jsonPropertyName + "\n\n");
        }
        // Check if the property is optional
        // If the json value is null, we don't assign it in that case
        if (isOptional && classInstancePropertyValue === null)
            return;
        // Map the property
        try {
            json[jsonPropertyName] = customConverter !== null ? customConverter.serialize(classInstancePropertyValue) : this.verifyProperty(expectedJsonType, classInstancePropertyValue, true);
        }
        catch (e) {
            throw new Error("Fatal error in JsonConvert. " +
                "Failed to map the JavaScript instance of class \"" + instance[jsonConvertOptions.Settings.CLASS_IDENTIFIER] + "\" to JSON because of a type error.\n\n" +
                "\tClass property: \n\t\t" + classPropertyName + "\n\n" +
                "\tClass property value: \n\t\t" + classInstancePropertyValue + "\n\n" +
                "\tExpected type: \n\t\t" + this.getExpectedType(expectedJsonType) + "\n\n" +
                "\tRuntime type: \n\t\t" + this.getTrueType(classInstancePropertyValue) + "\n\n" +
                "\tJSON property: \n\t\t" + jsonPropertyName + "\n\n" +
                e.message + "\n");
        }
    };
    /**
     * Tries to find the JSON mapping for a given class property and finally assign the value.
     *
     * @param instance the instance of the class
     * @param classPropertyName the property name
     * @param json the JSON object
     *
     * @throws throws an Error in case of failure
     */
    JsonConvert.prototype.deserializeObject_loopProperty = function (instance, classPropertyName, json) {
        var mappingOptions = this.getClassPropertyMappingOptions(instance, classPropertyName);
        if (mappingOptions === null) {
            return;
        }
        // Get expected and real values
        var jsonPropertyName = mappingOptions.jsonPropertyName;
        var expectedJsonType = mappingOptions.expectedJsonType;
        var isOptional = mappingOptions.isOptional;
        var customConverter = mappingOptions.customConverter;
        var jsonValue = undefined;
        try {
            jsonValue = this.getObjectValue(json, jsonPropertyName);
        }
        catch (_a) { }
        // Check if the json value exists
        if (typeof (jsonValue) === "undefined") {
            if (isOptional)
                return;
            throw new Error("Fatal error in JsonConvert. " +
                "Failed to map the JSON object to the class \"" + instance[jsonConvertOptions.Settings.CLASS_IDENTIFIER] + "\" because the defined JSON property \"" + jsonPropertyName + "\" does not exist:\n\n" +
                "\tClass property: \n\t\t" + classPropertyName + "\n\n" +
                "\tJSON property: \n\t\t" + jsonPropertyName + "\n\n");
        }
        // Check if the property is optional
        // If the json value is null, we don't assign it in that case
        if (isOptional && jsonValue === null)
            return;
        // Map the property
        try {
            instance[classPropertyName] = customConverter !== null ? customConverter.deserialize(jsonValue) : this.verifyProperty(expectedJsonType, jsonValue);
        }
        catch (e) {
            throw new Error("Fatal error in JsonConvert. " +
                "Failed to map the JSON object to the class \"" + instance[jsonConvertOptions.Settings.CLASS_IDENTIFIER] + "\" because of a type error.\n\n" +
                "\tClass property: \n\t\t" + classPropertyName + "\n\n" +
                "\tExpected type: \n\t\t" + this.getExpectedType(expectedJsonType) + "\n\n" +
                "\tJSON property: \n\t\t" + jsonPropertyName + "\n\n" +
                "\tJSON type: \n\t\t" + this.getJsonType(jsonValue) + "\n\n" +
                "\tJSON value: \n\t\t" + JSON.stringify(jsonValue) + "\n\n" +
                e.message + "\n");
        }
    };
    ////////////////////
    // HELPER METHODS //
    ////////////////////
    /**
     * Gets the mapping options of a given class property.
     *
     * @param instance any class instance
     * @param {string} propertyName any property name
     *
     * @returns {MappingOptions|null}
     */
    JsonConvert.prototype.getClassPropertyMappingOptions = function (instance, propertyName) {
        var mappings = instance[jsonConvertOptions.Settings.MAPPING_PROPERTY];
        // Check if mapping is defined
        if (typeof (mappings) === "undefined")
            return null;
        // Get direct mapping if possible
        var directMappingName = instance[jsonConvertOptions.Settings.CLASS_IDENTIFIER] + "." + propertyName;
        if (typeof (mappings[directMappingName]) !== "undefined") {
            return mappings[directMappingName];
        }
        // No mapping was found, try to find some
        var indirectMappingNames = Object.keys(mappings).filter(function (key) { return key.match("\\." + propertyName + "$"); }); // use endsWidth in later versions
        if (indirectMappingNames.length > 0) {
            return mappings[indirectMappingNames[0]];
        }
        return null;
    };
    /**
     * Compares the type of a given value with an internal expected json type.
     * Either returns the resulting value or throws an exception.
     *
     * @param expectedJsonType the expected json type for the property
     * @param value the property value to verify
     * @param serialize optional param (default: false), if given, we are in serialization mode
     *
     * @returns returns the resulted mapped property
     *
     * @throws an error in case of failure
     */
    JsonConvert.prototype.verifyProperty = function (expectedJsonType, value, serialize) {
        // Map immediately if we don't care about the type
        if (expectedJsonType === any.Any || expectedJsonType === null || expectedJsonType === Object) {
            return value;
        }
        // Check if attempt and expected was 1-d
        if (expectedJsonType instanceof Array === false && value instanceof Array === false) {
            // Check the type
            if (typeof (expectedJsonType) !== "undefined" && expectedJsonType.prototype.hasOwnProperty(jsonConvertOptions.Settings.CLASS_IDENTIFIER)) { // only decorated custom objects have this injected property
                // Check if we have null value
                if (value === null) {
                    if (this.valueCheckingMode !== jsonConvertEnums.ValueCheckingMode.DISALLOW_NULL)
                        return null;
                    else
                        throw new Error("\tReason: Given value is null.");
                }
                if (serialize)
                    return this.serializeObject(value);
                else
                    return this.deserializeObject(value, expectedJsonType);
            }
            else if (expectedJsonType === any.Any || expectedJsonType === null || expectedJsonType === Object) { // general object
                // Check if we have null value
                if (value === null) {
                    if (this.valueCheckingMode !== jsonConvertEnums.ValueCheckingMode.DISALLOW_NULL)
                        return null;
                    else
                        throw new Error("\tReason: Given value is null.");
                }
                return value;
            }
            else if (expectedJsonType === String || expectedJsonType === Number || expectedJsonType === Boolean) { // otherwise check for a primitive type
                // Check if we have null value
                if (value === null) {
                    if (this.valueCheckingMode === jsonConvertEnums.ValueCheckingMode.ALLOW_NULL)
                        return null;
                    else
                        throw new Error("\tReason: Given value is null.");
                }
                // Check if the types match
                if ( // primitive types match
                (expectedJsonType === String && typeof (value) === "string") ||
                    (expectedJsonType === Number && typeof (value) === "number") ||
                    (expectedJsonType === Boolean && typeof (value) === "boolean")) {
                    return value;
                }
                else { // primitive types mismatch
                    if (this.ignorePrimitiveChecks)
                        return value;
                    throw new Error("\tReason: Given object does not match the expected primitive type.");
                }
            }
            else { // other weird types
                throw new Error("\tReason: Expected type is unknown. There might be multiple reasons for this:\n" +
                    "\t- You are missing the decorator @JsonObject (for object mapping)\n" +
                    "\t- You are missing the decorator @JsonConverter (for custom mapping) before your class definition\n" +
                    "\t- Your given class is undefined in the decorator because of circular dependencies");
            }
        }
        // Check if attempt and expected was n-d
        if (expectedJsonType instanceof Array && value instanceof Array) {
            var array = [];
            // No data given, so return empty value
            if (value.length === 0) {
                return array;
            }
            // We obviously don't care about the type, so return the value as is
            if (expectedJsonType.length === 0) {
                return value;
            }
            // Loop through the data. Both type and value are at least of length 1
            var autofillType = expectedJsonType.length < value.length;
            for (var i = 0; i < value.length; i++) {
                if (autofillType && i >= expectedJsonType.length)
                    expectedJsonType[i] = expectedJsonType[i - 1];
                array[i] = this.verifyProperty(expectedJsonType[i], value[i], serialize);
            }
            return array;
        }
        // Check if attempt was 1-d and expected was n-d
        if (expectedJsonType instanceof Array && value instanceof Object) {
            var array = [];
            // No data given, so return empty value
            if (value.length === 0) {
                return array;
            }
            // We obviously don't care about the type, so return the json value as is
            if (expectedJsonType.length === 0) {
                return value;
            }
            // Loop through the data. Both type and value are at least of length 1
            var autofillType = expectedJsonType.length < Object.keys(value).length;
            var i = 0;
            for (var key in value) {
                if (autofillType && i >= expectedJsonType.length)
                    expectedJsonType[i] = expectedJsonType[i - 1];
                array[key] = this.verifyProperty(expectedJsonType[i], value[key]);
                i++;
            }
            return array;
        }
        // Check if attempt was 1-d and expected was n-d
        if (expectedJsonType instanceof Array) {
            if (value === null) {
                if (this.valueCheckingMode !== jsonConvertEnums.ValueCheckingMode.DISALLOW_NULL)
                    return null;
                else
                    throw new Error("\tReason: Given value is null.");
            }
            throw new Error("\tReason: Expected type is array, but given value is non-array.");
        }
        // Check if attempt was n-d and expected as 1-d
        if (value instanceof Array) {
            throw new Error("\tReason: Given value is array, but expected a non-array type.");
        }
        // All other attempts are fatal
        throw new Error("\tReason: Mapping failed because of an unknown error.");
    };
    /**
     * Gets the value of an object for a given value.
     * If the object does not have the specific key, an Error is thrown.
     *
     * @param data
     * @param key
     *
     * @returns returns the value
     *
     * @throws an Error in case of the key was not found in the object
     */
    JsonConvert.prototype.getObjectValue = function (data, key) {
        // If we do not care about the case of the key, ad
        if (this.propertyMatchingRule === jsonConvertEnums.PropertyMatchingRule.CASE_INSENSITIVE) {
            // Create a mapping of the keys: keys[lowercase]=normalcase
            var keyMapping = Object.keys(data).reduce(function (keys, key) {
                keys[key.toLowerCase()] = key;
                return keys;
            }, {});
            // Define the new key
            key = keyMapping[key.toLowerCase()];
        }
        // Throw an error if the key is not in the object
        if (key in data === false) {
            throw new Error();
        }
        return data[key];
    };
    ///////////////////////////
    // JSON2TYPESCRIPT TYPES //
    ///////////////////////////
    /**
     * Returns a string representation of the expected json type.
     *
     * @param expectedJsonType the expected type given from the decorator
     *
     * @returns {string} the string representation
     */
    JsonConvert.prototype.getExpectedType = function (expectedJsonType) {
        var type = "";
        if (expectedJsonType instanceof Array) {
            type = "[";
            for (var i = 0; i < expectedJsonType.length; i++) {
                if (i > 0)
                    type += ",";
                type += this.getExpectedType(expectedJsonType[i]);
            }
            type += "]";
            return type;
        }
        else {
            if (expectedJsonType === any.Any || expectedJsonType === null || expectedJsonType === Object) {
                return "any";
            }
            else if (expectedJsonType === String || expectedJsonType === Boolean || expectedJsonType === Number) {
                return (new expectedJsonType()).constructor.name.toLowerCase();
            }
            else if (typeof expectedJsonType === 'function') {
                return (new expectedJsonType()).constructor.name;
            }
            else if (expectedJsonType === undefined) {
                return "undefined";
            }
            else {
                return "?????";
            }
        }
    };
    /**
     * Returns a string representation of the JSON value type.
     *
     * @param jsonValue the JSON value
     *
     * @returns {string} the string representation
     */
    JsonConvert.prototype.getJsonType = function (jsonValue) {
        if (jsonValue === null)
            return "null";
        var type = "";
        if (jsonValue instanceof Array) {
            type = "[";
            for (var i = 0; i < jsonValue.length; i++) {
                if (i > 0)
                    type += ",";
                type += this.getJsonType(jsonValue[i]);
            }
            type += "]";
            return type;
        }
        else {
            return typeof (jsonValue);
        }
    };
    /**
     * Returns a string representation of the true TypeScript type.
     *
     * @param trueValue the true value
     *
     * @returns {string} the string representation
     */
    JsonConvert.prototype.getTrueType = function (trueValue) {
        return typeof (trueValue);
    };
    return JsonConvert;
}());
exports.JsonConvert = JsonConvert;

});

unwrapExports(jsonConvert);
var jsonConvert_1 = jsonConvert.JsonConvert;

var jsonConvertDecorators = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * Decorator of a class that is a custom converter.
 *
 * @param target the class
 */
function JsonConverter(target) {
    target[jsonConvertOptions.Settings.MAPPER_PROPERTY] = "";
}
exports.JsonConverter = JsonConverter;
/**
 * Decorator of a class that comes from a JSON object.
 *
 * @param target the class identifier or the class
 *
 * @returns
 *
 * @throws Error
 */
function JsonObject(target) {
    // target is the constructor or the custom class name
    var classIdentifier = "";
    var decorator = function (target) {
        target.prototype[jsonConvertOptions.Settings.CLASS_IDENTIFIER] = classIdentifier.length > 0 ? classIdentifier : target.name;
        var mapping = target.prototype[jsonConvertOptions.Settings.MAPPING_PROPERTY];
        // Make sure we replace the mapping names of all properties of this class
        if (!mapping)
            return;
        var unmappedKeys = Object.keys(mapping)
            .filter(function (val) { return val.indexOf(jsonConvertOptions.Settings.CLASS_IDENTIFIER + ".") === 0; });
        for (var _i = 0, unmappedKeys_1 = unmappedKeys; _i < unmappedKeys_1.length; _i++) {
            var key = unmappedKeys_1[_i];
            mapping[key.replace(jsonConvertOptions.Settings.CLASS_IDENTIFIER, target.prototype[jsonConvertOptions.Settings.CLASS_IDENTIFIER])] =
                mapping[key];
            // We must delete the mapping without associated class since it will
            // cause issues with inheritance of mappings and overrides.
            delete mapping[key];
        }
    };
    var type = typeof target;
    switch (type) {
        // Decorator was @JsonObject(classId)
        case "string":
            classIdentifier = target;
            return decorator;
        // Decorator was @JsonObject
        case "function":
            decorator(target);
            return;
        // Decorator was @JsonObject()
        case "undefined":
            return decorator;
        // Decorator was @JsonObject(123)
        default:
            throw new Error("Fatal error in JsonConvert. " +
                "It is mandatory to pass a string as parameter in the @JsonObject decorator.\n\n" +
                "Use either @JsonObject or @JsonObject(classId) where classId is a string.\n\n");
    }
}
exports.JsonObject = JsonObject;
/**
 * Decorator of a class property that comes from a JSON object.
 *
 * The second param can be either a type or a class of a custom converter.
 *
 * Use the following notation for the type:
 * - Primitive type: String|Number|Boolean
 * - Custom type: YourClassName
 * - Array type: [String|Number|Boolean|YourClassName]
 *
 * If you decide to use a custom converter, make sure this class implements the interface JsonCustomConvert from this package.
 *
 * @param jsonPropertyName optional param (default: classPropertyName) the property name in the expected JSON object
 * @param conversionOption optional param (default: Any), should be either the expected type (String|Boolean|Number|etc) or a custom converter class implementing JsonCustomConvert
 * @param isOptional optional param (default: false), if true, the json property does not have to be present in the object
 *
 * @returns
 *
 * @throws Error
 */
function JsonProperty() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    return function (target, classPropertyName) {
        // target is the class
        var jsonPropertyName = classPropertyName;
        var conversionOption = any.Any;
        var isOptional = false;
        switch (params.length) {
            case 1:
                if (params[0] === undefined)
                    throw new Error("Fatal error in JsonConvert. " +
                        "It is not allowed to explicitly pass \"undefined\" as first parameter in the @JsonProperty decorator.\n\n" +
                        "\tClass property: \n" +
                        "\t\t" + classPropertyName + "\n\n" +
                        "Leave the decorator parameters empty if you do not wish to pass the first parameter.\n\n");
                jsonPropertyName = params[0];
                break;
            case 2:
                if (params[0] === undefined)
                    throw new Error("Fatal error in JsonConvert. " +
                        "It is not allowed to explicitly pass \"undefined\" as first parameter in the @JsonProperty decorator.\n\n" +
                        "\tClass property: \n" +
                        "\t\t" + classPropertyName + "\n\n" +
                        "Leave the decorator parameters empty if you do not wish to pass the first parameter.\n\n");
                if (params[1] === undefined)
                    throw new Error("Fatal error in JsonConvert. " +
                        "It is not allowed to explicitly pass \"undefined\" as second parameter in the @JsonProperty decorator.\n\n" +
                        "\tClass property: \n" +
                        "\t\t" + classPropertyName + "\n\n" +
                        "Use \"Any\" to allow any type. You can import this class from \"json2typescript\".\n\n");
                jsonPropertyName = params[0];
                conversionOption = params[1];
                break;
            case 3:
                if (params[0] === undefined)
                    throw new Error("Fatal error in JsonConvert. " +
                        "It is not allowed to explicitly pass \"undefined\" as first parameter in the @JsonProperty decorator.\n\n" +
                        "\tClass property: \n" +
                        "\t\t" + classPropertyName + "\n\n" +
                        "Leave the decorator parameters empty if you do not wish to pass the first parameter.\n\n");
                if (params[1] === undefined)
                    throw new Error("Fatal error in JsonConvert. " +
                        "It is not allowed to explicitly pass \"undefined\" as second parameter in the @JsonProperty decorator.\n\n" +
                        "\tClass property: \n" +
                        "\t\t" + classPropertyName + "\n\n" +
                        "Use \"Any\" to allow any type. You can import this class from \"json2typescript\".\n\n");
                jsonPropertyName = params[0];
                conversionOption = params[1];
                isOptional = params[2];
                break;
        }
        if (typeof (target[jsonConvertOptions.Settings.MAPPING_PROPERTY]) === "undefined") {
            target[jsonConvertOptions.Settings.MAPPING_PROPERTY] = [];
        }
        var jsonPropertyMappingOptions = new jsonConvertOptions.MappingOptions();
        jsonPropertyMappingOptions.classPropertyName = classPropertyName;
        jsonPropertyMappingOptions.jsonPropertyName = jsonPropertyName;
        jsonPropertyMappingOptions.isOptional = isOptional ? isOptional : false;
        // Check if conversionOption is a type or a custom converter.
        if (typeof (conversionOption) !== "undefined" && conversionOption !== null && typeof (conversionOption[jsonConvertOptions.Settings.MAPPER_PROPERTY]) !== "undefined") {
            jsonPropertyMappingOptions.customConverter = new conversionOption();
        }
        else {
            jsonPropertyMappingOptions.expectedJsonType = conversionOption;
        }
        // Save the mapping info
        if (typeof (target[jsonConvertOptions.Settings.MAPPING_PROPERTY][jsonConvertOptions.Settings.CLASS_IDENTIFIER + "." + classPropertyName]) === "undefined") {
            target[jsonConvertOptions.Settings.MAPPING_PROPERTY][jsonConvertOptions.Settings.CLASS_IDENTIFIER + "." + classPropertyName] = jsonPropertyMappingOptions;
        }
        else {
            throw new Error("Fatal error in JsonConvert. " +
                "It is not allowed to add multiple decorators for the same property.\n\n" +
                "\tClass property: \n" +
                "\t\t" + classPropertyName + "\n\n");
        }
    };
}
exports.JsonProperty = JsonProperty;

});

unwrapExports(jsonConvertDecorators);
var jsonConvertDecorators_1 = jsonConvertDecorators.JsonConverter;
var jsonConvertDecorators_2 = jsonConvertDecorators.JsonObject;
var jsonConvertDecorators_3 = jsonConvertDecorators.JsonProperty;

var json2typescript = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.JsonConvert = jsonConvert.JsonConvert;

exports.ValueCheckingMode = jsonConvertEnums.ValueCheckingMode;
exports.OperationMode = jsonConvertEnums.OperationMode;

exports.JsonObject = jsonConvertDecorators.JsonObject;
exports.JsonProperty = jsonConvertDecorators.JsonProperty;
exports.JsonConverter = jsonConvertDecorators.JsonConverter;

exports.Any = any.Any;

});

unwrapExports(json2typescript);
var json2typescript_1 = json2typescript.JsonConvert;
var json2typescript_2 = json2typescript.ValueCheckingMode;
var json2typescript_3 = json2typescript.OperationMode;
var json2typescript_4 = json2typescript.JsonObject;
var json2typescript_5 = json2typescript.JsonProperty;
var json2typescript_6 = json2typescript.JsonConverter;
var json2typescript_7 = json2typescript.Any;

/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Singleton to let you access to the JsonConvert unique instance.
 */
class JsonConvertConfig {
    constructor() {
        this._jsonConvert = new json2typescript_1();
        this._jsonConvert.operationMode = json2typescript_3.ENABLE;
        this._jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
        this._jsonConvert.valueCheckingMode = json2typescript_2.DISALLOW_NULL; // never allow null
    }
    static getInstance() {
        if (!JsonConvertConfig.instance) {
            JsonConvertConfig.instance = new JsonConvertConfig();
        }
        return JsonConvertConfig.instance;
    }
    static jsonConvert() {
        return JsonConvertConfig.getInstance()._jsonConvert;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ensureIsArray(elements, acceptEmptyString = false) {
    if (elements === undefined || elements === null || (!acceptEmptyString && elements === '')) {
        elements = [];
    }
    else if (elements === '' && acceptEmptyString) {
        return [{}];
    }
    else if (!Array.isArray(elements)) {
        elements = [elements];
    }
    return elements;
}
let AbstractConverter = class AbstractConverter {
    constructor() {
        // TODO find a way to inject JsonConvert, see #110
        this.jsonConvert = JsonConvertConfig.jsonConvert();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
    serialize(data) {
        // TODO throw exception
        console.error('Not implemented !!');
    }
};
AbstractConverter = __decorate([
    json2typescript_6
], AbstractConverter);

let Bounds = class Bounds {
    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
    get height() {
        return this._height;
    }
    get width() {
        return this._width;
    }
    get y() {
        return this._y;
    }
    get x() {
        return this._x;
    }
};
__decorate([
    json2typescript_5('x', Number)
], Bounds.prototype, "_x", void 0);
__decorate([
    json2typescript_5('y', Number)
], Bounds.prototype, "_y", void 0);
__decorate([
    json2typescript_5('width', Number)
], Bounds.prototype, "_width", void 0);
__decorate([
    json2typescript_5('height', Number)
], Bounds.prototype, "_height", void 0);
Bounds = __decorate([
    json2typescript_4('Bounds')
], Bounds);
var Bounds$1 = Bounds;

class Edge {
    constructor(id, bpmnElement, waypoints, label) {
        this.id = id;
        this.bpmnElement = bpmnElement;
        this.waypoints = waypoints;
        this.label = label;
    }
}

/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class SequenceFlow {
    constructor(id, name, sourceRefId, targetRefId, kind = SequenceFlowKind.NORMAL) {
        this.id = id;
        this.name = name;
        this.sourceRefId = sourceRefId;
        this.targetRefId = targetRefId;
        this.kind = kind;
    }
}

const convertedFlowNodeBpmnElements = [];
const convertedLaneBpmnElements = [];
const convertedProcessBpmnElements = [];
const convertedSequenceFlows = [];
const defaultSequenceFlowIds = [];
const bpmnEventKinds = Object.values(ShapeBpmnEventKind).filter(kind => {
    return kind != ShapeBpmnEventKind.NONE;
});
function findFlowNodeBpmnElement(id) {
    return convertedFlowNodeBpmnElements.find(i => i.id === id);
}
function findLaneBpmnElement(id) {
    return convertedLaneBpmnElements.find(i => i.id === id);
}
function findProcessBpmnElement(id) {
    return convertedProcessBpmnElements.find(i => i.id === id);
}
function findSequenceFlow(id) {
    return convertedSequenceFlows.find(i => i.id === id);
}
let ProcessConverter = class ProcessConverter extends AbstractConverter {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deserialize(processes) {
        try {
            // Deletes everything in the array, which does hit other references. For better performance.
            convertedFlowNodeBpmnElements.length = 0;
            convertedLaneBpmnElements.length = 0;
            convertedProcessBpmnElements.length = 0;
            convertedSequenceFlows.length = 0;
            defaultSequenceFlowIds.length = 0;
            ensureIsArray(processes).forEach(process => this.parseProcess(process));
            return {};
        }
        catch (e) {
            // TODO error management
            console.error(e);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseProcess(process) {
        const processId = process.id;
        convertedProcessBpmnElements.push(new ShapeBpmnElement(processId, process.name, ShapeBpmnElementKind.POOL));
        // flow nodes
        ShapeUtil.flowNodeKinds().forEach(kind => this.buildFlowNodeBpmnElements(processId, process[kind], kind));
        // containers
        this.buildLaneBpmnElements(processId, process[ShapeBpmnElementKind.LANE]);
        this.buildLaneSetBpmnElements(processId, process['laneSet']);
        // flows
        this.buildSequenceFlows(process['sequenceFlow']);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildFlowNodeBpmnElements(processId, bpmnElements, kind) {
        ensureIsArray(bpmnElements).forEach(bpmnElement => {
            let shapeBpmnElement;
            if (ShapeUtil.isEvent(kind)) {
                shapeBpmnElement = this.buildShapeBpmnEvent(bpmnElement, kind, processId);
            }
            else if (ShapeUtil.isSubProcess(kind)) {
                shapeBpmnElement = this.buildShapeBpmnSubProcess(bpmnElement, processId);
            }
            else {
                shapeBpmnElement = new ShapeBpmnElement(bpmnElement.id, bpmnElement.name, kind, processId, bpmnElement.instantiate);
            }
            if (ShapeUtil.isWithDefaultSequenceFlow(kind) && bpmnElement.default) {
                defaultSequenceFlowIds.push(bpmnElement.default);
            }
            if (shapeBpmnElement) {
                convertedFlowNodeBpmnElements.push(shapeBpmnElement);
            }
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildShapeBpmnEvent(bpmnElement, elementKind, processId) {
        const eventDefinitions = this.getEventDefinitions(bpmnElement);
        const numberOfEventDefinitions = eventDefinitions.map(eventDefinition => eventDefinition.counter).reduce((counter, it) => counter + it, 0);
        // do we have a None Event?
        if (numberOfEventDefinitions == 0 && ShapeUtil.canHaveNoneEvent(elementKind)) {
            return new ShapeBpmnEvent(bpmnElement.id, bpmnElement.name, elementKind, ShapeBpmnEventKind.NONE, processId);
        }
        if (numberOfEventDefinitions == 1) {
            const eventKind = eventDefinitions[0].kind;
            if (supportedBpmnEventKinds.includes(eventKind)) {
                if (ShapeUtil.isBoundaryEvent(elementKind)) {
                    return new ShapeBpmnBoundaryEvent(bpmnElement.id, bpmnElement.name, eventKind, bpmnElement.attachedToRef, bpmnElement.cancelActivity);
                }
                return new ShapeBpmnEvent(bpmnElement.id, bpmnElement.name, elementKind, eventKind, processId);
            }
        }
    }
    /**
     * Get the list of eventDefinitions hold by the Event bpmElement
     *
     * @param bpmnElement The BPMN element from the XML data which represents a BPMN Event
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getEventDefinitions(bpmnElement) {
        return bpmnEventKinds
            .map(eventKind => {
            // sometimes eventDefinition is simple and therefore it is parsed as empty string "", in that case eventDefinition will be converted to an empty object
            const eventDefinition = bpmnElement[eventKind + 'EventDefinition'];
            return { kind: eventKind, counter: ensureIsArray(eventDefinition, true).length };
        })
            .filter(eventDefinition => {
            return eventDefinition.counter > 0;
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildShapeBpmnSubProcess(bpmnElement, processId) {
        if (!bpmnElement.triggeredByEvent) {
            return new ShapeBpmnSubProcess(bpmnElement.id, bpmnElement.name, ShapeBpmnSubProcessKind.EMBEDDED, processId);
        }
        return new ShapeBpmnSubProcess(bpmnElement.id, bpmnElement.name, ShapeBpmnSubProcessKind.EVENT, processId);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildLaneSetBpmnElements(processId, laneSet) {
        if (laneSet) {
            this.buildLaneBpmnElements(processId, laneSet.lane);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildLaneBpmnElements(processId, lanes) {
        ensureIsArray(lanes).forEach(lane => {
            const laneShape = new ShapeBpmnElement(lane.id, lane.name, ShapeBpmnElementKind.LANE, processId);
            convertedLaneBpmnElements.push(laneShape);
            this.assignParentOfLaneFlowNodes(lane);
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    assignParentOfLaneFlowNodes(lane) {
        ensureIsArray(lane.flowNodeRef).forEach(flowNodeRef => {
            const shapeBpmnElement = findFlowNodeBpmnElement(flowNodeRef);
            const laneId = lane.id;
            if (shapeBpmnElement) {
                if (!ShapeUtil.isBoundaryEvent(shapeBpmnElement.kind)) {
                    shapeBpmnElement.parentId = laneId;
                }
            }
            else {
                // TODO error management
                console.warn('Unable to assign lane %s as parent: flow node %s is not found', laneId, flowNodeRef);
            }
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildSequenceFlows(bpmnElements) {
        ensureIsArray(bpmnElements).forEach(sequenceFlow => {
            const kind = this.getSequenceFlowKind(sequenceFlow);
            const convertedSequenceFlow = new SequenceFlow(sequenceFlow.id, sequenceFlow.name, sequenceFlow.sourceRef, sequenceFlow.targetRef, kind);
            convertedSequenceFlows.push(convertedSequenceFlow);
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getSequenceFlowKind(sequenceFlow) {
        if (defaultSequenceFlowIds.includes(sequenceFlow.id)) {
            return SequenceFlowKind.DEFAULT;
        }
        else {
            const sourceShapeBpmnElement = findFlowNodeBpmnElement(sequenceFlow.sourceRef);
            if (sourceShapeBpmnElement && ShapeUtil.isWithDefaultSequenceFlow(sourceShapeBpmnElement.kind) && sequenceFlow.conditionExpression) {
                if (ShapeUtil.isActivity(sourceShapeBpmnElement.kind)) {
                    return SequenceFlowKind.CONDITIONAL_FROM_ACTIVITY;
                }
                else {
                    return SequenceFlowKind.CONDITIONAL_FROM_GATEWAY;
                }
            }
        }
        return SequenceFlowKind.NORMAL;
    }
};
ProcessConverter = __decorate([
    json2typescript_6
], ProcessConverter);
var ProcessConverter$1 = ProcessConverter;

const convertedProcessRefParticipants = [];
function findProcessRefParticipant(id) {
    return convertedProcessRefParticipants.find(i => i.id === id);
}
function findProcessRefParticipantByProcessRef(processRef) {
    return convertedProcessRefParticipants.find(i => i.processRef === processRef);
}
let CollaborationConverter = class CollaborationConverter extends AbstractConverter {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deserialize(collaboration) {
        try {
            // Deletes everything in the array, which does hit other references. For better performance.
            convertedProcessRefParticipants.length = 0;
            ensureIsArray(collaboration['participant']).forEach(participant => {
                if (participant.processRef) {
                    convertedProcessRefParticipants.push(new Participant(participant.id, participant.name, participant.processRef));
                }
            });
            return {};
        }
        catch (e) {
            // TODO error management
            console.error(e);
        }
    }
};
CollaborationConverter = __decorate([
    json2typescript_6
], CollaborationConverter);
var CollaborationConverter$1 = CollaborationConverter;

class Waypoint {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    get y() {
        return this._y;
    }
    get x() {
        return this._x;
    }
}
__decorate([
    json2typescript_5('x', Number)
], Waypoint.prototype, "_x", void 0);
__decorate([
    json2typescript_5('y', Number)
], Waypoint.prototype, "_y", void 0);

class Label {
    constructor(font, bounds) {
        this.font = font;
        this.bounds = bounds;
    }
}
class Font {
    constructor(name, size, isBold, isItalic, isUnderline, isStrikeThrough) {
        this.name = name;
        this.size = size;
        this.isBold = isBold;
        this.isItalic = isItalic;
        this.isUnderline = isUnderline;
        this.isStrikeThrough = isStrikeThrough;
    }
}

function findProcessElement(participantId) {
    const participant = findProcessRefParticipant(participantId);
    if (participant) {
        const originalProcessBpmnElement = findProcessBpmnElement(participant.processRef);
        const name = participant.name || originalProcessBpmnElement.name;
        return new ShapeBpmnElement(participant.id, name, originalProcessBpmnElement.kind, originalProcessBpmnElement.parentId);
    }
}
let DiagramConverter = class DiagramConverter extends AbstractConverter {
    constructor() {
        super(...arguments);
        this.convertedFonts = new Map();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deserialize(bpmnDiagram) {
        try {
            // Need to be done before deserialization of Shape and Edge, to link the converted fonts to them
            this.deserializeFonts(bpmnDiagram.BPMNLabelStyle);
            const plane = bpmnDiagram.BPMNPlane;
            const edges = { edges: this.deserializeEdges(plane.BPMNEdge) };
            const shapes = this.deserializeShapes(plane.BPMNShape);
            return Object.assign(Object.assign({}, shapes), edges);
        }
        catch (e) {
            // TODO error management
            console.error(e);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deserializeFonts(bpmnLabelStyle) {
        this.convertedFonts = new Map();
        ensureIsArray(bpmnLabelStyle).forEach(labelStyle => {
            const font = labelStyle.Font;
            if (font) {
                this.convertedFonts.set(labelStyle.id, new Font(font.name, font.size, font.isBold, font.isItalic, font.isUnderline, font.isStrikeThrough));
            }
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deserializeShapes(shapes) {
        // TODO find a way to avoid shape management duplication
        // common pattern:
        //    deserialize  shape base on custom function to find a bpmn element
        //    if found push in an array and process next element
        const convertedShapes = { flowNodes: [], lanes: [], pools: [] };
        shapes = ensureIsArray(shapes);
        for (let i = 0; i < shapes.length; i++) {
            const shape = shapes[i];
            const flowNode = this.deserializeShape(shape, (bpmnElement) => findFlowNodeBpmnElement(bpmnElement));
            if (flowNode) {
                convertedShapes.flowNodes.push(flowNode);
                continue;
            }
            const lane = this.deserializeShape(shape, (bpmnElement) => findLaneBpmnElement(bpmnElement));
            if (lane) {
                convertedShapes.lanes.push(lane);
                continue;
            }
            const pool = this.deserializeShape(shape, (bpmnElement) => findProcessElement(bpmnElement));
            if (pool) {
                convertedShapes.pools.push(pool);
                continue;
            }
            // TODO error management
            console.warn('Shape json deserialization: unable to find bpmn element with id %s', shape.bpmnElement);
        }
        return convertedShapes;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deserializeShape(shape, findShapeElement) {
        const bpmnElement = findShapeElement(shape.bpmnElement);
        if (bpmnElement) {
            const bounds = this.deserializeBounds(shape);
            if (bpmnElement.parentId) {
                const participant = findProcessRefParticipantByProcessRef(bpmnElement.parentId);
                if (participant) {
                    bpmnElement.parentId = participant.id;
                }
            }
            const label = this.deserializeLabel(shape.BPMNLabel, shape.id);
            return new Shape(shape.id, bpmnElement, bounds, label, shape.isExpanded);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deserializeBounds(boundedElement) {
        const bounds = boundedElement.Bounds;
        if (bounds) {
            return this.jsonConvert.deserializeObject(bounds, Bounds$1);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deserializeEdges(edges) {
        return ensureIsArray(edges).map(edge => {
            const sequenceFlow = findSequenceFlow(edge.bpmnElement);
            const waypoints = this.deserializeWaypoints(edge.waypoint);
            const label = this.deserializeLabel(edge.BPMNLabel, edge.id);
            return new Edge(edge.id, sequenceFlow, waypoints, label);
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deserializeWaypoints(waypoint) {
        if (waypoint) {
            return this.jsonConvert.deserializeArray(ensureIsArray(waypoint), Waypoint);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deserializeLabel(bpmnLabel, id) {
        if (bpmnLabel) {
            const font = this.findFont(bpmnLabel.labelStyle, id);
            const bounds = this.deserializeBounds(bpmnLabel);
            if (font || bounds) {
                return new Label(font, bounds);
            }
        }
    }
    findFont(labelStyle, id) {
        let font;
        if (labelStyle) {
            font = this.convertedFonts.get(labelStyle);
            if (!font) {
                // TODO error management
                console.warn('Unable to assign font from style %s to shape/edge %s', labelStyle, id);
            }
        }
        return font;
    }
};
DiagramConverter = __decorate([
    json2typescript_6
], DiagramConverter);
var DiagramConverter$1 = DiagramConverter;

let Definitions = class Definitions {
    // bpmnModel must be the last argument as it requires data built by the other converter.
    constructor(collaboration, process, bpmnModel) {
        this._collaboration = collaboration;
        this._process = process;
        this._bpmnModel = bpmnModel;
    }
    get bpmnModel() {
        return this._bpmnModel;
    }
};
__decorate([
    json2typescript_5('collaboration', CollaborationConverter$1, true)
], Definitions.prototype, "_collaboration", void 0);
__decorate([
    json2typescript_5('process', ProcessConverter$1)
], Definitions.prototype, "_process", void 0);
__decorate([
    json2typescript_5('BPMNDiagram', DiagramConverter$1)
], Definitions.prototype, "_bpmnModel", void 0);
Definitions = __decorate([
    json2typescript_4('definitions')
], Definitions);

/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class BpmnJsonParser {
    constructor(jsonConvert) {
        this.jsonConvert = jsonConvert;
    }
    parse(json) {
        const definitions = this.jsonConvert.deserializeObject(json.definitions, Definitions);
        return definitions.bpmnModel;
    }
}
function defaultBpmnJsonParser() {
    // TODO replace the function by dependency injection, see #110
    return new BpmnJsonParser(JsonConvertConfig.jsonConvert());
}

class BpmnParser {
    constructor(jsonParser, xmlParser) {
        this.jsonParser = jsonParser;
        this.xmlParser = xmlParser;
    }
    parse(bpmnAsXml) {
        const json = this.xmlParser.parse(bpmnAsXml);
        return this.jsonParser.parse(json);
    }
}
function defaultBpmnParser() {
    // TODO replace the function by dependency injection, see #110
    return new BpmnParser(defaultBpmnJsonParser(), new BpmnXmlParser());
}

/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class BpmnVisu {
    constructor(container) {
        this.container = container;
        try {
            if (!mxClient.isBrowserSupported()) {
                mxUtils.error('Browser is not supported!', 200, false);
            }
            // Instantiate and configure Graph
            const configurator = new MxGraphConfigurator(this.container);
            this.graph = configurator.getGraph();
        }
        catch (e) {
            // TODO error handling
            mxUtils.alert('Cannot start application: ' + e.message);
            throw e;
        }
    }
    load(xml) {
        try {
            // TODO the BpmnParser should be a field and injected (see #110)
            const bpmnModel = defaultBpmnParser().parse(xml);
            defaultMxGraphRenderer(this.graph).render(bpmnModel);
        }
        catch (e) {
            // TODO error handling
            mxUtils.alert('Cannot load bpmn diagram: ' + e.message);
            throw e;
        }
    }
}

/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class DropFileUserInterface {
    constructor(window, outerContainerId, containerToFadeId, dropCallback) {
        this.window = window;
        this.outerContainerId = outerContainerId;
        this.containerToFadeId = containerToFadeId;
        this.dropCallback = dropCallback;
        this.document = window.document;
        this.head = document.head;
        this.body = document.body;
        this.initializeDragAndDrop();
    }
    initializeDragAndDrop() {
        this.addDomElements();
        this.addStyle();
        const dropContainer = document.getElementById(this.outerContainerId);
        const containerToBeFaded = document.getElementById(this.containerToFadeId);
        // prevent loading file by the browser
        this.preventDefaultsOnEvents(['dragover', 'drop'], this.window);
        this.preventDefaultsOnEvents(['dragover', 'dragleave', 'drop'], dropContainer);
        this.addEventsOnDropContainer(dropContainer, containerToBeFaded);
        this.addEventsOnDocument(this.outerContainerId, containerToBeFaded);
    }
    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    preventDefaultsOnEvents(events, container) {
        events.forEach(eventName => {
            container.addEventListener(eventName, this.preventDefaults, false);
        });
    }
    addDomElements() {
        const p = this.document.createElement('p');
        p.textContent = 'open BPMN diagram';
        const innerDiv = this.document.createElement('div');
        innerDiv.classList.add('drop-here-text');
        innerDiv.appendChild(p);
        const containerDiv = this.document.createElement('div');
        containerDiv.id = this.outerContainerId;
        containerDiv.appendChild(innerDiv);
        this.body.insertBefore(containerDiv, this.body.firstChild);
    }
    addStyle() {
        // region CSS
        const css = `
#${this.containerToFadeId} {
    opacity: 1;
}
#${this.containerToFadeId}.faded {
    opacity: 0.1;
}
#${this.outerContainerId} {
    overflow: hidden;
    position: absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
    font-weight: bold;
    text-align: center;
    color: #555;
}
#${this.outerContainerId} .drop-here-text {
    display: none;
    border: 2px solid transparent;
    width: 98%;
    height: 98%;
    margin: 1%;
    overflow: hidden;
}
#${this.outerContainerId} .drop-here-text p {
    margin-top: 45%;
    font-style: normal;
    font-family: monospace;
    font-size: 40px;
    color: rgba(1,1,1,.2);
}
#${this.outerContainerId}.dragging  .drop-here-text {
    cursor: default;
    display: block;
    border: 2px dashed #555;
    border-radius: 7px;
}`;
        // endregion
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        this.head.appendChild(style);
    }
    addEventsOnDropContainer(container, containerToBeFaded) {
        container.addEventListener('dragover', this.getAddClassCallback(containerToBeFaded, false), false);
        container.addEventListener('mousedown', this.getRemoveClassCallback(containerToBeFaded, false), false);
        container.addEventListener('drop', this.getDropCallbackForElement(containerToBeFaded, false, this.dropCallback), false);
    }
    addEventsOnDocument(outerContainerId, containerToBeFaded) {
        this.document.addEventListener('dragover', this.getAddClassCallback(containerToBeFaded, true, outerContainerId), false);
        this.document.addEventListener('dragleave', this.getRemoveClassCallback(containerToBeFaded, true, outerContainerId), false);
        this.document.addEventListener('drop', this.getDropCallbackForElement(containerToBeFaded, true, this.dropCallback, outerContainerId), false);
    }
    getAddClassCallback(containerToBeFaded, isDocument, outerContainerId) {
        return function () {
            isDocument ? this.querySelector('#' + outerContainerId).classList.add('dragging') : this.classList.add('dragging');
            containerToBeFaded.classList.add('faded');
        };
    }
    getRemoveClassCallback(containerToBeFaded, isDocument, outerContainerId) {
        return function () {
            isDocument ? this.querySelector('#' + outerContainerId).classList.remove('dragging') : this.classList.remove('dragging');
            containerToBeFaded.classList.remove('faded');
        };
    }
    getDropCallbackForElement(containerToBeFaded, isDocument, dropCallback, outerContainerId) {
        return function (event) {
            try {
                const dt = event.dataTransfer;
                const files = dt.files;
                dropCallback(files[0]);
            }
            catch (e) {
                // TODO error management
                console.error(e);
            }
            finally {
                isDocument ? this.querySelector('#' + outerContainerId).classList.remove('dragging') : this.classList.remove('dragging');
                containerToBeFaded.classList.remove('faded');
            }
        };
    }
}

/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const bpmnVisu = new BpmnVisu(window.document.getElementById('graph'));
// callback function for opening | dropping the file to be loaded
function readAndLoadFile(f) {
    const reader = new FileReader();
    reader.onload = () => {
        bpmnVisu.load(reader.result);
    };
    reader.readAsText(f);
}
// TODO: move to UI initializer
new DropFileUserInterface(window, 'drop-container', 'graph', readAndLoadFile);
// TODO: make File Open Button a self contained component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleFileSelect(evt) {
    const f = evt.target.files[0];
    readAndLoadFile(f);
}
document.getElementById('bpmn-file').addEventListener('change', handleFileSelect, false);
document.getElementById('file-selector').classList.remove('hidden');
