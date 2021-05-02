import { useInterval } from "./hook.timer";
import { useCallback, useState } from "react";

export function useObstaclesCleaning(
  obstaclesRef,
  removeOffset,
  condition,
  interval = 400
) {
  const [obstaclesPassCount, setObstaclesPass] = useState(0);

  const cleanObstacles = useCallback(() => {
    const previousLength = obstaclesRef.current.length;
    obstaclesRef.current = obstaclesRef.current.filter((obstacle) => {
      const obstacleDom = obstacle.domElement.current;
      return obstacleDom.offsetLeft > removeOffset;
    });
    if (previousLength !== obstaclesRef.current.length) {
      setObstaclesPass((count) => count + 1);
    }
  }, [obstaclesRef, removeOffset]);

  useInterval(cleanObstacles, interval, condition);

  return obstaclesPassCount;
}
