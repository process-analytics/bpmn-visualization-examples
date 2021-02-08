const bpmn = getCustomColorsBpmnDiagram();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// default colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-default' });
bpmnVisualization.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom default font color
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const originalDefaultFontColor = bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR;
bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR = 'Cyan';
const bpmnVisualizationCustomDefaultFontColor = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-custom-font-color' });
bpmnVisualizationCustomDefaultFontColor.load(bpmn);

// restore StyleConstant defaults
bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR = originalDefaultFontColor;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom default fill and stroke colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const originalConfigureCommonDefaultStyle = bpmnvisu.StyleConfigurator.prototype.configureCommonDefaultStyle;
bpmnvisu.StyleConfigurator.prototype.configureCommonDefaultStyle = function (style) {
    originalConfigureCommonDefaultStyle(style);
    style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = 'LemonChiffon';
    style[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = 'Orange';
}
// hack to ensure that the pool and lane label area fill color are kept untouched
const originalConfigureStyles = bpmnvisu.StyleConfigurator.prototype.configureStyles;
bpmnvisu.StyleConfigurator.prototype.configureStyles = function () {
    originalConfigureStyles.apply(this);
    [bpmnvisu.ShapeBpmnElementKind.LANE, bpmnvisu.ShapeBpmnElementKind.POOL].forEach(kind => {
        const style = this.graph.getStylesheet().styles[kind];
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = bpmnvisu.StyleDefault.DEFAULT_FILL_COLOR;
    });
}
const bpmnVisualizationCustomDefaultColor = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-custom-default-colors' });
bpmnVisualizationCustomDefaultColor.load(bpmn);

// restore StyleConfigurator defaults
bpmnvisu.StyleConfigurator.prototype.configureCommonDefaultStyle = originalConfigureCommonDefaultStyle;
bpmnvisu.StyleConfigurator.prototype.configureStyles = originalConfigureStyles;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom fill and stroke colors depending on BPMN elements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class BpmnVisualizationCustomColors extends bpmnvisu.BpmnVisualization {

    constructor(containerId) {
        super({ container: containerId });
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        bpmnvisu.ShapeUtil.topLevelBpmnEventKinds().forEach(kind => {
            const style = styleSheet.styles[kind];
            style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = 'Pink';
            style[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = 'FireBrick';
        });

        bpmnvisu.ShapeUtil.taskKinds().forEach(kind => {
            const style = styleSheet.styles[kind];
            style[bpmnvisu.mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_EAST;
            style[bpmnvisu.mxConstants.STYLE_GRADIENTCOLOR] = 'White';
            style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = 'Lavender';
            style[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = 'DarkBlue';
        });

        bpmnvisu.ShapeUtil.gatewayKinds().forEach(kind => {
            const style = styleSheet.styles[kind];
            style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = 'LightGoldenrodYellow';
            style[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = 'DarkOrange';
        });

        const poolStyle = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.POOL];
        poolStyle[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = 'PaleGreen';
        poolStyle[bpmnvisu.mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_SOUTH;
        poolStyle[bpmnvisu.mxConstants.STYLE_GRADIENTCOLOR] = 'White';
    }

}

const bpmnVisualizationCustomColors = new BpmnVisualizationCustomColors('bpmn-container-custom-colors');
bpmnVisualizationCustomColors.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom fill and stroke colors specific to Event elements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class BpmnVisualizationCustomEventColors extends bpmnvisu.BpmnVisualization {

    constructor(containerId) {
        super({ container: containerId });
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        const startEventStyle = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_START];
        startEventStyle[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = '#d6eea5';
        startEventStyle[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = '#8dc125';

        [bpmnvisu.ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH, bpmnvisu.ShapeBpmnElementKind.EVENT_INTERMEDIATE_THROW].forEach(kind => {
            const intermediateEventStyle = styleSheet.styles[kind];
            intermediateEventStyle[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = '#7307df';
        })

        const boundaryEventStyle = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_BOUNDARY];
        boundaryEventStyle[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = 'LightGoldenrodYellow';
        boundaryEventStyle[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = 'DarkOrange';

        const endEventStyle = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_END];
        endEventStyle[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = 'Pink';
        endEventStyle[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = 'FireBrick';
    }

}

const bpmnVisualizationEventCustomColors = new BpmnVisualizationCustomEventColors('bpmn-container-custom-colors');
bpmnVisualizationEventCustomColors.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom colors for User Task
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class BpmnVisualizationCustomColorsUserTask extends bpmnvisu.BpmnVisualization {

    constructor(containerId) {
        super({ container: containerId });
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet
        const style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.TASK_USER];
        style[bpmnvisu.mxConstants.STYLE_FONTCOLOR] = '#2b992a';
        style[bpmnvisu.mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_WEST;
        style[bpmnvisu.mxConstants.STYLE_GRADIENTCOLOR] = 'White';
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = 'Lavender';
        style[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = 'Red';
   }
}

const bpmnVisualizationCustomColorsUserTask = new BpmnVisualizationCustomColorsUserTask('bpmn-container-custom-colors-user-task');
bpmnVisualizationCustomColorsUserTask.load(bpmn);

// restore StyleConfigurator defaults
bpmnvisu.StyleConfigurator.prototype.configureCommonDefaultStyle = originalConfigureCommonDefaultStyle;
bpmnvisu.StyleConfigurator.prototype.configureStyles = originalConfigureStyles;
