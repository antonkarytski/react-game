export const CHARACTERS = [
    {
        name: "soldier"
    },
    {
        name: "fatman"
    }
]

export const OBSTACLES = [
    {
        type: "private",
        label : "ОМОН",
        weight: 0,
        width: 30,
        height: 50,
        altitude: 0,
        sprite: "./assets/skins/warrior.png"

    },
    {
        type: "fat private",
        label : "МАЛЕНЬКИЙ ОМОН",
        weight: 0,
        width: 40,
        height: 40,
        altitude: 0,
        sprite: "./assets/skins/warrior.png"

    },
    {
        type: "wagon",
        label : "АВТОЗАК",
        weight: 0,
        width: 75,
        height: 60,
        altitude: 0,
        sprite: false
    },
    {
        type: "grenade",
        label : "СВЕТОШУМОВАЯ",
        weight: 0,
        width: 30,
        height: 30,
        altitude: [10, 60],
        sprite: false
    },
    {
        type: "monster-1",
        label : "Голубой монстр",
        weight: 0.5,
        width: 40,
        height: 46,
        altitude: 0,
        sprite: 'monster-1'
    },
    {
        type: "monster-2",
        label : "Желтый монстр",
        weight: 0.5,
        width: 45,
        height: 35,
        altitude: [10, 60],
        sprite: 'monster-2'
    }
]

export const LOCATION = {
    bottom: 0
}


