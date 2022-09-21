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
        configureStyle(styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_START], this._theme.startEvent);

        // END EVENT
        configureStyle(styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_END], this._theme.endEvent);

        // USER TASK
        configureStyle(styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.TASK_USER], this._theme.userTask);

        // EXCLUSIVE GATEWAY
        configureStyle(styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.GATEWAY_EXCLUSIVE], this._theme.exclusiveGateway);

        // CALL ACTIVITY
        configureStyle(styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.CALL_ACTIVITY], this._theme.callActivity);

        // POOL
        const style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.POOL];
        const themePool = this._theme.pool;
        configureStyle(style, themePool);
        style[StyleIdentifiers.STYLE_FILLCOLOR] = themePool.labelFill;
        style[StyleIdentifiers.STYLE_SWIMLANE_FILLCOLOR] = themePool.swimlaneFill;
        style[StyleIdentifiers.STYLE_FONTSIZE] = themePool.fontSize ?? 16;
    }

}

function configureStyle(style, themeElement) {
    if (themeElement.fill) {
        style[StyleIdentifiers.STYLE_FILLCOLOR] = themeElement.fill;
    }
    if (themeElement.font) {
        style[StyleIdentifiers.STYLE_FONTCOLOR] = themeElement.font;
    }
    if (themeElement.gradient) {
        style[StyleIdentifiers.STYLE_GRADIENT_DIRECTION] = themeElement.gradientDirection ?? Directions.DIRECTION_WEST;
        style[StyleIdentifiers.STYLE_GRADIENTCOLOR] = themeElement.gradient;
    }
    if (themeElement.stroke) {
        style[StyleIdentifiers.STYLE_STROKECOLOR] = themeElement.stroke;
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
