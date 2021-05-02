import { getSavedNumberVal } from "../../../helpers/localStorage";
import Counter from "./Counter";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSaveBestScore, useScoreHistory } from "../../../hooks/hook.scoreHistory";

export default function GameCounter() {
  const { isPause, isLose, gameKey } = useSelector(({ game }) => game);

  const counterInterface = useRef(null);
  useScoreHistory(isLose, counterInterface.current?.value);
  useSaveBestScore(isPause, counterInterface.current?.value);

  useEffect(() => {
    counterInterface.current.resetCounter();
  }, [gameKey]);

  return (
    <Counter
      bestScore={getSavedNumberVal("bestScore", 0)}
      condition={!isPause}
      controllerRef={counterInterface}
    />
  );
}
