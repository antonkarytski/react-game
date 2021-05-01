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
