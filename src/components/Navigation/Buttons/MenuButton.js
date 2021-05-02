import { togglePause } from "../../../redux/actions.game";
import classes from "../../../containers/Layouts/styles/Layouts.module.scss";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MenuButton() {
  const dispatch = useDispatch();
  const { isPause, isLose } = useSelector(({ game }) => game);

  return (
    <Button
      onClick={() => dispatch(togglePause())}
      className={classes.MenuButton}
      valueDefault={faTimes}
      valueToggled={faBars}
      faIcon
      toggled={isPause}
      condition={!isLose}
    />
  );
}
