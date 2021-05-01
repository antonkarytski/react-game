import { RESET_GAME, SET_DIFFICULTY, TOGGLE_INFO_MENU, TOGGLE_PAUSE, UPDATE_KEY } from "./types";

export const togglePause = (loseFlag) => ({
  type: TOGGLE_PAUSE,
  payload: { loseFlag },
});
export const resetGame = () => ({
  type: RESET_GAME,
  payload: { time: new Date() },
});
export const setDifficulty = (difficulty) => ({
  type: SET_DIFFICULTY,
  payload: { difficulty },
});
export const updateGameKey = () => ({ type: UPDATE_KEY });
export const toggleInfoMenu = () => ({ type: TOGGLE_INFO_MENU });
