import easyObstacle from "./obstacleCreator";

export const LOCATIONS = [
    {
        name: "jungle",
        label: "Опасные джунгли",
        preview: "",


        heroes: [
            {
                name: "soldier",
                label: "Soldier 1",
                soundJump: true,
                sizes : {
                    default : {
                        w : 40,
                        h : 50
                    },
                    sit : {
                        w : 50,
                        h : 40
                    }
                },
                spriteRunPositions: [{x:0,y:0}, {x: 139, y:0}],
                spriteRunSteps: 3,
                spriteSitPositions: [{x:140,y:10},{x: 295, y:10}],
            }
        ],

        obstacles: [
            easyObstacle.grounded({
                type: "private",
                label: "ОМОН",
                weight: 0,
                sprite: false
            }),
            easyObstacle.lowGrounded({
                type: "fat private",
                label: "МАЛЕНЬКИЙ ОМОН",
                weight: 0,
                sprite: false
            }),
            easyObstacle.lowGrounded({
                type: "wagon",
                label: "АВТОЗАК",
                weight: 0,
                sprite: false
            }),
            easyObstacle.littleFly({
                type: "grenade",
                label: "СВЕТОШУМОВАЯ",
                weight: 0,
                sprite: false
            }),
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
                sizes : {
                    default : {
                        w : 60,
                        h : 110
                    },
                    sit : {
                        w : 100,
                        h : 75
                    }
                },
                soundHello: true,
                spriteRunPositions: [{x:0,y:0},{x: 299, y:0}],
                spriteRunSteps: 4,
                spriteSitPositions: [{x:0,y:115},{x: 355, y:115}],
                spriteJumpPosition: {x:385, y: 0},
                spriteDefaultPosition : {x:310, y: 0},
                sizeCorrection: {
                    top: 0,
                    left: 0.15,
                    right: 0,
                    bottom: 0.2,
                },
            }
        ],

        obstacles: [
            easyObstacle.grounded({
                type: "private",
                label: "ОМОН",
                weight: 0,
            }),
            easyObstacle.lowGrounded({
                type: "fat private",
                label: "МАЛЕНЬКИЙ ОМОН",
                weight: 0,
            }),
            easyObstacle.lowGrounded({
                type: "wagon",
                label: "АВТОЗАК",
                weight: 0,
            }),
            {
                type: "toiletBrush",
                label: "Ершик",
                weight: 0.5,
                width: 47.5,
                height: 17.5,
                altitude:[10,140],
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
                randomWidth: 1.1,
                randomHeight: 0.5
            },
        ],

        environment: {
            bottom: 0,
            bgMusic: true,
            bgNaturalWidth: 6935,
            bgNaturalHeight: 763,
            bgImage: 'bg-common2.jpg',
            effects: "disco"
        }
    }
]


