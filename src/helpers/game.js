import { List } from "../settings/locations/list";

export function findLocationIndex(index) {
  if (typeof index === "string") {
    return List.findIndex(({ name }) => name === index);
  }
  if (List.length - 1 < index) return -1;
  return index;
}
