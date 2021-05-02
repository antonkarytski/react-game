import { List } from "../settings/locations/list";
import { getRandomBetween } from "./math";

export function findLocationIndex(index) {
  if (typeof index === "string") {
    return List.findIndex(({ name }) => name === index);
  }
  if (List.length - 1 < index) return -1;
  return index;
}

export function getObstacle({ altitude, ...obstacle }) {
  return {
    ...obstacle,
    altitude: Array.isArray(altitude)
      ? getRandomBetween(altitude[0], altitude[1])
      : altitude,
  };
}

export function checkCollision(obj1, obj2, correction = {}) {
  const rightCross =
    obj1.right - correction[0].right > obj2.left + correction[1].left;
  const leftCross =
    obj1.left + correction[0].left < obj2.right - correction[1].right;
  const topCross =
    obj1.top - correction[0].top > obj2.bottom + correction[1].bottom;
  const bottomCross =
    obj1.bottom + correction[0].bottom < obj2.top - correction[1].top;
  return rightCross && leftCross && topCross && bottomCross;
}
