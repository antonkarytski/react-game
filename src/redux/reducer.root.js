import { combineReducers } from "redux";
import { gameReducer } from "./reducer.game";

export const rootReducer = combineReducers({
  game: gameReducer,
});
