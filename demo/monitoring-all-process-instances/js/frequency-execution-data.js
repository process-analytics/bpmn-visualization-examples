let shapeFreqLegend;
let edgeFreqLegend;
let edgePathFreqLegend;


function buildLegendColors(styles) {
    const legendsColors = new Array();
    styles.forEach((values) => legendsColors.push(values.style.fill.color))
    return legendsColors;
}

function updateFrequencyLegends() {
    shapeFreqLegend.update();
    edgeFreqLegend.update();
    edgePathFreqLegend.update();
}

function withStrokeColorAsFillColor(overlayStyle) {
    return {...overlayStyle, stroke: {color: overlayStyle.fill.color}};
}

function buildFrequencyOverlayStyles(titles, position, color) {
    return sortMap(new Map([
        [titles[5], {
            position,
            style: withStrokeColorAsFillColor({
                fill: {color},
                font: {color: 'White'},
            })
        }],
        [titles[4], {
            position,
            style: withStrokeColorAsFillColor({
                fill: {color: `rgba(${new Values(color).tint(21).rgb})`},
                font: {color: 'White'},
            })
        }],
        [titles[3], {
            position,
            style: withStrokeColorAsFillColor({
                fill: {color: `rgba(${new Values(color).tint(42).rgb})`},
                font: {color: 'White'},
            })
        }],
        [titles[2], {
            position,
            style: withStrokeColorAsFillColor({
                fill: {color: `rgba(${new Values(color).tint(63).rgb})`},
            })
        }],
        [titles[1], {
            position,
            style: withStrokeColorAsFillColor({
                fill: {color: `rgba(${new Values(color).tint(84).rgb})`},
            })
        }],
    ]));
}

function buildFrequencyOverlay(label, overlayStyles, pathClass) {
    let overlay = {
        overlay: {
            ...overlayStyles.get(label),
            label: String(label),
        }
    };
    if (pathClass) {
        overlay.pathClass = pathClass;
    }
    return overlay;
}

function buildFrequencyTitles() {
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

function sortIntegerArray(array) {
    return array.sort((a, b) => {
        if (parseInt(a) < parseInt(b)) {
            return -1;
        }
        if (parseInt(a) > parseInt(b)) {
            return 1;
        }
        return 0;
    });
}

const sortKeys = (legendsStyles) => {
    return sortIntegerArray(Array.from(legendsStyles.keys()));
};
const sortMap = (legendsStyles) => {
    const sortedMap = new Map();
    const sortedKeys = sortKeys(legendsStyles);
    for (const sortedKey of sortedKeys) {
        sortedMap.set(sortedKey, legendsStyles.get(sortedKey));
    }
    return sortedMap;
};

function buildFrequencyOverlays() {
    const titles = buildFrequencyTitles();

    const shapeOverlayStyles = buildFrequencyOverlayStyles(titles, 'top-right', '#0083af');
    const edgeOverlayStyles = buildFrequencyOverlayStyles(titles, 'middle', '#6d00af');

    const overlays = new Map();

    const randomShapeOverlay = buildFrequencyOverlay(titles[5], shapeOverlayStyles);
    const randomEdgeOverlay = buildFrequencyOverlay(titles[5], edgeOverlayStyles, 'path-lvl5');
    overlays.set('start_event', randomShapeOverlay);
    overlays.set('sequence_flow_1', randomEdgeOverlay);
    overlays.set('parallel_gateway_1', randomShapeOverlay);
    overlays.set('sequence_flow_2', randomEdgeOverlay);
    overlays.set('task_1', randomShapeOverlay);
    overlays.set('sequence_flow_18', randomEdgeOverlay);
    overlays.set('task_2', randomShapeOverlay);
    overlays.set('sequence_flow_3', randomEdgeOverlay);
    overlays.set('exclusive_gateway_1', randomShapeOverlay);

    const fivePerCentShapeOverlay = buildFrequencyOverlay(titles[1], shapeOverlayStyles);
    const fivePerCentEdgeOverlay = buildFrequencyOverlay(titles[1], edgeOverlayStyles, 'path-lvl1');
    overlays.set('sequence_flow_4', fivePerCentEdgeOverlay);
    overlays.set('task_3', fivePerCentShapeOverlay);
    overlays.set('sequence_flow_12', fivePerCentEdgeOverlay);
    overlays.set('task_4', fivePerCentShapeOverlay);
    overlays.set('sequence_flow_13', fivePerCentEdgeOverlay);

    const ninetyFivePerCentShapeOverlay = buildFrequencyOverlay(titles[4], shapeOverlayStyles);
    const ninetyFivePerCentEdgeOverlay = buildFrequencyOverlay(titles[4], edgeOverlayStyles, 'path-lvl4');
    overlays.set('sequence_flow_5', ninetyFivePerCentEdgeOverlay);
    overlays.set('task_5', ninetyFivePerCentShapeOverlay);
    overlays.set('sequence_flow_6', ninetyFivePerCentEdgeOverlay);
    overlays.set('inclusive_gateway_1', ninetyFivePerCentShapeOverlay);

    const thirtyPerCentShapeOverlay = buildFrequencyOverlay(titles[2], shapeOverlayStyles);
    const thirtyPerCentEdgeOverlay = buildFrequencyOverlay(titles[2], edgeOverlayStyles, 'path-lvl2');
    overlays.set('sequence_flow_7', thirtyPerCentEdgeOverlay);
    overlays.set('task_7', thirtyPerCentShapeOverlay);
    overlays.set('sequence_flow_10', thirtyPerCentEdgeOverlay);

    const otherPerCentShapeOverlay = buildFrequencyOverlay(titles[3], shapeOverlayStyles);
    const otherPerCentEdgeOverlay = buildFrequencyOverlay(titles[3], edgeOverlayStyles, 'path-lvl3');
    overlays.set('sequence_flow_8', otherPerCentEdgeOverlay);
    overlays.set('task_6', otherPerCentShapeOverlay);
    overlays.set('sequence_flow_9', otherPerCentEdgeOverlay);

    overlays.set('inclusive_gateway_2', ninetyFivePerCentShapeOverlay);
    overlays.set('sequence_flow_11', ninetyFivePerCentEdgeOverlay);

    overlays.set('exclusive_gateway_2', randomShapeOverlay);
    overlays.set('sequence_flow_14', randomEdgeOverlay);
    overlays.set('sequence_flow_15', randomEdgeOverlay);
    overlays.set('parallel_gateway_2', randomShapeOverlay);
    overlays.set('sequence_flow_16', randomEdgeOverlay);
    overlays.set('task_8', randomShapeOverlay);
    overlays.set('sequence_flow_17', randomEdgeOverlay);
    overlays.set('end_event', randomShapeOverlay);

    function buildLegendTheme(styles) {
        const colors = buildLegendColors(styles);

        return {colors, titles};
    }

    shapeFreqLegend = new Legend("shape-legend", buildLegendTheme(shapeOverlayStyles));
    edgeFreqLegend = new Legend("edge-legend", buildLegendTheme(edgeOverlayStyles));
    edgePathFreqLegend = new Legend("edge-path-legend", {titles: titles});

    return overlays;
}


