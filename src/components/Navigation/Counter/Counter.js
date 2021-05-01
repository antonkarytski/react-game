import React from "react";
import cx from "classnames";
import classes from "./Counter.module.scss";
import { useCounter } from "../../../hooks/hook.counter";

const Counter = ({ bestScore, condition, className, controllerRef }) => {
  const [value, resetCounter] = useCounter(10, condition);

  controllerRef.current = {
    value,
    resetCounter,
  };

  return (
    <div className={cx(classes.Counter, className)}>
      <span className={classes.BestScore}>
        {"0".repeat(8 - (bestScore + "").length) + bestScore}
      </span>
      \
      <span className={classes.CurrentScore}>
        {"0".repeat(8 - (value + "").length) + value}
      </span>
    </div>
  );
};

export default Counter;
