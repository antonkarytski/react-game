function getRandom(min, max) {
  return min + Math.random() * (max - min);
}

export function getRandomBetween(...values) {
  const [min, max] = values.length === 1 ? values[0] : values;
  return getRandom(min, max);
}
