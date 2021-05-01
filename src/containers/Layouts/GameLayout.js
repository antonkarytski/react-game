import React, { useRef, useState } from "react";
import classes from "./styles/Layouts.module.scss";
import Hero from "../../components/Hero/Hero";
import Obstacle from "../../components/Obstacle/Obstacle";
import StyledGame, { StyledLayer } from "./styles/StyledGame";
import useTimerGenerator from "../../hooks/useTimerGenerator";
import useTimer from "../../hooks/useTimer";
import { MAX_TIME_DECREASE, MIN_TIME_DECREASE, SPEED_FUNCTION } from "../../settings/gameControllers";
import { GAME_PROCESS } from "../../settings/gameSettings";
import { useSelector } from "react-redux";

export default function GameLayout(props) {
  const {
    char,
    onPauseToggle,
    environment,
    soundVolume,
    soundMuted,
    getRandomObstacle,
    frameWidth,
    frameHeight,
  } = props;

  const { isPause, difficulty } = useSelector(({ game }) => game);

  const stackSize = 8;
  const [obstaclesState, setObstaclesState] = useState({
    obstacles: Array(stackSize),
    nextObstacle: 0,
    count: 0,
  });
  const selfRef = useRef(null);

  const minTime = MIN_TIME_DECREASE(
    GAME_PROCESS.generationMinTime,
    obstaclesState.count + difficulty < 3 ? 0 : (difficulty / 2) * 90
  );

  const maxTime = MAX_TIME_DECREASE(
    GAME_PROCESS.generationMaxTime,
    obstaclesState.count + difficulty < 3 ? 0 : (difficulty / 2) * 180
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
    const preparedCorrection = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
    if (typeof correction === "number") {
      preparedCorrection.top = objectSize.h * correction;
      preparedCorrection.bottom = objectSize.h * correction;
      preparedCorrection.right = objectSize.w * correction;
      preparedCorrection.left = objectSize.w * correction;
    } else if (typeof correction === "object") {
      preparedCorrection.top = objectSize.h * correction.top;
      preparedCorrection.bottom = objectSize.h * correction.bottom;
      preparedCorrection.right = objectSize.w * correction.right;
      preparedCorrection.left = objectSize.w * correction.left;
    }
    return preparedCorrection;
  }

  function checkCollision(obj1, obj2, correction = {}) {
    //THIS FUNCTION WILL WORK ONLY WITH RELATED VALUES

    const rightCross =
      obj1.right - correction[0].right > obj2.left + correction[1].left;
    const leftCross =
      obj1.left + correction[0].left < obj2.right - correction[1].right;
    const topCross =
      obj1.top - correction[0].top > obj2.bottom + correction[1].bottom;
    const bottomCross =
      obj1.bottom + correction[0].bottom < obj2.top - correction[1].top;
    return rightCross & leftCross & topCross & bottomCross;
  }

  //OBSTACLES GENERATION

  useTimerGenerator(
    () => {
      const obstaclesToAdd = [...obstaclesState.obstacles];
      const newObstacle = getRandomObstacle();
      newObstacle.position = frameWidth;
      newObstacle.speed = SPEED_FUNCTION(
        GAME_PROCESS.baseSpeed,
        obstaclesState.count
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
      obstaclesToAdd[obstaclesState.nextObstacle] = newObstacle;
      setObstaclesState({
        obstacles: obstaclesToAdd,
        nextObstacle:
          obstaclesState.nextObstacle < stackSize - 1
            ? obstaclesState.nextObstacle + 1
            : 0,
        count: obstaclesState.count + 1,
      });
    },
    [minTime, maxTime],
    !isPause
  );

  //OBSTACLES LIFECYCLE

  useTimer(
    () => {
      let changesFlag = false;
      const obstaclesToMove = obstaclesState.obstacles.map(
        (obstacle, index) => {
          if (obstacle?.display) {
            const obstacleDom = selfRef.current.querySelector(
              `[data-index = "${index}"]`
            );
            const heroDom = selfRef.current.querySelector("#hero");
            const obstacleRelPosition = getRelPosition(
              obstacleDom.getBoundingClientRect()
            );
            if (obstacleRelPosition.left <= -150) {
              obstacle.display = false;
              changesFlag = true;
            } else {
              const heroRelPosition = getRelPosition(
                heroDom.getBoundingClientRect()
              );
              let heroSizeCorrection = null;

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
                onPauseToggle(true);
                changesFlag = true;
              }
            }
          }
          return obstacle;
        }
      );
      if (changesFlag) {
        setObstaclesState({
          obstacles: obstaclesToMove,
          nextObstacle: obstaclesState.nextObstacle,
          count: obstaclesState.count,
        });
      }
    },
    40,
    !isPause,
    obstaclesState,
    isPause
  );

  //RENDERS PREPARE

  let relatedWidth =
    (frameHeight / environment.bgNaturalHeight) * environment.bgNaturalWidth;
  if (relatedWidth < frameWidth) {
    relatedWidth = frameWidth;
  }

  const divider = frameWidth < frameHeight ? frameHeight : frameWidth;
  const bgTime = (relatedWidth / divider) * 3;

  const selfStyle = {
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/" + environment.bgImage
    })`,
    backgroundSize: `${relatedWidth}px ${frameHeight}px`,
    backgroundAttachment: "initial",
  };

  const effectStyle = {};
  if (isPause) {
    selfStyle.animationPlayState = "paused";
    effectStyle.animationPlayState = "paused";
  }

  let gameEffects = null;
  switch (environment.effects) {
    case "disco":
      gameEffects = (
        <StyledLayer className={classes.FilterLayout} style={effectStyle} />
      );
      break;
    default:
      gameEffects = null;
      break;
  }

  return (
    <StyledGame
      bgWidth={relatedWidth}
      bgTime={bgTime}
      ref={selfRef}
      style={selfStyle}
      className={classes.GameLayout}
    >
      <Hero
        frameWidth={frameWidth}
        soundVolume={soundVolume}
        soundMuted={soundMuted}
        gameOnPause={isPause}
        item={char}
      />

      {obstaclesState.obstacles.map((obstacle, index) => {
        if (obstacle?.display) {
          return (
            <Obstacle
              frameWidth={frameWidth}
              gameOnPause={isPause}
              className={"obstacle"}
              key={index}
              index={index}
              item={obstacle}
            />
          );
        }
        return null;
      })}

      {gameEffects}
    </StyledGame>
  );
}
