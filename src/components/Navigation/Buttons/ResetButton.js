import React from "react";
import Button from "./Button";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";

export default function ResetButton({ onResetGame, className }) {
  return (
    <Button
      onClick={() => onResetGame()}
      className={className}
      valueDefault={faUndoAlt}
      faIcon={true}
    />
  );
}
