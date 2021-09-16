class ThemeBpmnVisualization extends bpmnvisu.BpmnVisualization {
    _theme;

    constructor(options, theme) {
        super(options);
        this._theme = theme;
        this._configureStyle();
    }

    _configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        // START EVENT
        let style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_START];
        style[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = this._theme.startEvent.stroke;
        if (this._theme.startEvent.fill) {
            style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = this._theme.startEvent.fill;
        }

        // END EVENT
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_END];
        style[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = this._theme.endEvent.stroke;
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = this._theme.endEvent.fill;
        if (this._theme.endEvent.gradient) {
            style[bpmnvisu.mxConstants.STYLE_GRADIENT_DIRECTION] = bpmnvisu.mxConstants.DIRECTION_WEST;
            style[bpmnvisu.mxConstants.STYLE_GRADIENTCOLOR] = this._theme.endEvent.gradient;
        }

        // USER TASK
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.TASK_USER];
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = this._theme.userTask.fill;
        if (this._theme.userTask.font) {
            style[bpmnvisu.mxConstants.STYLE_FONTCOLOR] = this._theme.userTask.font;
        }

        // EXCLUSIVE GATEWAY
        if (this._theme.exclusiveGateway.fill) {
            style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.GATEWAY_EXCLUSIVE];
            style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = this._theme.exclusiveGateway.fill;
        }

        // CALL ACTIVITY
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.CALL_ACTIVITY];
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = this._theme.callActivity.fill;
        style[bpmnvisu.mxConstants.STYLE_FONTCOLOR] = this._theme.callActivity.font;
        if (this._theme.callActivity.stroke) {
            style[bpmnvisu.mxConstants.STYLE_STROKECOLOR] = this._theme.callActivity.stroke;
        }

        // POOL
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.POOL];
        style[bpmnvisu.mxConstants.STYLE_FILLCOLOR] = this._theme.pool.labelFill;
        style[bpmnvisu.mxConstants.STYLE_SWIMLANE_FILLCOLOR] = this._theme.pool.swimlaneFill;
        style[bpmnvisu.mxConstants.STYLE_FONTSIZE] = 16;
        if (this._theme.pool.font) {
            style[bpmnvisu.mxConstants.STYLE_FONTCOLOR] = this._theme.pool.font;
        }
    }

}

class ThemeIconPainter extends bpmnvisu.IconPainter {
    _theme;

    constructor(theme) {
        super();
        this._theme = theme;
    }

    // START TIMER
    paintClockIcon(parameter) {
        parameter.canvas.setStrokeColor(this._theme.startEvent.icon);
        super.paintClockIcon(parameter);
    };

    // EXCLUSIVE GATEWAY
    paintXCrossIcon(parameter) {
        if (this._theme.exclusiveGateway.outsideIcon) {
            parameter.canvas.setStrokeColor(this._theme.exclusiveGateway.outsideIcon);
        }
        parameter.iconStyleConfig.strokeColor = this._theme.exclusiveGateway.insideIcon;
        super.paintXCrossIcon(parameter);
    };

    // USER TASK
    paintPersonIcon(parameter) {
        parameter.iconStyleConfig.strokeColor = this._theme.userTask.icon;
        super.paintPersonIcon(parameter);
    };

    // CALL ACTIVITY
    paintExpandIcon(parameter) {
        parameter.canvas.setStrokeColor(this._theme.callActivity.icon);
        super.paintExpandIcon(parameter);
    };
}