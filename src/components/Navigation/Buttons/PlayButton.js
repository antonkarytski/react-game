import { togglePause } from "../../../redux/actions.game";
import classesCss from "../../../containers/Layouts/MenuLayout/MenuLayout.module.scss";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import React from "react";
import { useDispatch } from "react-redux";

export default function PlayButton() {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => dispatch(togglePause())}
      className={classesCss.BigButton}
      valueDefault={faPlay}
      faIcon={true}
    />
  );
}
