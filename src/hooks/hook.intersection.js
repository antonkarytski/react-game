import { useInterval } from "./hook.timer";
import { Position } from "../helpers/position";
import { useCallback } from "react";

export function useIntersection(hero, obstacles, fn, condition) {
  const checkIntersection = useCallback(() => {
    const heroDom = hero.domElement.current;
    const heroPosition = new Position(
      heroDom?.getBoundingClientRect(),
      hero.sizeCorrection
    );
    obstacles.forEach((obstacle) => {
      const obstacleDom = obstacle.domElement.current;
      const obstaclePosition = new Position(
        obstacleDom.getBoundingClientRect(),
        obstacle.sizeCorrection
      );
      if (Position.isIntersect(heroPosition, obstaclePosition)) {
        fn();
      }
    });
  }, [hero, obstacles, fn]);

  useInterval(checkIntersection, 40, condition);
}
