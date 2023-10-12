class ThemeUseCase extends HacktoberfestUseCase {

    _theme;

    constructor(inputProjectName, themeState, title) {
        super(inputProjectName, title);
        this._theme = themes.get(themeState.year).get(themeState.mode);
    }

    _initBpmnVisualization(options) {
        const bpmnVisualization = new ThemeBpmnVisualization(options, this._theme);
        bpmnvisu.IconPainterProvider.set(new ThemeIconPainter(this._theme));
        return bpmnVisualization;
    }
}
