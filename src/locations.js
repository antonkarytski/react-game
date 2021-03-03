export const LOCATIONS = [
    {
        name: "belarus",
        label: "Лукашенку а автозак",
        preview: "preview.png",

        heroes: [
            {
                name: "nina",
                label: "Нина",
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
            }

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
                effect: "rotate"
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
            },
            {
                type: "monster-2",
                label: "Желтый монстр",
                weight: 0.5,
                width: 45,
                height: 35,
                altitude: [10, 60],
                sprite: true,
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


