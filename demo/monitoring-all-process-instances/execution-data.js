function withStrokeColorAsFillColor(overlayStyle) {
    return {...overlayStyle, stroke: { color: overlayStyle.fill.color}};
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
                ...overlayStyles.get(unit),
                label: `${date.getMonth()} month`,
            };
        case 'day':
            return date.getDay() === 0 ? getTimeOverlay('hour', overlayStyles) : {
                ...overlayStyles.get(unit),
                label: `${date.getDay()} d`,
            };
        case 'hour':
            return date.getHours() === 0 ? getTimeOverlay('minute', overlayStyles) : {
                ...overlayStyles.get(unit),
                label: `${date.getHours()} h`,
            };
        case 'minute':
            return date.getMinutes() === 0 ? getTimeOverlay('second', overlayStyles) : {
                ...overlayStyles.get(unit),
                label: `${date.getMinutes()} min`,
            };
        case 'second':
        default:
            return {
                ...overlayStyles.get(unit),
                label: `${date.getSeconds()} s`,
            };
    }
}

function getTimeData() {
    return new Map([...getShapeTimeData(), ...getEdgeTimeData()]);
}

function getShapeTimeData() {
    const overlayStyles = getTimeOverlayStyles('top-right', '#008700');

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
    function getEdgeTimeOverlay() {
        return getTimeOverlay('second', overlayStyles);
    }

    const map = new Map();
    map.set('sequence_flow_1', getEdgeTimeOverlay());
    map.set('sequence_flow_2', getEdgeTimeOverlay());
    map.set('sequence_flow_18', getEdgeTimeOverlay());
    map.set('sequence_flow_3', getEdgeTimeOverlay());
    map.set('sequence_flow_4', getEdgeTimeOverlay());
    map.set('sequence_flow_12', getEdgeTimeOverlay());
    map.set('sequence_flow_13', getEdgeTimeOverlay());
    map.set('sequence_flow_5', getEdgeTimeOverlay());
    map.set('sequence_flow_6', getEdgeTimeOverlay());
    map.set('sequence_flow_8', getEdgeTimeOverlay());
    map.set('sequence_flow_7', getEdgeTimeOverlay());
    map.set('sequence_flow_10', getEdgeTimeOverlay());
    map.set('sequence_flow_9', getEdgeTimeOverlay());
    map.set('sequence_flow_11', getEdgeTimeOverlay());
    map.set('sequence_flow_14', getEdgeTimeOverlay());
    map.set('sequence_flow_15', getEdgeTimeOverlay());
    map.set('sequence_flow_16', getEdgeTimeOverlay());
    map.set('sequence_flow_17', getEdgeTimeOverlay());
    return map;
}

function getFrequencyOverlayStyles(position, color) {
    return new Map([
        ['random', {
            position,
            style: withStrokeColorAsFillColor({
                fill: { color },
                font: { color: 'White' },
            })
        }],
        ['fivePerCent', {
            position,
            style: withStrokeColorAsFillColor({
                fill: { color: `rgba(${new Values(color).tint(21).rgb})` },
                font: { color: 'White' },
            })
        }],
        ['ninetyFivePerCent', {
            position,
            style: withStrokeColorAsFillColor({
                fill: { color: `rgba(${new Values(color).tint(42).rgb})` },
            })
        }],
        ['thirtyPerCent', {
            position,
            style: withStrokeColorAsFillColor({
                fill: { color: `rgba(${new Values(color).tint(63).rgb})` },
            })
        }],
        ['otherPerCent', {
            position,
            style: withStrokeColorAsFillColor({
                fill: { color: `rgba(${new Values(color).tint(84).rgb})` },
            })
        }],
    ]);
}

function getFrequencyOverlay(label, overlayStyles, type) {
    return {
        ...overlayStyles.get(type),
        label: String(label),
    };
}

function getFrequencyData() {
    const shapeOverlayStyles = getFrequencyOverlayStyles('top-right', '#0083af');
    const edgeOverlayStyles = getFrequencyOverlayStyles('middle', '#6d00af');

    const map = new Map();

    const random = Math.floor(Math.random() * 1000);
    const randomShapeOverlay = getFrequencyOverlay(random, shapeOverlayStyles, 'random');
    const randomEdgeOverlay = getFrequencyOverlay(random, edgeOverlayStyles, 'random');
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
    const fivePerCentEdgeOverlay = getFrequencyOverlay(fivePerCent, edgeOverlayStyles, 'fivePerCent');
    map.set('sequence_flow_4', fivePerCentEdgeOverlay);
    map.set('task_3', fivePerCentShapeOverlay);
    map.set('sequence_flow_12', fivePerCentEdgeOverlay);
    map.set('task_4', fivePerCentShapeOverlay);
    map.set('sequence_flow_13', fivePerCentEdgeOverlay);

    const ninetyFivePerCent = random - fivePerCent;
    const ninetyFivePerCentShapeOverlay = getFrequencyOverlay(ninetyFivePerCent, shapeOverlayStyles, 'ninetyFivePerCent');
    const ninetyFivePerCentEdgeOverlay = getFrequencyOverlay(ninetyFivePerCent, edgeOverlayStyles, 'ninetyFivePerCent');
    map.set('sequence_flow_5', ninetyFivePerCentEdgeOverlay);
    map.set('task_5', ninetyFivePerCentShapeOverlay);
    map.set('sequence_flow_6', ninetyFivePerCentEdgeOverlay);
    map.set('inclusive_gateway_1', ninetyFivePerCentShapeOverlay);

    const thirtyPerCent = Math.floor(ninetyFivePerCent * 30 / 100);
    const thirtyPerCentShapeOverlay = getFrequencyOverlay(thirtyPerCent, shapeOverlayStyles, 'thirtyPerCent');
    const thirtyPerCentEdgeOverlay = getFrequencyOverlay(thirtyPerCent, edgeOverlayStyles, 'thirtyPerCent');
    map.set('sequence_flow_7', thirtyPerCentEdgeOverlay);
    map.set('task_7', thirtyPerCentShapeOverlay);
    map.set('sequence_flow_10', thirtyPerCentEdgeOverlay);

    const otherPerCent = ninetyFivePerCent - thirtyPerCent;
    const otherPerCentShapeOverlay = getFrequencyOverlay(otherPerCent, shapeOverlayStyles, 'otherPerCent');
    const otherPerCentEdgeOverlay = getFrequencyOverlay(otherPerCent, edgeOverlayStyles, 'otherPerCent');
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


