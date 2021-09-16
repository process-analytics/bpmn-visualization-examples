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
        style[StyleIdentifiers.STYLE_STROKECOLOR] = this._theme.startEvent.stroke;
        if (this._theme.startEvent.fill) {
            style[StyleIdentifiers.STYLE_FILLCOLOR] = this._theme.startEvent.fill;
        }

        // END EVENT
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_END];
        style[StyleIdentifiers.STYLE_STROKECOLOR] = this._theme.endEvent.stroke;
        style[StyleIdentifiers.STYLE_FILLCOLOR] = this._theme.endEvent.fill;
        if (this._theme.endEvent.gradient) {
            style[StyleIdentifiers.STYLE_GRADIENT_DIRECTION] = Directions.DIRECTION_WEST;
            style[StyleIdentifiers.STYLE_GRADIENTCOLOR] = this._theme.endEvent.gradient;
        }

        // USER TASK
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.TASK_USER];
        style[StyleIdentifiers.STYLE_FILLCOLOR] = this._theme.userTask.fill;
        if (this._theme.userTask.font) {
            style[StyleIdentifiers.STYLE_FONTCOLOR] = this._theme.userTask.font;
        }

        // EXCLUSIVE GATEWAY
        if (this._theme.exclusiveGateway.fill) {
            style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.GATEWAY_EXCLUSIVE];
            style[StyleIdentifiers.STYLE_FILLCOLOR] = this._theme.exclusiveGateway.fill;
        }

        // CALL ACTIVITY
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.CALL_ACTIVITY];
        style[StyleIdentifiers.STYLE_FILLCOLOR] = this._theme.callActivity.fill;
        style[StyleIdentifiers.STYLE_FONTCOLOR] = this._theme.callActivity.font;
        if (this._theme.callActivity.stroke) {
            style[StyleIdentifiers.STYLE_STROKECOLOR] = this._theme.callActivity.stroke;
        }

        // POOL
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.POOL];
        style[StyleIdentifiers.STYLE_FILLCOLOR] = this._theme.pool.labelFill;
        style[StyleIdentifiers.STYLE_SWIMLANE_FILLCOLOR] = this._theme.pool.swimlaneFill;
        style[StyleIdentifiers.STYLE_FONTSIZE] = 16;
        if (this._theme.pool.font) {
            style[StyleIdentifiers.STYLE_FONTCOLOR] = this._theme.pool.font;
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
