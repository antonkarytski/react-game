export default class gameHelperClass{

    currentLocation;
    locationSet;
    obstacleWeights;
    obstacles;
    heroMap;
    heroes;
    environment;
    pathToLocation;

    constructor(settings, locations){
        this.settings = Object.assign({},settings)
        this.locations = Object.assign({},locations)

        const currentScreenRotation = window.screen?.orientation?.angle ?? window.orientation

        if(currentScreenRotation === 0 || currentScreenRotation === 180){
            if (window.innerWidth < settings.defaultFrameWidth){
                this.settings.defaultFrameWidth = window.innerWidth
                this.settings.defaultFrameBorder = false
            }
            if(window.innerHeight > window.innerWidth || window.innerHeight < settings.defaultFrameHeight){
                this.settings.defaultFrameHeight = window.innerHeight
                this.settings.defaultFrameBorder = false
            }
            this.settings.frameWidth = settings.defaultFrameWidth;
            this.settings.frameHeight = settings.defaultFrameHeight;

        } else {
            if (window.innerWidth < settings.defaultFrameWidth){
                this.settings.defaultFrameHeight = window.innerWidth
                this.settings.defaultFrameBorder = false

            }
            if(window.innerHeight > window.innerWidth || window.innerHeight < settings.defaultFrameHeight){
                this.settings.defaultFrameWidth = window.innerHeight
                this.settings.defaultFrameBorder = false
            }
            this.settings.frameWidth = settings.defaultFrameHeight;
            this.settings.frameHeight = settings.defaultFrameWidth;

        }

        this.settings.frameBorder = this.settings.defaultFrameBorder;
        this.locationSet = this.prepareLocationSet(locations)
        this.currentLocation = this.setLocation(settings.defaultLocation)
    }

    //Prepare All objects for using in app, so when user change location all objects re-preparing

    setLocation(locationName = this.settings.defaultLocation || 0){
        if(typeof locationName === "string"){
            locationName = this.locations.findIndex((location) => {
                return location.name === locationName
            })
        }
        this.currentLocation = this.locations[locationName];
        this.currenLocationIndex = locationName
        this.pathToLocation = this.settings.pathToAssets + "/" + this.currentLocation.name
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

    prepareLocationSet(locations = this.locations){
        return locations.map((location) => {
            const previewFile = location.preview || this.settings.defaultLocationPreview
            return {
                name : location.name,
                preview : `${this.settings.pathToAssets}/${location.name}/${previewFile}`
            }
        })
    }

    prepareObstacleSet(unpreparedObstacleSet = this.currentLocation.obstacles){
        return unpreparedObstacleSet.map((obstacle) => {
            const preparedObstacle = Object.assign({},this.settings.obstaclesPrototype, obstacle)
            if(preparedObstacle.sprite){
                const obstacleSpriteFile = typeof obstacle.sprite === "string"? obstacle.sprite : this.settings.defaultObstacleSprite

                const spritePath = `${this.settings.obstacleFolder}/${obstacle.type}/${obstacleSpriteFile}`
                preparedObstacle.sprite = `${this.pathToLocation}/${spritePath}`

            }
            return preparedObstacle
        })
    }

    prepareHeroSet(unpreparedHeroSet){
        const heroPrototype = this.settings.heroPrototype
        const pathToCharsFolder = `${this.pathToLocation}/${this.settings.heroFolder}/`

        return unpreparedHeroSet.map((hero) => {
            const pathToHeroFolder = pathToCharsFolder + hero.name
            const preparedHero = Object.assign({}, heroPrototype, hero)
            preparedHero.sprite = `${pathToHeroFolder}/${hero.sprite || this.settings.defaultHeroSprite}`

            for(let attr in this.settings.defaultHeroProps){
                if(preparedHero[attr]){
                    const attrPath = typeof preparedHero[attr] === "string"?
                        preparedHero[attr] : this.settings.defaultHeroProps[attr]

                    preparedHero[attr] = `${pathToHeroFolder}/${attrPath}`;
                }
            }

            return preparedHero
        })
    }

    getHeroSet(locationIndex){
        return this.prepareHeroSet(this.locations[locationIndex].heroes);
    }

    prepareEnvironment(unpreparedEnv){
        const settings = this.settings;
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

    getEnvironment(locationIndex){
        if(locationIndex){
            return this.prepareEnvironment(this.locations[locationIndex].environment)
        }
        return this.environment;
    }
}