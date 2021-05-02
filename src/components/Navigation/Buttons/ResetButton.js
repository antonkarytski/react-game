import React from "react";
import Button from "./Button";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { resetGame } from "../../../redux/actions.game";
import { useDispatch } from "react-redux";
import cx from "classnames";
import classesCss from "../../../containers/Layouts/MenuLayout/MenuLayout.module.scss";

export default function ResetButton() {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => dispatch(resetGame())}
      className={cx(classesCss.BigButton, classesCss.ResetButton)}
      valueDefault={faUndoAlt}
      faIcon={true}
    />
  );
}
