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
        const overlayStyles = this._internalBuildOverlayStyles(1, position, color);
        Array.from(overlayStyles.values()).forEach(overlayStyle => {
            overlayStyle.stroke = {color: overlayStyle.style.fill.color};
        });
        return overlayStyles;
    }

    _buildShapeDataSets() {
        const data = new Map();

        const randomShapeData = this._buildShapeData(5);
        data.set('start_event', randomShapeData);
        data.set('parallel_gateway_1', randomShapeData);
        data.set('task_1', randomShapeData);
        data.set('task_2', randomShapeData);
        data.set('exclusive_gateway_1', randomShapeData);
        data.set('exclusive_gateway_2', randomShapeData);
        data.set('parallel_gateway_2', randomShapeData);
        data.set('task_8', randomShapeData);
        data.set('end_event', randomShapeData);

        const fivePerCentShapeData = this._buildShapeData(1);
        data.set('task_3', fivePerCentShapeData);
        data.set('task_4', fivePerCentShapeData);

        const ninetyFivePerCentShapeData = this._buildShapeData(4);
        data.set('task_5', ninetyFivePerCentShapeData);
        data.set('inclusive_gateway_1', ninetyFivePerCentShapeData);
        data.set('inclusive_gateway_2', ninetyFivePerCentShapeData);

        const thirtyPerCentShapeData = this._buildShapeData(2);
        data.set('task_7', thirtyPerCentShapeData);

        const otherPerCentShapeData = this._buildShapeData(3);
        data.set('task_6', otherPerCentShapeData);

        return data;
    }

    _buildEdgeDataSets() {
        const data = new Map();

        const randomEdgeData = this._buildData(5, this._edgeOverlayStyles, true);
        data.set('sequence_flow_1', randomEdgeData);
        data.set('sequence_flow_2', randomEdgeData);
        data.set('sequence_flow_18', randomEdgeData);
        data.set('sequence_flow_3', randomEdgeData);
        data.set('sequence_flow_14', randomEdgeData);
        data.set('sequence_flow_15', randomEdgeData);
        data.set('sequence_flow_16', randomEdgeData);
        data.set('sequence_flow_17', randomEdgeData);

        const fivePerCentEdgeData = this._buildEdgeData(1);
        data.set('sequence_flow_4', fivePerCentEdgeData);
        data.set('sequence_flow_12', fivePerCentEdgeData);
        data.set('sequence_flow_13', fivePerCentEdgeData);

        const ninetyFivePerCentEdgeData = this._buildEdgeData(4);
        data.set('sequence_flow_5', ninetyFivePerCentEdgeData);
        data.set('sequence_flow_6', ninetyFivePerCentEdgeData);
        data.set('sequence_flow_11', ninetyFivePerCentEdgeData);

        const thirtyPerCentEdgeData = this._buildEdgeData(2);
        data.set('sequence_flow_7', thirtyPerCentEdgeData);
        data.set('sequence_flow_10', thirtyPerCentEdgeData);

        const otherPerCentEdgeData = this._buildEdgeData(3);
        data.set('sequence_flow_8', otherPerCentEdgeData);
        data.set('sequence_flow_9', otherPerCentEdgeData);

        return data;
    }

    _buildData(index, overlayStyles, pathClass) {
        const label = this._titles[index];
        return this._internalBuildData(label, () => overlayStyles.get(label), pathClass);
    }

}
