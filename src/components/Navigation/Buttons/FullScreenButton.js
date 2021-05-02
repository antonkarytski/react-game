import cx from "classnames";
import classes from "../../../containers/Layouts/NavigationLayout/NavigationLayout.module.scss";
import { faCompressArrowsAlt, faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import React from "react";

export default function FullScreenButton({ onClick, toggled }) {
  return (
    <Button
      onClick={onClick}
      className={cx(classes.MenuButton, classes.FullScreenButton)}
      valueDefault={faExpandArrowsAlt}
      valueToggled={faCompressArrowsAlt}
      faIcon
      toggled={toggled}
    />
  );
}
