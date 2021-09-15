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
bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR = 'DeepPink';
const bpmnVisualizationCustomDefaultFontColor = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-custom-font-color' });
bpmnVisualizationCustomDefaultFontColor.load(bpmn);

// restore StyleConstant defaults
bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR = originalDefaultFontColor;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom default fill and stroke colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const originalConfigureCommonDefaultStyle = bpmnvisu.StyleConfigurator.configureCommonDefaultStyle;
bpmnvisu.StyleConfigurator.configureCommonDefaultStyle = function (style) {
    originalConfigureCommonDefaultStyle(style);
    style[StyleIdentifiers.STYLE_FILLCOLOR] = 'LemonChiffon';
    style[StyleIdentifiers.STYLE_STROKECOLOR] = 'Orange';
}

const bpmnVisualizationCustomDefaultColor = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-custom-default-colors' });
bpmnVisualizationCustomDefaultColor.load(bpmn);

// restore StyleConfigurator defaults
bpmnvisu.StyleConfigurator.configureCommonDefaultStyle = originalConfigureCommonDefaultStyle;


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
            style[StyleIdentifiers.STYLE_FILLCOLOR] = 'Pink';
            style[StyleIdentifiers.STYLE_STROKECOLOR] = 'FireBrick';
        });

        bpmnvisu.ShapeUtil.taskKinds().forEach(kind => {
            const style = styleSheet.styles[kind];
            style[StyleIdentifiers.STYLE_GRADIENT_DIRECTION] = Directions.DIRECTION_EAST;
            style[StyleIdentifiers.STYLE_GRADIENTCOLOR] = 'White';
            style[StyleIdentifiers.STYLE_FILLCOLOR] = 'Lavender';
            style[StyleIdentifiers.STYLE_STROKECOLOR] = 'DarkBlue';
        });

        bpmnvisu.ShapeUtil.gatewayKinds().forEach(kind => {
            const style = styleSheet.styles[kind];
            style[StyleIdentifiers.STYLE_FILLCOLOR] = 'LightGoldenrodYellow';
            style[StyleIdentifiers.STYLE_STROKECOLOR] = 'DarkOrange';
        });

        const poolStyle = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.POOL];
        poolStyle[StyleIdentifiers.STYLE_FILLCOLOR] = 'PaleGreen';
        poolStyle[StyleIdentifiers.STYLE_GRADIENT_DIRECTION] = Directions.DIRECTION_SOUTH;
        poolStyle[StyleIdentifiers.STYLE_GRADIENTCOLOR] = 'White';
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
        startEventStyle[StyleIdentifiers.STYLE_FILLCOLOR] = '#d6eea5';
        startEventStyle[StyleIdentifiers.STYLE_STROKECOLOR] = '#8dc125';

        [bpmnvisu.ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH, bpmnvisu.ShapeBpmnElementKind.EVENT_INTERMEDIATE_THROW].forEach(kind => {
            const intermediateEventStyle = styleSheet.styles[kind];
            intermediateEventStyle[StyleIdentifiers.STYLE_STROKECOLOR] = '#7307df';
        })

        const boundaryEventStyle = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_BOUNDARY];
        boundaryEventStyle[StyleIdentifiers.STYLE_FILLCOLOR] = 'LightGoldenrodYellow';
        boundaryEventStyle[StyleIdentifiers.STYLE_STROKECOLOR] = 'DarkOrange';

        const endEventStyle = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_END];
        endEventStyle[StyleIdentifiers.STYLE_FILLCOLOR] = 'Pink';
        endEventStyle[StyleIdentifiers.STYLE_STROKECOLOR] = 'FireBrick';
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
        style[StyleIdentifiers.STYLE_FONTCOLOR] = '#2b992a';
        style[StyleIdentifiers.STYLE_GRADIENT_DIRECTION] = Directions.DIRECTION_WEST;
        style[StyleIdentifiers.STYLE_GRADIENTCOLOR] = 'White';
        style[StyleIdentifiers.STYLE_FILLCOLOR] = 'Lavender';
        style[StyleIdentifiers.STYLE_STROKECOLOR] = 'Red';
   }
}

const bpmnVisualizationCustomColorsUserTask = new BpmnVisualizationCustomColorsUserTask('bpmn-container-custom-colors-user-task');
bpmnVisualizationCustomColorsUserTask.load(bpmn);
