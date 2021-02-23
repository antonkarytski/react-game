import easyObstacle from "./obstacleCreator";

export const LOCATIONS = [
    {
        name: "jungle",

        heroes: [
            {
                name: "soldier",
                soundBorn: true
            }
        ],

        obstacles: [
            easyObstacle.grounded({
                type: "private",
                label: "ОМОН",
                weight: 0,
                sprite: "./assets/skins/warrior.png"
            }),
            easyObstacle.lowGrounded({
                type: "fat private",
                label: "МАЛЕНЬКИЙ ОМОН",
                weight: 0,
                sprite: "./assets/skins/warrior.png"
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


