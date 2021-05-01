import React, { useState } from "react";
import "./styles/style.scss";
import classesCss from "./styles/Layouts.module.scss";
import Button from "../../components/Navigation/Buttons/Button";
import ResetButton from "../../components/Navigation/Buttons/ResetButton";
import SoundRangeSlider from "../../components/Navigation/RangeSlider/SoundRangeSlider";
import RangeSlider from "../../components/Navigation/RangeSlider/RangeSlider";
import StatisticMenu from "../../components/Navigation/Menu/StatisticMenu";
import PickMenu from "../../components/Navigation/Menu/PickMenu/PickMenu";
import InfoLayout from "./InfoLayout";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { resetGame, setDifficulty } from "../../redux/actions.game";
import { useDispatch, useSelector } from "react-redux";

function MenuLayout(props) {
  const { game, locationData, heroData, sound, statistic } = props;

  const [menuMode, setMenuMode] = useState("init"); //init, start, heroSelect, locationSelect, isLose, isPause

  const dispatch = useDispatch();
  const { isInfoMenuOpened, isLose, difficulty } = useSelector(
    ({ game }) => game
  );
  let currentColonContent = null;
  let menuContent = null;
  const resetClasses = [classesCss.BigButton, classesCss.ResetButton].join(" ");

  switch (menuMode) {
    case "init":
      if (isInfoMenuOpened) {
        menuContent = <InfoLayout />;
      } else {
        if (isLose) {
          currentColonContent = (
            <div
              className={[
                classesCss.CurrentColumn,
                classesCss.LoseMessage,
              ].join(" ")}
            >
              <h2>YOU LOSE</h2>
              <ResetButton
                onResetGame={() => dispatch(resetGame())}
                className={resetClasses}
              />
              <span>
                or press <i>SPACE</i>
              </span>
            </div>
          );
        } else {
          currentColonContent = (
            <div className={classesCss.CurrentColumn}>
              <ResetButton
                onResetGame={() => dispatch(resetGame())}
                className={resetClasses}
              />
              <Button
                onClick={game.onPauseToggle}
                className={classesCss.BigButton}
                valueDefault={faPlay}
                faIcon={true}
              />
            </div>
          );
        }
        menuContent = (
          <div className={classesCss.MenuContent}>
            {currentColonContent}
            <div className={classesCss.SettingColumn}>
              <SoundRangeSlider
                initValue={sound.initValue}
                onSoundToggle={sound.onSoundToggle}
                soundMuted={sound.muted}
                onChange={sound.onSoundVolumeChange}
              />
              <div className={classesCss.SpeedButton}>
                <span>SPEED </span>
                <RangeSlider
                  initValue={difficulty}
                  onChange={(index) => dispatch(setDifficulty(index))}
                  min={1}
                  max={4}
                  step={1}
                />
              </div>

              <Button
                onClick={() => setMenuMode("heroSelect")}
                className={classesCss.SelectButton}
                valueDefault={"SELECT HERO"}
              />
              <Button
                style={{ fontSize: "15px" }}
                onClick={() => setMenuMode("locationSelect")}
                className={classesCss.SelectButton}
                valueDefault={"SELECT LOCATION"}
              />
              <Button
                onClick={() => setMenuMode("statistic")}
                className={classesCss.SelectButton}
                valueDefault={"STATISTIC"}
              />
            </div>
          </div>
        );
      }

      break;
    case "heroSelect":
      menuContent = (
        <PickMenu
          itemClasses={"hero"}
          itemData={heroData}
          onBackHandler={() => setMenuMode("init")}
          previewType={"card"}
        />
      );
      break;
    case "locationSelect":
      menuContent = (
        <PickMenu
          itemClasses={["location", classesCss.LocationPickerItem].join(" ")}
          itemData={locationData}
          onBackHandler={() => setMenuMode("init")}
          previewType={"full"}
        />
      );
      break;
    case "statistic":
      menuContent = (
        <StatisticMenu
          statistic={statistic}
          onBackHandler={() => setMenuMode("init")}
        />
      );
      break;
    case "info":
      menuContent = (
        <StatisticMenu
          statistic={statistic}
          onBackHandler={() => setMenuMode("init")}
        />
      );
      break;
    default:
      currentColonContent = null;
  }

  return <div className={classesCss.MenuLayout}>{menuContent}</div>;
}

export default MenuLayout;
