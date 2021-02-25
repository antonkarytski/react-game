import {LOCATIONS} from "./characters";

export const SETTINGS = {
    frameWidth: 600,
    frameHeight: 300,
    defaultLocation: 'jungle'
}


class gameHelperClass{

    constructor(locationsSet = LOCATIONS, defaultLocation = SETTINGS.defaultLocation){
        this.locationSet = this.prepareLocationSet()
        this.location = this.setLocation()
    }

    setWeights(options = this.location.obstacles) {
        const ranges = [];
        for (let i = 0; i < options.length; i++) {
            ranges[i] = options[i].weight + (ranges[i - 1] || 0);
        }
        return (ranges);
    }

    //Create map of heroes names for have possibility to return them, by the name
    createHeroMap(options = this.location.heroes) {
        const map = [];
        for (let i = 0; i < options.length; i++) {
            map[i] = options[i].name;
        }
        return map;
    }

    prepareLocationSet(locations = LOCATIONS){
        return locations.map((location) => {
            return {
                name : location.name,
                preview : require(`./assets/${location.name}/preview.${location.preview || 'jpg'}`).default
            }
        })
    }

    prepareObstacleSet(unpreparedObstacleSet = this.location.obstacles){
        const obstaclePrototype = {
            display: true,
            position: 0
        }
        return unpreparedObstacleSet.map((obstacle) => {
            const preparedObstacle = Object.assign({}, obstaclePrototype, obstacle)
            preparedObstacle.sprite =
                obstacle.sprite?
                    require(`./assets/${this.location.name}/obstacles/${obstacle.sprite}/sprite.png`).default
                    : false
            return preparedObstacle
        })
    }

    prepareHeroSet(unpreparedHeroSet){
        const heroPrototype = {
            sizes : {
                default : {
                    w : 40,
                    h : 50
                },
                sit : {
                    w : 50,
                    h : 30
                }
            },
            preview: true,
            soundBorn : false,
            soundJump : false
        }

        return unpreparedHeroSet.map((hero) => {
            const preparedHero = Object.assign({}, heroPrototype, hero)
            preparedHero.sprite = require(`./assets/${this.location.name}/chars/${hero.name}/sprite.png`).default
            if(preparedHero.preview) preparedHero.preview = require(`./assets/${this.location.name}/chars/${hero.name}/preview.png`).default;
            if(preparedHero.soundBorn) preparedHero.soundBorn = require(`./assets/${this.location.name}/chars/${hero.name}/born2.mp3`).default;
            if(preparedHero.soundJump) preparedHero.soundJump = require(`./assets/${this.location.name}/chars/${hero.name}/sound-jump.mp3`).default;
            return preparedHero
        })
    }

    prepareEnvironment(unpreparedEnv){
        const preparedEnv = Object.assign({
            image : require(`./assets/${this.location.name}/bg-common.jpg`).default,
            bottom: 0,
            bgMusic: false,
        },unpreparedEnv);
        if(preparedEnv.bgMusic) preparedEnv.bgMusic = require(`./assets/${this.location.name}/sounds/bgmusic.mp3`).default;
        return preparedEnv;
    }


    prepareAltitude(altitude){
        if(Array.isArray(altitude)){
            return altitude[0] + Math.random() * (altitude[1] - altitude[0])
        }
        return altitude
    }

    setLocation(locationName = SETTINGS.defaultLocation){
        if(typeof locationName === "string"){
            locationName = LOCATIONS.findIndex((location) => {
                return location.name === locationName

            })
        }

        this.location = LOCATIONS[locationName];
        this.obstacleWeights = this.setWeights(this.location.obstacles)
        this.obstacles = this.prepareObstacleSet(this.location.obstacles)
        this.heroMap = this.createHeroMap(this.location.heroes)
        this.heroes = this.prepareHeroSet(this.location.heroes)
        this.envitonment = this.prepareEnvironment(this.location.environment)
        return this.location
    }

    getObstacle(obstacle){
        return Object.assign(
            {},
            obstacle,
            {altitude : this.prepareAltitude(obstacle.altitude)});
    }

    getRandomObstacle(){
        const weights = this.obstacleWeights
        const range = Math.random() * weights[weights.length - 1];
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] > range){
                return this.getObstacle(this.obstacles[i])
            }
        }
    }

    getHero(heroIndex = 0){
        return typeof heroIndex === "number" ? this.heroes[heroIndex] : this.heroes[this.heroMap.indexOf(heroIndex)];
    }

    getEnvironment(){
        return this.envitonment;
    }
}

export const gameHelper = new gameHelperClass();
