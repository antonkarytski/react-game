import { useRef, useState } from "react";
import { useInterval } from "./hook.timer";

function getGenerationTime(generationTimeContainer) {
  if (Array.isArray(generationTimeContainer)) {
    const minTime = generationTimeContainer[0];
    const maxTime = generationTimeContainer[1];
    return minTime + Math.random() * (maxTime - minTime);
  }
  return generationTimeContainer;
}

const useTimerGenerator = (
  fn,
  generationTimeCont,
  condition,
  checkInterval = 250
) => {
  const [timeToNextGen, setTimeToNextGen] = useState(
    getGenerationTime(generationTimeCont)
  );
  const iterator = useRef(timeToNextGen);
  useInterval(
    () => {
      if (iterator.current <= 0) {
        const nextTimeToGen = getGenerationTime(generationTimeCont);
        setTimeToNextGen(nextTimeToGen);
        iterator.current = nextTimeToGen;
        fn();
      } else {
        iterator.current = iterator.current - checkInterval;
      }
    },
    checkInterval,
    condition
  );
};

export default useTimerGenerator;
