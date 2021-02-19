import {CHARACTERS, OBSTACLES} from "./characters";

export const SETTINGS = {
    frameWidth: 600,
    frameHeight: 300
}

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
    return map;
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
    const preparedHero = Object.assign({sprite : require(`./assets/chars/${sourceHero.name}/sprite.png`).default},sourceHero);
    return preparedHero;
}
