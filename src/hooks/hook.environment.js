import { useEffect, useState } from "react";
import { useGameLocation } from "./hook.gameLocation";
import { DEFAULTS } from "../settings/gameSettings";
import LOCATIONS from "../settings/locations";
import { useHero } from "./hook.hero";

export function useGameEnvironment() {
  const [location, setLocation] = useGameLocation();
  const { environment } = useLocationEnvironment(location);
  const [hero, setHero] = useHero(environment);

  return {
    environment,
    location,
    setLocation,
    hero,
    setHero,
  };
}

export function useLocationEnvironment(location = DEFAULTS.location) {
  const [environment, setEnvironment] = useState(LOCATIONS[location]);

  useEffect(() => setEnvironment(LOCATIONS[location]), [location]);

  return { environment };
}
