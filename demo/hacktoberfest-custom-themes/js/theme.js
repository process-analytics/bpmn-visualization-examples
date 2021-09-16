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

const colors2021 = {
    greenSuperLight: '#F0FDF4',
    greenLight: '#DBE8D9',
    greenLessMedium: '#91A88C',
    greenMedium: '#677662',
    greenDark: '#2B3531',

    brownLight: '#f4f0e1',
    brownDark: '#A88771',

    orangeLight: '#F74700',
    orangeDark: '#B53A25',
};

const themes = new Map();
themes.set("2020",
    new Map([['dark', {
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

themes.set("2021",
    new Map([['dark', {
        default: {
            fill: colors2021.greenDark,
            stroke: colors2021.greenLight,
            font: colors2021.greenSuperLight,
        },
        startEvent: {
            fill: colors2021.brownLight,
            stroke: colors2021.orangeLight,
            icon: colors2021.orangeDark
        },
        endEvent: {
            fill: colors2021.brownLight,
            stroke: colors2021.orangeDark,
        },
        exclusiveGateway: {
            fill: colors2021.greenMedium,
            insideIcon: colors2021.greenSuperLight
        },
        userTask: {
            fill: colors2021.greenMedium,
            icon: colors2021.greenSuperLight
        },
        callActivity: {
            fill: colors2021.brownLight,
            stroke: colors2021.greenLessMedium,
            font: colors2021.brownDark,
            icon: colors2021.greenDark
        },
        pool: {
            labelFill: colors2021.brownDark,
            swimlaneFill: colors2021.greenDark,
            font: colors2021.brownLight
        }
    }], ['light', {
        default: {
            fill: colors2021.brownLight,
            stroke: colors2021.brownDark,
            font: colors2021.greenDark
        },
        startEvent: {
            stroke: colors2021.orangeLight,
            icon: colors2021.orangeDark
        },
        endEvent: {
            fill: colors2021.orangeLight,
            stroke: colors2021.orangeDark,
            gradient: colors2021.brownLight
        },
        exclusiveGateway: {
            fill: colors2021.greenLessMedium,
            outsideIcon: colors2021.greenDark,
            insideIcon: colors2021.greenSuperLight
        },
        userTask: {
            fill: colors2021.greenSuperLight,
            icon: colors2021.greenMedium
        },
        callActivity: {
            fill: colors2021.greenMedium,
            font: colors2021.greenSuperLight,
            stroke: colors2021.greenDark,
            icon: colors2021.greenSuperLight
        },
        pool: {
            labelFill: colors2021.brownDark,
            swimlaneFill: colors2021.brownLight,
            font: colors2021.brownLight
        }
    }]]));

