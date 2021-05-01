import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classesCss from "./Buttons.module.scss";

function Button(props) {
  const {
    condition, //condition under which onClick will work
    valueDefault,
    valueToggled,
    className,
    onClick,
    style,
    faIcon = false,
  } = props;
  const toggled = props.toggled ? props.toggled : false;

  const [buttonToggled, changeButtonState] = useState(toggled);

  const classes = [classesCss.Button];
  classes.push(className);

  let buttonContent = valueToggled
    ? buttonToggled
      ? valueDefault
      : valueToggled
    : valueDefault;

  if (faIcon) {
    buttonContent = <FontAwesomeIcon icon={buttonContent} />;
  }

  const buttonClickHandler = () => {
    if (condition ?? true) {
      if (onClick) onClick();
      if (valueToggled) changeButtonState(!buttonToggled);
    }
  };

  useEffect(() => {
    changeButtonState(toggled);
  }, [toggled]);

  return (
    <div
      style={style}
      className={classes.join(" ")}
      onClick={() => buttonClickHandler()}
    >
      {buttonContent}
    </div>
  );
}

export default Button;
