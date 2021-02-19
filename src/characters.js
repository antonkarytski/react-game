const CHARACTERS = [
    {
        name: "private",
        sprite: "soldier"
    }
]

const OBSTACLES = [
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


/*

SERVICES

 */


const weights = (function (options) {
    const ranges = [];
    for (let i = 0; i < options.length; i++) {
        ranges[i] = options[i].weight + (ranges[i - 1] || 0);
    }
    return (ranges);
})(OBSTACLES);

const heroMap = (function (options) {
    const map = [];
    for (let i = 0; i < options.length; i++) {
        map[i] = options[i].name;
    }
})(CHARACTERS)


export const getRandomObstacle = () => {
    const range = Math.random() * weights[weights.length - 1];
    for (let i = 0; i < weights.length; i++) {
        if (weights[i] > range) return OBSTACLES[i];
    }
}

//heroIndex may to be number or string,
// if string - char will be searching through heroMap by the name
// if number - will be searching directly in CHARACTERS array

export const getHero = (heroIndex = 0) => {
    const sourceHero = typeof heroIndex === "number"? CHARACTERS[heroIndex] : CHARACTERS[heroMap.indexOf(heroIndex)];
    const preparedHero = Object.assign({},sourceHero);
    preparedHero.sprite = require(`./assets/skins/${preparedHero.sprite}.png`).default
    return preparedHero;
}


