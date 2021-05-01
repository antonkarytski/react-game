import React, { useEffect, useRef } from "react";
import Audio from "../components/Helpres/Audio";
import GameLayout from "./Layouts/GameLayout";
import NavigationLayout from "./Layouts/NavigationLayout";
import MenuLayout from "./Layouts/MenuLayout";
import classesCss from "./Frame.module.scss";
import useUnshiftKeyPress from "../hooks/useUnshiftKeyPress";
import { getSavedNumberVal } from "../helpers/localStorage";
import { useFullScreen } from "../hooks/hook.fullScreen";
import { useGameAudio } from "../hooks/game/hook.sounds";
import { useGameEnvironment } from "../hooks/game/hook.environment";
import { useFrameSizeStyle } from "../hooks/game/hook.frameSize";
import { LOCATIONS_MENU_SET } from "../settings/locations";
import { useDispatch, useSelector } from "react-redux";
import { resetGame, togglePause, updateGameKey } from "../redux/actions.game";

export default function Frame() {
  const {
    audioRef: bgMusic,
    soundState,
    setVolume,
    reloadSound,
    toggleMute,
  } = useGameAudio();

  const gameFrame = useRef(null);
  const gameState = useSelector(({ game }) => game);
  const dispatch = useDispatch();

  const [fullScreenState, toggleFullScreenState] = useFullScreen(
    gameFrame.current
  );

  const {
    location,
    setLocation,
    hero,
    setHero,
    environment,
    getRandomObstacle,
  } = useGameEnvironment();

  function getScore() {
    return gameFrame.current.querySelector("#score-counter").dataset.score;
  }

  function includeScoreSet(currentScoreString, score) {
    if (currentScoreString) {
      const scoreHistorySet = currentScoreString.split(",");
      if (scoreHistorySet.length >= 10) scoreHistorySet.splice(9, 1);
      scoreHistorySet.splice(0, 0, score + "");
      return scoreHistorySet.join(",");
    }
    return score + "";
  }

  const locationSelectHandler = (index) => {
    setLocation(index);
    dispatch(updateGameKey());
  };

  const pauseToggleHandler = (loseFlag) => {
    const score = getScore();

    if (score > getSavedNumberVal("bestScore", 0)) {
      localStorage.setItem("bestScore", score + "");
    }

    if (loseFlag) {
      const newScoreString = includeScoreSet(
        localStorage.getItem("scoreHistory"),
        score
      );
      localStorage.setItem("scoreHistory", newScoreString);
    }

    dispatch(togglePause(!!loseFlag));

    if (environment.environment.bgMusic) {
      if (bgMusic.paused) bgMusic.play();
    }
  };

  const keyActionsMap = {
    SPACE: () => {
      if (!gameState.isLose) {
        pauseToggleHandler();
      } else {
        dispatch(resetGame());
      }
    },
    m: () => {
      toggleMute();
    },
  };

  useUnshiftKeyPress(keyActionsMap.SPACE, "SPACE");
  useUnshiftKeyPress(keyActionsMap.m, "m");

  useEffect(() => {
    localStorage.setItem("hero", hero.index + "");
  }, [hero]);

  useEffect(() => {
    if (environment.environment.bgMusic) {
      reloadSound();
    }
  }, [location, environment.environment.bgMusic, reloadSound]);

  const style = useFrameSizeStyle({ border: "1px solid black" });

  return (
    <div className={classesCss.Wrap} ref={gameFrame}>
      {style.border ? <div className={classesCss.Border} /> : null}
      <div className={classesCss.Frame} style={style}>
        {environment.environment?.bgMusic ? (
          <Audio
            ref={bgMusic}
            loop={true}
            src={environment.environment?.bgMusic}
          />
        ) : null}
        <NavigationLayout
          counterId={"score-counter"}
          bestScore={getSavedNumberVal("bestScore", 0)}
          fullScreen={fullScreenState}
          fullScreenToggle={toggleFullScreenState}
          onPauseToggle={pauseToggleHandler}
          soundMuted={soundState.muted}
          onSoundToggle={toggleMute}
        />
        {gameState.isPause ? (
          <MenuLayout
            locationData={{
              itemSet: LOCATIONS_MENU_SET,
              currentIndex: location,
              selectHandler: locationSelectHandler,
            }}
            heroData={{
              itemSet: environment.heroes,
              currentIndex: hero.index,
              selectHandler: setHero,
            }}
            statistic={{
              scoreHistory: localStorage.getItem("scoreHistory"),
              bestScore: getSavedNumberVal("bestScore", 0),
            }}
            sound={{
              initValue: soundState.volume,
              muted: soundState.muted,
              onSoundToggle: toggleMute,
              onSoundVolumeChange: setVolume,
            }}
            game={{
              onPauseToggle: pauseToggleHandler,
            }}
          />
        ) : null}
        <GameLayout
          soundVolume={soundState.volume}
          soundMuted={soundState.muted}
          key={gameState.gameKey}
          onPauseToggle={pauseToggleHandler}
          char={hero.item}
          environment={environment.environment}
          getRandomObstacle={getRandomObstacle}
          frameWidth={style.width}
          frameHeight={style.height}
        />
      </div>
      {style.border ? <div className={classesCss.Border} /> : null}
    </div>
  );
}
