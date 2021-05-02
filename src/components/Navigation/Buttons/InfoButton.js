import { toggleInfoMenu } from "../../../redux/actions.game";
import cx from "classnames";
import classes from "../../../containers/Layouts/NavigationLayout/NavigationLayout.module.scss";
import { faQuestion, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function InfoButton() {
  const dispatch = useDispatch();
  const { isInfoMenuOpened } = useSelector(({ game }) => game);

  return (
    <Button
      onClick={() => dispatch(toggleInfoMenu())}
      className={cx(classes.MenuButton, classes.QuestionButton)}
      valueDefault={faQuestion}
      valueToggled={faTimes}
      faIcon
      toggled={!isInfoMenuOpened}
    />
  );
}
