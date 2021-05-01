import { useEffect } from "react";

export function useInterval(fn, interval, walkCondition = true) {
  useEffect(() => {
    if (walkCondition) {
      const timer = setInterval(() => {
        fn();
      }, interval);
      return () => clearInterval(timer);
    }
  }, [fn, interval, walkCondition]);
}
