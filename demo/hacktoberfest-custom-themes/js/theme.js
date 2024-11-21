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

// Colors are taken from the Figma official design (https://do.co/hacktoberbrand)
const colors2023 = {
    // Primary colors (background and font)
    // Primary/Manga (kind of white)
    primaryManga: {
        "2.0" : '#EFEDEF',
        "3.0" : '#C3BCC3',
        "4.0" : '#655F67',
    },
    // Primary/Void (kind of black)
    primaryVoid: '#0F0913',

    // Secondary colors (in the Hacktoberfest logo)
    // Secondary/Spark (kind of yellow)
    secondaryBavarianGold: {
        "1.0" : '#FFFBA4',
        "2.0" : '#D2B863',
        "3.0" : '#AD832D',
        "4.0" : '#3D2E10',
    },
    // Secondary/Surf (kind of blue)
    secondaryBavarianBlue: {
        "1.0" : '#B2E3F0',
        "2.0" : '#33B6D8',
        "3.0" : '#14596B',
        "4.0" : '#0C3640',
    },
    // Secondary/Psybeam (kind of red)
    secondaryBavarianRed: {
        "1.0" : '#F8BDB9',
        "2.0" : '#EC4237',
        "3.0" : '#A3180F',
        "4.0" : '#460A07',
    },
};
const fonts2023= {
    family: 'JetBrains Mono, regular',
    size: 9.5,
    poolFamily: 'JetBrains Mono, medium',
    poolSize: 14,
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
            // keep this to make the gateway gradient work
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
            labelFill: colors2022.primaryVoid,
            swimlaneFill: colors2022.primaryVoid,
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


themes.set("2023", new Map([
    ['dark', {
        default: {
            // keep this to make the gateway gradient work
            fill: colors2023.primaryVoid,
            stroke: colors2023.primaryManga["2.0"],
            font: colors2023.primaryManga["2.0"],
            fontFamily: fonts2023.family,
            fontSize: fonts2023.size,
        },
        startEvent: {
            fill: colors2023.secondaryBavarianBlue["1.0"],
            stroke: colors2023.secondaryBavarianBlue["2.0"],
            icon: colors2023.secondaryBavarianBlue["3.0"]
        },
        endEvent: {
            fill: colors2023.secondaryBavarianBlue["1.0"],
            stroke: colors2023.secondaryBavarianBlue["3.0"],
        },
        exclusiveGateway: {
            fill: colors2023.secondaryBavarianRed["1.0"],
            stroke: colors2023.secondaryBavarianRed["1.0"],
            outsideIcon: colors2023.secondaryBavarianRed["4.0"],
            insideIcon: colors2023.secondaryBavarianRed["2.0"],
        },
        userTask: {
            fill: colors2023.primaryManga["4.0"],
            icon: colors2023.primaryManga["2.0"],
        },
        callActivity: {
            fill: colors2023.secondaryBavarianGold["1.0"],
            stroke: colors2023.primaryManga["4.0"],
            font: colors2023.secondaryBavarianGold["3.0"],
            icon: colors2023.secondaryBavarianGold["4.0"],
        },
        pool: {
            labelFill: colors2023.secondaryBavarianGold["2.0"],
            swimlaneFill: colors2023.primaryVoid,
            font: colors2023.secondaryBavarianGold["4.0"],
            fontFamily: fonts2023.poolFamily,
            fontSize: fonts2023.poolSize,
        }
    }],
    ['light', {
        default: {
            fill: colors2023.primaryManga["2.0"],
            stroke: colors2023.primaryVoid,
            font: colors2023.primaryVoid,
            fontFamily: fonts2023.family,
            fontSize: fonts2023.size,
        },
        startEvent: {
            stroke: colors2023.secondaryBavarianBlue["2.0"],
            icon: colors2023.secondaryBavarianBlue["3.0"]
        },
        endEvent: {
            fill: colors2023.secondaryBavarianBlue["2.0"],
            stroke: colors2023.secondaryBavarianBlue["3.0"],
            gradient: colors2023.secondaryBavarianBlue["1.0"],
        },
        exclusiveGateway: {
            outsideIcon: colors2023.secondaryBavarianRed["3.0"],
            insideIcon: colors2023.secondaryBavarianRed["1.0"]
        },
        userTask: {
            fill: colors2023.secondaryBavarianGold["1.0"],
            icon: colors2023.secondaryBavarianGold["4.0"]
        },
        callActivity: {
            fill: colors2023.secondaryBavarianGold["3.0"],
            font: colors2023.secondaryBavarianGold["1.0"],
            icon: colors2023.secondaryBavarianGold["1.0"],
        },
        pool: {
            labelFill: colors2023.secondaryBavarianGold["1.0"],
            swimlaneFill: colors2023.primaryManga["2.0"],
            fontFamily: fonts2023.poolFamily,
            fontSize: fonts2023.poolSize,
        },
    }]
]));


themes.set("Valve", new Map([
    ['dark', {
        default: {
            // keep this to make the gateway gradient work
            fill: '#100c0c',
            stroke: '#C3BCC3',
            font: '#EFEDEF',
            fontFamily: fonts2023.family,
            fontSize: 10,
        },
        startEvent: {
            fill:'#131212',
            stroke: '#c35d09',
            icon: '#c35d09',
        },
        endEvent: {
            fill: '#ff3c00',
            stroke: '#00eaff',
        },
        exclusiveGateway: {
            fill: '#cbd0d9',
            stroke: '#940a0a',
            outsideIcon: '#0c7aa5',
            insideIcon: '#177dc6',
        },
        userTask: {
            fill: 'rgb(209,87,15)',
            icon: '#c23131'
        },
        callActivity: {
            fill: "White",
            stroke: colors2023.primaryManga["4.0"],
            font: '#000000',
            icon: colors2023.secondaryBavarianGold["4.0"],
        },
        pool: {
            labelFill: colors2023.secondaryBavarianGold["2.0"],
            swimlaneFill:'#336eec',

            font: colors2023.secondaryBavarianGold["4.0"],
            fontFamily: fonts2023.poolFamily,
            fontSize: fonts2023.poolSize,
        }
    }],
    ['light', {
        default: {
            fill: colors2023.primaryManga["2.0"],
            stroke: colors2023.primaryVoid,
            font: colors2023.primaryVoid,
            fontFamily: fonts2023.family,
            fontSize: fonts2023.size,
        },
        startEvent: {
            stroke: colors2023.secondaryBavarianBlue["2.0"],
            icon: colors2023.secondaryBavarianBlue["3.0"]
        },
        endEvent: {
            fill: colors2023.secondaryBavarianBlue["2.0"],
            stroke: colors2023.secondaryBavarianBlue["3.0"],
            gradient: colors2023.secondaryBavarianBlue["1.0"],
        },
        exclusiveGateway: {
            outsideIcon: colors2023.secondaryBavarianRed["3.0"],
            insideIcon: colors2023.secondaryBavarianRed["1.0"]
        },
        userTask: {
            fill: colors2023.secondaryBavarianGold["1.0"],
            icon: colors2023.secondaryBavarianGold["4.0"]
        },
        callActivity: {
            fill: colors2023.secondaryBavarianGold["3.0"],
            font: colors2023.secondaryBavarianGold["1.0"],
            icon: colors2023.secondaryBavarianGold["1.0"],
        },
        pool: {
            labelFill: colors2023.secondaryBavarianGold["1.0"],
            swimlaneFill: colors2023.primaryManga["2.0"],
            fontFamily: fonts2023.poolFamily,
            fontSize: fonts2023.poolSize,
        },
    }]
]));
