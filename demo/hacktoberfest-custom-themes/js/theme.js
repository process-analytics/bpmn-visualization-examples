const colors2020 = {
    blueSuperLight: '#F1F7FA',
    blueLight: '#93C2DB',
    blueLessMedium: '#355571',
    blueMedium: '#183d5d',
    blueDark: '#072540',

    pinkSuperLight: 'White',
    pinkLight: '#ffe9fa',
    pinkMedium: '#FF8AE2',
    pinkDark: '#9C4668',
};

const themes = new Map();
themes.set("2020", new Map([['dark', {
    default: {
        fill: colors2020.blueDark,
        stroke: colors2020.blueLight,
        font: colors2020.blueSuperLight,
    },
    startEvent: {
        fill: colors2020.pinkLight,
        stroke: colors2020.pinkMedium,
        icon: colors2020.pinkDark
    },
    endEvent: {
        fill: colors2020.pinkLight,
        stroke: colors2020.pinkDark,
    },
    exclusiveGateway: {
        fill: colors2020.blueMedium,
        insideIcon: colors2020.blueSuperLight
    },
    userTask: {
        fill: colors2020.blueLessMedium,
        icon: colors2020.blueSuperLight
    },
    callActivity: {
        fill: colors2020.blueSuperLight,
        font: colors2020.blueMedium,
        icon: colors2020.blueDark
    },
    pool: {
        labelFill: colors2020.blueMedium,
        swimlaneFill: colors2020.blueDark,
    }
}], ['light', {
    default: {
        fill: colors2020.pinkSuperLight,
        stroke: colors2020.blueDark,
        font: colors2020.blueMedium,
    },
    startEvent: {
        stroke: colors2020.pinkMedium,
        icon: colors2020.pinkDark
    },
    endEvent: {
        fill: colors2020.pinkMedium,
        stroke: colors2020.pinkDark,
        gradient: colors2020.pinkSuperLight
    },
    exclusiveGateway: {
        outsideIcon: colors2020.blueMedium,
        insideIcon: colors2020.blueLight
    },
    userTask: {
        fill: colors2020.blueSuperLight,
        icon: colors2020.blueMedium
    },
    callActivity: {
        fill: colors2020.blueMedium,
        font: colors2020.blueLight,
        icon: colors2020.blueSuperLight
    },
    pool: {
        labelFill: colors2020.blueSuperLight,
        swimlaneFill: colors2020.pinkSuperLight,
    }
}]]));
