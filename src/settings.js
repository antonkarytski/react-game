export const SETTINGS = {
    defaultFrameWidth : 1024,
    defaultFrameHeight : 512,
    defaultVerticalMargin: 50,
    defaultFrameBorder: true,

    defaultLocation: 1,
    pathToAssets : 'assets',

    locationSoundFolder : 'sounds',
    defaultLocationPreview : 'preview.jpg',
    defaultLocationBgSound : 'bgmusic.mp3',
    defaultLocationBgImage : "bg-common.jpg",
    locationPrototype: {
        bottom: 0,
        bgImage: true,
        bgMusic: false,
        effects: false
    },

    obstacleFolder: 'obstacles',
    defaultObstacleSprite: 'sprite.png',
    obstaclesPrototype : {
        weight: 1,
        width: 30,
        height: 30,
        altitude: 0,
        sprite: true,
        display: true,
        position: 0,
        customBgSize: false,
        sizeCorrection: 0,
        randomWidth: 0,
        randomHeight: 0
    },

    heroFolder: 'chars',
    defaultHeroSprite: 'sprite.png',
    defaultHeroProps: {
        preview: 'preview.png',
        soundHello: 'hello.mp3',
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
        soundHello : false,
        soundJump : false,
        spriteRunPositions: [{x: 0, y: 0},{x: 299, y: 0}],
        spriteRunSteps: 3,
    },
}