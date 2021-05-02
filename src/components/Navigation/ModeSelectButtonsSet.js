import ModeSelectButton from "./Buttons/ModeSelectButton";
import { MENU_MODE } from "../../settings/consts";
import React from "react";

export default function ModeSelectButtonsSet({ onModeSelect }) {
  return (
    <>
      <ModeSelectButton
        onClick={() => onModeSelect(MENU_MODE.HERO_SELECT)}
        label={"SELECT HERO"}
      />
      <ModeSelectButton
        style={{ fontSize: "15px" }}
        onClick={() => onModeSelect(MENU_MODE.LOCATION_SELECT)}
        label={"SELECT LOCATION"}
      />
      <ModeSelectButton
        onClick={() => onModeSelect(MENU_MODE.STATISTIC)}
        label={"STATISTIC"}
      />
    </>
  );
}
