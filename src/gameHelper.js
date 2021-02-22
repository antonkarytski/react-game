import {CHARACTERS, LOCATION, OBSTACLES} from "./characters";

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
        if (weights[i] > range){
            const obstacleToShow = Object.assign({
                display: true,
                position: 0
            },OBSTACLES[i]);
            obstacleToShow.sprite = OBSTACLES[i].sprite? require(`./assets/obstacles/${OBSTACLES[i].sprite}/sprite.png`).default : false
            obstacleToShow.altitude = Array.isArray(obstacleToShow.altitude) ?
                obstacleToShow.altitude[0] + Math.random() * (obstacleToShow.altitude[1] - obstacleToShow.altitude[0]) :
                obstacleToShow.altitude
            return obstacleToShow;
        }
    }
}

//heroIndex may to be number or string,
// if string - char will be searching through heroMap by the name
// if number - will be searching directly in CHARACTERS array

export const getHero = (heroIndex = 0) => {
    const sourceHero = typeof heroIndex === "number"? CHARACTERS[heroIndex] : CHARACTERS[heroMap.indexOf(heroIndex)];
    return Object.assign({
        sprite : require(`./assets/chars/${sourceHero.name}/sprite.png`).default,
        sizes : {
            default : {
                w : 40,
                h : 50
            },
            sit : {
                w : 50,
                h : 30
            }
        }
    },sourceHero);
}


export const getLocation = () => {
    return Object.assign({
        image : require(`./assets/bg/common.jpg`).default,
    },LOCATION);
}