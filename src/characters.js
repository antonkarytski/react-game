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
        width: 50,
        height: 50,
        altitude: 0,
        sprite: "./assets/skins/warrior.png"

    },
    {
        type: "wagon",
        label : "АВТОЗАК",
        weight: 0.1,
        width: 100,
        height: 80,
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


