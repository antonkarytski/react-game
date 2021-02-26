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
            },
            {
                name: "soldier2",
                label: "Soldier 2",
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
            },
            {
                name: "soldier3",
                label: "Soldier 3",
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
            },
            {
                name: "soldier4",
                label: "Soldier 4",
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
                        w : 40,
                        h : 50
                    },
                    sit : {
                        w : 50,
                        h : 40
                    }
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
            easyObstacle.littleFly({
                type: "grenade",
                label: "СВЕТОШУМОВАЯ",
                weight: 0,
            }),
            {
                type: "monster-1",
                label: "Голубой монстр",
                weight: 0.5,
                width: 40,
                height: 46,
                altitude: 0,
                sprite: 'monster-1'
            },
            {
                type: "monster-2",
                label: "Желтый монстр",
                weight: 0.5,
                width: 45,
                height: 35,
                altitude: [10, 60],
                sprite: 'monster-2'
            }
        ],

        environment: {
            bottom: 0,
            bgMusic: true,
        }
    }
]


