export const CHARACTERS = [
    {
        name: "soldier"
    }
]

export const OBSTACLES = [
    {
        type: "private",
        label : "ОМОН",
        weight: 1,
        width: 30,
        height: 50,
        altitude: 0,
        sprite: "./assets/skins/warrior.png"

    },
    {
        type: "fat private",
        label : "МАЛЕНЬКИЙ ОМОН",
        weight: 1,
        width: 40,
        height: 40,
        altitude: 0,
        sprite: "./assets/skins/warrior.png"

    },
    {
        type: "wagon",
        label : "АВТОЗАК",
        weight: 1,
        width: 75,
        height: 60,
        altitude: 0,
        sprite: false
    },
    {
        type: "grenade",
        label : "СВЕТОШУМОВАЯ",
        weight: 1,
        width: 30,
        height: 30,
        altitude: [10, 60],
        sprite: false
    }
]


