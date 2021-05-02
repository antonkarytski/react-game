import React, { useRef, useState } from "react";
import classes from "./styles/Layouts.module.scss";
import Hero from "../../components/Hero/Hero";
import Obstacle from "../../components/Obstacle/Obstacle";
import StyledGame from "./styles/StyledGame";
import useTimerGenerator from "../../hooks/useTimerGenerator";
import { useInterval } from "../../hooks/hook.timer";
import { MAX_TIME_DECREASE, MIN_TIME_DECREASE, SPEED_FUNCTION } from "../../settings/gameControllers";
import { GAME_PROCESS } from "../../settings/gameSettings";
import { useDispatch, useSelector } from "react-redux";
import { togglePause } from "../../redux/actions.game";
import { useFrameSize } from "../../hooks/game/hook.frameSize";
import { checkCollision } from "../../helpers/game";
import EffectLayer from "../../components/EffectLayer/EffectLayer";

export default function GameLayout(props) {
  const {
    char,
    environment,
    soundVolume,
    soundMuted,
    getRandomObstacle,
  } = props;

  const { width: frameWidth, height: frameHeight } = useFrameSize();
  const divider = frameWidth < frameHeight ? frameHeight : frameWidth;
  let relatedWidth =
    (frameHeight / environment.bgNaturalHeight) * environment.bgNaturalWidth;
  if (relatedWidth < frameWidth) {
    relatedWidth = frameWidth;
  }
  const bgTime = (relatedWidth / divider) * 3;

  const { isPause, difficulty } = useSelector(({ game }) => game);
  const dispatch = useDispatch();

  const obstacles = useRef([]);
  const [obstaclesCount, setObstaclesCount] = useState(0);
  const [obstaclesPassCount, setObstaclesPass] = useState(0);

  const selfRef = useRef(null);

  const minTime = MIN_TIME_DECREASE(
    GAME_PROCESS.generationMinTime,
    obstaclesCount + difficulty < 3 ? 0 : (difficulty / 2) * 90
  );

  const maxTime = MAX_TIME_DECREASE(
    GAME_PROCESS.generationMaxTime,
    obstaclesCount + difficulty < 3 ? 0 : (difficulty / 2) * 180
  );

  function getRelPosition(objPosition) {
    const windowDomRect = selfRef.current.getBoundingClientRect();
    return {
      left: objPosition.left - windowDomRect.left,
      right: objPosition.right - windowDomRect.left,
      top: windowDomRect.bottom - objPosition.top,
      bottom: windowDomRect.bottom - objPosition.bottom,
    };
  }

  function prepareCorrection(correction, objectSize) {
    const sizesMap = {
      top: objectSize.h,
      bottom: objectSize.h,
      left: objectSize.w,
      right: objectSize.w,
    };
    if (typeof correction === "number") {
      return Object.fromEntries(
        Object.entries(sizesMap).map(([key, size]) => {
          return [key, size * correction];
        })
      );
    }
    return Object.fromEntries(
      Object.entries(sizesMap).map(([key, size]) => {
        return [key, size * correction[key]];
      })
    );
  }

  useTimerGenerator(
    () => {
      const { current: currentObstacles } = obstacles;
      const newObstacle = getRandomObstacle();
      newObstacle.key = obstaclesCount;
      newObstacle.speed = SPEED_FUNCTION(
        GAME_PROCESS.baseSpeed,
        obstaclesCount
      );
      newObstacle.speed =
        (newObstacle.speed * newObstacle.speedK * difficulty) / 2;
      if (newObstacle.effect?.name === "rotate") {
        newObstacle.effect = Object.assign({}, newObstacle.effect);
        if (newObstacle.effect.speed) {
          const rotateSpeed = newObstacle.effect.speed;
          if (Array.isArray(rotateSpeed))
            newObstacle.effect.speed =
              rotateSpeed[0] +
              Math.random() * (rotateSpeed[1] - rotateSpeed[0]);
          else newObstacle.effect.speed = rotateSpeed;
        } else newObstacle.effect.speed = false;
        if (newObstacle.effect.direction === "rand") {
          newObstacle.effect.direction = Math.random() < 0.5 ? 1 : -1;
        }
      }
      if (newObstacle.randomHeight)
        newObstacle.height =
          newObstacle.height -
          newObstacle.height * Math.random() * newObstacle.randomHeight;
      if (newObstacle.randomWidth)
        newObstacle.width =
          newObstacle.width +
          newObstacle.width * Math.random() * newObstacle.randomWidth;
      currentObstacles.push(newObstacle);
      setObstaclesCount((count) => count + 1);
    },
    [minTime, maxTime],
    !isPause
  );

  useInterval(
    () => {
      let shouldUpdate = false;
      obstacles.current = obstacles.current.filter((obstacle) => {
        const obstacleDom = selfRef.current.querySelector(
          `[data-index = "${obstacle.key}"]`
        );

        const obstacleRelPosition = getRelPosition(
          obstacleDom.getBoundingClientRect()
        );
        if (obstacleRelPosition.left <= -150) {
          shouldUpdate = true;
          return false;
        }

        const heroDom = selfRef.current.querySelector("#hero");
        const heroRelPosition = getRelPosition(heroDom.getBoundingClientRect());
        let heroSizeCorrection;
        if (heroRelPosition.top + 5 < char.sizes.default.h) {
          heroSizeCorrection = prepareCorrection(char.sizeSitCorrection, {
            w: char.sizes.sit.w,
            h: char.sizes.sit.h,
          });
        } else {
          heroSizeCorrection = prepareCorrection(char.sizeCorrection, {
            w: char.sizes.default.w,
            h: char.sizes.default.h,
          });
        }
        const obstacleSizeCorrection = prepareCorrection(
          obstacle.sizeCorrection,
          { w: obstacle.width, h: obstacle.height }
        );
        if (
          checkCollision(heroRelPosition, obstacleRelPosition, [
            heroSizeCorrection,
            obstacleSizeCorrection,
          ])
        ) {
          dispatch(togglePause(true));
        }
        return true;
      });
      if (shouldUpdate) setObstaclesPass((count) => count + 1);
    },
    40,
    !isPause
  );

  return (
    <StyledGame
      bgWidth={relatedWidth}
      bgHeight={frameHeight}
      bgImage={environment.bgImage}
      bgTime={bgTime}
      ref={selfRef}
      paused={isPause}
      className={classes.GameLayout}
    >
      <Hero
        frameWidth={frameWidth}
        soundVolume={soundVolume}
        soundMuted={soundMuted}
        gameOnPause={isPause}
        item={char}
      />

      {obstacles.current.map(({ key, ...obstacle }) => {
        return (
          <Obstacle
            frameWidth={frameWidth}
            gameOnPause={isPause}
            className={"obstacle"}
            key={key}
            index={key}
            item={obstacle}
          />
        );
      })}

      <EffectLayer environment={environment} paused={isPause} />
    </StyledGame>
  );
}
