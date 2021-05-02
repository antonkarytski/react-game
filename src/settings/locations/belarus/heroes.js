export const nina = {
  name: "nina",
  label: "Нина",
  soundJump: false,
  sizes: {
    default: {
      w: 96,
      h: 110,
    },
    sit: {
      w: 90,
      h: 93,
    },
  },
  sizeCorrection: {
    default: {
      top: 0,
      left: 0.5,
      right: 0.1,
      bottom: 0.1,
    },
    sit: {
      top: 0.05,
      left: 0.5,
      right: 0.1,
      bottom: 0,
    },
  },
  soundHello: false,
  spriteRunPositions: [
    { x: 0, y: 0 },
    { x: 411.5, y: 0 },
  ],
  spriteRunSteps: 4,
  spriteSitPositions: [
    { x: 0, y: 168 },
    { x: 385, y: 168 },
  ],
  spriteSitSteps: 4,
  spriteJumpPosition: { x: 0, y: 168 },
  spriteDefaultPosition: { x: 0, y: 0 },
};
