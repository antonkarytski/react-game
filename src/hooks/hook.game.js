import { useState } from "react";
import { getSavedNumberVal } from "../helpers/localStorage";
import { STORAGE_DIFFICULTY } from "../settings/consts";
import { useSaveToLocalStorage } from "./hook.localStorage";

const savedGameDifficult = getSavedNumberVal(STORAGE_DIFFICULTY, 2);

export function useGameState() {
  const [gameState, setGameState] = useState({
    isPause: true,
    isLose: false,
    gameKey: 0,
    isInfoMenuOpened: false,
    gameStartTime: new Date(),
    difficulty: savedGameDifficult,
  });

  function updateGameState(newState) {
    setGameState((state) => ({ ...state, ...newState }));
  }

  function setGameDifficulty(difficulty) {
    updateGameState({ difficulty });
  }

  useSaveToLocalStorage(STORAGE_DIFFICULTY, gameState.difficulty);

  return {
    gameState,
    updateGameState,
    setGameDifficulty,
  };
}
