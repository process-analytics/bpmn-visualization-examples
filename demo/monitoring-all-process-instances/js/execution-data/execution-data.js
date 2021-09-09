class ExecutionData {
    _titles;
    _shapeOverlayStyles;
    _edgeOverlayStyles;
    #shapeData;
    #edgeData;
    #shapeLegend;
    #edgeLegend;
    #edgePathLegend;

    constructor(shapeColor, edgeColor) {
        this._titles = this._buildTitles();

        this._shapeOverlayStyles = this._buildOverlayStyles('top-right', shapeColor);
        this._edgeOverlayStyles = this._buildOverlayStyles('middle', edgeColor);

        this.#shapeData = this._buildShapeData();
        this.#edgeData = this._buildEdgeData();

        let legendTitles = this._buildLegendTitles();
        this.#shapeLegend = new Legend("shape-legend", {colors: this.#buildLegendColors(this._shapeOverlayStyles), titles: legendTitles});
        this.#edgeLegend = new Legend("edge-legend", {colors: this.#buildLegendColors(this._edgeOverlayStyles), titles: legendTitles});
        this.#edgePathLegend = new Legend("edge-path-legend", {titles: legendTitles});
    }

    /**
     * Generic implementation
     */
    get data() {
        return new Map([...this.#shapeData, ...this.#edgeData]);
    }

    /**
     * Generic implementation
     */
    updateLegends() {
        this.#shapeLegend.update();
        this.#edgeLegend.update();
        this.#edgePathLegend.update();
    }

    /**
     * Generic implementation
     */
    #buildLegendColors(styles) {
        return Array.from(styles.values()).map(value => value.style.fill.color);
    }

    /**
     * Implementation required
     */
    _buildTitles() {
        throw new Error('Not implemented');
    }

    /**
     * Implementation required
     */
    _buildLegendTitles() {
        throw new Error('Not implemented');
    }

    /**
     * Implementation required
     */
    _buildOverlayStyles(position, color) {
        throw new Error('Not implemented');
    }

    /**
     * Implementation required
     */
    _buildShapeData() {
        throw new Error('Not implemented');
    }

    /**
     * Implementation required
     */
    _buildEdgeData() {
        throw new Error('Not implemented');
    }

    /**
     * Implementation required
     */
    _buildData(label, overlayStyles, pathClass) {
        throw new Error('Not implemented');
    }

}
