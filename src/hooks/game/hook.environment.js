import { useEffect, useState } from "react";
import { useGameLocation } from "./hook.gameLocation";
import { getObstacle } from "../../helpers/game";
import { DEFAULTS } from "../../settings/gameSettings";
import LOCATIONS from "../../settings/locations";
import { useHero } from "./hook.hero";

export function useGameEnvironment() {
  const [location, setLocation] = useGameLocation();
  const {
    setEnvironment,
    getHero,
    ...environmentInterface
  } = useLocationEnvironment(location);
  const [hero, setHero] = useHero(getHero);

  useEffect(() => {
    setEnvironment(location);
    setHero(0);
  }, [location, setEnvironment, setHero]);

  return {
    location,
    setLocation,
    hero,
    setHero,
    ...environmentInterface,
  };
}

export function useLocationEnvironment(initialLocation = DEFAULTS.location) {
  const [environment, setEnvironment] = useState(LOCATIONS[initialLocation]);

  function getHero(heroIndex) {
    const { heroes } = environment;
    return typeof heroIndex === "number"
      ? heroes[heroIndex]
      : heroes[heroes.map(({ name }) => name).indexOf(heroIndex)];
  }

  function getRandomObstacle() {
    const { obstaclesWeights, obstacles } = environment;
    const range = Math.random() * obstaclesWeights[obstaclesWeights.length - 1];
    for (let i = 0; i < obstaclesWeights.length; i++) {
      if (obstaclesWeights[i] > range) {
        return getObstacle(obstacles[i]);
      }
    }
  }

  function updateEnvironment(index) {
    setEnvironment(LOCATIONS[index]);
  }

  return {
    environment,
    setEnvironment: updateEnvironment,
    getHero,
    getRandomObstacle,
  };
}
