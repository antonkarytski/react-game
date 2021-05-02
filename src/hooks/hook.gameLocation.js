import { useParams } from "react-router";
import { findLocationIndex } from "../helpers/game";
import { useEffect, useState } from "react";
import { DEFAULTS } from "../settings/gameSettings";
import { STORAGE_LOCATION } from "../settings/consts";
import { useSaveToLocalStorage } from "./hook.localStorage";

function parseLocation() {
  const savedLocation =
    localStorage.getItem(STORAGE_LOCATION) ?? DEFAULTS.location;
  return Number(savedLocation);
}

export function useGameLocation() {
  const { location: urlLocation } = useParams();
  const [location, setLocation] = useState(parseLocation());

  useEffect(() => {
    const urlLocationIndex = findLocationIndex(urlLocation);
    if (urlLocation && urlLocationIndex + 1) setLocation(urlLocationIndex);
  }, [urlLocation]);

  useSaveToLocalStorage(STORAGE_LOCATION, location);

  return [location, setLocation];
}
