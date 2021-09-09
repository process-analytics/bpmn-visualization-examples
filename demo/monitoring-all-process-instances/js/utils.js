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
    const sortedKeys = sortKeys(legendsStyles);
    return new Map(sortedKeys.map(sortedKey => [sortedKey, legendsStyles.get(sortedKey)]));
};

function withStrokeColorAsFillColor(overlayStyle) {
    return {...overlayStyle, stroke: {color: overlayStyle.fill.color}};
}

function buildData(label, getOverlayStyles, pathClass) {
    let data = {
        overlay: {
            ...getOverlayStyles(),
            label: String(label),
        }
    };
    if (pathClass) {
        data.pathClass = pathClass;
    }
    return data;
}