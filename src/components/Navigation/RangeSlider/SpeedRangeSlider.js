import classesCss from "../../../containers/Layouts/MenuLayout/MenuLayout.module.scss";
import RangeSlider from "./RangeSlider";
import { setDifficulty } from "../../../redux/actions.game";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SpeedRangeSlider() {
  const dispatch = useDispatch();
  const { difficulty } = useSelector(({ game }) => game);

  return (
    <div className={classesCss.SpeedButton}>
      <span>SPEED </span>
      <RangeSlider
        initValue={difficulty}
        onChange={(index) => dispatch(setDifficulty(index))}
        min={1}
        max={4}
        step={1}
      />
    </div>
  );
}
