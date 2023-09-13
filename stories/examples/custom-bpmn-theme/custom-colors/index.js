const bpmn = getCustomColorsBpmnDiagram();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// default colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-default' });
bpmnVisualization.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// shared config
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class BpmnVisualizationCustomizedColors extends bpmnvisu.BpmnVisualization {
    constructor(containerId) {
        super({ container: containerId });
        this.configureStyle();
    }

    configureStyle() {
        // do nothing by default
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom default font color
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class BpmnVisualizationCustomDefaultFontColor extends BpmnVisualizationCustomizedColors {
    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet parameter
        const defaultFontColor = 'DeepPink';
        // edge
        styleSheet.getDefaultEdgeStyle()[StyleIdentifiers.STYLE_FONTCOLOR] = defaultFontColor;
        // vertex
        styleSheet.getDefaultVertexStyle()[StyleIdentifiers.STYLE_FONTCOLOR] = defaultFontColor;
    }
}

const bpmnVisualizationCustomDefaultFontColor = new BpmnVisualizationCustomDefaultFontColor('bpmn-container-custom-font-color');
bpmnVisualizationCustomDefaultFontColor.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom default fill and stroke colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class BpmnVisualizationCustomDefaultFillAndStrokeColors extends BpmnVisualizationCustomizedColors {
    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet parameter
        // edge
        styleSheet.getDefaultEdgeStyle()[StyleIdentifiers.STYLE_STROKECOLOR] = 'Orange';
        // vertex
        const defaultVertexStyle = styleSheet.getDefaultVertexStyle();
        defaultVertexStyle[StyleIdentifiers.STYLE_FILLCOLOR] = 'LemonChiffon';
        defaultVertexStyle[StyleIdentifiers.STYLE_STROKECOLOR] = 'Orange';
    }
}

const bpmnVisualizationCustomDefaultColors = new BpmnVisualizationCustomDefaultFillAndStrokeColors('bpmn-container-custom-default-colors');
bpmnVisualizationCustomDefaultColors.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom colors for User Task
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class BpmnVisualizationCustomColorsUserTask extends BpmnVisualizationCustomizedColors {
    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet parameter
        const style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.TASK_USER];
        style[StyleIdentifiers.STYLE_FILLCOLOR] = '#adadec';
        style[StyleIdentifiers.STYLE_STROKECOLOR] = 'DarkBlue';
    }
}

const bpmnVisualizationCustomColorsUserTask = new BpmnVisualizationCustomColorsUserTask('bpmn-container-custom-colors-user-task');
bpmnVisualizationCustomColorsUserTask.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom fill and stroke colors specific to Event elements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// mxStylesheet parameter
const configureStyleOfEvents = styleSheet => {
    const startEventStyle = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_START];
    startEventStyle[StyleIdentifiers.STYLE_FILLCOLOR] = '#d6eea5';
    startEventStyle[StyleIdentifiers.STYLE_STROKECOLOR] = '#8dc125';

    [bpmnvisu.ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH, bpmnvisu.ShapeBpmnElementKind.EVENT_INTERMEDIATE_THROW].forEach(kind => {
        const intermediateEventStyle = styleSheet.styles[kind];
        intermediateEventStyle[StyleIdentifiers.STYLE_STROKECOLOR] = '#7307df';
        intermediateEventStyle[StyleIdentifiers.STYLE_FILLCOLOR] = 'white'; // ensure reset if the style is redefined before
    })

    const boundaryEventStyle = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_BOUNDARY];
    boundaryEventStyle[StyleIdentifiers.STYLE_FILLCOLOR] = 'LightGoldenrodYellow';
    boundaryEventStyle[StyleIdentifiers.STYLE_STROKECOLOR] = 'DarkOrange';

    const endEventStyle = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_END];
    endEventStyle[StyleIdentifiers.STYLE_FILLCOLOR] = 'Pink';
    endEventStyle[StyleIdentifiers.STYLE_STROKECOLOR] = 'FireBrick';
}

class BpmnVisualizationCustomEventColors extends BpmnVisualizationCustomizedColors {
    configureStyle() {
        configureStyleOfEvents(this.graph.getStylesheet());
    }
}

const bpmnVisualizationEventCustomColors = new BpmnVisualizationCustomEventColors('bpmn-container-custom-events-colors');
bpmnVisualizationEventCustomColors.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom fill and stroke colors depending on BPMN element kinds
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// mxStylesheet parameter
const configureStyleByKind = styleSheet => {
    bpmnvisu.ShapeUtil.eventKinds().forEach(kind => {
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
    poolStyle[StyleIdentifiers.STYLE_FILLCOLOR] = '#303742';
    poolStyle[StyleIdentifiers.STYLE_GRADIENT_DIRECTION] = Directions.DIRECTION_SOUTH;
    poolStyle[StyleIdentifiers.STYLE_GRADIENTCOLOR] = '#6b7cb4';
    // for more details about font, see the custom-fonts example
    poolStyle[StyleIdentifiers.STYLE_FONTCOLOR] = 'White';
    poolStyle[StyleIdentifiers.STYLE_FONTSTYLE] = FontStyle.FONT_BOLD + FontStyle.FONT_ITALIC;
}

class BpmnVisualizationCustomColors extends BpmnVisualizationCustomizedColors {
    configureStyle() {
        configureStyleByKind(this.graph.getStylesheet());
    }
}

const bpmnVisualizationCustomColors = new BpmnVisualizationCustomColors('bpmn-container-custom-colors');
bpmnVisualizationCustomColors.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom fill and stroke colors depending on BPMN element kinds and specific styles for some elements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class BpmnVisualizationCustomColorsMixed extends BpmnVisualizationCustomizedColors {
    configureStyle() {
        const styleSheet = this.graph.getStylesheet();
        configureStyleByKind(styleSheet);
        configureStyleOfEvents(styleSheet);
    }
}

const bpmnVisualizationCustomColorsMixed = new BpmnVisualizationCustomColorsMixed('bpmn-container-custom-colors-mixed');
bpmnVisualizationCustomColorsMixed.load(bpmn);
