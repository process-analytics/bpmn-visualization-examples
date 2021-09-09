class FrequencyExecutionData extends ExecutionData {

    constructor() {
        super('#0083af', '#6d00af');
    }

    _buildTitles() {
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

    _buildLegendTitles() {
        return this._titles;
    }

    _buildOverlayStyles(position, color) {
        return new Map([
            [this._titles[1], {
                position,
                style: withStrokeColorAsFillColor({
                    fill: {color: `rgba(${new Values(color).tint(84).rgb})`},
                })
            }],
            [this._titles[2], {
                position,
                style: withStrokeColorAsFillColor({
                    fill: {color: `rgba(${new Values(color).tint(63).rgb})`},
                })
            }],
            [this._titles[3], {
                position,
                style: withStrokeColorAsFillColor({
                    fill: {color: `rgba(${new Values(color).tint(42).rgb})`},
                    font: {color: 'White'},
                })
            }],
            [this._titles[4], {
                position,
                style: withStrokeColorAsFillColor({
                    fill: {color: `rgba(${new Values(color).tint(21).rgb})`},
                    font: {color: 'White'},
                })
            }],
            [this._titles[5], {
                position,
                style: withStrokeColorAsFillColor({
                    fill: {color},
                    font: {color: 'White'},
                })
            }],
        ]);
    }

    _buildShapeData() {
        const data = new Map();

        const randomShapeData = this._buildData(this._titles[5], this._shapeOverlayStyles);
        data.set('start_event', randomShapeData);
        data.set('parallel_gateway_1', randomShapeData);
        data.set('task_1', randomShapeData);
        data.set('task_2', randomShapeData);
        data.set('exclusive_gateway_1', randomShapeData);
        data.set('exclusive_gateway_2', randomShapeData);
        data.set('parallel_gateway_2', randomShapeData);
        data.set('task_8', randomShapeData);
        data.set('end_event', randomShapeData);

        const fivePerCentShapeData = this._buildData(this._titles[1], this._shapeOverlayStyles);
        data.set('task_3', fivePerCentShapeData);
        data.set('task_4', fivePerCentShapeData);

        const ninetyFivePerCentShapeData = this._buildData(this._titles[4], this._shapeOverlayStyles);
        data.set('task_5', ninetyFivePerCentShapeData);
        data.set('inclusive_gateway_1', ninetyFivePerCentShapeData);
        data.set('inclusive_gateway_2', ninetyFivePerCentShapeData);

        const thirtyPerCentShapeData = this._buildData(this._titles[2], this._shapeOverlayStyles);
        data.set('task_7', thirtyPerCentShapeData);

        const otherPerCentShapeData = this._buildData(this._titles[3], this._shapeOverlayStyles);
        data.set('task_6', otherPerCentShapeData);

        return data;
    }

    _buildEdgeData() {
        const data = new Map();

        const randomEdgeData = this._buildData(this._titles[5], this._edgeOverlayStyles, 'path-lvl5');
        data.set('sequence_flow_1', randomEdgeData);
        data.set('sequence_flow_2', randomEdgeData);
        data.set('sequence_flow_18', randomEdgeData);
        data.set('sequence_flow_3', randomEdgeData);
        data.set('sequence_flow_14', randomEdgeData);
        data.set('sequence_flow_15', randomEdgeData);
        data.set('sequence_flow_16', randomEdgeData);
        data.set('sequence_flow_17', randomEdgeData);

        const fivePerCentEdgeData = this._buildData(this._titles[1], this._edgeOverlayStyles, 'path-lvl1');
        data.set('sequence_flow_4', fivePerCentEdgeData);
        data.set('sequence_flow_12', fivePerCentEdgeData);
        data.set('sequence_flow_13', fivePerCentEdgeData);

        const ninetyFivePerCentEdgeData = this._buildData(this._titles[4], this._edgeOverlayStyles, 'path-lvl4');
        data.set('sequence_flow_5', ninetyFivePerCentEdgeData);
        data.set('sequence_flow_6', ninetyFivePerCentEdgeData);
        data.set('sequence_flow_11', ninetyFivePerCentEdgeData);

        const thirtyPerCentEdgeData = this._buildData(this._titles[2], this._edgeOverlayStyles, 'path-lvl2');
        data.set('sequence_flow_7', thirtyPerCentEdgeData);
        data.set('sequence_flow_10', thirtyPerCentEdgeData);

        const otherPerCentEdgeData = this._buildData(this._titles[3], this._edgeOverlayStyles, 'path-lvl3');
        data.set('sequence_flow_8', otherPerCentEdgeData);
        data.set('sequence_flow_9', otherPerCentEdgeData);

        return data;
    }

    _buildData(label, overlayStyles, pathClass) {
        return buildData(label, () => overlayStyles.get(label), pathClass);
    }

}
