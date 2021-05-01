import { useEffect, useState } from "react";
import { useGameLocation } from "./hook.gameLocation";
import { getObstacle } from "../../helpers/game";
import { DEFAULTS } from "../../settings/gameSettings";
import LOCATIONS from "../../settings/locations";
import { useHero } from "./hook.hero";

export function useGameEnvironment() {
  const [location, setLocation] = useGameLocation();
  const { environment, getRandomObstacle } = useLocationEnvironment(location);

  const [hero, setHero] = useHero(environment);

  return {
    environment,
    location,
    setLocation,
    hero,
    setHero,
    getRandomObstacle,
  };
}

export function useLocationEnvironment(location = DEFAULTS.location) {
  const [environment, setEnvironment] = useState(LOCATIONS[location]);

  function getRandomObstacle() {
    const { obstaclesWeights, obstacles } = environment;
    const range = Math.random() * obstaclesWeights[obstaclesWeights.length - 1];
    for (let i = 0; i < obstaclesWeights.length; i++) {
      if (obstaclesWeights[i] > range) {
        return getObstacle(obstacles[i]);
      }
    }
  }

  useEffect(() => setEnvironment(LOCATIONS[location]), [location]);

  return { environment, getRandomObstacle };
}
