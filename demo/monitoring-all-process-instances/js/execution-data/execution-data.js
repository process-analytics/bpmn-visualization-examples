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

        this.#shapeData = this._buildShapeDataSets();
        this.#edgeData = this._buildEdgeDataSets();

        let legendTitles = this._buildLegendTitles();
        this.#shapeLegend = new Legend("shape-legend", {colors: this._buildLegendColors(this._shapeOverlayStyles), titles: legendTitles});
        this.#edgeLegend = new Legend("edge-legend", {colors: this._buildLegendColors(this._edgeOverlayStyles), titles: legendTitles});
        this.#edgePathLegend = new Legend("edge-path-legend", {titles: legendTitles});
    }

    /**
     * Generic implementation
     *
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
    _buildLegendColors(styles) {
        return Array.from(styles.values()).map(value => value.style.fill.color);
    }

    /**
     * Implementation required
     *
     * @return An array of 6 values from the lowest to the highest value
     */
    _buildTitles() {
        throw new Error('Not implemented');
    }

    /**
     * Implementation required
     *
     * @return An array of 6 values from the lowest to the highest value
     */
    _buildLegendTitles() {
        throw new Error('Not implemented');
    }

    /**
     * Generic implementation
     */
    _internalBuildOverlayStyles(startIndex, position, color) {
        return new Map([
            [this._titles[startIndex], {
                position,
                style: {
                    fill: {color: `rgba(${new Values(color).tint(84).rgb})`},
                }
            }],
            [this._titles[startIndex + 1], {
                position,
                style: {
                    fill: {color: `rgba(${new Values(color).tint(63).rgb})`},
                }
            }],
            [this._titles[startIndex + 2], {
                position,
                style: {
                    fill: {color: `rgba(${new Values(color).tint(42).rgb})`},
                    font: {color: 'White'},
                }
            }],
            [this._titles[startIndex + 3], {
                position,
                style: {
                    fill: {color: `rgba(${new Values(color).tint(21).rgb})`},
                    font: {color: 'White'},
                }
            }],
            [this._titles[startIndex + 4], {
                position,
                style: {
                    fill: {color},
                    font: {color: 'White'},
                }
            }],
        ]);
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
    _buildShapeDataSets() {
        throw new Error('Not implemented');
    }

    /**
     * Generic implementation
     */
    _buildShapeData(index) {
        return this._buildData(index, this._shapeOverlayStyles);
    }

    /**
     * Implementation required
     */
    _buildEdgeDataSets() {
        throw new Error('Not implemented');
    }

    /**
     * Generic implementation
     */
    _buildEdgeData(index) {
        return this._buildData(index, this._edgeOverlayStyles, `path-lvl${index}`);
    }

    /**
     * Implementation required
     */
    _buildData(index, overlayStyles, pathClass) {
        throw new Error('Not implemented');
    }

    /**
     * Generic implementation
     */
    _internalBuildData(label, getOverlayStyles, pathClass) {
        let data = {
            overlay: {
                ...getOverlayStyles(),
                label: String(label),
            }
        };
        if (pathClass) {
            data.pathClass = pathClass;
        }
        return data;
    }
}
