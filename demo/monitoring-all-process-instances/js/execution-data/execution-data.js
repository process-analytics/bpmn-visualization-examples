class ExecutionData {
    _titles;
    _shapeOverlayStyles;
    _edgeOverlayStyles;
    #shapeData;
    #edgeData;
    #shapeOverlayLegend;
    #edgeOverlayLegend;
    #edgePathLegend;

    constructor(shapeColor, edgeColor) {
        this._titles = this._buildTitles();

        this._shapeOverlayStyles = this._buildOverlayStyles('top-right', shapeColor);
        this._edgeOverlayStyles = this._buildOverlayStyles('middle', edgeColor);

        this.#shapeData = this._buildShapeDataSets();
        this.#edgeData = this._buildEdgeDataSets();

        let legendTitles = this._buildLegendTitles();
        this.#shapeOverlayLegend = new Legend("shape-overlay-legend", {colors: this._buildLegendColors(this._shapeOverlayStyles), titles: legendTitles});
        this.#edgeOverlayLegend = new Legend("edge-overlay-legend", {colors: this._buildLegendColors(this._edgeOverlayStyles), titles: legendTitles});
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
        this.#shapeOverlayLegend.update();
        this.#edgeOverlayLegend.update();
        this.#edgePathLegend.update();
    }

    /**
     * Generic implementation
     */
    displayOverlaysLegends() {
        this.#shapeOverlayLegend.display();
        this.#edgeOverlayLegend.display();
    }

    /**
     * Generic implementation
     */
    displayPathLegend() {
        this.#edgePathLegend.display();
    }

    /**
     * Generic implementation
     */
    hideOverlaysLegends() {
        this.#shapeOverlayLegend.hide();
        this.#edgeOverlayLegend.hide();
    }

    /**
     * Generic implementation
     */
    hidePathLegend() {
        this.#edgePathLegend.hide();
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
     * @param {number} startIndex
     * @param position {string}
     * @param color {string}
     * @returns {Map<string, {style: {fill: {color: string}}, position: string}>}
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
     *
     * @param position {string}
     * @param color {string}
     * @returns {Map<string, {style: {fill: {color: string}, stroke?: {color: string}}, position: string}>}
     * @private
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
            // data.pathClass = pathClass;
            data.styleUpdate = buildStyleUpdateOptions(pathClass);
        }
        return data;
    }
}

/**
 * @type {{"path-lvl4": {color: string, width: number}, "path-lvl5": {color: string, width: number}, "path-lvl2": {color: string, width: number}, "path-lvl3": {color: string, width: number}, "path-lvl1": {color: string, width: number}}}
 */
const pathConfiguration = {
    'path-lvl1': {color: '#e9e9e9', width: 2},
    'path-lvl2': {color: '#bdbdbd', width: 4},
    'path-lvl3': {color: '#a7a7a7', width: 6},
    'path-lvl4': {color: '#7a7a7a', width: 8},
    'path-lvl5': {color: 'Black', width: 10},
};

/**
 *
 * @param pathClass {string}
 */
function buildStyleUpdateOptions(pathClass) {
    const config = pathConfiguration[pathClass];
    return {
        stroke: {
            color: config.color,
            width: config.width,
        }
    }
}

function buildResetStyleUpdateOptions() {
    return {
        stroke: {
            color: 'default',
            width: 'default',
        }
    }
}
