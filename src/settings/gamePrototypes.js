export const HERO_PROTOTYPE = {
  sizes: {
    default: {
      w: 40,
      h: 50,
    },
    sit: {
      w: 50,
      h: 30,
    },
  },
  preview: true,
  soundHello: false,
  soundJump: false,
  spriteRunPositions: [
    { x: 0, y: 0 },
    { x: 299, y: 0 },
  ],
  spriteRunSteps: 3,
  spriteSitSteps: 3,
  sizeCorrection: 0,
  sizeSitCorrection: 0,
};

export const OBSTACLE_PROTOTYPE = {
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
  randomHeight: 0,
  effect: false,
  speedK: 1,
};

export const LOCATION_PROTOTYPE = {
  bottom: 0,
  bgImage: true,
  bgMobileImage: false,
  bgMusic: false,
  effects: false,
};
