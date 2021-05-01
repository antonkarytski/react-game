import { useCallback, useState } from "react";
import { useInterval } from "./hook.timer";

export function useCounter(counterStep, walkCondition = true, timerStep = 50) {
  const [counter, setCounter] = useState(0);
  useInterval(
    () => {
      setCounter((counter) => counter + counterStep);
    },
    timerStep,
    walkCondition
  );

  const resetCounter = useCallback(() => {
    setCounter(0);
  }, []);

  return [counter, resetCounter];
}
