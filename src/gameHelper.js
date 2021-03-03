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



        window.mobileCheck = function() {
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        };
        console.log(preparedEnv)

        if(window.mobileCheck() && preparedEnv.bgMobileImage){

            const bgFile = typeof preparedEnv.bgMobileImage === "string"? preparedEnv.bgMobileImage : settings.defaultLocationBgMobileImage
            preparedEnv.bgImage = `${this.pathToLocation}/${bgFile}`
            preparedEnv.bgNaturalWidth = preparedEnv.bgNaturalMobileWidth
            preparedEnv.bgNaturalHeight = preparedEnv.bgNaturalMobileHeight
        } else {
            const bgFile = typeof preparedEnv.bgImage === "string"? preparedEnv.bgImage : settings.defaultLocationBgImage
            preparedEnv.bgImage = `${this.pathToLocation}/${bgFile}`
        }

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