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
        return new Map([
            [this._titles[0], {
                position,
                style: {
                    fill: {color: `rgba(${new Values(color).tint(84).rgb})`},
                }
            }],
            [this._titles[1], {
                position,
                style: {
                    fill: {color: `rgba(${new Values(color).tint(63).rgb})`},
                }
            }],
            [this._titles[2], {
                position,
                style: {
                    fill: {color: `rgba(${new Values(color).tint(42).rgb})`},
                }
            }],
            [this._titles[3], {
                position,
                style: {
                    fill: {color: `rgba(${new Values(color).tint(21).rgb})`},
                    font: {color: 'White'},
                }
            }],
            [this._titles[4], {
                position,
                style: {
                    fill: {color},
                    font: {color: 'White'},
                }
            }],
        ]);
    }

    _buildShapeData() {
        function internalBuildData(unit) {
            return this._buildData(unit, this._shapeOverlayStyles);
        }


        const data = new Map();
        data.set('start_event', internalBuildData.call(this, this._titles[0]));
        data.set('parallel_gateway_1', internalBuildData.call(this, this._titles[0]));
        data.set('task_1', internalBuildData.call(this, this._titles[1]));
        data.set('task_2', internalBuildData.call(this, this._titles[1]));
        data.set('exclusive_gateway_1', internalBuildData.call(this, this._titles[1]));
        data.set('task_3', internalBuildData.call(this, this._titles[1]));
        data.set('task_4', internalBuildData.call(this, this._titles[2]));
        data.set('task_5', internalBuildData.call(this, this._titles[3]));
        data.set('inclusive_gateway_1', internalBuildData.call(this, this._titles[0]));
        data.set('task_6', internalBuildData.call(this, this._titles[3]));
        data.set('task_7', internalBuildData.call(this, this._titles[4]));
        data.set('inclusive_gateway_2', internalBuildData.call(this, this._titles[2]));
        data.set('exclusive_gateway_2', internalBuildData.call(this, this._titles[2]));
        data.set('parallel_gateway_2', internalBuildData.call(this, this._titles[2]));
        data.set('task_8', internalBuildData.call(this, this._titles[3]));
        data.set('end_event', internalBuildData.call(this, this._titles[0]));
        return data;
    }

    _buildEdgeData() {
        function internalBuildSecondData() {
            return this._buildData(this._titles[0], this._edgeOverlayStyles, 'path-lvl1');
        }

        function internalBuildMinuteData() {
            return this._buildData(this._titles[1], this._edgeOverlayStyles, 'path-lvl2');
        }

        const data = new Map();
        data.set('sequence_flow_1', internalBuildSecondData.call(this));
        data.set('sequence_flow_2', internalBuildSecondData.call(this));
        data.set('sequence_flow_18', internalBuildSecondData.call(this));
        data.set('sequence_flow_3', internalBuildMinuteData.call(this));
        data.set('sequence_flow_4', internalBuildSecondData.call(this));
        data.set('sequence_flow_12', internalBuildSecondData.call(this));
        data.set('sequence_flow_13', internalBuildSecondData.call(this));
        data.set('sequence_flow_5', internalBuildMinuteData.call(this));
        data.set('sequence_flow_6', internalBuildSecondData.call(this));
        data.set('sequence_flow_8', internalBuildSecondData.call(this));
        data.set('sequence_flow_7', internalBuildSecondData.call(this));
        data.set('sequence_flow_10', internalBuildSecondData.call(this));
        data.set('sequence_flow_9', internalBuildMinuteData.call(this));
        data.set('sequence_flow_11', internalBuildSecondData.call(this));
        data.set('sequence_flow_14', internalBuildSecondData.call(this));
        data.set('sequence_flow_15', internalBuildMinuteData.call(this));
        data.set('sequence_flow_16', internalBuildSecondData.call(this));
        data.set('sequence_flow_17', internalBuildSecondData.call(this));
        return data;
    }

    _buildData(unit, overlayStyles, pathClass) {
        function buildCustomData(label, overlayStyles, pathClass) {
            return buildData(label, () => overlayStyles.get(unit), pathClass);
        }

        const date = new Date();
        date.setTime(Math.random() * 100000000000000);

        switch (unit) {
            case this._titles[4]:
                return date.getMonth() === 0 ? this._buildData(this._titles[3], overlayStyles, pathClass) : buildCustomData(`${date.getMonth()} month`, overlayStyles, pathClass);
            case this._titles[3]:
                return date.getDay() === 0 ? this._buildData(this._titles[2], overlayStyles, pathClass) : buildCustomData(`${date.getDay()} d`, overlayStyles, pathClass);
            case this._titles[2]:
                return date.getHours() === 0 ? this._buildData(this._titles[1], overlayStyles, pathClass) : buildCustomData(`${date.getHours()} h`, overlayStyles, pathClass);
            case this._titles[1]:
                return date.getMinutes() === 0 ? this._buildData(this._titles[0], overlayStyles, pathClass) : buildCustomData(`${date.getMinutes()} min`, overlayStyles, pathClass);
            case this._titles[0]:
            default:
                return buildCustomData(`${date.getSeconds()} s`, overlayStyles, pathClass);
        }
    }

}
