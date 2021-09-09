class FrequencyExecutionData {
    #titles;
    #shapeOverlayStyles;
    #edgeOverlayStyles;
    #shapeData;
    #edgeData;
    #shapeLegend;
    #edgeLegend;
    #edgePathLegend;

    constructor() {
        this.#titles = this.#buildTitles();

        this.#shapeOverlayStyles = this.#buildOverlayStyles('top-right', '#0083af');
        this.#edgeOverlayStyles = this.#buildOverlayStyles('middle', '#6d00af');

        this.#shapeData = this.#buildShapeData();
        this.#edgeData = this.#buildEdgeData();

        this.#shapeLegend = new Legend("shape-legend", {colors: this.#buildLegendColors(this.#shapeOverlayStyles), titles: this.#titles});
        this.#edgeLegend = new Legend("edge-legend", {colors: this.#buildLegendColors(this.#edgeOverlayStyles), titles: this.#titles});
        this.#edgePathLegend = new Legend("edge-path-legend", {titles: this.#titles});
    }

    get data() {
        return new Map([...this.#shapeData, ...this.#edgeData]);
    }

    updateLegends() {
        this.#shapeLegend.update();
        this.#edgeLegend.update();
        this.#edgePathLegend.update();
    }

    #buildTitles() {
        const random = Math.floor(Math.random() * 1000);
        const fivePerCent = Math.floor(random * 5 / 100);
        const ninetyFivePerCent = random - fivePerCent;
        const thirtyPerCent = Math.floor(ninetyFivePerCent * 30 / 100);

        const titles = new Array(6);
        titles[0] = 0;
        titles[1] = random;
        titles[2] = fivePerCent;
        titles[3] = ninetyFivePerCent;
        titles[4] = thirtyPerCent;
        titles[5] = ninetyFivePerCent - thirtyPerCent;
        return sortIntegerArray(titles);
    }

    #buildLegendColors(styles) {
        return Array.from(styles.values()).map(value => value.style.fill.color);
    }

    #buildOverlayStyles(position, color) {
        return sortMap(new Map([
            [this.#titles[5], {
                position,
                style: withStrokeColorAsFillColor({
                    fill: {color},
                    font: {color: 'White'},
                })
            }],
            [this.#titles[4], {
                position,
                style: withStrokeColorAsFillColor({
                    fill: {color: `rgba(${new Values(color).tint(21).rgb})`},
                    font: {color: 'White'},
                })
            }],
            [this.#titles[3], {
                position,
                style: withStrokeColorAsFillColor({
                    fill: {color: `rgba(${new Values(color).tint(42).rgb})`},
                    font: {color: 'White'},
                })
            }],
            [this.#titles[2], {
                position,
                style: withStrokeColorAsFillColor({
                    fill: {color: `rgba(${new Values(color).tint(63).rgb})`},
                })
            }],
            [this.#titles[1], {
                position,
                style: withStrokeColorAsFillColor({
                    fill: {color: `rgba(${new Values(color).tint(84).rgb})`},
                })
            }],
        ]));
    }

    #buildShapeData() {
        const data = new Map();

        const randomShapeData = this.#buildData(this.#titles[5], this.#shapeOverlayStyles);
        data.set('start_event', randomShapeData);
        data.set('parallel_gateway_1', randomShapeData);
        data.set('task_1', randomShapeData);
        data.set('task_2', randomShapeData);
        data.set('exclusive_gateway_1', randomShapeData);
        data.set('exclusive_gateway_2', randomShapeData);
        data.set('parallel_gateway_2', randomShapeData);
        data.set('task_8', randomShapeData);
        data.set('end_event', randomShapeData);

        const fivePerCentShapeData = this.#buildData(this.#titles[1], this.#shapeOverlayStyles);
        data.set('task_3', fivePerCentShapeData);
        data.set('task_4', fivePerCentShapeData);

        const ninetyFivePerCentShapeData = this.#buildData(this.#titles[4], this.#shapeOverlayStyles);
        data.set('task_5', ninetyFivePerCentShapeData);
        data.set('inclusive_gateway_1', ninetyFivePerCentShapeData);
        data.set('inclusive_gateway_2', ninetyFivePerCentShapeData);

        const thirtyPerCentShapeData = this.#buildData(this.#titles[2], this.#shapeOverlayStyles);
        data.set('task_7', thirtyPerCentShapeData);

        const otherPerCentShapeData = this.#buildData(this.#titles[3], this.#shapeOverlayStyles);
        data.set('task_6', otherPerCentShapeData);

        return data;
    }

    #buildEdgeData() {
        const data = new Map();

        const randomEdgeData = this.#buildData(this.#titles[5], this.#edgeOverlayStyles, 'path-lvl5');
        data.set('sequence_flow_1', randomEdgeData);
        data.set('sequence_flow_2', randomEdgeData);
        data.set('sequence_flow_18', randomEdgeData);
        data.set('sequence_flow_3', randomEdgeData);
        data.set('sequence_flow_14', randomEdgeData);
        data.set('sequence_flow_15', randomEdgeData);
        data.set('sequence_flow_16', randomEdgeData);
        data.set('sequence_flow_17', randomEdgeData);

        const fivePerCentEdgeData = this.#buildData(this.#titles[1], this.#edgeOverlayStyles, 'path-lvl1');
        data.set('sequence_flow_4', fivePerCentEdgeData);
        data.set('sequence_flow_12', fivePerCentEdgeData);
        data.set('sequence_flow_13', fivePerCentEdgeData);

        const ninetyFivePerCentEdgeData = this.#buildData(this.#titles[4], this.#edgeOverlayStyles, 'path-lvl4');
        data.set('sequence_flow_5', ninetyFivePerCentEdgeData);
        data.set('sequence_flow_6', ninetyFivePerCentEdgeData);
        data.set('sequence_flow_11', ninetyFivePerCentEdgeData);

        const thirtyPerCentEdgeData = this.#buildData(this.#titles[2], this.#edgeOverlayStyles, 'path-lvl2');
        data.set('sequence_flow_7', thirtyPerCentEdgeData);
        data.set('sequence_flow_10', thirtyPerCentEdgeData);

        const otherPerCentEdgeData = this.#buildData(this.#titles[3], this.#edgeOverlayStyles, 'path-lvl3');
        data.set('sequence_flow_8', otherPerCentEdgeData);
        data.set('sequence_flow_9', otherPerCentEdgeData);

        return data;
    }

    #buildData(label, overlayStyles, pathClass) {
        return buildData(label, () => overlayStyles.get(label), pathClass);
    }

}
