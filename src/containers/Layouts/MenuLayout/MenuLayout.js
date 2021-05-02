import React, { useState } from "react";
import cx from "classnames";
import "../styles/style.scss";
import classesCss from "./MenuLayout.module.scss";
import Button from "../../../components/Navigation/Buttons/Button";
import ResetButton from "../../../components/Navigation/Buttons/ResetButton";
import SoundRangeSlider from "../../../components/Navigation/RangeSlider/SoundRangeSlider";
import RangeSlider from "../../../components/Navigation/RangeSlider/RangeSlider";
import StatisticMenu from "../../../components/Navigation/Menu/StatisticMenu";
import PickMenu from "../../../components/Navigation/Menu/PickMenu/PickMenu";
import InfoLayout from "./InfoLayout";
import { setDifficulty } from "../../../redux/actions.game";
import { useDispatch, useSelector } from "react-redux";
import { MENU_MODE } from "../../../settings/consts";
import PlayButton from "../../../components/Navigation/Buttons/PlayButton";

function MenuLayout(props) {
  const { locationData, heroData, sound, statistic } = props;

  const [menuMode, setMenuMode] = useState(MENU_MODE.INIT);

  const dispatch = useDispatch();
  const { isInfoMenuOpened, isLose, difficulty } = useSelector(
    ({ game }) => game
  );
  let currentColonContent = null;

  return (
    <div className={classesCss.MenuLayout}>
      {(() => {
        const { CurrentColumn, LoseMessage } = classesCss;
        switch (menuMode) {
          case MENU_MODE.INIT: {
            if (isInfoMenuOpened) return <InfoLayout />;
            if (isLose) {
              currentColonContent = (
                <div className={cx(CurrentColumn, LoseMessage)}>
                  <h2>YOU LOSE</h2>
                  <ResetButton />
                  <span>
                    or press <i>SPACE</i>
                  </span>
                </div>
              );
            } else {
              currentColonContent = (
                <div className={CurrentColumn}>
                  <ResetButton />
                  <PlayButton />
                </div>
              );
            }
            return (
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
                    onClick={() => setMenuMode(MENU_MODE.HERO_SELECT)}
                    className={classesCss.SelectButton}
                    valueDefault={"SELECT HERO"}
                  />
                  <Button
                    style={{ fontSize: "15px" }}
                    onClick={() => setMenuMode(MENU_MODE.LOCATION_SELECT)}
                    className={classesCss.SelectButton}
                    valueDefault={"SELECT LOCATION"}
                  />
                  <Button
                    onClick={() => setMenuMode(MENU_MODE.STATISTIC)}
                    className={classesCss.SelectButton}
                    valueDefault={"STATISTIC"}
                  />
                </div>
              </div>
            );
          }
          case MENU_MODE.HERO_SELECT:
            return (
              <PickMenu
                itemClasses={"hero"}
                itemData={heroData}
                onBackHandler={() => setMenuMode("init")}
                previewType={"card"}
              />
            );
          case MENU_MODE.LOCATION_SELECT:
            return (
              <PickMenu
                itemClasses={classesCss.LocationPickerItem}
                itemData={locationData}
                onBackHandler={() => setMenuMode(MENU_MODE.INIT)}
                previewType={"full"}
              />
            );
          case MENU_MODE.STATISTIC:
            return (
              <StatisticMenu
                statistic={statistic}
                onBackHandler={() => setMenuMode("init")}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default MenuLayout;
