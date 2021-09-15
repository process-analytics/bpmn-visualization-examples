////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom font + custom fill and stroke colors depending on BPMN elements for Hacktoberfest Light theme
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class LightUseCase extends HacktoberfestUseCase {

    constructor(inputProjectName) {
        super('light', inputProjectName);
    }

    _initBpmnVisualization(options) {
        this._saveDefaultTheme();

        bpmnvisu.StyleDefault.DEFAULT_STROKE_COLOR = blueDark;
        bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR = blueMedium;
        bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY = 'Inter, Helvetica, sans-serif';

        const bpmnVisualization = new LightBpmnVisualization(options);
        this._restoreDefaultTheme();
        return bpmnVisualization;
    }

    _preLoadDiagram() {
        bpmnvisu.IconPainterProvider.set(new LightIconPainter());
    }
}

class LightBpmnVisualization extends bpmnvisu.BpmnVisualization {

    constructor(options) {
        super(options);
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        // START EVENT
        let style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_START];
        style[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = pinkLight;

        // END EVENT
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_END];
        style[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = pinkDark;
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = pinkLight;
        style[bpmnvisu.mxConstants.STYLE_GRADIENT_DIRECTION] = bpmnvisu.mxConstants.DIRECTION_WEST;
        style[bpmnvisu.mxConstants.STYLE_GRADIENTCOLOR] = 'White';

        // USER TASK
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.TASK_USER];
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = blueSuperLight;

        // CALL ACTIVITY
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.CALL_ACTIVITY];
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = blueMedium;
        style[bpmnvisu.mxConstants.STYLE_FONTCOLOR] = blueLight;

        // POOL
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.POOL];
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = blueSuperLight;
        style[bpmnvisu.mxConstants.STYLE_SWIMLANE_FILLCOLOR] = 'White';
        style[bpmnvisu.mxConstants.STYLE_FONTSIZE] = 16;
    }
}

class LightIconPainter extends bpmnvisu.IconPainter {
    // START TIMER
    paintClockIcon(parameter) {
        parameter.canvas.setStrokeColor(pinkDark);
        super.paintClockIcon(parameter);
    };

    // EXCLUSIVE GATEWAY
    paintXCrossIcon(parameter) {
        parameter.iconStyleConfig.strokeColor = blueLight;
        parameter.canvas.setStrokeColor(blueMedium);
        super.paintXCrossIcon(parameter);
    };

    // USER TASK
    paintPersonIcon(parameter) {
        parameter.iconStyleConfig.strokeColor = blueMedium;
        super.paintPersonIcon(parameter);
    };

    // CALL ACTIVITY
    paintExpandIcon(parameter) {
        parameter.canvas.setStrokeColor(blueSuperLight);
        super.paintExpandIcon(parameter);
    };
}
