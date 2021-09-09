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
