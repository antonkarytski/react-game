export function setWeights(options) {
  return options.reduce((accum, { weight }, index) => {
    const previousAccumWeight = accum[index - 1] || 0;
    accum.push(weight + previousAccumWeight);
    return accum;
  }, []);
}
