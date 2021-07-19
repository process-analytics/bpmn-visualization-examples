function withStrokeColorAsFillColor(overlayStyle) {
    return {...overlayStyle, stroke: {color: overlayStyle.fill.color}};
}

function updateTimeTitleLegends(guideYElement, overlayStyles) {
    document.addEventListener('DOMContentLoaded', function () {
        let titles = Array.from(overlayStyles.keys());
        let ticks = guideYElement.children;
        for (let i = 0; i < ticks.length - 1; i++) {
            ticks[i].firstElementChild.innerText = `1 ${titles[ticks.length - 2 - i]}`;
        }
        ticks[ticks.length - 1].firstElementChild.innerText = '1 year';
    })
}

function createEdgePathLegendElement(chartId, overlayStyles) {
    let chartElement = createChartElement(chartId);
    let guideYElement = createGuideYElement(chartElement);
    createBarElement(chartElement, "250", "var(--color-lvl1)", "8px");
    createBarElement(chartElement, "200", "var(--color-lvl2)", "16px");
    createBarElement(chartElement, "150", "var(--color-lvl3)", "24px");
    createBarElement(chartElement, "100", "var(--color-lvl4)", "32px");
    createBarElement(chartElement, "50", "var(--color-lvl5)");
    updateTimeTitleLegends(guideYElement, overlayStyles);
}

function getTimeOverlayStyles(position, color) {
    return new Map([
        ['month', {
            position,
            style: {
                fill: {color},
                font: {color: 'White'},
            }
        }],
        ['day', {
            position,
            style: {
                fill: {color: `rgba(${new Values(color).tint(21).rgb})`},
                font: {color: 'White'},
            }
        }],
        ['hour', {
            position,
            style: {
                fill: {color: `rgba(${new Values(color).tint(42).rgb})`},
            }
        }],
        ['minute', {
            position,
            style: {
                fill: {color: `rgba(${new Values(color).tint(63).rgb})`},
            }
        }],
        ['second', {
            position,
            style: {
                fill: {color: `rgba(${new Values(color).tint(84).rgb})`},
            }
        }],
    ]);
}

function getTimeOverlay(unit, overlayStyles) {
    const date = new Date();
    date.setTime(Math.random() * 100000000000000);

    switch (unit) {
        case 'month':
            return date.getMonth() === 0 ? getTimeOverlay('day', overlayStyles) : {
                overlay: {
                    ...overlayStyles.get(unit),
                    label: `${date.getMonth()} month`,
                },
            };
        case 'day':
            return date.getDay() === 0 ? getTimeOverlay('hour', overlayStyles) : {
                overlay: {
                    ...overlayStyles.get(unit),
                    label: `${date.getDay()} d`,
                },
            };
        case 'hour':
            return date.getHours() === 0 ? getTimeOverlay('minute', overlayStyles) : {
                overlay: {
                    ...overlayStyles.get(unit),
                    label: `${date.getHours()} h`,
                },
            };
        case 'minute':
            return date.getMinutes() === 0 ? getTimeOverlay('second', overlayStyles) : {
                overlay: {
                    ...overlayStyles.get(unit),
                    label: `${date.getMinutes()} min`,
                },
            };
        case 'second':
        default:
            return {
                overlay: {
                    ...overlayStyles.get(unit),
                    label: `${date.getSeconds()} s`,
                },
            };
    }
}

function getTimeData() {
    return new Map([...getShapeTimeData(), ...getEdgeTimeData()]);
}

function createTimeOverlayLegendElement(chartId, overlayStyles) {
    let chartElement = createChartElement(chartId);
    let guideYElement = createGuideYElement(chartElement);
    createBarElement(chartElement, "250", overlayStyles.get('second').style.fill.color);
    createBarElement(chartElement, "200", overlayStyles.get('minute').style.fill.color);
    createBarElement(chartElement, "150", overlayStyles.get('hour').style.fill.color);
    createBarElement(chartElement, "100", overlayStyles.get('day').style.fill.color);
    createBarElement(chartElement, "50", overlayStyles.get('month').style.fill.color);
    updateTimeTitleLegends(guideYElement, overlayStyles);
}

