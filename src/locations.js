export const LOCATIONS = [
    {
        name: "belarus",
        label: "Лукашенку а автозак",
        preview: "preview.png",

        heroes: [
            {
                name: "nina",
                label: "Нина",
                soundJump: false,
                sizes: {
                    default: {
                        w: 96,
                        h: 110,
                    },
                    sit: {
                        w: 90,
                        h: 93
                    }
                },
                sizeCorrection: {
                    top: 0,
                    left: 0.5,
                    right: 0.1,
                    bottom: 0.1,
                },
                sizeSitCorrection: {
                    top: 0.05,
                    left: 0.5,
                    right: 0.1,
                    bottom: 0,
                },
                soundHello: false,
                spriteRunPositions: [{x: 0, y: 0}, {x: 411.5, y: 0}],
                spriteRunSteps: 4,
                spriteSitPositions: [{x: 0, y: 168}, {x: 385, y: 168}],
                spriteSitSteps: 4,
                spriteJumpPosition: {x: 0, y: 168},
                spriteDefaultPosition: {x: 0, y: 0},

            }
        ],

        obstacles: [
            {
                type: "commonOmon",
                label: "Обычный омоновец",
                weight: 1,
                width: 59,
                height: 130,
                altitude: 0,
                sizeCorrection: {
                    top: 0.05,
                    left: 0.05,
                    right: 0.05,
                    bottom: 0,
                },
            },
            {
                type: "puffyOmon",
                label: "Толстый омоновец",
                weight: 1,
                width: 52,
                height: 110,
                altitude: 0,
                sizeCorrection: {
                    top: 0.05,
                    left: 0.05,
                    right: 0.05,
                    bottom: 0,
                },
                speedK: 0.9
            },
            {
                type: "avtozak",
                label: "Автозак",
                weight: 0.15,
                width: 180,
                height: 90,
                altitude: 0,
                sizeCorrection: {
                    top: 0.05,
                    left: 0.15,
                    right: 0.1,
                    bottom: 0,
                },
                speedK: 1.2
            },
            {
                type: "waterzak",
                label: "Водомет",
                weight: 0.15,
                width: 180,
                height: 88,
                altitude: 0,
                sizeCorrection: {
                    top: 0.05,
                    left: 0.2,
                    right: 0.05,
                    bottom: 0,
                },
                speedK: 1.1
            },
            {
                type: "balloon",
                label: "Воздушный шар",
                weight: 0.8,
                width: 50,
                height: 98.5,
                altitude: [25, 175],
                effect: {
                    name: "altitude",
                    altitude: [50, -25],
                },
                sizeCorrection: {
                    top: 0,
                    left: 0.05,
                    right: 0.05,
                    bottom: 0.45,
                },
                speedK: 0.65
            },

        ],

        environment: {
            bottom: 0,
            bgMusic: true,
            bgNaturalWidth: 4548,
            bgNaturalHeight: 1000,
            bgImage: 'bg-common.png',
            bgNaturalMobileWidth: 2465,
            bgNaturalMobileHeight: 700,
            bgMobileImage: 'bg-common-mobile.png',

        }
    },

    /*

    AQUA DISCO

     */
    {
        name: "aquadisco",
        label: "Акводискотека",

        heroes: [
            {
                name: "navalny",
                label: "Леша Навальный",
                soundJump: true,
                sizes: {
                    default: {
                        w: 60,
                        h: 110,
                    },
                    sit: {
                        w: 100,
                        h: 75
                    }
                },
                sizeCorrection: {
                    top: 0.1,
                    left: 0.15,
                    right: 0,
                    bottom: 0.2,
                },
                sizeSitCorrection: {
                    top: 0.1,
                    left: 0,
                    right: 0.45,
                    bottom: 0,
                },
                soundHello: true,
                spriteRunPositions: [{x: 0, y: 0}, {x: 299, y: 0}],
                spriteRunSteps: 4,
                spriteSitPositions: [{x: 0, y: 115}, {x: 355, y: 115}],
                spriteJumpPosition: {x: 385, y: 0},
                spriteDefaultPosition: {x: 310, y: 0},

            }
        ],

        obstacles: [
            {
                type: "toiletBrush",
                label: "Ершик",
                weight: 0.5,
                width: 57,
                height: 21,
                altitude: [25, 175],
                effect: {name: "rotate"},
                speedK: 1.25
            },
            {
                type: "putin",
                label: "Путин",
                weight: 1,
                width: 80,
                height: 130,
                altitude: 0,
                sprite: 'putin2.gif',
                customBgSize: "auto",
                sizeCorrection: {
                    top: 0.05,
                    left: 0.25,
                    right: 0.25,
                    bottom: 0,
                },
                randomWidth: 1.8,
                randomHeight: 0.3
            },
            {
                type: "putin2",
                label: "Путин 2",
                weight: 0.5,
                width: 92,
                height: 130,
                altitude: [65, 200],
                sprite: 'sprite.gif',
                sizeCorrection: {
                    top: 0.08,
                    left: 0.33,
                    right: 0.33,
                    bottom: 0.20,
                },
                effect: {
                    name: "rotate",
                    speed: [0.1, 7],
                    direction: 'rand'
                },
            },
        ],

        environment: {
            bottom: 0,
            bgMusic: true,
            bgNaturalWidth: 6935,
            bgNaturalHeight: 763,
            bgImage: 'bg-common2.jpg',
            bgNaturalMobileWidth: 2800,
            bgNaturalMobileHeight: 763,
            bgMobileImage: 'bg-common.jpg',
            effects: "disco"
        }
    },
    {
        name: "jungle",
        label: "Опасные джунгли",
        preview: "",

        heroes: [
            {
                name: "soldier",
                label: "Soldier 1",
                soundJump: true,
                sizes: {
                    default: {
                        w: 40,
                        h: 50
                    },
                    sit: {
                        w: 50,
                        h: 40
                    }
                },
                spriteRunPositions: [{x: 0, y: 0}, {x: 139, y: 0}],
                spriteRunSteps: 3,
                spriteSitPositions: [{x: 140, y: 10}, {x: 295, y: 10}],
            },
            {
                name: "man",
                label: "Man 1",
                soundJump: false,
                sizes: {
                    default: {
                        w: 74,
                        h: 91
                    },
                    sit: {
                        w: 92,
                        h: 74
                    }
                },
                spriteRunPositions: [{x: 0, y: 0}, {x: 308, y: 0}],
                spriteRunSteps: 3,
                spriteSitPositions: [{x: 0, y: 100}, {x: 279, y: 100}],
                sizeCorrection: {
                    top: 0,
                    left: 0,
                    right: 0.1,
                    bottom: 0,
                },
            }
        ],

        obstacles: [
            {
                type: "monster-1",
                label: "Голубой монстр",
                weight: 0.5,
                width: 40,
                height: 46,
                altitude: 0,
                sprite: true,
                sizeCorrection: {
                    top: 0.1,
                    left: 0.1,
                    right: 0.1,
                    bottom: 0.1,
                },
            },
            {
                type: "monster-2",
                label: "Желтый монстр",
                weight: 0.5,
                width: 45,
                height: 35,
                altitude: [10, 60],
                sprite: true,
                sizeCorrection: {
                    top: 0.1,
                    left: 0.1,
                    right: 0.1,
                    bottom: 0.1,
                },
            }
        ],

        environment: {
            bottom: 0,
            bgMusic: true,
            bgNaturalWidth: 785,
            bgNaturalHeight: 436
        }
    },

]


