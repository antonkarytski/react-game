import { useEffect } from "react";
import { STORAGE_BEST_SCORE, STORAGE_SCORE_HISTORY } from "../../settings/consts";
import { useSaveToLocalStorage } from "../hook.localStorage";
import { useBestValue, useValuesHistory } from "../hook.valuesHistory";

const savedHistory = localStorage.getItem(STORAGE_SCORE_HISTORY);
const initialHistory = savedHistory ? JSON.parse(savedHistory) : [];

export function useScoreHistory(writeTrigger, value) {
  const { history, add } = useValuesHistory(10, initialHistory);

  useSaveToLocalStorage(STORAGE_SCORE_HISTORY, history);

  useEffect(() => {
    if (!writeTrigger) return;
    add(value);
  }, [writeTrigger, value, add]);

  return { history, add };
}

const savedBestScore = localStorage.getItem(STORAGE_BEST_SCORE);
const initialBestScore = savedBestScore ? JSON.parse(savedBestScore) : 0;

export function useSaveBestScore(writeTrigger, value) {
  const { bestValue, update } = useBestValue(initialBestScore);

  useSaveToLocalStorage(STORAGE_BEST_SCORE, bestValue);

  useEffect(() => {
    if (!writeTrigger) return;
    update(value);
  }, [writeTrigger, value, update]);
}