function getShapeTimeData() {
    const overlayStyles = getTimeOverlayStyles('top-right', '#008700');
    createTimeOverlayLegendElement("time-shape-legend", overlayStyles);

    const map = new Map();
    map.set('start_event', getTimeOverlay('second', overlayStyles));
    map.set('parallel_gateway_1', getTimeOverlay('second', overlayStyles));
    map.set('task_1', getTimeOverlay('minute', overlayStyles));
    map.set('task_2', getTimeOverlay('minute', overlayStyles));
    map.set('exclusive_gateway_1', getTimeOverlay('minute', overlayStyles));
    map.set('task_3', getTimeOverlay('minute', overlayStyles));
    map.set('task_4', getTimeOverlay('day', overlayStyles));
    map.set('task_5', getTimeOverlay('hour', overlayStyles));
    map.set('inclusive_gateway_1', getTimeOverlay('second', overlayStyles));
    map.set('task_6', getTimeOverlay('hour', overlayStyles));
    map.set('task_7', getTimeOverlay('month', overlayStyles));
    map.set('inclusive_gateway_2', getTimeOverlay('day', overlayStyles));
    map.set('exclusive_gateway_2', getTimeOverlay('day', overlayStyles));
    map.set('parallel_gateway_2', getTimeOverlay('day', overlayStyles));
    map.set('task_8', getTimeOverlay('hour', overlayStyles));
    map.set('end_event', getTimeOverlay('second', overlayStyles));
    return map;
}

function getEdgeTimeData() {
    const overlayStyles = getTimeOverlayStyles('middle', '#c61700');
    createTimeOverlayLegendElement("time-edge-legend", overlayStyles);
    createEdgePathLegendElement("edge-path-legend", overlayStyles);

    function getEdgeSecondOverlay() {
        return {
            ...getTimeOverlay('second', overlayStyles),
            pathClass: 'path-lvl1'
        };
    }

    function getEdgeMinuteOverlay() {
        return {
            ...getTimeOverlay('minute', overlayStyles),
            pathClass: 'path-lvl2'
        };
    }

    /*
        <chart id="time-edge-legend" scale-y-linear="0 250">
            <guide-y ticks="0 50 100 150 200 250"></guide-y>
            <bar id="time-edge-legend-lv1" literal-length="250" style="background-color: var(--color-lvl1)"></bar>
            <bar id="time-edge-legend-lv2" literal-length="200" style="background-color: var(--color-lvl2)"></bar>
            <bar id="time-edge-legend-lv3" literal-length="150" style="background-color: var(--color-lvl3)"></bar>
            <bar id="time-edge-legend-lv4" literal-length="100" style="background-color: var(--color-lvl4)"></bar>
            <bar id="time-edge-legend-lv5" literal-length="50" style="background-color: var(--color-lvl5)"></bar>
        </chart>*/


    const map = new Map();
    map.set('sequence_flow_1', getEdgeSecondOverlay());
    map.set('sequence_flow_2', getEdgeSecondOverlay());
    map.set('sequence_flow_18', getEdgeSecondOverlay());
    map.set('sequence_flow_3', getEdgeMinuteOverlay());
    map.set('sequence_flow_4', getEdgeSecondOverlay());
    map.set('sequence_flow_12', getEdgeSecondOverlay());
    map.set('sequence_flow_13', getEdgeSecondOverlay());
    map.set('sequence_flow_5', getEdgeMinuteOverlay());
    map.set('sequence_flow_6', getEdgeSecondOverlay());
    map.set('sequence_flow_8', getEdgeSecondOverlay());
    map.set('sequence_flow_7', getEdgeSecondOverlay());
    map.set('sequence_flow_10', getEdgeSecondOverlay());
    map.set('sequence_flow_9', getEdgeMinuteOverlay());
    map.set('sequence_flow_11', getEdgeSecondOverlay());
    map.set('sequence_flow_14', getEdgeSecondOverlay());
    map.set('sequence_flow_15', getEdgeMinuteOverlay());
    map.set('sequence_flow_16', getEdgeSecondOverlay());
    map.set('sequence_flow_17', getEdgeSecondOverlay());
    return map;
}

