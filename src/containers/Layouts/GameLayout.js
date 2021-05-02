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
import EffectLayer from "../../components/EffectLayer/EffectLayer";
import { Position } from "../../helpers/position";

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

  const selfRef = useRef(null);
  const heroRef = useRef(null);
  const obstacles = useRef([]);
  const [obstaclesCount, setObstaclesCount] = useState(0);
  const [obstaclesPassCount, setObstaclesPass] = useState(0);

  const minTime = MIN_TIME_DECREASE(
    GAME_PROCESS.generationMinTime,
    obstaclesCount + difficulty < 3 ? 0 : (difficulty / 2) * 90
  );

  const maxTime = MAX_TIME_DECREASE(
    GAME_PROCESS.generationMaxTime,
    obstaclesCount + difficulty < 3 ? 0 : (difficulty / 2) * 180
  );

  useTimerGenerator(
    () => {
      const { current: currentObstacles } = obstacles;
      const newObstacle = getRandomObstacle();
      newObstacle.domElement = { current: null };
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
      const previousLength = obstacles.current.length;
      obstacles.current = obstacles.current.filter((obstacle) => {
        const obstacleDom = obstacle.domElement.current;
        if (obstacleDom.offsetLeft <= -150) return false;

        const heroDom = heroRef.current;
        const heroMode = (() => {
          if (heroDom?.offsetHeight < char.sizes.default.h) return "sit";
          return "default";
        })();

        const heroPosition = new Position(
          heroDom?.getBoundingClientRect(),
          char.sizeCorrection[heroMode]
        );

        const obstaclePosition = new Position(
          obstacleDom.getBoundingClientRect(),
          obstacle.sizeCorrection
        );

        if (Position.isIntersect(heroPosition, obstaclePosition)) {
          dispatch(togglePause(true));
        }
        return true;
      });
      if (previousLength !== obstacles.current.length) {
        setObstaclesPass((count) => count + 1);
      }
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
        ref={heroRef}
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
