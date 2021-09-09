class TimeExecutionData {
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

        this.#shapeOverlayStyles = this.#buildOverlayStyles('top-right', '#008700');
        this.#edgeOverlayStyles = this.#buildOverlayStyles('middle', '#c61700');

        this.#shapeData = this.#buildShapeData();
        this.#edgeData = this.#buildEdgeData();

        let legendTitles = this.#buildLegendTitles();
        this.#shapeLegend = new Legend("shape-legend", {
            colors: this.#buildLegendColors(this.#shapeOverlayStyles),
            titles: legendTitles
        });
        this.#edgeLegend = new Legend("edge-legend", {
            colors: this.#buildLegendColors(this.#edgeOverlayStyles),
            titles: legendTitles
        });
        this.#edgePathLegend = new Legend("edge-path-legend", {titles: legendTitles});
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
        const titles = new Array(6);
        titles[0] = 'second';
        titles[1] = 'minute';
        titles[2] = 'hour';
        titles[3] = 'day';
        titles[4] = 'month';
        titles[5] = 'year';
        return titles;
    }

    #buildLegendTitles() {
        return this.#titles.map(title => `1 ${title}`);
    }

    #buildLegendColors(overlayStyles) {
        const colors = new Array(5);
        colors[0] = overlayStyles.get(this.#titles[0]).style.fill.color;
        colors[1] = overlayStyles.get(this.#titles[1]).style.fill.color;
        colors[2] = overlayStyles.get(this.#titles[2]).style.fill.color;
        colors[3] = overlayStyles.get(this.#titles[3]).style.fill.color;
        colors[4] = overlayStyles.get(this.#titles[4]).style.fill.color;
        return colors;
    }

    #buildOverlayStyles(position, color) {
        return new Map([
            [this.#titles[4], {
                position,
                style: {
                    fill: {color},
                    font: {color: 'White'},
                }
            }],
            [this.#titles[3], {
                position,
                style: {
                    fill: {color: `rgba(${new Values(color).tint(21).rgb})`},
                    font: {color: 'White'},
                }
            }],
            [this.#titles[2], {
                position,
                style: {
                    fill: {color: `rgba(${new Values(color).tint(42).rgb})`},
                }
            }],
            [this.#titles[1], {
                position,
                style: {
                    fill: {color: `rgba(${new Values(color).tint(63).rgb})`},
                }
            }],
            [this.#titles[0], {
                position,
                style: {
                    fill: {color: `rgba(${new Values(color).tint(84).rgb})`},
                }
            }],
        ]);
    }

    #buildShapeData() {
        function internalBuildData(unit) {
            return this.#buildData(unit, this.#shapeOverlayStyles);
        }


        const data = new Map();
        data.set('start_event', internalBuildData.call(this, this.#titles[0]));
        data.set('parallel_gateway_1', internalBuildData.call(this, this.#titles[0]));
        data.set('task_1', internalBuildData.call(this, this.#titles[1]));
        data.set('task_2', internalBuildData.call(this, this.#titles[1]));
        data.set('exclusive_gateway_1', internalBuildData.call(this, this.#titles[1]));
        data.set('task_3', internalBuildData.call(this, this.#titles[1]));
        data.set('task_4', internalBuildData.call(this, this.#titles[2]));
        data.set('task_5', internalBuildData.call(this, this.#titles[3]));
        data.set('inclusive_gateway_1', internalBuildData.call(this, this.#titles[0]));
        data.set('task_6', internalBuildData.call(this, this.#titles[3]));
        data.set('task_7', internalBuildData.call(this, this.#titles[4]));
        data.set('inclusive_gateway_2', internalBuildData.call(this, this.#titles[2]));
        data.set('exclusive_gateway_2', internalBuildData.call(this, this.#titles[2]));
        data.set('parallel_gateway_2', internalBuildData.call(this, this.#titles[2]));
        data.set('task_8', internalBuildData.call(this, this.#titles[3]));
        data.set('end_event', internalBuildData.call(this, this.#titles[0]));
        return data;
    }

    #buildEdgeData() {
        function internalBuildSecondData() {
            return this.#buildData(this.#titles[0], this.#edgeOverlayStyles, 'path-lvl1');
        }

        function internalBuildMinuteData() {
            return this.#buildData(this.#titles[1], this.#edgeOverlayStyles, 'path-lvl2');
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

    #buildData(unit, overlayStyles, pathClass) {
        function buildCustomData(label, overlayStyles, pathClass) {
            return buildData(label, () => overlayStyles.get(unit), pathClass);
        }

        const date = new Date();
        date.setTime(Math.random() * 100000000000000);

        switch (unit) {
            case this.#titles[4]:
                return date.getMonth() === 0 ? this.#buildData(this.#titles[3], overlayStyles, pathClass) : buildCustomData(`${date.getMonth()} month`, overlayStyles, pathClass);
            case this.#titles[3]:
                return date.getDay() === 0 ? this.#buildData(this.#titles[2], overlayStyles, pathClass) : buildCustomData(`${date.getDay()} d`, overlayStyles, pathClass);
            case this.#titles[2]:
                return date.getHours() === 0 ? this.#buildData(this.#titles[1], overlayStyles, pathClass) : buildCustomData(`${date.getHours()} h`, overlayStyles, pathClass);
            case this.#titles[1]:
                return date.getMinutes() === 0 ? this.#buildData(this.#titles[0], overlayStyles, pathClass) : buildCustomData(`${date.getMinutes()} min`, overlayStyles, pathClass);
            case this.#titles[0]:
            default:
                return buildCustomData(`${date.getSeconds()} s`, overlayStyles, pathClass);
        }
    }

}
