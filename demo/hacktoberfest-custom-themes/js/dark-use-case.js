////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom font + custom fill and stroke colors depending on BPMN elements for Hacktoberfest Dark theme
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class DarkUseCase extends HacktoberfestUseCase {

    constructor(inputProjectName) {
        super('dark', inputProjectName);
    }

    _initBpmnVisualization(options) {
        this._saveDefaultTheme();

        bpmnvisu.StyleDefault.DEFAULT_FILL_COLOR = blueDark;
        bpmnvisu.StyleDefault.DEFAULT_STROKE_COLOR = blueLight;
        bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR = blueSuperLight;
        bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY = 'Inter, Helvetica, sans-serif';
        bpmnvisu.StyleDefault.POOL_LABEL_FILL_COLOR = blueMedium;

        const bpmnVisualization = new DarkBpmnVisualization(options);
        this._restoreDefaultTheme();
        return bpmnVisualization;
    }

    _preLoadDiagram() {
        bpmnvisu.IconPainterProvider.set(new DarkIconPainter());
    }
}

class DarkBpmnVisualization extends bpmnvisu.BpmnVisualization {

    constructor(options) {
        super(options);
        this.configureStyle();
    }

    configureStyle() {
        this.graph.getDefaultParent().setStyle(`${bpmnvisu.mxConstants.STYLE_FILLCOLOR} = ${blueDark}`);

        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        // START EVENT
        let style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_START];
        style[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = pinkLight;
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = pinkSuperLight;

        // END EVENT
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_END];
        style[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = pinkDark;
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = pinkSuperLight;

        // EXCLUSIVE GATEWAY
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.GATEWAY_EXCLUSIVE];
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = blueMedium;

        // USER TASK
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.TASK_USER];
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = '#355571';

        // CALL ACTIVITY
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.CALL_ACTIVITY];
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = blueSuperLight;
        style[bpmnvisu.mxConstants.STYLE_FONTCOLOR] = blueMedium;

        // POOL
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.POOL];
        style[bpmnvisu.mxConstants.STYLE_SWIMLANE_FILLCOLOR] = blueDark;
        style[bpmnvisu.mxConstants.STYLE_FONTSIZE] = 16;
    }
}

class DarkIconPainter extends bpmnvisu.IconPainter {
    // START TIMER
    paintClockIcon(parameter) {
        parameter.canvas.setStrokeColor(pinkDark);
        super.paintClockIcon(parameter);
    };

    // EXCLUSIVE GATEWAY
    paintXCrossIcon(parameter) {
        parameter.iconStyleConfig.strokeColor = blueSuperLight;
        super.paintXCrossIcon(parameter);
    };

    // USER TASK
    paintPersonIcon(parameter) {
        parameter.iconStyleConfig.strokeColor = blueSuperLight;
        super.paintPersonIcon(parameter);
    };

    // CALL ACTIVITY
    paintExpandIcon(parameter) {
        parameter.canvas.setStrokeColor(blueDark);
        super.paintExpandIcon(parameter);
    };
}
