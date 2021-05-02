import { useCallback, useEffect, useState } from "react";

export function useHero(location, heroIndex = 0) {
  const getHero = useCallback(
    (heroIndex) => {
      const { heroes } = location;
      return typeof heroIndex === "number"
        ? heroes[heroIndex]
        : heroes[heroes.map(({ name }) => name).indexOf(heroIndex)];
    },
    [location]
  );

  const [hero, setHero] = useState({
    item: getHero(heroIndex),
    index: heroIndex,
  });

  const updateHero = useCallback(
    (index) => setHero({ item: getHero(index), index }),
    [getHero]
  );

  useEffect(() => {
    updateHero(0);
  }, [updateHero]);

  return [hero, updateHero];
}
