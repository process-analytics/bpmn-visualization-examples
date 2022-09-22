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

// Colors are taken from the Figma official design (https://do.co/hacktoberbrand)
const colors2022 = {
    // Primary colors (background and font)
    // Primary/Manga (kind of white)
    primaryManga:'#E5E1E6',
    // Primary/Void (kind of black)
    primaryVoid: '#170F1E',

    // Secondary colors (in the Hacktoberfest logo)
    // Secondary/Spark (kind of yellow)
    secondarySpark: '#FFE27D',
    // Secondary/Surf (kind of green)
    secondarySurf: '#64E3FF',
    // Secondary/Psybeam (kind of purple)
    secondaryPsybeam: '#9092FF',
};
const fonts2022= {
    family: 'JetBrains Mono, monospace',
    size: 9.5,
    poolFontSize: 14,
}

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


themes.set("2022", new Map([
    ['dark', {
        default: {
            // TODO when disabling this, the gradient of the gateway doesn't work anymore
            fill: colors2022.primaryVoid,
            stroke: colors2022.primaryManga,
            font: colors2022.primaryManga,
            fontFamily: fonts2022.family,
            fontSize: fonts2022.size,
        },
        startEvent: {
            fill: colors2022.primaryManga,
            gradient: colors2022.secondaryPsybeam,
            gradientDirection: Directions.DIRECTION_WEST,
            stroke: colors2022.secondaryPsybeam,
            icon: colors2022.secondaryPsybeam
        },
        endEvent: {
            fill: colors2022.primaryManga,
            gradient: colors2022.secondarySurf,
            gradientDirection: Directions.DIRECTION_EAST,
            stroke: colors2022.secondaryPsybeam,
        },
        exclusiveGateway: {
            fill: colors2022.secondaryManga,
            gradient: colors2022.secondarySpark,
            gradientDirection: Directions.DIRECTION_EAST,
            insideIcon: colors2022.secondarySpark,
        },
        userTask: {
            icon: colors2022.primaryManga
        },
        callActivity: {
            icon: colors2022.primaryManga
        },
        pool: {
            // labelFill: 'rgba(23, 15, 30, 0.5)',
            labelFill: colors2022.primaryVoid,
            // TODO find a way to have gradient (introduce a fake bpmn lane if no other solution is possible)
            swimlaneFill: colors2022.primaryVoid,
            // font: colors2021.brownLight
            fontSize: fonts2022.poolFontSize,
        }
    }],
    ['light', {
        default: {
            stroke: colors2022.primaryVoid,
            font: colors2022.primaryVoid,
            fontFamily: fonts2022.family,
            fontSize: fonts2022.size,
        },
        startEvent: {
            stroke: colors2022.primaryManga,
            fill: colors2022.secondaryPsybeam,
            gradient: colors2022.secondarySurf,
            gradientDirection: Directions.DIRECTION_WEST,
            icon: colors2022.primaryManga,
        },
        endEvent: {
            fill: colors2022.secondaryPsybeam,
            gradient: colors2022.secondarySpark,
            stroke: colors2022.secondaryPsybeam,
        },
        exclusiveGateway: {
            fill: colors2022.secondarySpark,
            gradient: colors2022.primaryManga,
            gradientDirection: Directions.DIRECTION_EAST,
            insideIcon: colors2022.primaryManga
        },
        userTask: {
            fill: colors2022.secondarySurf,
            gradient: colors2022.secondaryPsybeam,
            gradientDirection: Directions.DIRECTION_EAST,
            icon: colors2022.primaryVoid,
        },
        callActivity: {
            fill: colors2022.primaryManga,
            gradient: colors2022.secondarySurf,
            gradientDirection: Directions.DIRECTION_WEST,
            icon: colors2022.primaryVoid,
        },
        pool: {
            labelFill: colors2022.secondaryPsybeam,
            gradient: colors2022.secondarySurf,
            gradientDirection: Directions.DIRECTION_NORTH,
            fontSize: fonts2022.poolFontSize,
        }
    }]
]));
