import { useCallback, useState } from "react";

export function useValuesHistory(length, initialHistory = []) {
  const [history, setHistory] = useState(initialHistory || []);

  const add = useCallback((score) => {
    setHistory((history) => {
      const currentHistory = [...history];
      if (currentHistory.length >= 10) {
        currentHistory.unshift(score);
        currentHistory.pop();
      } else {
        currentHistory.push(score);
      }
      return currentHistory;
    });
  }, []);

  return { history, add };
}

export function useBestValue(initialValue) {
  const [bestValue, setBestValue] = useState(initialValue);

  const update = useCallback((newValue) => {
    setBestValue((currentBest) => {
      if (newValue > currentBest) {
        return newValue;
      }
      return currentBest;
    });
  }, []);

  return { bestValue, update };
}
