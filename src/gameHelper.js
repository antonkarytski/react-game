import {LOCATIONS} from "./characters";

export const SETTINGS = {
    frameWidth: 600,
    frameHeight: 300,

    defaultLocation: 'jungle',
    pathToAssets : 'assets',

    locationSoundFolder : 'sounds',
    defaultLocationPreview : 'preview.jpg',
    defaultLocationBgSound : 'bgmusic.mp3',
    defaultLocationBgImage : "bg-common.jpg",
    locationPrototype: {
        bottom: 0,
        bgImage: true,
        bgMusic: false
    },

    obstacleFolder: 'obstacles',
    defaultObstacleSprite: 'sprite.png',
    obstaclesPrototype : {
        weight: 1,
        width: 30,
        height: 30,
        altitude: 0,
        sprite: true,
    },

    heroFolder: 'chars',
    defaultHeroSprite: 'sprite.png',
    defaultHeroProps: {
        preview: 'preview.png',
        soundBorn: 'born.mp3',
        soundJump: 'jump.mp3'
    },
    heroPrototype : {
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
    },
}


class gameHelperClass{

    currentLocation;
    locationSet;
    obstacleWeights;
    obstacles;
    heroMap;
    heroes;
    environment;
    pathToLocation;

    constructor(settings= SETTINGS, locations = LOCATIONS){
        this.SETTINGS = settings
        this.LOCATIONS = locations
        this.locationSet = this.prepareLocationSet(locations)
        this.currentLocation = this.setLocation(settings.defaultLocation)
    }

    //Prepare All objects for using in app, so when user change location all objects re-preparing

    setLocation(locationName = this.SETTINGS.defaultLocation){
        if(typeof locationName === "string"){
            locationName = this.LOCATIONS.findIndex((location) => {
                return location.name === locationName

            })
        }
        this.currentLocation = this.LOCATIONS[locationName];
        this.pathToLocation = this.SETTINGS.pathToAssets + "/" + this.currentLocation.name
        this.obstacleWeights = this.setWeights(this.currentLocation.obstacles)
        this.obstacles = this.prepareObstacleSet(this.currentLocation.obstacles)
        this.heroMap = this.createHeroMap(this.currentLocation.heroes)
        this.heroes = this.prepareHeroSet(this.currentLocation.heroes)
        this.environment = this.prepareEnvironment(this.currentLocation.environment)
        return this.currentLocation
    }

    setWeights(options = this.currentLocation.obstacles) {
        const ranges = [];
        for (let i = 0; i < options.length; i++) {
            ranges[i] = options[i].weight + (ranges[i - 1] || 0);
        }
        return (ranges);
    }

    //Create map of heroes names for have possibility to return them, by the name
    createHeroMap(options = this.currentLocation.heroes) {
        const map = [];
        for (let i = 0; i < options.length; i++) {
            map[i] = options[i].name;
        }
        return map;
    }

    prepareLocationSet(locations = LOCATIONS){
        return locations.map((location) => {
            const previewFile = location.preview || this.SETTINGS.defaultLocationPreview
            return {
                name : location.name,
                preview : `${this.SETTINGS.pathToAssets}/${location.name}/${previewFile}`
            }
        })
    }

    prepareObstacleSet(unpreparedObstacleSet = this.currentLocation.obstacles){
        const obstaclePrototype = {
            display: true,
            position: 0
        }
        return unpreparedObstacleSet.map((obstacle) => {
            const preparedObstacle = Object.assign(this.SETTINGS.obstaclesPrototype, obstaclePrototype, obstacle)

            if(obstacle.sprite){
                const obstacleSpriteFile = typeof obstacle.sprite === "string"? obstacle.sprite : this.SETTINGS.defaultObstacleSprite
                const spritePath = `${this.SETTINGS.obstacleFolder}/${obstacle.type}/${obstacleSpriteFile}`
                preparedObstacle.sprite = `${this.pathToLocation}/${spritePath}`
            }

            return preparedObstacle
        })
    }

    prepareHeroSet(unpreparedHeroSet){
        const heroPrototype = this.SETTINGS.heroPrototype
        const pathToCharsFolder = `${this.pathToLocation}/${this.SETTINGS.heroFolder}/`

        return unpreparedHeroSet.map((hero) => {
            const pathToHeroFolder = pathToCharsFolder + hero.name
            const preparedHero = Object.assign({}, heroPrototype, hero)
            preparedHero.sprite = `${pathToHeroFolder}/${hero.sprite || this.SETTINGS.defaultHeroSprite}`

            for(let attr in this.SETTINGS.defaultHeroProps){
                if(preparedHero[attr]){
                    const attrPath = typeof preparedHero[attr] === "string"?
                        preparedHero[attr] : this.SETTINGS.defaultHeroProps[attr]

                    preparedHero[attr] = `${pathToHeroFolder}/${attrPath}`;
                }
            }

            return preparedHero
        })
    }

    prepareEnvironment(unpreparedEnv){
        const settings = this.SETTINGS;
        const preparedEnv = Object.assign({}, settings.locationPrototype, unpreparedEnv);

        const bgFile = typeof preparedEnv.bgImage === "string"? preparedEnv.bgImage : settings.defaultLocationBgImage
        preparedEnv.bgImage = `${this.pathToLocation}/${bgFile}`

        if(preparedEnv.bgMusic){
            const defFolder = settings.locationSoundFolder;
            const defSoundFile = settings.defaultLocationBgSound
            preparedEnv.bgMusic = `${this.pathToLocation}/${defFolder}/${defSoundFile}`;
        }
        return preparedEnv;
    }

    prepareAltitude(altitude){
        if(Array.isArray(altitude)){
            return altitude[0] + Math.random() * (altitude[1] - altitude[0])
        }
        return altitude
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
        return this.environment;
    }
}

export const gameHelper = new gameHelperClass();
