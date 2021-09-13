class TimeExecutionData extends ExecutionData {

    constructor() {
        super('#008700', '#c61700');
    }


    _buildTitles() {
        const titles = new Array(6);
        titles[0] = 'second';
        titles[1] = 'minute';
        titles[2] = 'hour';
        titles[3] = 'day';
        titles[4] = 'month';
        titles[5] = 'year';
        return titles;
    }

    _buildLegendTitles() {
        return this._titles.map(title => `1 ${title}`);
    }

    _buildOverlayStyles(position, color) {
        return this._internalBuildOverlayStyles(0, position, color);
    }

    _buildShapeDataSets() {
        const data = new Map();
        data.set('start_event', this._buildShapeData(1));
        data.set('parallel_gateway_1', this._buildShapeData(1));
        data.set('task_1', this._buildShapeData(2));
        data.set('task_2', this._buildShapeData(2));
        data.set('exclusive_gateway_1', this._buildShapeData(2));
        data.set('task_3', this._buildShapeData(2));
        data.set('task_4', this._buildShapeData(3));
        data.set('task_5', this._buildShapeData(4));
        data.set('inclusive_gateway_1', this._buildShapeData(1));
        data.set('task_6', this._buildShapeData(4));
        data.set('task_7', this._buildShapeData(5));
        data.set('inclusive_gateway_2', this._buildShapeData(3));
        data.set('exclusive_gateway_2', this._buildShapeData(3));
        data.set('parallel_gateway_2', this._buildShapeData(3));
        data.set('task_8', this._buildShapeData(4));
        data.set('end_event', this._buildShapeData(1));
        return data;
    }

    _buildEdgeDataSets() {
        const data = new Map();
        data.set('sequence_flow_1', this._buildEdgeData(1));
        data.set('sequence_flow_2', this._buildEdgeData(1));
        data.set('sequence_flow_18', this._buildEdgeData(1));
        data.set('sequence_flow_3', this._buildEdgeData(2));
        data.set('sequence_flow_4', this._buildEdgeData(1));
        data.set('sequence_flow_12', this._buildEdgeData(1));
        data.set('sequence_flow_13', this._buildEdgeData(1));
        data.set('sequence_flow_5', this._buildEdgeData(2));
        data.set('sequence_flow_6', this._buildEdgeData(1));
        data.set('sequence_flow_8', this._buildEdgeData(1));
        data.set('sequence_flow_7', this._buildEdgeData(1));
        data.set('sequence_flow_10', this._buildEdgeData(1));
        data.set('sequence_flow_9', this._buildEdgeData(2));
        data.set('sequence_flow_11', this._buildEdgeData(1));
        data.set('sequence_flow_14', this._buildEdgeData(1));
        data.set('sequence_flow_15', this._buildEdgeData(2));
        data.set('sequence_flow_16', this._buildEdgeData(1));
        data.set('sequence_flow_17', this._buildEdgeData(1));
        return data;
    }

    _buildData(index, overlayStyles, pathClass) {
        function buildCustomData(data, unit) {
            return this._internalBuildData(`${data} ${unit}`, () => overlayStyles.get(this._titles[index - 1]), pathClass);
        }

        function buildRecursiveData(data, unit) {
            return data === 0 ? this._buildData(index - 1, overlayStyles) : buildCustomData.call(this, data, unit);
        }

        const date = new Date();
        date.setTime(Math.random() * 100000000000000);

        switch (index) {
            case 5:
                return buildRecursiveData.call(this, date.getMonth(), 'month');
            case 4:
                return buildRecursiveData.call(this, date.getDay(), 'd');
            case 3:
                return buildRecursiveData.call(this, date.getHours(), 'h');
            case 2:
                return buildRecursiveData.call(this, date.getMinutes(), 'min');
            case 1:
            default:
                return buildCustomData.call(this, date.getSeconds(), 's');
        }
    }

}
