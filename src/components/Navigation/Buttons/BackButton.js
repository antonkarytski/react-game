import React from "react";
import Button from "./Button";
import classes from "./Buttons.module.scss";

export default function BackButton({ onBack, className }) {
  return (
    <Button
      onClick={onBack}
      className={[classes.BackButton, className].join(" ")}
      valueDefault={"BACK"}
    />
  );
}
