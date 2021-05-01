import { useState } from "react";
import useTimer from "./useTimer";

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
  useTimer(
    () => {
      if (timeToNextGen <= 0) {
        setTimeToNextGen(getGenerationTime(generationTimeCont));
        fn();
      } else {
        setTimeToNextGen(timeToNextGen - checkInterval);
      }
    },
    checkInterval,
    condition,
    timeToNextGen,
    condition
  );
};

export default useTimerGenerator;
