export const navalny = {
  name: "navalny",
  label: "Леша Навальный",
  soundJump: true,
  sizes: {
    default: {
      w: 60,
      h: 110,
    },
    sit: {
      w: 100,
      h: 75,
    },
  },
  sizeCorrection: {
    default: {
      top: 0.1,
      left: 0.15,
      right: 0,
      bottom: 0.2,
    },
    sit: {
      top: 0.1,
      left: 0,
      right: 0.45,
      bottom: 0,
    },
  },
  soundHello: true,
  spriteRunPositions: [
    { x: 0, y: 0 },
    { x: 299, y: 0 },
  ],
  spriteRunSteps: 4,
  spriteSitPositions: [
    { x: 0, y: 115 },
    { x: 355, y: 115 },
  ],
  spriteJumpPosition: { x: 385, y: 0 },
  spriteDefaultPosition: { x: 310, y: 0 },
};
