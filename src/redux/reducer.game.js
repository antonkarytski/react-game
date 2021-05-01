import { RESET_GAME, SET_DIFFICULTY, TOGGLE_INFO_MENU, TOGGLE_PAUSE, UPDATE_KEY } from "./types";

const initialState = {
  isPause: true,
  isLose: false,
  gameKey: 0,
  isInfoMenuOpened: false,
  pauseStateBeforeInfoMenu: false,
  gameStartTime: new Date(),
  difficulty: 2,
};

export function gameReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TOGGLE_PAUSE: {
      return {
        ...state,
        isLose: payload.loseFlag,
        isPause: !state.isPause,
        infoMenuOpened: false,
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        isLose: false,
        isPause: false,
        gameKey: state.gameKey + 1,
        gameStartTime: payload.time,
      };
    }
    case SET_DIFFICULTY: {
      const { difficulty } = payload;
      return {
        ...state,
        difficulty,
      };
    }
    case UPDATE_KEY: {
      return {
        ...state,
        set: state.gameKey + 1,
        isInfoMenuOpened: false,
      };
    }
    case TOGGLE_INFO_MENU: {
      const infoMenuState = (() => {
        if (!state.infoMenuOpened) {
          return {
            pauseStateBeforeInfoMenu: state.isPaused,
            isPaused: true,
          };
        }
        return {
          isPaused: state.pauseStateBeforeInfoMenu,
        };
      })();

      return {
        ...state,
        ...infoMenuState,
        isInfoMenuOpened: !state.isInfoMenuOpened,
      };
    }

    default:
      return state;
  }
}
