import React, { useEffect, useRef } from "react";
import Audio from "../components/Helpres/Audio";
import GameLayout from "./Layouts/GameLayout";
import NavigationLayout from "./Layouts/NavigationLayout/NavigationLayout";
import MenuLayout from "./Layouts/MenuLayout/MenuLayout";
import classesCss from "./Frame.module.scss";
import { useUnshiftKeyPress } from "../hooks/hook.keyPress";
import { getSavedNumberVal } from "../helpers/localStorage";
import { useGameAudio } from "../hooks/game/hook.sounds";
import { useGameEnvironment } from "../hooks/game/hook.environment";
import { useFrameSizeStyle } from "../hooks/game/hook.frameSize";
import { useDispatch, useSelector } from "react-redux";
import { resetGame, togglePause, updateGameKey } from "../redux/actions.game";
import { useSaveToLocalStorage } from "../hooks/hook.localStorage";
import { STORAGE_HERO } from "../settings/consts";

export default function Frame() {
  const {
    audioRef: bgMusic,
    soundState,
    setVolume,
    reloadSound,
    toggleMute,
  } = useGameAudio();

  const dispatch = useDispatch();

  const fullScreenElement = useRef(null);

  const { isLose, isPause, gameKey } = useSelector(({ game }) => game);

  const {
    location,
    setLocation,
    hero,
    setHero,
    environment,
    getRandomObstacle,
  } = useGameEnvironment();

  const locationSelectHandler = (index) => {
    setLocation(index);
    dispatch(updateGameKey());
  };

  const keyActionsMap = {
    SPACE: () => {
      if (!isLose) {
        dispatch(togglePause());
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

  useSaveToLocalStorage(STORAGE_HERO, hero.index);

  useEffect(() => {
    if (environment.environment.bgMusic) {
      reloadSound();
    }
  }, [location, environment.environment.bgMusic, reloadSound]);

  useEffect(() => {
    if (environment.environment.bgMusic && bgMusic.paused) bgMusic.play();
  }, [isPause, bgMusic, environment.environment.bgMusic]);

  const style = useFrameSizeStyle({ border: "1px solid black" });

  return (
    <div className={classesCss.Wrap} ref={fullScreenElement}>
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
          fullScreenElement={fullScreenElement.current}
          soundMuted={soundState.muted}
          onSoundToggle={toggleMute}
        />
        {isPause ? (
          <MenuLayout
            locationData={{
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
          />
        ) : null}
        <GameLayout
          soundVolume={soundState.volume}
          soundMuted={soundState.muted}
          key={gameKey}
          char={hero.item}
          environment={environment.environment}
          getRandomObstacle={getRandomObstacle}
        />
      </div>
      {style.border ? <div className={classesCss.Border} /> : null}
    </div>
  );
}
