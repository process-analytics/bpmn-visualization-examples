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