function getFrequencyOverlayStyles(position, color) {
    return new Map([
        ['random', {
            position,
            style: withStrokeColorAsFillColor({
                fill: {color},
                font: {color: 'White'},
            })
        }],
        ['ninetyFivePerCent', {
            position,
            style: withStrokeColorAsFillColor({
                fill: {color: `rgba(${new Values(color).tint(21).rgb})`},
                font: {color: 'White'},
            })
        }],
        ['otherPerCent', {
            position,
            style: withStrokeColorAsFillColor({
                fill: {color: `rgba(${new Values(color).tint(42).rgb})`},
                font: {color: 'White'},
            })
        }],
        ['thirtyPerCent', {
            position,
            style: withStrokeColorAsFillColor({
                fill: {color: `rgba(${new Values(color).tint(63).rgb})`},
            })
        }],
        ['fivePerCent', {
            position,
            style: withStrokeColorAsFillColor({
                fill: {color: `rgba(${new Values(color).tint(84).rgb})`},
            })
        }],
    ]);
}

function getFrequencyOverlay(label, overlayStyles, type) {
    return {
        overlay: {
            ...overlayStyles.get(type),
            label: String(label),
        }
    };
}

function getFrequencyData() {
    const shapeOverlayStyles = getFrequencyOverlayStyles('top-right', '#0083af');
    const edgeOverlayStyles = getFrequencyOverlayStyles('middle', '#6d00af');

    document.getElementById("frequency-shape-legend");
    document.getElementById("frequency-edge-legend");


    /*    <chart id="frequency-shape-legend" scale-y-linear="0 250" className="d-hide">
            <guide-y ticks="0 50 100 150 200 250"></guide-y>
            <bar id="frequency-shape-legend-lv1" literal-length="250" style="background-color: var(--color-lvl1)"></bar>
            <bar id="frequency-shape-legend-lv2" literal-length="200" style="background-color: var(--color-lvl2)"></bar>
            <bar id="frequency-shape-legend-lv3" literal-length="150" style="background-color: var(--color-lvl3)"></bar>
            <bar id="frequency-shape-legend-lv4" literal-length="100" style="background-color: var(--color-lvl4)"></bar>
            <bar id="frequency-shape-legend-lv5" literal-length="50" style="background-color: var(--color-lvl5)"></bar>
        </chart>
        <chart id="frequency-edge-legend" scale-y-linear="0 250" className="d-hide">
            <guide-y ticks="0 50 100 150 200 250"></guide-y>
            <bar id="frequency-edge-legend-lv1" literal-length="250" style="background-color: var(--color-lvl1)"></bar>
            <bar id="frequency-edge-legend-lv2" literal-length="200" style="background-color: var(--color-lvl2)"></bar>
            <bar id="frequency-edge-legend-lv3" literal-length="150" style="background-color: var(--color-lvl3)"></bar>
            <bar id="frequency-edge-legend-lv4" literal-length="100" style="background-color: var(--color-lvl4)"></bar>
            <bar id="frequency-edge-legend-lv5" literal-length="50" style="background-color: var(--color-lvl5)"></bar>
        </chart>*/

    const map = new Map();

    const random = Math.floor(Math.random() * 1000);
    const randomShapeOverlay = getFrequencyOverlay(random, shapeOverlayStyles, 'random');
    const randomEdgeOverlay = {...getFrequencyOverlay(random, edgeOverlayStyles, 'random'), pathClass: 'path-lvl5'};
    map.set('start_event', randomShapeOverlay);
    map.set('sequence_flow_1', randomEdgeOverlay);
    map.set('parallel_gateway_1', randomShapeOverlay);
    map.set('sequence_flow_2', randomEdgeOverlay);
    map.set('task_1', randomShapeOverlay);
    map.set('sequence_flow_18', randomEdgeOverlay);
    map.set('task_2', randomShapeOverlay);
    map.set('sequence_flow_3', randomEdgeOverlay);
    map.set('exclusive_gateway_1', randomShapeOverlay);

    const fivePerCent = Math.floor(random * 5 / 100);
    const fivePerCentShapeOverlay = getFrequencyOverlay(fivePerCent, shapeOverlayStyles, 'fivePerCent');
    const fivePerCentEdgeOverlay = {...getFrequencyOverlay(fivePerCent, edgeOverlayStyles, 'fivePerCent'), pathClass: 'path-lvl1'};
    map.set('sequence_flow_4', fivePerCentEdgeOverlay);
    map.set('task_3', fivePerCentShapeOverlay);
    map.set('sequence_flow_12', fivePerCentEdgeOverlay);
    map.set('task_4', fivePerCentShapeOverlay);
    map.set('sequence_flow_13', fivePerCentEdgeOverlay);

    const ninetyFivePerCent = random - fivePerCent;
    const ninetyFivePerCentShapeOverlay = getFrequencyOverlay(ninetyFivePerCent, shapeOverlayStyles, 'ninetyFivePerCent');
    const ninetyFivePerCentEdgeOverlay = {...getFrequencyOverlay(ninetyFivePerCent, edgeOverlayStyles, 'ninetyFivePerCent'), pathClass: 'path-lvl4'};
    map.set('sequence_flow_5', ninetyFivePerCentEdgeOverlay);
    map.set('task_5', ninetyFivePerCentShapeOverlay);
    map.set('sequence_flow_6', ninetyFivePerCentEdgeOverlay);
    map.set('inclusive_gateway_1', ninetyFivePerCentShapeOverlay);

    const thirtyPerCent = Math.floor(ninetyFivePerCent * 30 / 100);
    const thirtyPerCentShapeOverlay = getFrequencyOverlay(thirtyPerCent, shapeOverlayStyles, 'thirtyPerCent');
    const thirtyPerCentEdgeOverlay = {...getFrequencyOverlay(thirtyPerCent, edgeOverlayStyles, 'thirtyPerCent'), pathClass: 'path-lvl2'};
    map.set('sequence_flow_7', thirtyPerCentEdgeOverlay);
    map.set('task_7', thirtyPerCentShapeOverlay);
    map.set('sequence_flow_10', thirtyPerCentEdgeOverlay);

    const otherPerCent = ninetyFivePerCent - thirtyPerCent;
    const otherPerCentShapeOverlay = getFrequencyOverlay(otherPerCent, shapeOverlayStyles, 'otherPerCent');
    const otherPerCentEdgeOverlay = {...getFrequencyOverlay(otherPerCent, edgeOverlayStyles, 'otherPerCent'), pathClass: 'path-lvl3'};
    map.set('sequence_flow_8', otherPerCentEdgeOverlay);
    map.set('task_6', otherPerCentShapeOverlay);
    map.set('sequence_flow_9', otherPerCentEdgeOverlay);

    map.set('inclusive_gateway_2', ninetyFivePerCentShapeOverlay);
    map.set('sequence_flow_11', ninetyFivePerCentEdgeOverlay);

    map.set('exclusive_gateway_2', randomShapeOverlay);
    map.set('sequence_flow_14', randomEdgeOverlay);
    map.set('sequence_flow_15', randomEdgeOverlay);
    map.set('parallel_gateway_2', randomShapeOverlay);
    map.set('sequence_flow_16', randomEdgeOverlay);
    map.set('task_8', randomShapeOverlay);
    map.set('sequence_flow_17', randomEdgeOverlay);
    map.set('end_event', randomShapeOverlay);

    return map;
}


