import { useState } from "react";

export function useHero(getHero, initialIndex = 0) {
  const [hero, setHero] = useState({
    item: getHero(initialIndex),
    index: initialIndex,
  });

  const updateHero = (index) => {
    setHero({
      item: getHero(index),
      index,
    });
  };

  return [hero, updateHero];
}
