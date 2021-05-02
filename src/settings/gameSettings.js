const DEFAULT_SPRITE_NAME = "sprite.png";

export const PATHS = {
  assets: "assets",
  locationPreview: "preview.jpg",
  locationSoundFolder: "sounds",
  locationBgSound: "bgmusic.mp3",
  locationBgImage: "bg-common.jpg",
  locationMobileBgImage: "bg-common-mobile.jpg",
};

export const DEFAULTS = {
  location: 1,
  frameWidth: 1024,
  frameHeight: 512,
  sound: {
    volume: 50,
    muted: false,
  },
};

export const OBSTACLES = {
  folder: "obstacles",
  sprite: DEFAULT_SPRITE_NAME,
};

export const HERO = {
  folder: "chars",
  sprite: DEFAULT_SPRITE_NAME,
  props: {
    preview: "preview.png",
    soundHello: "hello.mp3",
    soundJump: "jump.mp3",
  },
};

export const GAME_PROCESS = {
  generationMinTime: 600,
  generationMaxTime: 2150,
  baseSpeed: 200,
};

export const GAME_SYSTEM = {
  obstacleStackSize: 8,
};
