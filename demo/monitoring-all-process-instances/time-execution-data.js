const shapeTimeOverlayStyles = getTimeOverlayStyles('top-right', '#008700');
const edgeTimeOverlayStyles = getTimeOverlayStyles('middle', '#c61700');

function updateTimeTitleLegend(legendType, overlayStyles) {
    let titles = Array.from(overlayStyles.keys());
    let ticks = document.getElementById(`${legendType}-guide-y`).children;
    for (let i = 0; i < ticks.length - 1; i++) {
        ticks[i].firstElementChild.innerText = `1 ${titles[ticks.length - 2 - i]}`;
    }
    ticks[ticks.length - 1].firstElementChild.innerText = '1 year';
}

function updateTimeLegend(legendType, overlayStyles) {
    document.getElementById(`${legendType}-250`).style.backgroundColor = overlayStyles.get('second').style.fill.color;
    document.getElementById(`${legendType}-200`).style.backgroundColor = overlayStyles.get('minute').style.fill.color;
    document.getElementById(`${legendType}-150`).style.backgroundColor = overlayStyles.get('hour').style.fill.color;
    document.getElementById(`${legendType}-100`).style.backgroundColor = overlayStyles.get('day').style.fill.color;
    document.getElementById(`${legendType}-50`).style.backgroundColor = overlayStyles.get('month').style.fill.color;
    updateTimeTitleLegend(legendType, overlayStyles);
}

function updateTimeLegends() {
    updateTimeLegend("shape-legend", shapeTimeOverlayStyles);
    updateTimeLegend("edge-legend", edgeTimeOverlayStyles);
    updateTimeTitleLegend("edge-path-legend", edgeTimeOverlayStyles);
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

function getShapeTimeData() {
    const map = new Map();
    map.set('start_event', getTimeOverlay('second', shapeTimeOverlayStyles));
    map.set('parallel_gateway_1', getTimeOverlay('second', shapeTimeOverlayStyles));
    map.set('task_1', getTimeOverlay('minute', shapeTimeOverlayStyles));
    map.set('task_2', getTimeOverlay('minute', shapeTimeOverlayStyles));
    map.set('exclusive_gateway_1', getTimeOverlay('minute', shapeTimeOverlayStyles));
    map.set('task_3', getTimeOverlay('minute', shapeTimeOverlayStyles));
    map.set('task_4', getTimeOverlay('day', shapeTimeOverlayStyles));
    map.set('task_5', getTimeOverlay('hour', shapeTimeOverlayStyles));
    map.set('inclusive_gateway_1', getTimeOverlay('second', shapeTimeOverlayStyles));
    map.set('task_6', getTimeOverlay('hour', shapeTimeOverlayStyles));
    map.set('task_7', getTimeOverlay('month', shapeTimeOverlayStyles));
    map.set('inclusive_gateway_2', getTimeOverlay('day', shapeTimeOverlayStyles));
    map.set('exclusive_gateway_2', getTimeOverlay('day', shapeTimeOverlayStyles));
    map.set('parallel_gateway_2', getTimeOverlay('day', shapeTimeOverlayStyles));
    map.set('task_8', getTimeOverlay('hour', shapeTimeOverlayStyles));
    map.set('end_event', getTimeOverlay('second', shapeTimeOverlayStyles));
    return map;
}

function getEdgeTimeData() {
    function getEdgeSecondOverlay() {
        return {
            ...getTimeOverlay('second', edgeTimeOverlayStyles),
            pathClass: 'path-lvl1'
        };
    }

    function getEdgeMinuteOverlay() {
        return {
            ...getTimeOverlay('minute', edgeTimeOverlayStyles),
            pathClass: 'path-lvl2'
        };
    }

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
