export const soldier = {
  name: "soldier",
  label: "Soldier 1",
  soundJump: true,
  sizes: {
    default: {
      w: 40,
      h: 50,
    },
    sit: {
      w: 50,
      h: 40,
    },
  },
  spriteRunPositions: [
    { x: 0, y: 0 },
    { x: 139, y: 0 },
  ],
  spriteRunSteps: 3,
  spriteSitPositions: [
    { x: 140, y: 10 },
    { x: 295, y: 10 },
  ],
};

export const man = {
  name: "man",
  label: "Man 1",
  soundJump: false,
  sizes: {
    default: {
      w: 74,
      h: 91,
    },
    sit: {
      w: 92,
      h: 74,
    },
  },
  sizeCorrection: {
    default: {
      top: 0,
      left: 0,
      right: 0.1,
      bottom: 0,
    },
  },
  spriteRunPositions: [
    { x: 0, y: 0 },
    { x: 308, y: 0 },
  ],
  spriteRunSteps: 3,
  spriteSitPositions: [
    { x: 0, y: 100 },
    { x: 279, y: 100 },
  ],
};
