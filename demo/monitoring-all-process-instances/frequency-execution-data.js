let shapeFrequencyLegendStyles = new Map();
let edgeFrequencyLegendStyles = new Map();

function updateFrequencyTitleLegend(legendType, titles) {
    let ticks = document.getElementById(`${legendType}-guide-y`).children;
    ticks[0].firstElementChild.innerText = 0;
    for (let i = 1; i < ticks.length; i++) {
        ticks[i].firstElementChild.innerText = titles[i - 1];
    }
}

function getLegendTitles(legendsStyles) {
    return Array.from(legendsStyles.keys());
}

function updateFrequencyLegend(legendType, legendsStyles) {
    const titles = getLegendTitles(legendsStyles);
    document.getElementById(`${legendType}-250`).style.backgroundColor = legendsStyles.get(titles[0]);
    document.getElementById(`${legendType}-200`).style.backgroundColor = legendsStyles.get(titles[1]);
    document.getElementById(`${legendType}-150`).style.backgroundColor = legendsStyles.get(titles[2]);
    document.getElementById(`${legendType}-100`).style.backgroundColor = legendsStyles.get(titles[3]);
    document.getElementById(`${legendType}-50`).style.backgroundColor = legendsStyles.get(titles[4]);
    updateFrequencyTitleLegend(legendType, titles);
}

function updateFrequencyLegends() {
    updateFrequencyLegend("shape-legend", shapeFrequencyLegendStyles);
    updateFrequencyLegend("edge-legend", edgeFrequencyLegendStyles);
    updateFrequencyTitleLegend("edge-path-legend", getLegendTitles(edgeFrequencyLegendStyles));
}

function withStrokeColorAsFillColor(overlayStyle) {
    return {...overlayStyle, stroke: {color: overlayStyle.fill.color}};
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

function getFrequencyOverlay(label, overlayStyles, type, pathClass) {
    let overlay = {
        overlay: {
            ...overlayStyles.get(type),
            label: String(label),
        }
    };
    if (pathClass) {
        overlay.overlay.pathClass = pathClass;
        edgeFrequencyLegendStyles.set(label, overlay.overlay.style.fill.color);
    } else {
        shapeFrequencyLegendStyles.set(label, overlay.overlay.style.fill.color);
    }
    return overlay;
}

function getFrequencyData() {
    const shapeOverlayStyles = getFrequencyOverlayStyles('top-right', '#0083af');
    const edgeOverlayStyles = getFrequencyOverlayStyles('middle', '#6d00af');

    const map = new Map();

    const random = Math.floor(Math.random() * 1000);
    const randomShapeOverlay = getFrequencyOverlay(random, shapeOverlayStyles, 'random');
    const randomEdgeOverlay = getFrequencyOverlay(random, edgeOverlayStyles, 'random', 'path-lvl5');
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
    const fivePerCentEdgeOverlay = getFrequencyOverlay(fivePerCent, edgeOverlayStyles, 'fivePerCent', 'path-lvl1');
    map.set('sequence_flow_4', fivePerCentEdgeOverlay);
    map.set('task_3', fivePerCentShapeOverlay);
    map.set('sequence_flow_12', fivePerCentEdgeOverlay);
    map.set('task_4', fivePerCentShapeOverlay);
    map.set('sequence_flow_13', fivePerCentEdgeOverlay);

    const ninetyFivePerCent = random - fivePerCent;
    const ninetyFivePerCentShapeOverlay = getFrequencyOverlay(ninetyFivePerCent, shapeOverlayStyles, 'ninetyFivePerCent');
    const ninetyFivePerCentEdgeOverlay = getFrequencyOverlay(ninetyFivePerCent, edgeOverlayStyles, 'ninetyFivePerCent', 'path-lvl4');
    map.set('sequence_flow_5', ninetyFivePerCentEdgeOverlay);
    map.set('task_5', ninetyFivePerCentShapeOverlay);
    map.set('sequence_flow_6', ninetyFivePerCentEdgeOverlay);
    map.set('inclusive_gateway_1', ninetyFivePerCentShapeOverlay);

    const thirtyPerCent = Math.floor(ninetyFivePerCent * 30 / 100);
    const thirtyPerCentShapeOverlay = getFrequencyOverlay(thirtyPerCent, shapeOverlayStyles, 'thirtyPerCent');
    const thirtyPerCentEdgeOverlay = getFrequencyOverlay(thirtyPerCent, edgeOverlayStyles, 'thirtyPerCent', 'path-lvl2');
    map.set('sequence_flow_7', thirtyPerCentEdgeOverlay);
    map.set('task_7', thirtyPerCentShapeOverlay);
    map.set('sequence_flow_10', thirtyPerCentEdgeOverlay);

    const otherPerCent = ninetyFivePerCent - thirtyPerCent;
    const otherPerCentShapeOverlay = getFrequencyOverlay(otherPerCent, shapeOverlayStyles, 'otherPerCent');
    const otherPerCentEdgeOverlay = getFrequencyOverlay(otherPerCent, edgeOverlayStyles, 'otherPerCent', 'path-lvl3');
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


    const sortKeys = (legendsStyles) => {
        return Array.from(legendsStyles.keys()).sort((a, b) => {
            if (parseInt(a) < parseInt(b)) {
                return -1;
            }
            if (parseInt(a) > parseInt(b)) {
                return 1;
            }
            return 0;
        });
    };
    const sortMap = (legendsStyles) => {
        const sortedMap = new Map();
        const sortedKeys = sortKeys(legendsStyles);
        for (const sortedKey of sortedKeys) {
            sortedMap.set(sortedKey, legendsStyles.get(sortedKey));
        }
        return sortedMap;
    };

    shapeFrequencyLegendStyles = sortMap(shapeFrequencyLegendStyles);
    edgeFrequencyLegendStyles = sortMap(edgeFrequencyLegendStyles);

    return map;
}


