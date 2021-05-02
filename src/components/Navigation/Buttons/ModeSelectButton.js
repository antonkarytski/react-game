import classesCss from "../../../containers/Layouts/MenuLayout/MenuLayout.module.scss";
import Button from "./Button";
import React from "react";

export default function ModeSelectButton({ onClick, label, ...props }) {
  return (
    <Button
      onClick={onClick}
      className={classesCss.SelectButton}
      valueDefault={label}
      {...props}
    />
  );
}
