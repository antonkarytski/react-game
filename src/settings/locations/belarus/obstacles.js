import { OBSTACLE_EFFECTS } from "../../consts";

export const commonOmon = {
  type: "commonOmon",
  label: "Обычный омоновец",
  weight: 1,
  width: 59,
  height: 130,
  altitude: 0,
  sizeCorrection: {
    top: 0.05,
    left: 0.05,
    right: 0.05,
    bottom: 0,
  },
};

export const puffyOmon = {
  type: "puffyOmon",
  label: "Толстый омоновец",
  weight: 1,
  width: 52,
  height: 110,
  altitude: 0,
  sizeCorrection: {
    top: 0.05,
    left: 0.05,
    right: 0.05,
    bottom: 0,
  },
  speedK: 0.9,
};

export const autozak = {
  type: "autozak",
  label: "Автозак",
  weight: 0.15,
  width: 180,
  height: 90,
  altitude: 0,
  sizeCorrection: {
    top: 0.05,
    left: 0.15,
    right: 0.1,
    bottom: 0,
  },
  speedK: 1.2,
};

export const waterzak = {
  type: "waterzak",
  label: "Водомет",
  weight: 0.15,
  width: 180,
  height: 88,
  altitude: 0,
  sizeCorrection: {
    top: 0.05,
    left: 0.2,
    right: 0.05,
    bottom: 0,
  },
  speedK: 1.1,
};

export const waterBalloon = {
  type: "balloon",
  label: "Воздушный шар",
  weight: 0.8,
  width: 50,
  height: 98.5,
  altitude: [25, 175],
  effect: {
    name: OBSTACLE_EFFECTS.ALTITUDE,
    altitude: [50, -25],
  },
  sizeCorrection: {
    top: 0,
    left: 0.05,
    right: 0.05,
    bottom: 0.45,
  },
  speedK: 0.65,
};
