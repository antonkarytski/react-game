import { OBSTACLE_EFFECTS, OBSTACLE_EFFECTS_MODIFIERS } from "../../consts";

export const toiletBrush = {
  type: "toiletBrush",
  label: "Ершик",
  weight: 0.5,
  width: 57,
  height: 21,
  altitude: [25, 175],
  effect: { name: OBSTACLE_EFFECTS.ROTATE },
  speedK: 1.25,
};

export const putin = {
  type: "putin",
  label: "Путин",
  weight: 1,
  width: 80,
  height: 130,
  altitude: 0,
  sprite: "putin2.gif",
  customBgSize: "auto",
  sizeCorrection: {
    top: 0.05,
    left: 0.25,
    right: 0.25,
    bottom: 0,
  },
  randomWidth: [-0.1, 2.5],
  randomHeight: [-0.6, 0.1],
};

export const putin2 = {
  type: "putin2",
  label: "Путин 2",
  weight: 0.5,
  width: 92,
  height: 130,
  altitude: [65, 200],
  sprite: "sprite.gif",
  sizeCorrection: {
    top: 0.08,
    left: 0.33,
    right: 0.33,
    bottom: 0.2,
  },
  effect: {
    name: OBSTACLE_EFFECTS.ROTATE,
    speed: [0.1, 7],
    direction: OBSTACLE_EFFECTS_MODIFIERS.RAND,
  },
};
