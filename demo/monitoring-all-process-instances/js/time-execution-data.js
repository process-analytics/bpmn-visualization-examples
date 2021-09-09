const shapeTimeOverlayStyles = buildTimeOverlayStyles('top-right', '#008700');
const edgeTimeOverlayStyles = buildTimeOverlayStyles('middle', '#c61700');

const shapeLegend = new Legend("shape-legend", {colors: buildTimeLegendColors(shapeTimeOverlayStyles), titles: buildTimeLegendTitles(shapeTimeOverlayStyles)});
const edgeLegend = new Legend("edge-legend", {colors: buildTimeLegendColors(edgeTimeOverlayStyles), titles: buildTimeLegendTitles(edgeTimeOverlayStyles)});
const edgePathLegend = new Legend("edge-path-legend", {titles: buildTimeLegendTitles(edgeTimeOverlayStyles)});

function buildTimeLegendTitles(overlayStyles) {
    const titles = new Array(6);

    let types = Array.from(overlayStyles.keys());
    for (let i = 0; i < types.length; i++) {
        titles[i] = `1 ${types[types.length - 1 - i]}`;
    }
    titles[types.length] = '1 year';
    return titles;
}

function buildTimeLegendColors(overlayStyles) {
    const colors = new Array(5);
    colors[0] = overlayStyles.get('second').style.fill.color;
    colors[1] = overlayStyles.get('minute').style.fill.color;
    colors[2] = overlayStyles.get('hour').style.fill.color;
    colors[3] = overlayStyles.get('day').style.fill.color;
    colors[4] = overlayStyles.get('month').style.fill.color;
    return colors;
}

function updateTimeLegends() {
    shapeLegend.update();
    edgeLegend.update();
    edgePathLegend.update();
}

function buildTimeOverlayStyles(position, color) {
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

function buildTimeOverlay(unit, overlayStyles) {
    const date = new Date();
    date.setTime(Math.random() * 100000000000000);

    switch (unit) {
        case 'month':
            return date.getMonth() === 0 ? buildTimeOverlay('day', overlayStyles) : {
                overlay: {
                    ...overlayStyles.get(unit),
                    label: `${date.getMonth()} month`,
                },
            };
        case 'day':
            return date.getDay() === 0 ? buildTimeOverlay('hour', overlayStyles) : {
                overlay: {
                    ...overlayStyles.get(unit),
                    label: `${date.getDay()} d`,
                },
            };
        case 'hour':
            return date.getHours() === 0 ? buildTimeOverlay('minute', overlayStyles) : {
                overlay: {
                    ...overlayStyles.get(unit),
                    label: `${date.getHours()} h`,
                },
            };
        case 'minute':
            return date.getMinutes() === 0 ? buildTimeOverlay('second', overlayStyles) : {
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

function buildTimeOverlays() {
    return new Map([...getShapeTimeData(), ...getEdgeTimeData()]);
}

function getShapeTimeData() {
    const overlays = new Map();
    overlays.set('start_event', buildTimeOverlay('second', shapeTimeOverlayStyles));
    overlays.set('parallel_gateway_1', buildTimeOverlay('second', shapeTimeOverlayStyles));
    overlays.set('task_1', buildTimeOverlay('minute', shapeTimeOverlayStyles));
    overlays.set('task_2', buildTimeOverlay('minute', shapeTimeOverlayStyles));
    overlays.set('exclusive_gateway_1', buildTimeOverlay('minute', shapeTimeOverlayStyles));
    overlays.set('task_3', buildTimeOverlay('minute', shapeTimeOverlayStyles));
    overlays.set('task_4', buildTimeOverlay('day', shapeTimeOverlayStyles));
    overlays.set('task_5', buildTimeOverlay('hour', shapeTimeOverlayStyles));
    overlays.set('inclusive_gateway_1', buildTimeOverlay('second', shapeTimeOverlayStyles));
    overlays.set('task_6', buildTimeOverlay('hour', shapeTimeOverlayStyles));
    overlays.set('task_7', buildTimeOverlay('month', shapeTimeOverlayStyles));
    overlays.set('inclusive_gateway_2', buildTimeOverlay('day', shapeTimeOverlayStyles));
    overlays.set('exclusive_gateway_2', buildTimeOverlay('day', shapeTimeOverlayStyles));
    overlays.set('parallel_gateway_2', buildTimeOverlay('day', shapeTimeOverlayStyles));
    overlays.set('task_8', buildTimeOverlay('hour', shapeTimeOverlayStyles));
    overlays.set('end_event', buildTimeOverlay('second', shapeTimeOverlayStyles));
    return overlays;
}

function getEdgeTimeData() {
    function getEdgeSecondOverlay() {
        return {
            ...buildTimeOverlay('second', edgeTimeOverlayStyles),
            pathClass: 'path-lvl1'
        };
    }

    function getEdgeMinuteOverlay() {
        return {
            ...buildTimeOverlay('minute', edgeTimeOverlayStyles),
            pathClass: 'path-lvl2'
        };
    }

    const overlays = new Map();
    overlays.set('sequence_flow_1', getEdgeSecondOverlay());
    overlays.set('sequence_flow_2', getEdgeSecondOverlay());
    overlays.set('sequence_flow_18', getEdgeSecondOverlay());
    overlays.set('sequence_flow_3', getEdgeMinuteOverlay());
    overlays.set('sequence_flow_4', getEdgeSecondOverlay());
    overlays.set('sequence_flow_12', getEdgeSecondOverlay());
    overlays.set('sequence_flow_13', getEdgeSecondOverlay());
    overlays.set('sequence_flow_5', getEdgeMinuteOverlay());
    overlays.set('sequence_flow_6', getEdgeSecondOverlay());
    overlays.set('sequence_flow_8', getEdgeSecondOverlay());
    overlays.set('sequence_flow_7', getEdgeSecondOverlay());
    overlays.set('sequence_flow_10', getEdgeSecondOverlay());
    overlays.set('sequence_flow_9', getEdgeMinuteOverlay());
    overlays.set('sequence_flow_11', getEdgeSecondOverlay());
    overlays.set('sequence_flow_14', getEdgeSecondOverlay());
    overlays.set('sequence_flow_15', getEdgeMinuteOverlay());
    overlays.set('sequence_flow_16', getEdgeSecondOverlay());
    overlays.set('sequence_flow_17', getEdgeSecondOverlay());
    return overlays;
}
