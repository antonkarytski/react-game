export function MIN_TIME_DECREASE(time, anchor, multi = 250) {
  return time - anchor ** (1 / 9) * multi + multi;
}

export function MAX_TIME_DECREASE(time, anchor, multi = 500) {
  return time - anchor ** (1 / 5) * multi + multi;
}

export function SPEED_FUNCTION(baseSpeed, anchor) {
  return (
    baseSpeed +
    baseSpeed *
      (Math.log(anchor + 1) / Math.log(10) / 27.2) *
      anchor ** (1 / 2.72)
  );
}
