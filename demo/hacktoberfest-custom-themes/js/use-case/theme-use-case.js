class ThemeUseCase extends HacktoberfestUseCase {

    _theme;

    // Default BPMN Visualization theme
    #originalDefaultFontColor;
    #originalDefaultFontFamily;
    #originalDefaultStrokeColor;
    #originalDefaultFillColor;
    #originalPoolLabelFillColor;
    #originalConfigureCommonDefaultStyle;

    constructor(type, inputProjectName, themeYear) {
        super(`${themeYear}-${type}`, inputProjectName);
        this._theme = themes.get(themeYear).get(type);
    }

    _initBpmnVisualization(options) {
        this._saveDefaultTheme();

        bpmnvisu.StyleDefault.DEFAULT_FILL_COLOR = this._theme.default.fill;
        bpmnvisu.StyleDefault.DEFAULT_STROKE_COLOR = this._theme.default.stroke;
        bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR = this._theme.default.font;
        bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY = 'Inter, Helvetica, sans-serif';

        const bpmnVisualization = this._internalBuildBpmnVisualization(options);
        this._restoreDefaultTheme();
        return bpmnVisualization;
    }

    /**
     * Generic implementation
     */
    _saveDefaultTheme() {
        this.#originalDefaultFontColor = bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR;
        this.#originalDefaultFontFamily = bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY;
        this.#originalDefaultStrokeColor = bpmnvisu.StyleDefault.DEFAULT_STROKE_COLOR;
        this.#originalDefaultFillColor = bpmnvisu.StyleDefault.DEFAULT_FILL_COLOR;
        this.#originalPoolLabelFillColor = bpmnvisu.StyleDefault.POOL_LABEL_FILL_COLOR;
        this.#originalConfigureCommonDefaultStyle = bpmnvisu.StyleConfigurator.configureCommonDefaultStyle;
    }

    /**
     * Generic implementation
     */
    _restoreDefaultTheme() {
        bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR = this.#originalDefaultFontColor;
        bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY = this.#originalDefaultFontFamily;
        bpmnvisu.StyleDefault.DEFAULT_STROKE_COLOR = this.#originalDefaultStrokeColor;
        bpmnvisu.StyleDefault.DEFAULT_FILL_COLOR = this.#originalDefaultFillColor;
        bpmnvisu.StyleDefault.POOL_LABEL_FILL_COLOR = this.#originalPoolLabelFillColor;
        bpmnvisu.StyleConfigurator.configureCommonDefaultStyle = this.#originalConfigureCommonDefaultStyle;
    }
}

class DarkUseCase extends ThemeUseCase {

    constructor(inputProjectName, themeYear) {
        super('dark', inputProjectName, themeYear);
    }

    _internalBuildBpmnVisualization(options) {
        return new ThemeBpmnVisualization(options, this._theme);
    }

    _preLoadDiagram() {
        bpmnvisu.IconPainterProvider.set(new ThemeIconPainter(this._theme));
    }
}

class LightUseCase extends ThemeUseCase {

    constructor(inputProjectName, themeYear) {
        super('light', inputProjectName, themeYear);
    }

    _internalBuildBpmnVisualization(options) {
        return new ThemeBpmnVisualization(options, this._theme);
    }

    _preLoadDiagram() {
        bpmnvisu.IconPainterProvider.set(new ThemeIconPainter(this._theme));
    }
}
