class obstaclesCreator {
  getRandomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  grounded(entries) {
    const pattern = {
      type: "grounded",
      label: "Grounded",
      weight: this.getRandomRange(0.5, 1),
      width: 30,
      height: 50,
      altitude: 0,
      sprite: false,
    };
    return Object.assign(pattern, entries);
  }

  lowGrounded(entries) {
    const pattern = {
      type: "lowGrounded",
      label: "Low Grounded",
      weight: this.getRandomRange(0.5, 1),
      width: 40,
      height: 40,
      altitude: 0,
      sprite: false,
    };
    return Object.assign(pattern, entries);
  }

  bigGrounded(entries) {
    const pattern = {
      type: "bigGrounded",
      label: "Big Grounded",
      weight: this.getRandomRange(0.1, 0.3),
      width: 65,
      height: 50,
      altitude: 0,
      sprite: false,
    };
    return Object.assign(pattern, entries);
  }

  littleFly(entries) {
    const pattern = {
      type: "littleFly",
      label: "Little Fly",
      weight: this.getRandomRange(0.5, 1),
      width: 30,
      height: 30,
      altitude: [10, 60],
      sprite: false,
    };
    return Object.assign(pattern, entries);
  }
}

export default new obstaclesCreator();
